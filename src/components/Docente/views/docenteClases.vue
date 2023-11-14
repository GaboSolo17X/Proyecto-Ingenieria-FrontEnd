<template>
  <div class="app">
    <v-row>
      <v-col cols="3">
        <Lateral/>
      </v-col>
      <v-col cols="8">
        <div class="contenido">
          <Encabezado  title="Clases de este periodo" :datos="docente" />
        </div>
        <div class="cuadrados">
        <h1 class="componentesDocentes">Clases por impartir</h1>
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
   
    let docente
    const docenteEs = () => {
      console.log("El docente es")
      docente = JSON.parse(localStorage.getItem('DocentePrueba'))
      console.log(docente)
    };

    const clases =[
    {
        title:'0900 - INGENIERIA DEL SOFTWARE',
        src: require('../assets/software.png'),
        id:1
      },
      {
        title:'0800 - SEGURIDAD INFORMATICA',
        src: require('../assets/seguridad.png'),
        id:2
      }
    ]

    onMounted(() => {
      docenteEs();
    });

    return{
      clases,
      docenteEs,
      docente
      

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