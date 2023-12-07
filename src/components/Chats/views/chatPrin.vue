<template>
  
  <div class="contenido">
    <navTop title="Mensajes" v-if="estudiante" :datos="estudiante"/>
  </div>
  <SideBarOne v-if="numCuenta && centro" :cuenta="numCuenta" :centro="centro"/>
 
</template>

<script>
import SideBarOne from '../components/lateral.vue'
import navTop from '../components/encabezado.vue'
import {ref,onMounted} from 'vue'
export default {
components:{SideBarOne, navTop},

setup(){

  const estudiante=ref()
  const numCuenta=ref()
  const centro=ref()

    const estudianteEs  = async () => {
      console.log("El estudiante es")
      estudiante.value = JSON.parse(localStorage.getItem('Estudiante'))
      console.log(estudiante)
    
     
      numCuenta.value=estudiante.value.numeroCuenta
      centro.value=estudiante.value.centroRegional

      console.log(numCuenta.value)
    };
    onMounted(() => {
      estudianteEs ();
    });
  return{
    estudiante,
    numCuenta,
    centro,

  }
}



}
</script>

<style scoped>

.contenido{
top: 0px;
z-index: 1004;
transform: translateY(0%);
position: fixed;
left: 410px;
width: calc((100% - 410px) - 0px);
}

</style>