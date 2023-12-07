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
              title="EVALUACIONES"
            />
          </div>
          <div class="componentesDocentes">
            <ListaEvaluacion
              :numero="$route.params.numeroEmpleado"
              :idseccion="$route.params.idseccion"
              :idasignatura="$route.params.idasignatura"
            />
          </div>
        </v-col>
      </v-row>
    </body>
  </div>
</template>

<script>
import Lateral from "../components/lateral.vue";
import Encabezado from "../components/encabezado.vue";
import ListaEvaluacion from "../components/listaEvaluacion.vue";
import { ref, onMounted } from "vue";

export default {
  components: { Lateral, Encabezado, ListaEvaluacion },
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

.componentesDocentes {
  margin-top: 80px;
  left: 400px !important;
  width: 300px;
  margin-left: 15rem;
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
