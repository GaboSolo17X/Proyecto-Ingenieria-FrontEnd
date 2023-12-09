<template>
  <div >
    <v-row>
      <v-col cols="3">
        <Lateral/>
      </v-col>
      <v-col cols="8">
        <div class="contenido">
          <Encabezado title="Planificación Académica" v-if="trabajador" :datos="trabajador" />
        </div>
        <h1 class="componentesDocentes">
          <Calificaciones/>
        </h1>
      </v-col>
    </v-row>
  </div>
  
</template>

<script>
import Lateral from '../components/lateral.vue'
import Calificaciones from '../components/cardCalificaciones.vue'
import Encabezado from  '../components/encabezado.vue'
import { ref,onMounted } from 'vue';
export default {
components: {Lateral,Encabezado,Calificaciones},
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
.componentesDocentes{
margin-top: 100px;
left: 230px !important;
width: calc((100% - 230px) - 0px);
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