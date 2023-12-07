<template>
  <div>
    <body style="background-color: #c6d6d6">
      <v-row>
        <v-col cols="3">
          <Lateral />
        </v-col>
        <v-col cols="8">
          <div class="contenido">
            <Encabezado v-if="JefeInfo" :datos="JefeInfo" title="DOCENTES" />
          </div>
          <div class="componentesDocentes">
            <v-row>
              <CardDocentes
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
import CardDocentes from "../components/cardDocentes.vue";
import Lateral from "../components/lateral.vue";
import Encabezado from "../components/encabezado.vue";
import { ref, onMounted } from "vue";

export default {
  components: { CardDocentes, Lateral, Encabezado },
  setup() {
    const cards = [
      {
        src: require("../assets/lista.png"),
        titulo: "Visualización de evaluación docentes",
        ruta: "/generalEvaluaciones",
        altura: "300",
      },
      {
        src: require("../assets/calificaciones.png"),
        titulo: "Calificaciones ingresadas por docente",
        ruta: "/calificaciones",
        altura: "300",
      },
      {
        src: require("../assets/reinicio.png"),
        titulo: "Reinicios de clave docente",
        ruta: "/reinicioClave",
        altura: "300",
      },
    ];
    const JefeInfo = ref();
    const jefeEs = async () => {
      console.log("El jefe es");
      JefeInfo.value = JSON.parse(localStorage.getItem("JefeInfo"));
      console.log(JefeInfo);
    };
    onMounted(() => {
      jefeEs();
    });
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
