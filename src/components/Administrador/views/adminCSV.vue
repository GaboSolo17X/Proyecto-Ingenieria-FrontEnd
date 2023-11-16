<template>
  <div >
    <v-row>
      <v-col cols="4">
        <Lateral/>
      </v-col>
      <v-col cols="8">
        <div class="contenido">
          <Encabezado title="Archivo CSV de Admisión" v-if="trabajador" :datos="trabajador"/>
        </div>
        <div class="componentesDocentes">
          <CardSubido subida="Seleccione su archivo .csv para 
                              hacer el cargado de los resultados 
                                de las pruebas de admisión."/>

        </div>
        
      </v-col>
    </v-row>
  </div>

</template>

<script>
import Lateral from '../components/lateral.vue'
import Encabezado from  '../components/encabezado.vue'
import CardSubido from '../components/cardSubido.vue'
import { ref,onMounted } from 'vue';


export default {
components: {Lateral,Encabezado,CardSubido},
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
margin-top: 110px;
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