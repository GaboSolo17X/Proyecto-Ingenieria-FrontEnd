<template>
    <v-card
      class="mx-auto, tarjeta"
      width="90%">
    <div class="titulo">
        {{pregunta}}
    </div>
    <div class="archivo">
        <div class="divBoton">
            <div class="botonIzquierda" >
              <v-btn block rounded="xl" class="botones" style="background-color: #53be4e;" @click="habilitarExcepcional">Habilitar</v-btn>
            </div>
          <div class="botonDerecha">
            <v-btn block rounded="xl" class="botones" style="background-color: #A92727" @click="deshabilitarExcepcional">Deshabilitar</v-btn>
          </div>
        </div>
    </div>


</v-card>
  </template>

<script>
import { useRoute } from "vue-router";
  export default {
    props:{pregunta:String},
    methods: {
    habilitarExcepcional() {
      // Lógica para habilitar el proceso de matrícula
      window.alert('Se ha habilitado correctamente el proceso de cancelaciones excepcionales.');
      this.navegarAAdminDocentes();
    },
    deshabilitarExcepcional() {
      // Lógica para deshabilitar el proceso de matrícula
      window.alert('Se ha deshabilitado correctamente el proceso de cancelaciones excepcionales.');
      this.navegarAAdminDocentes();
    },
    navegarAAdminDocentes() {
      // Verifica si la ruta actual ya es adminDocentes antes de navegar
      if (this.$route.name !== "adminDocentes") {
        this.$router.push({ name: "adminDocentes" });
      }
    },

  }
}



</script>
<style scoped>


@import url('https://fonts.googleapis.com/css2?family=Rubik:wght@300;500&display=swap');


.divBoton{
    width: 90%; 
    display: flex;
    flex-direction: row; 
    justify-content: space-between; 
    margin: 30px;
    align-items: center;
}
.botones{
    color: white;
    font-family: 'Rubik';
    text-align: center;
    width: 50%;
}
.botonIzquierda{
  width: 40%; /* Divide el espacio en dos partes iguales */
  text-align: center;
}
.botonDerecha {
  width: 40%; /* Divide el espacio en dos partes iguales */
  text-align: center;
}
.titulo{
    color: white;
  font-family: 'Rubik';
  font-size: 30px;
  text-align: center; /* Agrega esta propiedad para centrar horizontalmente */
  display: flex;
  flex-direction: column;
  justify-content: center; /* Elimina align-content y align-items */
  margin: 30px;
}

.archivo{
    width: 90%;
    margin-left: -20px;
}
.tarjeta{
    background-color: #282832;
    color: white;
    font-family: 'Rubik';
    border-radius: 15px;
    display: flex;
	flex-direction: column;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;
	align-content: center;
}
</style>
