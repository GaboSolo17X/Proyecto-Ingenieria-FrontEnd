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
              title="Consultar horario"
              v-if="estudiante"
              :datos="estudiante"
            />
          </div>
          <div class="componentesDocentes">
            <TabClases />
          </div>
          <div class="cuadrados">
            <v-row>
              <Canceladas />
            </v-row>
          </div>
          <v-row>
            <v-col cols=""></v-col>
            <v-col cols="">
              <router-link to="/matriculaEstudiantes" class="subrayadoNo">
                <v-btn
                  color="white"
                  variant="flat"
                  rounded="xl"
                  class="textBoton py-6 px-10 mt-5"
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
import TabClases from "../components/tabClases.vue";
import Canceladas from "../components/cardCancelada.vue";
import { ref, onMounted } from "vue";

export default {
  components: { Lateral, Encabezado, Canceladas, TabClases },
  setup() {
    const estudiante = ref();
    const estudianteEs = async () => {
      console.log("El estudiante es");
      estudiante.value = JSON.parse(localStorage.getItem("Estudiante"));
      console.log(estudiante);
    };
    onMounted(() => {
      estudianteEs();
    });
    return {
      estudiante,
    };
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Rubik:wght@300;500&display=swap");
.subrayadoNo {
  text-decoration: none;
  color: black;
}

.textBoton {
  font-family: "Rubik";
  display: flex;
  justify-content: center;
  align-content: center;
  text-align: center;
}
.boton {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 30px;
  padding-top: 30px;
}

.card {
  width: 20%;
}

.text {
  font-family: "Rubik";
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
