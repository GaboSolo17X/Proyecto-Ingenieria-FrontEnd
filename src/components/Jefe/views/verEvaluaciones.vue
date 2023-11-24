<template>
    <div >
      <body style="background-color: #C6D6D6">
      <v-row>
        <v-col cols="3">
          <Lateral/>
        </v-col>
        <v-col cols="8">
          <div class="contenido">
            <Encabezado  title="EVALUACIONES"/>
          </div>
        <div class="componentesDocentes">
        <h3>{{ $route.params.nombre }}/{{ $route.params.clase }}</h3>
        <ListaEvaluacion />
        </div>
      </v-col>
    </v-row>
      </body>
  </div>

</template>

<script>
import Lateral from '../components/lateral.vue'
import Encabezado from  '../components/encabezado.vue'
import ListaEvaluacion from '../components/listaEvaluacion.vue'

export default {
components: {Lateral,Encabezado, ListaEvaluacion},

}

</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@300;500&display=swap');


.componentesDocentes{
margin-top: 80px;
left: 400px !important;
width: 300px;
margin-left: 15rem;
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