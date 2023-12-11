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
        <v-row>
          <v-col class="recordatorio">
            <strong>RECORDATORIO: </strong>
            <p>El proceso de planificación académica debe tener una duración estricta de 2 semanas,
             por favor tenga en consideración que si ya hay fechas establecidas para este proceso  asignar nuevas fechas borrará
             las fechas ya establecidas en los procesos de matrícula, cancelaciones excepcionales y registro de calificaciones, en consecuencia
             tendrán que ser asignados nuevamente.</p>
          </v-col>
        </v-row>
        <h1 class="componentesDocentes">
          
          <Planificacion/>
        </h1>
      </v-col>
    </v-row>
  </div>
  
</template>

<script>
import Lateral from '../components/lateral.vue'
import Planificacion from '../components/cardPlanificacion.vue'
import Encabezado from  '../components/encabezado.vue'
import { ref,onMounted } from 'vue';
export default {
components: {Lateral,Encabezado,Planificacion},
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
@import url("https://fonts.googleapis.com/css2?family=Rubik:wght@300;500&display=swap");

.recordatorio{
  background-color: #282832;
  text-align: center;
  margin-top: 110px;
  color: aliceblue;
  font-family: "Rubik";
  padding-bottom: 20px;
  margin-bottom: -5%;
}

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