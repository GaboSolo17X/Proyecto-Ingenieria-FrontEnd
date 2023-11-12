<template>
  <div >
    <body style="background-color: #282832">
      <v-row>
      <v-col cols="4">
        <Lateral/>
      </v-col>
      <v-col cols="8">
        <div class="contenido">
          <Encabezado  title="Solicitud de reposición"/>
        </div>
        <div class="componentesDocentes">
          <FormRepo/>
        </div>
      </v-col>
    </v-row>
    </body>
  </div>

</template>

<script>
import Lateral from '../components/lateral.vue'
import Encabezado from '../components/encabezado.vue'
import FormRepo from '../components/formReposicion.vue'

export default {
components:{Lateral,Encabezado,FormRepo},
data(){
return{
  
}
}
}
</script>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Rubik:wght@300;500&display=swap');

.componentesDocentes{
margin-top: 100px;
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

