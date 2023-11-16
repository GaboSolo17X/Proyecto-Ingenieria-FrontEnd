<template>
  <div class="app">
    <v-row>
      <v-col cols="3">
        <Lateral/>
      </v-col>
      <v-col cols="8">
        <div class="contenido">
          <Encabezado  title="Felicidades por impartir estas clases" v-if="docente" :datos="docente"/>
        </div>
        <div class="cuadrados">
        <h1 class="componentesDocentes">Clases impartidas</h1>
        <section class="clases">
          <Clase
          v-for="clase in clases"
          :key="clase.title"
          :clase="clase"
          />
        </section>
        </div>
      </v-col>
    </v-row>
  </div>

</template>

<script>
import Lateral from '../components/lateral.vue'
import Encabezado from  '../components/encabezado.vue'
import Clase from  '../components/cardClase.vue'
import { ref,onMounted } from 'vue';

export default {
components: {Lateral,Encabezado, Clase},

  setup(){
    const docente=ref()
    const docenteEs = async () => {
      console.log("El docente es")
      docente.value = JSON.parse(localStorage.getItem('DocentePrueba'))
      console.log(docente)
    };

    const clases =[
      {
        title:'1000 - BASE DE DATOS',
        src: require('../assets/bases.png'),
        id:1
      },
      {
        title:'1100 - SISTEMAS OPERATIVOS',
        src: require('../assets/poo.png'),
        id:2
      }
    ]

    onMounted(() => {
      docenteEs();
    });

    return{
      clases,
      docente,
      

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
.app{
  display: flex;
  align-items: flex-start;
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
flex:1;
padding: 20px;
}

.cuadrado{
  display:flex;
  width:700px;
  min-height: 500px;
  overflow: hidden;
  align-items: center;
  justify-content:space-between;

}

.clases{
  display: flex;
  padding:25px;
  margin: 0 auto;
  justify-content:space-evenly;
}

h1{
  color:  #77181E;
}

</style>