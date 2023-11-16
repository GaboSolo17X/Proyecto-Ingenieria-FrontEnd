<template>
  <v-btn @click="verHorario()">Consultar horario</v-btn>
</template>
<style scoped>
.v-btn{
    background-color: #DEE7E7;
    font-style: bold;
    color: black;
    }
</style>
<script>
export default {
  methods: {
    verHorario() {
      this.$router.push('/consultarHorario');
    },
  },
};
</script>