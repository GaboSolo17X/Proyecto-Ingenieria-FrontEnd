<template>
  <v-col cols="4">
    <v-card class="mx-auto text" color="white" rounded height="230px">
      <v-row class="pt-3">
        <v-col cols="2"></v-col>
        <v-col><v-img :src="card.src" class="imagen" 
            width="120"
            height="120"
            cover></v-img></v-col>
        <v-col cols="2"></v-col>
      </v-row>

      <v-card-actions class="d-flex flex-column">
        <v-btn color="#282832" variant="flat" rounded="xl" class="buttom">
          Seleccionar
        </v-btn>
      </v-card-actions>
      <v-row>
        <v-col></v-col>
        <v-btn class="mt-2"
        density="comfortable" icon="fa-solid fa-trash-can"></v-btn><v-col></v-col>
      </v-row>
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
  border-radius: 50%;
}
</style>
