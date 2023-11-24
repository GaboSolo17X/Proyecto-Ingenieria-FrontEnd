<template>
  <v-col cols="4">
    <v-card class="mx-auto text cartita" 
    :height="card.altura"
    color="#77181E">
    
      <v-img  :src="card.src"
       cover
      ></v-img>

      <v-card-title class="multiline-text align-center d-flex flex-column">
        {{ card.titulo }}
      </v-card-title>
      <v-card-actions class="  d-flex flex-column" >
        <v-btn 
        color="#282832" 
        variant="flat"
        rounded="xl"
        class="buttom"
        >
        <router-link :to=  "card.ruta"  class="subrayadoNo text">
          Ver</router-link>
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
  color: white;

}
.text{
  font-family: 'Rubik';
  color: white;
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

.cartita{
  border-radius: 30px;
  width: 280px;
  margin: 10px;
}
</style>

