<template>
  <SideBarOne/>
  <div class="contenido">
    <navTop title="Mensajes"/>
  </div>
 
</template>

<script>
import SideBarOne from '../components/lateral.vue'
import navTop from '../components/encabezado.vue'
export default {
components:{SideBarOne, navTop}



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