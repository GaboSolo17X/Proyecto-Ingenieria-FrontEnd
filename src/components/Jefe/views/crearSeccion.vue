<template>
    <div >
      <body style="background-color: #C6D6D6">
      <v-row>
        <v-col cols="3">
          <Lateral/>
        </v-col>
        <v-col cols="8">
          <div class="contenido">
            <Encabezado  title="Crear sección"/>
          </div>
        <div class="componentesDocentes">
        <FormSeccion />
        </div>
      </v-col>
    </v-row>
      </body>
  </div>

</template>

<script>
import Lateral from '../components/lateral.vue'
import Encabezado from  '../components/encabezado.vue'
import FormSeccion from '../components/formSeccion.vue'

export default {
components: {Lateral,Encabezado, FormSeccion},

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
</style>