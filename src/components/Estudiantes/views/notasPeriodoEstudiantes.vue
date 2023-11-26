<template>
    <div>
      <body style="background-color: white">
        <v-row>
          <v-col cols="3">
            <Lateral />
          </v-col>
          <v-col>
            <div class="contenido">
              <Encabezado title="Calificaciones del periodo" v-if="estudiante" :datos="estudiante" />
            </div>
            
            <div class="componentesDocentes">
              <NotasPeriodo/>
            </div>
          </v-col>
        </v-row>
      </body>
    </div>
  </template>
  
  <script>
  import Lateral from "../components/lateral.vue";
  import Encabezado from "../components/encabezado.vue";
  import NotasPeriodo from "../components/tablaNotas.vue";
  import { ref,onMounted } from 'vue'

  export default {
    components: { Lateral, Encabezado, NotasPeriodo },
    setup() {
      const estudiante=ref()
    const estudianteEs  = async () => {
      estudiante.value = JSON.parse(localStorage.getItem('Estudiante'))
    };
    onMounted(() => {
      estudianteEs ();
    });
    return{
      estudiante
    }
      
    }
  };
  </script>
  
  <style scoped>
  @import url("https://fonts.googleapis.com/css2?family=Rubik:wght@300;500&display=swap");
  .boton {
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
    margin-top: 50px;
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
  