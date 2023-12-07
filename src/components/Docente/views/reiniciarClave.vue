<template>
  <body>
    <header id="encabezado"></header>
    <main>
      <div>
        <v-row>
          <v-col cols="8">
            <div class="contenido"></div>
            <div class="componentesDocentes">
              <CardReinicio :numeroEmpleadoDocente="numeroEmpleadoDocente" />
            </div>
          </v-col>
        </v-row>
      </div>
    </main>
  </body>
</template>

<script>
import CardReinicio from "../components/cardReinicio.vue";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

export default {
  components: { CardReinicio },

  setup() {
    const docente = ref();
    const numeroEmpleadoDocente = ref();
    const route = useRoute();
    const docenteEs = async () => {
      console.log("El docente es");
      docente.value = JSON.parse(localStorage.getItem("DocentePrueba"));
      console.log(docente);
    };
    onMounted(() => {
      docenteEs();
    });

    numeroEmpleadoDocente.value = route.params.numeroEmpleadoDocente;

    return {
      docente,
      numeroEmpleadoDocente,
    };
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Rubik:wght@300;500&display=swap");
.componentesDocentes {
  margin-top: 45px;
  left: 330px !important;
  width: calc((100% - 230px) - 0px);
  margin-left: 340px;
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

#encabezado {
  background-image: url("../assets/fondito.png");
  background-size: cover; /* Escala la imagen para cubrir todo el footer */
  background-position: center; /* Centra la imagen */
  background-repeat: no-repeat; /* Evita la repetición de la imagen */
  padding: 35px; /* Espacio alrededor del contenido en el footer */
}
</style>
