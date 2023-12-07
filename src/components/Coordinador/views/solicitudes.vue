<template>
  <div>
    <v-row>
      <v-col cols="3">
        <Lateral />
      </v-col>
      <v-col cols="8">
        <div class="contenido">
          <Encabezado
            title="Solicitudes"
            v-if="CoordinadorInfo"
            :datos="CoordinadorInfo"
          />
        </div>
        <div class="componentesDocentes">
          <TablaSolicitudes />
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Lateral from "../components/lateral.vue";
import Encabezado from "../components/encabezado.vue";
import TablaSolicitudes from "../components/tablaSolicitudes.vue";
import { ref, onMounted } from "vue";

export default {
  components: { Lateral, Encabezado, TablaSolicitudes },
  setup() {
    const CoordinadorInfo = ref();
    const coordinadorEs = async () => {
      CoordinadorInfo.value = JSON.parse(
        localStorage.getItem("CoordinadorInfo")
      );
    };
    onMounted(() => {
      coordinadorEs();
    });
    return {
      CoordinadorInfo,
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
  margin-top: 80px;
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
</style>
