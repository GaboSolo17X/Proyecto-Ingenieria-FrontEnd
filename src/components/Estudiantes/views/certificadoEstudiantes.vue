<template>
    <div >
      <body style="background-color: #282832">
        <v-row>
        <v-col cols="4">
          <Lateral/>
        </v-col>
        <v-col cols="8">
          <div class="contenido">
            <Encabezado  title="Certificado de estudios" v-if="estudiante" :datos="estudiante"/>
          </div>
          <div class="componentesDocentes">
                <CardCertificado/>
          </div>
        </v-col>
      </v-row>
      </body>
    </div>
  
  </template>
  
  <script>

  import Lateral from '../components/lateral.vue'
  import Encabezado from '../components/encabezado.vue'
  import CardCertificado from '../components/cardCertificado.vue'
  import { ref,onMounted } from 'vue'

  export default {
  components:{CardCertificado,Lateral,Encabezado},

  
  data(){
  return{
    cards:[
      {
        src:require('../assets/principal1.png'),
        titulo:'MATRICULA DEL PERIODO',
        descripcion:'Se ha habilitado el proceso de matricula,  ingresa para realizar el proceso de adición de asignaturas.',
        ruta: '/matriculaEstudiantes',
        altura: '370'
  
      },
      {
        src:require('../assets/principal2.png'),
        titulo:'CALIFICACIONES',
        descripcion:'Se ha habilitado el proceso de visualización de notas, ingresa para ver tus calificaciones.',
        ruta: '/matriculaEstudiantes',
        altura: '370'
      },
      {
        src:require('../assets/principal3.png'),
        titulo:'SOLICITUDES',
        descripcion:'Realiza aquí tus solicitudes para cambio de carrera, cambio de centro, reposición y cancelaciones excepcionales',
        ruta: '/solicitudesEstudiantes',
        altura: '370'
      }
    ]
  }
  },
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
  
  