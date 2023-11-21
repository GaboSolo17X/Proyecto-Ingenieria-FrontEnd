<template>
  <div>
    <body style="background-color: #282832">
      <v-row>
        <v-col cols="3">
          <Lateral />
        </v-col>
        <v-col>
          <div class="contenido">
            <Encabezado
              title="Matricula de clases"
              v-if="estudiante"
              :datos="estudiante"
            />
          </div>
          <div class="componentesDocentes">
            <v-row>
              <v-col>
                <v-row>
                  <!-- v-model="departamento" -->
                  <v-col cols="" class="formulario">
                    <v-select
                      :items="departamentos"
                      :rules="[
                        (v) => !!v || 'Seleccione un departamento',
                        (v) => true,
                      ]"
                      label="Buscar departamento"
                      required
                      variant="solo-filled"
                      append-inner-icon="fa-solid fa-chevron-down"
                    ></v-select>
                  </v-col>
                </v-row>
                <v-row class="mt-0">
                  <!-- v-model="asignatura" -->
                  <v-col cols="" class="formulario">
                    <v-select
                      :items="asignaturas"
                      :rules="[
                        (v) => !!v || 'Seleccione una asignatura',
                        (v) => true,
                      ]"
                      label="Buscar Asignatura"
                      required
                      variant="solo-filled"
                      append-inner-icon="fa-solid fa-chevron-down"
                    ></v-select>
                  </v-col>
                </v-row>
              </v-col>
              <v-col>
                <CardDetalles class="small-card" />
              </v-col>
            </v-row>
          </div>
          <div class="cuadrados">
            <v-row>
              <Matricula
                v-for="clase in clases"
                :key="clase.nombre"
                :clase="clase"
                :card="card"
              />
            </v-row>
            <v-row>
              <v-col cols=""></v-col>
              <v-col cols="">
                <div class="">
                  <BotonHorario />
                </div>
              </v-col>
              <v-col cols=""></v-col>
            </v-row>
          </div>
          <v-row>
            <v-col cols=""></v-col>
            <v-col cols="">
              <router-link to="/principalEstudiantes" class="subrayadoNo">
                <v-btn
                  color="white"
                  variant="flat"
                  rounded="xl"
                  class="text py-6 px-10 mt-5"
                >
                  VOLVER</v-btn
                ></router-link
              >
            </v-col>
            <v-col cols=""></v-col>
          </v-row>
        </v-col>
      </v-row>
    </body>
  </div>
</template>

<script>
import Lateral from "../components/lateral.vue";
import Encabezado from "../components/encabezado.vue";
import Matricula from "../components/cardMatricula.vue";
import ToolbarBuscar from "../components/toolbarBuscar.vue";
import CardDetalles from "../components/cardDetalles.vue";
import BotonHorario from "../components/botonHorario.vue";
import { ref, onMounted } from "vue";

export default {
  components: {
    Lateral,
    Encabezado,
    Matricula,
    ToolbarBuscar,
    CardDetalles,
    BotonHorario,
  },
  setup() {
    const clases = ref([]);
    // {
    //   nombre: "Fabiola Mendoza",
    //   seccion: "0700",
    //   dias: "Lu, Ma, Mi",
    //   cupos: 25,
    // },
    const departamentos = ["Lenguas", "Matematica aplicada", "Fisica"];
    const departamentoFiltro = ref([]);
    const asignaturas = [
      "Introduccion a la ingenieria en sistemas",
      "Sociologia",
      "Diseño de compiladores",
    ];
    const asignaturaFiltro = ref([]);
    const estudiante = ref();
    const estudianteEs = async () => {
      console.log("El estudiante es");
      estudiante.value = JSON.parse(localStorage.getItem("Estudiante"));
      console.log(estudiante);
    };
    onMounted(() => {
      estudianteEs();
      pruebaClasesMatricula();
    });

    const pruebaClasesMatricula = async () => {
      try {
        const formData = new FormData();
        formData.append("cuenta", estudiante.value.numeroCuenta);
        const res = await fetch(
          "http://localhost:3030/estudiante/clasesMatricula",
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await res.json();
        clases.value = data.clases;
        console.log(data);
        console.log(clases);
      } catch (error) {
        console.log(error);
      }
    };

    return {
      clases,
      estudiante,
      departamentos,
      asignaturas,
    };
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Rubik:wght@300;500&display=swap");
.formulario :deep(.v-messages) {
  color: yellow !important;
}
.boton {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 30px;
  padding-top: 30px;
  text-decoration: none;
  /* margin-left: 50px !important; */
}
.subrayadoNo {
  text-decoration: none;
  color: black;
}

.card {
  width: 20%;
}

.text {
  font-family: "Rubik";
  display: flex;
  justify-content: center;
  align-content: center;
  text-align: center;
}
.small-card {
  flex: 1;
}

.large-card {
  flex: 2;
}
.cuadrados {
  display: flex;
  width: 900px;
  min-height: 500px;
  overflow: hidden;
  align-items: center;
  justify-content: space-evenly;
  flex-wrap: wrap;
}
.componentesDocentes {
  margin-top: 78px;
  left: 230px !important;
  width: 100;
  height: 100;
  display: flex;
  gap: 15px;
  padding-left: 0;
}

.contenido {
  top: 0px;
  z-index: 1004;
  transform: translateY(0%);
  position: fixed;
  left: 230px;
  width: calc((100% - 230px) - 0px);
  flex: 1;
  padding: 20px;
}

.rubik {
  font-family: "Rubik";
}

.navBarCont {
  display: flex;
  flex-direction: column;
}

.contenido {
  /* top: 0px; */
  z-index: 1004;
  transform: translateY(0%);
  position: fixed;
  left: 230px;
  width: calc((100% - 230px) - 0px);
}
</style>
