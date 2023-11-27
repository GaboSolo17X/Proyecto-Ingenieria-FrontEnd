<template>
  <div class="tabla">
    <v-table fixed-header height="400px">
      <thead class="encabezado">
        <tr>
          <th class="text-left">Numero de cuenta</th>
          <th class="text-left">Nombre completo</th>
          <th class="text-left">Nota</th>
          <th class="text-left">Observacion</th>
          <!-- <th class="text-left">
          icono
        </th> -->
        </tr>
      </thead>
      <tbody>
        <tr v-for="estudiante in datos" :key="estudiante.numeroCuenta">
          <td>{{ estudiante.numeroCuenta }}</td>
          <td>{{ estudiante.nombres + " " + estudiante.apellidos }}</td>
          <td>
            <v-text-field
              v-model="estudiante.nota"
              label="0 -100"
              variant="outlined"
              density="compact"
              class="campo"
              :rules="[
                (v) => (v > -1 && v < 101) || 'Ingresa un valor entre 0 y 100',
                (v) => (v !== null && v !== undefined) || 'El valor es requerido',
              ]"
            ></v-text-field>
          </td>
          <td>
            <v-text-field
              v-model="estudiante.estado"
              label="APR/RPD/NSP/ABN"
              variant="outlined"
              density="compact"
              class="campo"
              :rules="[
                (v) => !!v || 'El valor es requerido',
                (v) =>
                  /^(APR|RPD|NSP|ABN)$/.test(v) ||
                  'Ingresa un valor válido (APR, REP, NP, ABN)',
              ]"
            ></v-text-field>
          </td>
        </tr>
      </tbody>
    </v-table>
  </div>
  <br />
  <v-btn class="save" rounded="xl" @click="guardarDatos">Guardar Notas</v-btn>
  <v-btn class="see" rounded="xl" @click="verNotas">Ver Notas</v-btn>
</template>

<script>
import { ref } from "vue";

export default {
  props: {
    datos: { type: Object, default: () => ({}) },
    idSec: Number,
    docente: String,
    selec:String
  },

  setup(props) {
    const idSeccion = ref();
    const clase = ref();
    const datosAGuardar = ref([]);
    console.log(props.selec)

    

    const guardarDatos = () => {
      // Itera sobre los datos y recopila las notas y estados
      // datosAGuardar.value = props.datos.push(estudiante => ({
      //   numeroCuenta: estudiante.numeroCuenta,
      //   nota: estudiante.nota,
      //   estado: estudiante.estado,
      // }));
      if (props.selec === null) {
        window.alert("Por favor, seleccione una clase para poder ingresar notas.");

      }else{
        const primerEstudiante = props.datos[0];
      idSeccion.value = primerEstudiante ? primerEstudiante.id : null;
      clase.value = primerEstudiante ? primerEstudiante.nombreClase : null;
      // Ahora puedes enviar 'datosAGuardar' a tu base de datos
      console.log("Datos a guardar:", datosAGuardar.value);
      console.log("Id de la Seccion:", idSeccion);
      // Lógica para enviar los datos a la base de datos

      const camposValidos = props.datos.every((estudiante) => {
        const notaValida =
          estudiante.nota !== undefined &&
          estudiante.nota !== null &&
          estudiante.nota !== "";
        const estadoValido =
          estudiante.estado !== undefined &&
          estudiante.estado !== null &&
          estudiante.estado !== "";

        return notaValida && estadoValido;
      });

      if (!camposValidos) {
        window.alert("Por favor, completa todos los campos antes de guardar.");
        return;
      } else {

        props.datos.forEach((estudiante) => {
        datosAGuardar.value.push({
          numeroCuenta: estudiante.numeroCuenta,
          nota: estudiante.nota,
          estado: estudiante.estado,
        });
      });

        const datosPorEnviar = {
          idSeccion: idSeccion.value,
          arrayEstudiantesNota: datosAGuardar.value,
          nombreClase: clase.value,
        };

        console.log(datosPorEnviar);
        const subirNota = async () => {
          try {
            const res = await fetch(
              "http://localhost:3000/matricula/subirNota",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(datosPorEnviar),
              }
            );
            const data = await res.json();
            console.log(data);
            if (data.mensaje == "Notas subidas correctamente") {
              window.alert("Se han subido correctamente las notas");
            }
          } catch (error) {
            console.log(error);
            console.log(datosPorEnviar);
          }
        };

        subirNota();
      }
      }
     
     
    };

    const notasCargadas = ref([]);
    const verNotas = () => {
      console.log("Hola");
      const primerEstudiante = props.datos[0];
      idSeccion.value = primerEstudiante ? primerEstudiante.id : null;
      console.log(idSeccion.value);
      console.log(props.docente);
      const datosSec = {
        idSeccion: idSeccion.value,
        numeroEmpleadoDocente: props.docente,
      };
      const obtenerNotasSec = async () => {
        try {
          const res = await fetch(
            "http://localhost:3000/matricula//obtenerNotasSeccion",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(datosSec),
            }
          );
          const data = await res.json();
          console.log(data);

          notasCargadas.value = data.matriculas; // Ajusta esto según la estructura real de tu respuesta
          console.log(notasCargadas);

          // Asigna las notas a los datos (props)
          props.datos.forEach((estudiante) => {
            const notaEncontrada = notasCargadas.value.find(
              (nota) => nota.numeroCuenta === estudiante.numeroCuenta
            );
            if (notaEncontrada) {
              console.log("aqui se encontro algo" + notaEncontrada);
              estudiante.nota = notaEncontrada.calificacion;
              estudiante.estado = notaEncontrada.estado;
            }
          });
        } catch (error) {
          console.log(error);
        }
      };
      obtenerNotasSec();
    };

    return {
      guardarDatos,
      verNotas,
    };
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Rubik:wght@300;500&display=swap");
.tabla {
  width: 150%;
  /*margin-right: 500px;*/
  padding-right: 100px;
  margin-left: -100px;
}

.text-left {
  background-color: #a92727 !important;
  color: white !important;
  font-family: "Rubik";
}

.campo {
  margin-top: 8px;
  width: 100px;
}

.save {
  background-color: #a92727;
  font-family: "Rubik", sans-serif;
  color: white;
  margin-right: 20px;
}

.see {
  background-color: #eea200;
  font-family: "Rubik", sans-serif;
  color: black;
}
</style>
