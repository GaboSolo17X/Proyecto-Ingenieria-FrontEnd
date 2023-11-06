<template>
  <div >
    <v-row>
      <v-col cols="4">
        <Lateral/>
      </v-col>
      <v-col cols="8">
        <div class="contenido">
          <Encabezado title="Activación de proceso de Matrícula" />
        </div>
        <div class="componentesDocentes">
          <CardMatricula 
          pregunta="¿Desea habilitar el proceso de matrícula? esto permitirá a los estudiante la adición de asignaturas para el periodo actual" 
          />
        </div>
        
      </v-col>
    </v-row>
  </div>

</template>

<script>
import Lateral from '../components/lateral.vue'
import Encabezado from  '../components/encabezado.vue'
import CardMatricula from '../components/cardMatricula.vue'

export default {
components: {Lateral,Encabezado,CardMatricula},
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