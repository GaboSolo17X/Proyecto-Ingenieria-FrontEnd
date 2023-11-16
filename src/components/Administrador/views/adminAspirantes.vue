<template>
    <div >
      <v-row>
        <v-col cols="4">
          <Lateral/>
        </v-col>
        <v-col cols="8">
          <div class="contenido">
            <Encabezado  title="Aspirantes" v-if="trabajador" :datos="trabajador"/>
          </div>
          <div class="componentesDocentes">
            <TablaAspirantes />
          </div>
          
        </v-col>
      </v-row>
    </div>
  
  </template>
  
  <script>
  import Lateral from '../components/lateral.vue'
  import Encabezado from  '../components/encabezado.vue'
  import TablaAspirantes from '../components/tablaAspirantes.vue'
  import { ref,onMounted } from 'vue';
  export default {
  components: {Lateral,Encabezado,TablaAspirantes},

  setup(){
      const trabajador=ref()
      const docenteEs = async () => {
      console.log("El docente es")
      trabajador.value = JSON.parse(localStorage.getItem('Administrador'))
      console.log(trabajador)
    };

    onMounted(() => {
      docenteEs();
    });

      return{
        trabajador
      }
    }
  }
  </script>
  
  <style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@300;500&display=swap');
  .componentesDocentes{
  margin-top: 100px;
  width: calc((100% - 120px) - 0px);
  margin-left: -150px;
  }
  
  .rubik{
    font-family: 'Rubik';
  }
  
  .navBarCont{
  display: flex;
  flex-direction: column;
  }
  
  .contenido{
  top: 0px;
  z-index: 1004;
  transform: translateY(0%);
  position: fixed;
  left: 230px;
  width: calc((100% - 230px) - 0px);
  }
  </style>