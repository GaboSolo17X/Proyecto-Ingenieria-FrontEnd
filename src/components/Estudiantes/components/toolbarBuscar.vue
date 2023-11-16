<template>
  <v-card max-width="500" class="mx-auto">
    <v-toolbar class="cabeza">
      <v-toolbar-title class="titulo"> Asignatura </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-card-text>
      <v-row>
        <v-select
          class="selector shrink"
          label="Busca una asignatura"
          variant="outlined"
          :items="['IS511 - Bases de datos', 'IS501 - Inteligencia Artificial']"
        ></v-select>
        <v-btn class="botoncito" dark color="amber-accent-3"> buscar </v-btn>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<style scoped>

.titulo{
    margin-bottom: 30px;
    
}
  .cabeza {
    height: 32px;
    background-color: #77181E;
    color: white;
    font-weight: bold;
  }


  .v-select {
    padding-right: 15px;
    padding-top: 4px;
    padding-left: 5px;
  
  }

.botoncito{
  margin-top: 12px;
}

.v-card{
  background-color: #DEE7E7;
  padding-bottom: 0;
}

.v-card .v-card-text{
  padding-bottom: 0;
}
</style>