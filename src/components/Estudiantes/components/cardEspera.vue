<template>
  <v-card class="mx-auto" elevation="1" max-width="290">
    <v-card-title class="py-5 font-weight-black titulo">{{ clase.asignatura }}</v-card-title>

    <v-card-text>
      Aula: {{ clase.aula }} <br />
      Edificio: {{ clase.edificio }} <br />
      Dias: {{ clase.dias }} <br />
      Horas: {{ clase.horaInicio }} - {{ clase.horaFinal }}  <br />
      Cupos: {{ clase.cupos }}
    </v-card-text>
    <v-card-text class="espera">
    Asignatura en lista de espera
      </v-card-text>
    <v-divider></v-divider>

   <v-dialog width="500">
      <template v-slot:activator="{ props }">
        <v-btn
          class="text-none"
          color="grey-darken-4"
          size="large"
          variant="flat" 
          v-bind="props" 
          text="Cancelar"> </v-btn>
      </template>

      <template v-slot:default="{ isActive }">
        <v-card>
          <v-card-text>
          Clase cancelada con exito
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn text="Cerrar" @click="isActive.value = false"></v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </v-card>
</template>
<script>
export default ({
  name: 'clase',
  props: ['clase'],
})
</script>
<style scoped>
.v-btn {
  border-radius: 30px;
  margin-bottom: 10px;
  margin-top: 10px;
  margin-left: 5em;
}

.v-card {
  border-radius: 30px;
  background-color: #77181e;
  color: white;
}

.titulo {
  color: #FBD411;
}

.espera{
    text-align: center;
    font-weight: bold;
}
</style>