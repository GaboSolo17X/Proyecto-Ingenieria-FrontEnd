<template>
  <div >
    <v-row>
      <v-col cols="4">
        <Lateral/>
      </v-col>
      <v-col cols="8">
        <div class="contenido">
          <Encabezado title="Activación de Cancelaciones Excepcionales" />
        </div>
        <div class="componentesDocentes">
          <CardCancelacion 
          pregunta="¿Desea habilitar el proceso de cancelaciones excepcionales? esto permitirá a los estudiantes la creación y envio de solicitudes de cancelación" 
          />
        </div>
        
      </v-col>
    </v-row>
  </div>

</template>

<script>
import Lateral from '../components/lateral.vue'
import Encabezado from  '../components/encabezado.vue'
import CardCancelacion from '../components/cardCancelacion.vue'

export default {
components: {Lateral,Encabezado,CardCancelacion},
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