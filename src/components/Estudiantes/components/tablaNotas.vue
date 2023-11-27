<template>
  <div class="tabla">
    <v-table fixed-header class="">
      <thead>
        <tr>
          <th class="textoTabla">CODIGO</th>
          <th class="textoTabla">ASIGNATURA</th>
          <th class="textoTabla">PROFESOR</th>
          <th class="textoTabla">CALIFICACION</th>
          <th class="textoTabla">OBS</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in notas" :key="item.codigo">
          <!-- CAMBIAR ACA LOS NOMBRES DE LAS PROPIEDADES SEGUN LA DATA QUE SE IMPRIME AL CARGAR LA TABLA -->
          <td class="textoCuerpo">{{ item.codigo }}</td>
          <td class="textoCuerpo">{{ item.asignatura }}</td>
          <td class="textoCuerpo">{{ item.profesor }}</td>
          <td class="textoCuerpo">{{ item.calificacion || 'Por Evaluar'}}</td>
          <td class="textoCuerpo">{{ item.estado }}</td>
        </tr>
      </tbody>
    </v-table>
    <v-row>
      <v-col></v-col><v-col></v-col>

      <v-col></v-col><v-col></v-col>
      <v-col class="mt-8">
        <v-btn block rounded color="#282832" size="large" variant="elevated">
          <router-link to="/calificacionesEstudiantes" class="subrayadoNo">
            Volver</router-link
          >
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
export default {
  setup() {
    let notas = ref([]);
    let mensaje = ref('');
    // notas = [
    //   {
    //     codigo: "IS200",
    //     asignatura: "Introducción a la Ingeniería en sistemas",
    //     hI: "1900",
    //     hF: "2000",
    //     dias: "Lu,Ma,Mi",
    //     profesor: "Miguel Eduardo Aguilar ",
    //     calificacion: "100",
    //     obs: "APR",
    //   }
    // ];

    const estudiante = ref();
    const estudianteEs = async () => {
      estudiante.value = JSON.parse(localStorage.getItem("Estudiante"));
    };

    const readNotas = async () => {
      try {
        const res = await fetch(
          "http://localhost:3000/estudiante/notasDespuesEvaluacion",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              numeroCuenta: estudiante.value.numeroCuenta,
            }),
          }
        );
        const data = await res.json();
        console.log(data);
        switch (data.message) {
          case "Aun no hay evaluaciones":
            mensaje.value ="Por favor complete todas las evaluaciones de docente para visualizar sus calificaciones";
            info(mensaje.value);
            break;
          case "Aun no a realizado todas sus evaluaciones":
            mensaje.value ="Por favor complete todas las evaluaciones de docente para visualizar sus calificaciones";
            info(mensaje.value);
            break;
          case "Notas Disponibles":
             notas.value=data.notasClases;
             console.log(notas);
            break;
          default:
            mensaje.value = "Caso de notas no contemplado";
            info(mensaje.value);
            break;
        }
      } catch (error) {
        console.error("Error al leer las calificaciones", error);
      }
    };

    const info = (mensaje) => {
      window.alert(mensaje);
    };

    onMounted(() => {
      estudianteEs();
      readNotas();
    });

    return {
      estudiante,
      notas,
    };
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Rubik:wght@300;500&display=swap");
.subrayadoNo {
  text-decoration: none;
  color: aliceblue;
}
.tabla {
  width: 156%;
  padding-right: 95px;
  margin-left: -110px;
  margin-top: 50px;
}

.textoTabla {
  background-color: #a92727 !important;
  color: white !important;
  font-family: "Rubik";
  text-align: center !important;
}

.textoCuerpo {
  font-family: "Rubik";
  text-align: center;
}
</style>
