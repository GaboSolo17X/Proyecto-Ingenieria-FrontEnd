<template>
  <v-card
    class="mx-auto"
    max-width="400"
  >
    <v-img
      class="align-end text-white"
      height="200"
      v-bind:src="impartida.src"
    />

    <v-card-title>FACULTAD DE INGENIERIA</v-card-title>

    <v-card-text>
      <div>{{impartida.title}}</div>
    </v-card-text>

    <v-card-actions>

      <v-btn color="orange">
        revisar
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>

export default ({
    name:'impartida',
    props:['impartida']
})
</script>