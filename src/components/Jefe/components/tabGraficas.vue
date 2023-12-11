<template>
  <v-container class="text-center">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="6" md="4">
        <v-btn
          @click="verHorario()"
          block
          rounded="xs"
          class="text-none"
          :class="{ 'active-button': $route.path === '/estadistica' }"
          variant="text"
          >Índice de evaluaciones</v-btn
        >
      </v-col>
      <v-col cols="12" sm="6" md="4">
        <v-btn
          @click="verEspera()"
          block
          rounded="xs"
          class="text-none"
          :class="{ 'active-button': $route.path === '/matricula' }"
          variant="text"
          >Índice de matricula por clase</v-btn
        >
      </v-col>

      <v-col cols="12" sm="6" md="4">
        <v-btn
          @click="verCanceladas()"
          block
          rounded="xs"
          class="text-none"
          :class="{ 'active-button': $route.path === '/espera' }"
          variant="text"
          >Índice de lista de espera</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  methods: {
    verHorario() {
      this.$router.push("/estadistica");
    },
    verEspera() {
      this.$router.push("/matricula");
    },
    verCanceladas() {
      this.$router.push("/espera");
    },
  },
};
</script>
<style scoped>
.v-btn {
  font-weight: bold;
  background-color: #ffffff;
  color: #000000;
  height: 50px;
  font-size: 1rem;
  min-width: 75%;
  border-radius: 15px;
}

.v-container {
  background-color: #77181e;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}

.v-btn {
  background-color: #77181e;
  color: #ffffff;
}
</style>
