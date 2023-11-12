<template>
  <v-col cols="4">
    <v-card class="mx-auto text" color="white" rounded>
      <v-row class="pt-3">
        <v-col cols="2"></v-col>
        <v-col><v-img :src="card.src" class="imagen" cover></v-img></v-col>
        <v-col cols="2"></v-col>
      </v-row>

      <v-card-actions class="d-flex flex-column">
        <v-btn color="#282832" variant="flat" rounded="xl" class="buttom">
          Seleccionar
        </v-btn>
      </v-card-actions>
    </v-card></v-col
  >
</template>

<script>
export default {
  props: ["card"],
  setup() {},
};
</script>

<style>
.imagen {
  padding: 10px !important;
}
</style>
