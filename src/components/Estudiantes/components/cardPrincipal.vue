<template>
  <v-col cols="6">
    <v-card class="mx-auto text" 
    max-width="344" 
    :height="card.altura"
    color="#77181E">
    
      <v-img  :src="card.src"
       cover
      ></v-img>

      <v-card-title class="multiline-text align-center d-flex flex-column">
        {{ card.titulo }}
      </v-card-title>

      <v-card-text class="multiline-text  align-center d-flex flex-column">
        {{ card.descripcion }}
      </v-card-text>

      <!-- Utiliza una clase personalizada para los botones -->
      <v-card-actions class="  d-flex flex-column" >
        <v-btn 
        color="white" 
        variant="flat"
        rounded="xl"
        class=" buttom"
        >
        <router-link :to=  "card.ruta"  class="subrayadoNo text">
          Iniciar</router-link>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-col>
</template>
<script>

export default {
  props:['card'],
  setup() {
    
  },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Rubik:wght@300;500&display=swap');

.subrayadoNo{
  text-decoration: none;
  color: black;
}
.buttom{
  padding: 10px 20px;

}
.text{
  font-family: 'Rubik';
}
.custom-card-actions {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}
.multiline-text {
  white-space: normal;
  text-align: center;
}
</style>

