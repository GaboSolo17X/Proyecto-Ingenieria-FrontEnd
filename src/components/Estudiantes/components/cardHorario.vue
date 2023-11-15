<template>
  <v-card class="mx-auto" elevation="1" max-width="290">
    <v-card-title class="py-5 font-weight-black titulo"
      >{{clase.asignatura}}</v-card-title
    >

    <v-card-text>
      Aula: {{clase.aula}} <br />
      Edificio: {{clase.edificio}} <br />
      Dias: {{clase.dias}} <br />
      Horas: {{clase.horaInicio}} - {{clase.horaFinal}}
    </v-card-text>

    <v-card-text>
        
        <v-dialog width="500">
    <template v-slot:activator="{ props }">
      <v-btn
        block
        class="text-none"
        color="grey-lighten-5"
        size="x-large"
        variant="flat" 
        v-bind="props" 
        text="Ver docente"> </v-btn>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card title="Introduccion a la clase">
        <v-card-text>
        Aqui va un videito de youtube 
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text="Cerrar" @click="isActive.value = false"></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>

      <v-btn
        block
        class="text-none"
        color="grey-darken-4"
        size="x-large"
        variant="flat"
      >
        Cancelar
      </v-btn>
    </v-card-text>
  </v-card>
</template>
<script>
export default ({
  name:'clase',
  props:['clase'],
})
</script>
<style scoped>
  .v-btn {
    border-radius: 30px;
    margin-bottom: 10px;
  }
  .v-card {
    border-radius: 30px;
    background-color: #77181e;
    color: white;
  }
  .titulo{
    color: #FBD411;
  }
</style>