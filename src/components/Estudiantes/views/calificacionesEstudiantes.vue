<template>
  <div>
    <body style="background-color: #282832">
      <v-row>
        <v-col cols="3">
          <Lateral />
        </v-col>
        <v-col>
          <div class="contenido">
            <Encabezado title="Clases matriculadas" />
          </div>
          <v-col class="rubik infoEvaluacion align-center d-flex flex-column">
            <p>
              Evaluar el desempeño de los docentes es una parte crucial de
              nuestro compromiso de brindar educación de alta calidad. Sus
              comentarios proporcionan información valiosa que nos ayuda a
              mejorar las experiencias de enseñanza y aprendizaje:
            </p>
          </v-col>
          <div class="componentesDocentes">
            <v-row> </v-row>
            <v-row>
              <CardClase
                v-for="card in cards"
                :key="card.nombre"
                :card="card"
              />
            </v-row>

            <v-row>
              <v-col></v-col>
              <v-col >
                <v-btn disabled="true"
                color="white" variant="flat" rounded="xl" class=" pa-6 boton " >
                  <router-link to="/" class="subrayadoNo text">
                    VER CALIFICACIONES</router-link
                  >
                </v-btn>
              </v-col>
              <v-col></v-col>
            </v-row>
          </div>
        </v-col>
      </v-row>
    </body>
  </div>
</template>

<script>
import CardClase from "../components/cardClase.vue";
import Lateral from "../components/lateral.vue";
import Encabezado from "../components/encabezado.vue";

export default {
  components: { CardClase, Lateral, Encabezado },
  data() {
    return {
      cards: [
        {
          src: require("../assets/principal1.png"),
          nombre: "IS-410 Programación Orientada a Objetos",
          horaInicio: "1800",
          horaFin: "1900",
          dias: "Lu,Ma,Mi,Ju",
          seccion: "1801",
          altura: "400",
          ruta: "/",
        },
        {
          src: require("../assets/principal2.png"),
          nombre: "IS-100 Introducción a la Ingeniería en Sistemas",
          horaInicio: "1800",
          horaFin: "1900",
          dias: "Lu,Ma,Mi,Ju",
          seccion: "1801",
          altura: "400",
          ruta: "/",
        },
        {
          src: require("../assets/principal3.png"),
          nombre: "IS-200 Arquitectura de computadoras",
          horaInicio: "1800",
          horaFin: "1900",
          dias: "Lu,Ma,Mi,Ju",
          seccion: "1801",
          altura: "400",
          ruta: "/",
        },
        {
          src: require("../assets/principal3.png"),
          nombre: "IS-710 Ecuaciones Diferenciales",
          horaInicio: "1800",
          horaFin: "1900",
          dias: "Lu,Ma,Mi,Ju",
          seccion: "1801",
          altura: "400",
          ruta: "/",
        },
      ],
    };
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Rubik:wght@300;500&display=swap");
.boton{
  display: flex;
  justify-content: center;
}
.text {
  font-family: "Rubik";
}

.subrayadoNo {
  text-decoration: none;
  color: black;
}
.infoEvaluacion {
  color: white;
  margin-top: 90px;
  padding-right: 200px;
  text-align: justify;
  font-size: 20px;
}
.componentesDocentes {
  margin-top: 20px;
  left: 230px !important;
  width: calc((100% - 230px) - 0px);
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
