<template>
  <v-col cols="6">
    <v-form>
      <v-card
        class="mx-auto text mb-3 pb-2"
        max-width="310"
        height="400"
        color="#77181E"
        rounded="xl"
      >
        <!-- :src="card.src"  esto para hacerlo dinamico pero mi base de datos no tiene la col para las img de las clases -->
        <v-img
          src="../assets/principal2.png"
          width="310"
          height="130"
          cover
        ></v-img>

        <v-row>
          <v-col>
            <v-card-title
              class="multiline-text align-center d-flex flex-column"
            >
              {{ clase.nombreClase }}
            </v-card-title>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="info"> HI: {{ clase.horaInicial }}</v-col>
          <v-col class="info"> {{ clase.dias }}</v-col>
        </v-row>
        <v-row>
          <v-col class="info"> HF:{{ clase.horaFinal }}</v-col>
          <v-col class="info"> Sección: {{ clase.nombreSeccion }}</v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-card-actions class="d-flex flex-column">
              <v-btn
                type="submit"
                color="white"
                variant="flat"
                rounded="xl"
                class="buttom"
                @click="mostrarForm(clase.nombreClase, clase.idSeccion)"
                :disabled="docenteEvaluado"
              >
                Evaluar Docente
              </v-btn>
            </v-card-actions>
          </v-col>
        </v-row>
      </v-card>
    </v-form>
  </v-col>
</template>
<script>
import { ref, onMounted } from "vue";
export default {
  name: "clase",
  props: ["clase"],
  setup(props, { emit }) {
    let idSeccion = ref();
    let docenteEvaluado = ref(false);
    const infoDocente = ref([]);
    let nombreDocente = ref("");
    const estudiante = ref();

    const estudianteEs = async () => {
      estudiante.value = JSON.parse(localStorage.getItem("Estudiante"));
    };

    const mostrarForm = async (nombreClase, id) => {
      //esta es la funcion de getdocente pero con un emit del nombre asignatura y nombredocente para la evaluacion
      try {
        const res = await fetch(
          "http://localhost:3000/estudiante/getInfoSeccion",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              Seccion: id,
            }),
          }
        );
        const data = await res.json();
        infoDocente.value = data.infoDocenteSeccion;
        nombreDocente = infoDocente.value.nombre;
        // console.log(infoDocente);
        // console.log(nombreDocente);
        // console.log(nombreClase);
        estadoEvaluado(id);
        emit("mostrar-form", { nombreClase, nombreDocente, id }); //mandar catedratico
      } catch (error) {
        console.error("Error al cargar el docente", error);
      }
    };

    const estadoEvaluado = async (id) => {
      try {
        const res = await fetch(
          "http://localhost:3000/estudiante/getInfoEvaluacion",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              iDSeccion: id,
              numeroCuenta: estudiante.value.numeroCuenta,
            }),
          }
        );
        const data = await res.json();
        console.log(data);
        console.log(data.infoDocenteSeccion.estado);
         if (data.infoDocenteSeccion.estado===true) {
           window.alert("El docente ya ha sido evaluado");
           window.location.reload();
           // docenteEvaluado.value= true;
         } else {
            docenteEvaluado.value= false;
         }
      } catch (error) {
        console.error("Error al cargar el estado de la evaluación", error);
      }
    };
    //la funcion de weslin se ejecutaria al cargar las cards,
    //con la info recibida de esa api mostrar o no mostrar los botones

    onMounted(() => {
      estudianteEs();
    });

    return {
      docenteEvaluado,
      mostrarForm,
    };
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Rubik:wght@300;500&display=swap");

.info {
  border: solid 2px;
  border-color: azure;
  display: flex;
  justify-content: center;
}
.text {
  font-family: "Rubik";
}
.multiline-text {
  white-space: normal;
  text-align: center;
}

.subrayadoNo {
  text-decoration: none;
  color: black;
}
.buttom {
  padding: 10px 20px;
}
.text {
  font-family: "Rubik";
}
</style>
