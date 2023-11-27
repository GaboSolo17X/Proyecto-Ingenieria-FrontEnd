<template>
  <v-btn variant="flat" rounded="xl" @click="verHorario()"
    >Consultar horario</v-btn
  >
</template>
<style scoped>
.v-btn {
  background-color: #dee7e7;
  font-style: bold;
  color: black;
}
</style>
<script>
export default {
  methods: {
    verHorario() {
      this.$router.push("/consultarHorario");
    },
  },
};
</script>
