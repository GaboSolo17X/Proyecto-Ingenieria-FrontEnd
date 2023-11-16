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
        <v-divider></v-divider>
        <v-card-text class="py-0 pt-5">
      <v-row align="center" no-gutters>
        <v-col
          cols="3"
        >
          <v-img
            cover
            height="100"
            width="100"
            :src="clase.img"
    ></v-img>
        </v-col>

        <v-col cols="6" class="text-left">
          Lorem ipsum alalalalalala soy su profe
        </v-col>
      </v-row>
    </v-card-text>
        <v-card-text>
    <iframe width="450" height="250" :src="clase.src" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
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