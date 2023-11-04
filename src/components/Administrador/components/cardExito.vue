<template>
    <v-card
      class="mx-auto, tarjeta"
      width="90%">
    <div class="titulo">
        Se ha cargado el archivo CSV con éxito
    </div>
    <div class="archivo">
       <v-icon class="icono" icon="fa:fas fa-solid fa-circle-check"></v-icon>
        <div class="divBoton">
            <router-link to="/adminDocentes">
                <v-btn block rounded="xl"  class="botones" >Volver</v-btn>
            </router-link>
        
        </div>
    </div>


</v-card>
  </template>

<script>
  export default {
  }


</script>
<style scoped>


@import url('https://fonts.googleapis.com/css2?family=Rubik:wght@300;500&display=swap');

.icono{
    color: #53be4e;
    font-size: 100px;
    width: 103%;
    
}
.divBoton{
    width: 90%; 
    display: flex;
    flex-direction: column;
    justify-content: center; 
    margin: 30px;
    align-items: center;
}
.botones{
    background-color: #77181E;
    color: white;
    font-family: 'Rubik';
    text-align: center;
    width: 200px;
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
