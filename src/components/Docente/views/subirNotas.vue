<template>
    <div >
      <v-row>
        <v-col cols="4">
          <Lateral/>
        </v-col>
        <v-col cols="8">
          <div class="contenido">
            <Encabezado  title="Subida de Notas" v-if="docente" :datos="docente"/>
          </div>
        <div class="asignatura">
          <SelectAsignatura />
        </div>
        <div class="componentesDocentes">
        <TablaNotas/>
        </div>
      </v-col>
    </v-row>
  </div>

</template>

<script>
import Lateral from '../components/lateral.vue'
import Encabezado from  '../components/encabezado.vue'
import TablaNotas from '../components/tablaNotas.vue'
import SelectAsignatura from '../components/selectAsignatura.vue'
import { ref,onMounted } from 'vue';

export default {
components: {Lateral,Encabezado, TablaNotas, SelectAsignatura},
setup(){

  const docente=ref()
    const docenteEs = async () => {
      console.log("El docente es")
      docente.value = JSON.parse(localStorage.getItem('DocentePrueba'))
      console.log(docente)
    };
    
    onMounted(() => {
      docenteEs();
    });

  return{
    docente,
  }
}
}


</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@300;500&display=swap');

.asignatura{
    width: 270px;
    margin-top: 100px;
    position: relative;
    right: 100px !important;
}

.componentesDocentes{
margin-top: 10px;
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