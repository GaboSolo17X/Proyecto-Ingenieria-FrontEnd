<template>
  <div class="bg">
    <navbar title="SISTEMA DE ADMISIÓN"/>
    <mensaje class="msg"/>
  </div>
  <!-- <div>gola</div> -->

</template>

<script>
import Navbar from '../components/navbar.vue'
import Mensaje from '../components/card.vue'
export default {
  components: {Navbar, Mensaje},
    setup(){

    }
    
}
</script>

<style>
.bg{
  width: 100%;
  height: 100vh;
  background-image: url('../assets/bg-admisiones.png');
  background-size: cover; 
  background-position: center;
}

.msg{

  width: 1000px;
  height: 400px;
  margin-top: 200px;
  margin-left: 20px;
  /* background-color: #; */
}
</style>