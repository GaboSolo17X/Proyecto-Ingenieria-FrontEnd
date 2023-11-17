<template>
    <div >
      <body style="background-color: #282832">
        <v-row>
        <v-col cols="3">
          <Lateral/>
        </v-col>
        <v-col >
          <div class="contenido">
            <Encabezado  title="Mi perfil" v-if="estudiante" :datos="estudiante"/>
          </div>
          <div class="componentesDocentes">
            <Perfil/>
          </div>
        </v-col>
      </v-row>
      </body>
    </div>
  
  </template>
  
  <script>
  import Lateral from '../components/lateral.vue'
  import Encabezado from '../components/encabezado.vue'
  import Perfil from '../components/perfil.vue'
  import { ref,onMounted } from 'vue'

  export default {
  components:{Lateral,Encabezado, Perfil},
  setup(){
    

    const estudiante=ref()
    const estudianteEs  = async () => {
      console.log("El estudiante es")
      estudiante.value = JSON.parse(localStorage.getItem('Estudiante'))
      console.log(estudiante)
    };
    onMounted(() => {
      estudianteEs ();
    });
    return{
      estudiante
    }

    
  } 

  }
  </script>
  
  <style scoped>
  
  @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@300;500&display=swap');
  
  .componentesDocentes{
  margin-top: 100px;
  left: 230px !important;
  width: calc((100% - 230px) - 0px);
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
  
  