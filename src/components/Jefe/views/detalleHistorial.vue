<template>
  <div>
    <body style="background-color: #c6d6d6">
      <v-row>
        <v-col cols="3">
          <Lateral />
        </v-col>
        <v-col cols="8">
          <div class="contenido">
            <Encabezado
              v-if="JefeInfo"
              :datos="JefeInfo"
              title="Historial del estudiante"
            />
          </div>
          <div>
            <div class="info-cards">
              <div class="info-card">
                <div class="note">{{ $route.params.nombre }}</div>
                <div class="note">{{ $route.params.id }}</div>
              </div>
              <div class="indice">
                <h4>indice global: {{ $route.params.indice }}</h4>
              </div>
              <div class="botoncito">
                <BotonRegresar />
              </div>
            </div>
          </div>
          <div class="componentesDocentes">
            <TablaEstudiante />
          </div>
        </v-col>
      </v-row>
    </body>
  </div>
</template>

<script>
import Lateral from "../components/lateral.vue";
import Encabezado from "../components/encabezado.vue";
import TablaEstudiante from "../components/tablaEstudiante.vue";
import BotonRegresar from "../components/botonRegresar.vue";
import { ref, onMounted } from "vue";

export default {
  components: { Lateral, Encabezado, TablaEstudiante, BotonRegresar },
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
    return {
      JefeInfo,
    };
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Rubik:wght@300;500&display=swap");

.asignatura {
  width: 270px;
  margin-top: 100px;
  position: relative;
  right: 100px !important;
}

.componentesDocentes {
  margin-top: 40px;
  left: 230px !important;
  width: 100%;
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

.info-cards {
  display: flex;
  justify-content: space-between;
}

.info-card {
  display: flex;
  justify-content: space-between;
  width: 48%;
  padding: 10px;
  box-sizing: border-box;
  background-color: #282832;
  border-radius: 40px;
  margin-bottom: 5px;
  margin-top: 90px;
  color: white;
  height: 30%;
  font-weight: bold;
}
.note {
  padding: 3px;
  height: 30%;
}
.indice {
  display: flex;
  justify-content: center;
  width: 25%;
  padding: 10px;
  box-sizing: border-box;
  background-color: #282832;
  border-radius: 40px;
  margin-bottom: 5px;
  margin-top: 90px;
  color: white;
  height: 30%;
  font-weight: bold;
}

.botoncito {
  margin-top: 74px;
}
</style>
