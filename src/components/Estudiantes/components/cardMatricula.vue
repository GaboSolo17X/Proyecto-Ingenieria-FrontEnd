<template>
  <v-col>
    <v-card class="mx-auto my-8" width="304" max-height="" height="400">
      <template v-slot:loader="{ isActive }">
        <v-progress-linear
          :active="isActive"
          color="deep-purple"
          height="4"
          indeterminate
        ></v-progress-linear>
      </template>
      <v-row>
        <v-col cols="3"></v-col>
        <v-col class="fotoDocente">
          <v-img
            :src="'http://localhost:3000/' + clase.foto"
            class="imagen mt-5"
            width="120"
            height="120"
            cover
          ></v-img>
        </v-col>
        <v-col cols="3"></v-col>
      </v-row>

      <v-row>
        <v-col style="text-align: center">
          <h3 class="px-1 font-weight-black titulo">{{ clase.nombre }}</h3>
        </v-col>
      </v-row>
      <v-card-text class="doc">
        <div class="my-0 text-subtitle-1 gestion">
          {{ clase.docente }}
        </div>
      </v-card-text>

      <v-divider class="mx-4 mb-1"></v-divider>

      <div class="px-3 text-center">
        <v-row>
          <v-col
            ><v-chip label
              >Seccion <br />
              {{ clase.nombreSeccion }}</v-chip
            >
            <v-chip label
              >Dias <br />
              {{ clase.dias }}</v-chip
            ><v-chip label
              >Cupos <br />
              {{ clase.cupos }}
            </v-chip>
            <v-chip label
              >UV <br />
              {{ clase.uv }}
            </v-chip></v-col
          >
        </v-row>
      </div>
      <v-divider class="mx-4 mb-1"></v-divider>

      <v-card-actions class="justify-center">
        <v-col cols="auto">
          <v-dialog transition="dialog-top-transition" width="auto">
            <template v-slot:activator="{ props }">
              <v-btn
                color="grey-darken-4"
                v-bind="props"
                @click="matricularClase(clase.idAsignatura, clase.idSeccion)"
                v-show="botonMatricular"
                >Matricular</v-btn
              >
              <v-btn
                color="grey-darken-4"
                v-bind="props"
                @click="matricularEspera(clase.idSeccion)"
                v-show="NohayCupos"
                >Lista Espera</v-btn
              >
              <!-- para matricular lista espera solo ocupo el idSeccion -->
            </template>
            <!-- modal de matricula exitosa -->
            <template v-slot:default="{ isActive }">
              <v-card>
                <v-toolbar
                  color="grey-darken-4"
                  title="Registro UNAH"
                ></v-toolbar>
                <v-card-text>
                  <div class="text-h2 pa-6">{{ mensaje }}</div>
                </v-card-text>
                <v-card-actions class="justify-end">
                  <v-btn
                    color="grey-darken-4"
                    variant="text"
                    @click="
                      isActive.value = false;
                      recargado();
                    "
                    >Cerrar</v-btn
                  >
                </v-card-actions>
              </v-card>
            </template>
          </v-dialog>
        </v-col>
      </v-card-actions>
    </v-card>
  </v-col>
</template>
<script>
import { ref, onMounted } from "vue";
export default {
  name: "clase",
  props: ["clase"],
  setup(props) {
    const estudiante = ref();
    const mensaje = ref("");
    const NohayCupos = ref(false);
    const botonMatricular = ref(true);
    const estudianteEs = async () => {
      console.log("El estudiante es");
      estudiante.value = JSON.parse(localStorage.getItem("Estudiante"));
    };
    onMounted(() => {
      estudianteEs();
      calcularCupos(props.clase.cupos);
    });

    const calcularCupos = (cupos) => {
      console.log(cupos);
      if (cupos == 0) {
        NohayCupos.value = true;
        botonMatricular.value = false;
      } else {
        NohayCupos.value = false;
        botonMatricular.value = true;
      }
    };

    const matricularEspera = async (idSeccion) => {
      try {
        const res = await fetch(
          "http://localhost:3000/estudiante/addListaEspera",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              Seccion: idSeccion,
              cuenta: estudiante.value.numeroCuenta,
            }),
          }
        );
        const data = await res.json();
        // window.location.reload();
        console.log(data);
        switch (data.message) {
          case "Se ha registrado en la lista de espera":
            mensaje.value = "Clase añadida con éxito a la lista de espera";
            break;
          case "El estudiante ya tiene esta clase en lista de espera":
            mensaje.value = "Ya tiene esta clase en lista de espera";
            break;
          case "El estudiante ya tiene matriculada esta clase":
            mensaje.value = "Ya tiene esta clase matriculada";
            break;
          case "Conflicto en el horario":
            mensaje.value = "Ya tiene una clase en este horario";
            break;
          default:
            mensaje.value = "Caso de lista de espera no contemplado";
            break;
        }
      } catch (error) {
        console.error("Error al añadir a la lista de espera", error);
      }
    };

    const matricularClase = async (idAsignatura, idSeccion) => {
      // console.log("Asignatura " + idAsignatura);
      // console.log("Seccion " + idSeccion);

      try {
        const res = await fetch(
          "http://localhost:3000/estudiante/createMatricula",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              cuenta: estudiante.value.numeroCuenta,
              idClase: idAsignatura,
              idseccion: idSeccion,
            }),
          }
        );
        const data = await res.json();
        console.log(data);
        switch (data.message) {
          case "Clase matriculada":
            mensaje.value = "Clase matriculada con éxito";
            break;
          case "El estudiante ya tiene matriculada esta clase":
            mensaje.value = "Ya tiene matriculada esta clase";
            break;
          case "El estudiante ya tiene esta clase en lista de espera":
            mensaje.value = "Ya tiene esta clase en lista de espera";
            break;
          case "Conflicto en el horario":
            mensaje.value = "Ya tiene una clase en este horario";
            break;
          default:
            mensaje.value = "Caso de matricula no contemplado";
            break;
        }
      } catch (error) {
        console.error("Error al crear la matrícula", error);
      }
    };

    const recargado = () => {
      window.location.reload();
    };

    return {
      mensaje,
      matricularClase,
      matricularEspera,
      recargado,
      NohayCupos,
      botonMatricular,
    };
  },
};
</script>

<style scoped>
.v-chip {
  height: auto !important;
  text-align: center;
}

.fotoDocente {
  display: flex;
}
.v-card {
  background-color: #77181e;
  border-radius: 30px;
  color: white;
}

.v-btn {
  background-color: white;
  border-radius: 30px;
  width: 120px;
}

.v-card-item + .v-card-text {
  padding-bottom: 0;
  text-align: center;
}

.imagen {
  border-radius: 50%;
}

.doc {
  text-align: center;
}

.cla {
  text-align: center;
  /* height: 40px; */
  flex-wrap: wrap;
}
</style>
