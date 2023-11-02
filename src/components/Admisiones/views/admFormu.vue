<template>

  <Form  @tipoExamen="examenTipo"/>
  <Navbar title="FORMULARIO DE ADMISION" />
  <CardEx :mensaje="mensajeData"/>
</template>

<script>
import Navbar from '../components/navbar.vue'
import Form from '../components/formulario.vue'
import CardEx from '../components/cardExamen.vue'

export default {
    components: {Navbar, Form, CardEx},
  
   data(){
    return {
      // formularioData:'',
      mensajeData:'',
    };
   },
   methods:{
    examenTipo(data){
      this.mensajeData=data
    },
   }
}


</script>

<style>

</style>