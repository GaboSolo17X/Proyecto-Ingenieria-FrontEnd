<template>
  <div >
    <v-row>
      <v-col cols="3">
        <Lateral/>
      </v-col>
      <v-col cols="8">
        <div class="contenido">
          <Encabezado :title="$route.params.title" v-if="docente" :datos="docente"/>
        </div>
        <h1 class="componentesDocentes">Informacion de cada clase</h1>
        <section class="clases">
          <Video :idSeccion="$route.params.idSeccion"/>
        </section>
      </v-col>
    </v-row>
  </div>

</template>

<script>
import Lateral from '../components/lateral.vue'
import Encabezado from  '../components/encabezado.vue'
import Video from  '../components/cardVideo.vue'
import { ref,onMounted } from 'vue'

export default {
components: {Lateral,Encabezado, Video},
// props: {
//     idSeccion: {
//       type: String,
//     }
// },
created() {
    // Add a console.log statement to check the received title
    console.log('Received title:', this.$route.params.title);
    console.log('Received idSeccion:', this.$route.params.idSeccion);
    // console.log('Valor de miProp:', this.idSeccion);
  },

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
      docente
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

h1{
  color:  #77181E;
}

</style>