<template>
  <div>
    <body style="background-color: #282832">
      <v-row>
        <v-col cols="4">
          <Lateral />
        </v-col>
        <v-col cols="8">
          <div class="contenido">
            <Encabezado
              title="Solicitudes"
              v-if="estudiante"
              :datos="estudiante"
            />
          </div>
          <div class="componentesDocentes">
            <v-row>
              <CardPrincipal
                v-for="card in cards"
                :key="card.titulo"
                :card="card"
              />
            </v-row>
            <v-row>
              <v-col cols=""></v-col>
              <v-col cols="">
                <router-link
                  to="/principalEstudiantes"
                  class=" rubik SubrayadoNo"
                >
                  <v-btn
                    color="white"
                    variant="flat"
                    rounded="xl"
                    class="py-6 px-10 mt-5 text"
                  >
                    VOLVER</v-btn
                  ></router-link
                >
              </v-col>
              <v-col cols=""></v-col>
            </v-row>
          </div>
        </v-col>
      </v-row>
    </body>
  </div>
</template>

<script>
import CardPrincipal from "../components/cardPrincipal.vue";
import Lateral from "../components/lateral.vue";
import Encabezado from "../components/encabezado.vue";
import { ref, onMounted } from "vue";
export default {
  components: { CardPrincipal, Lateral, Encabezado },
  data() {
    return {
      cards: [
        {
          src: require("../assets/solic1.png"),
          titulo: "CAMBIO DE CARREA",
          descripcion: "",
          ruta: "/solicitudCarreraEstudiantes",
          altura: "310",
        },
        {
          src: require("../assets/solic2.png"),
          titulo: "CAMBIO DE CENTRO",
          descripcion: "",
          ruta: "/solicitudCentroEstudiantes",
          altura: "310",
        },
        {
          src: require("../assets/solic3.png"),
          titulo: "CANCELACIONES",
          descripcion: "",
          ruta: "/solicitudCancelacionEstudiantes",
          altura: "310",
        },
        {
          src: require("../assets/solic4.png"),
          titulo: "REPOSICIÓN",
          descripcion: "",
          ruta: "/solicitudReposicionEstudiantes",
          altura: "310",
        },
      ],
    };
  },
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

.componentesDocentes {
  margin-top: 100px;
  left: 230px !important;
  width: calc((100% - 230px) - 0px);
}

.SubrayadoNo{
  text-decoration: none;
}
.text {
  font-family: "Rubik";
  display: flex;
  justify-content: center;
  align-content: center;
  text-align: center;
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
