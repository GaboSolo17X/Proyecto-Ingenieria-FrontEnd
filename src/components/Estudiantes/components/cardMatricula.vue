<template>
  <v-card
    class="mx-auto my-12"
    max-width="280"
    max-height="400"
    
  >
    <template v-slot:loader="{ isActive }">
      <v-progress-linear
        :active="isActive"
        color="deep-purple"
        height="4"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-img
      cover
      width="40%"
      height="35%"
      src="../assets/usuarioPic.png"
      
    ></v-img>
    <v-card-item class="justify-center">
      <v-card-title>{{clase.nombre}}</v-card-title>
    </v-card-item>

    <v-card-text >
      <v-row
        align="center"
        class="mx-0"
      >
      </v-row>

      <div class="my-2 text-subtitle-1 gestion">
        Docente
      </div>
    </v-card-text>

    <v-divider class="mx-4 mb-1"></v-divider>

    <div class="px-3 text-center">
      <v-chip-group variant="outlined">
        <v-chip label>Seccion <br/> {{clase.seccion}}</v-chip>

        <v-chip label>Dias <br/> {{clase.dias}}</v-chip>

        <v-chip label>Cupos <br/> {{clase.cupos}} </v-chip>
      </v-chip-group>
    </div>
    <v-divider class="mx-4 mb-1"></v-divider>

    <v-card-actions class="justify-center">
          <v-col cols="auto">
      <v-dialog
        transition="dialog-top-transition"
        width="auto"
      >
        <template v-slot:activator="{ props }">
          <v-btn
            color="grey-darken-4"
            v-bind="props"
          >Matricular</v-btn>
        </template>
        <template v-slot:default="{ isActive }">
          <v-card>
            <v-toolbar
              color="grey-darken-4"
              title="Registro UNAH"
            ></v-toolbar>
            <v-card-text>
              <div class="text-h2 pa-6">¡Clase matriculada con exito!</div>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn
                color="grey-darken-4"
                variant="text"
                @click="isActive.value = false"
              >Cerrar</v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
    </v-col>
    </v-card-actions>
  </v-card>
</template>
<script>
export default ({
  name:'clase',
  props:['clase']
})
</script>

<style scoped>

.v-chip {
  height: auto !important;
  text-align: center;
}

.v-card {
    background-color: #77181E;
    border-radius: 30px;
    color: white;
    
}

.v-btn{
    background-color: white;
    border-radius: 30px;
    width: 120px;
}

.v-card-item + .v-card-text {
    padding-bottom: 0;
    text-align: center;
}

.v-img{
    margin-left:70px;
}

</style>