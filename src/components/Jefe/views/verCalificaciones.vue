<template>
    <div >
      <body style="background-color: #C6D6D6">
      <v-row>
        <v-col cols="3">
          <Lateral/>
        </v-col>
        <v-col cols="8">
          <div class="contenido">
            <Encabezado  title="CALIFICACIONES"/>
          </div>
        <div class="componentesDocentes">
        <h2 class="docente">{{ $route.params.nombre }} / {{ $route.params.clase }}</h2>
        <h4 class="clase">{{ $route.params.asignatura }} &nbsp;Sección: {{ $route.params.seccion }}</h4>
        <ListaCalificaciones />
        </div>
      </v-col>
    </v-row>
      </body>
  </div>

</template>

<script>
import Lateral from '../components/lateral.vue'
import Encabezado from  '../components/encabezado.vue'
import ListaCalificaciones from '../components/listaCalificaciones.vue'

export default {
components: {Lateral,Encabezado, ListaCalificaciones},

}

</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@300;500&display=swap');


.componentesDocentes{
margin-top: 80px;
left: 230px !important;
width: 100%;
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

.docente{
  display: flex;
  justify-content: flex-end;
  color: #77181E;
}

.clase{
  background-color: #282832;
  color: white;
  width: 20rem;
  padding: 5px;
}
</style>