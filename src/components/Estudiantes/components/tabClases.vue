<template>
  <v-container class="text-center">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="6" md="4">
        <v-btn
          @click="verHorario()"
          block
          rounded="xs"
          class="text-none"
          :class="{ 'active-button': $route.path === '/consultarHorario' }"
          variant="text">Matriculadas</v-btn>
      </v-col>
      <v-col cols="12" sm="6" md="4">
        <v-btn 
          @click="verEspera()"
          block
          rounded="xs"
          class="text-none"
          :class="{ 'active-button': $route.path === '/consultarEspera' }"
          variant="text">En lista de espera</v-btn>
      </v-col>

      <v-col cols="12" sm="6" md="4">
        <v-btn
          @click="verCanceladas()"
          block
          rounded="xs"
          class="text-none"
          :class="{ 'active-button': $route.path === '/consultarCanceladas' }"
          variant="text">Canceladas</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  methods: {
    verHorario() {
      this.$router.push('/consultarHorario');
    },
    verEspera() {
      this.$router.push('/consultarEspera');
    },
    verCanceladas() {
      this.$router.push('/consultarCanceladas');
    },
  },
};
</script>
<style scoped>
.v-btn{
  font-weight: bold;
  background-color: #FFFFFF;
  color: #000000;
  height: 50px;
  font-size: 1rem;
  min-width: 75%;
  border-radius: 15px;
}

.active-button {
  background-color: #77181E; 
  color: #ffffff; 
}
</style>