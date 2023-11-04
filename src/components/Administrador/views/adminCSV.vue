<template>
  <div >
    <v-row>
      <v-col cols="4">
        <Lateral/>
      </v-col>
      <v-col cols="8">
        <div class="contenido">
          <Encabezado title="Archivo CSV de Resultados" />
        </div>
        <div class="componentesDocentes">
          <CardSubido />
        </div>
        
      </v-col>
    </v-row>
  </div>

</template>

<script>
import Lateral from '../components/lateral.vue'
import Encabezado from  '../components/encabezado.vue'
import CardSubido from '../components/cardSubido.vue'

export default {
components: {Lateral,Encabezado,CardSubido},
}
</script>

<style scoped>
.componentesDocentes{
margin-top: 180px;
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