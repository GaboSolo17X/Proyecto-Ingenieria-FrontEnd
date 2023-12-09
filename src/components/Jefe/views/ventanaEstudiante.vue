<template>
  <div>
    <body style="background-color: #c6d6d6">
      <v-row>
        <v-col cols="3">
          <Lateral />
        </v-col>
        <v-col cols="8">
          <div class="contenido">
            <Encabezado v-if="JefeInfo" :datos="JefeInfo" title="ESTUDIANTES" />
          </div>
          <div class="componentesDocentes">
            <v-row>
              <CardEstudiante
                v-for="card in cards"
                :key="card.titulo"
                :card="card"
              />
            </v-row>
          </div>
        </v-col>
      </v-row>
    </body>
  </div>
</template>

<script>
import CardEstudiante from "../components/cardEstudiante.vue";
import Lateral from "../components/lateral.vue";
import Encabezado from "../components/encabezado.vue";
import { ref, onMounted } from "vue";

export default {
  components: { CardEstudiante, Lateral, Encabezado },
  setup() {
    const JefeInfo = ref();
    const jefeEs = async () => {
      console.log("El jefe es");
      JefeInfo.value = JSON.parse(localStorage.getItem("JefeInfo"));
      console.log(JefeInfo);
    };
    onMounted(() => {
      jefeEs();
    });
    const cards = [
      {
        src: require("../assets/historial.png"),
        titulo: "Historial",
        ruta: "/historialJefe",
        altura: "300",
      },
      {
        src: require("../assets/matriculados.png"),
        titulo: "Matriculados",
        ruta: "/matriculados",
        altura: "300",
      },
    ];
    return {
      JefeInfo,
      cards,
    };
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Rubik:wght@300;500&display=swap");

.componentesDocentes {
  margin-top: 130px;
  left: 230px !important;
  width: 900px;
  height: 440px;
}

.rubik {
  font-family: "Rubik";
}

.navBarCont {
  display: flex;
  flex-direction: column;
}

.contenido {
  top: 0px;
  z-index: 1004;
  transform: translateY(0%);
  position: fixed;
  left: 230px;
  width: calc((100% - 230px) - 0px);
}
</style>
