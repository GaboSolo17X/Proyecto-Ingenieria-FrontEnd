<template>
<v-container fluid>
      <v-row dense>
        <v-col cols="">
    <v-card class="clase mx-auto"
    max-width="278" max-height="500px">

    <div class="contIMG">

            <v-img :src="clase.src" class="clase-imagen">
                </v-img>
        </div>
                <v-card-title>{{clase.title}}</v-card-title>
            <v-card-actions class="espacio-boton">
                <v-btn large rounded color="white" class="botoncito" text-center @click="cambiarPagina()">ver</v-btn>
            </v-card-actions>
            <v-spacer></v-spacer>
    </v-card>
    </v-col>
      </v-row>
    </v-container>
</template>
<script>

export default ({
    name:'clase',
    props:['clase','route'],
    methods: {
    cambiarPagina() {
      this.$router.push(this.route);
    },
  },
})
</script>
<style scoped>
.clase{
    flex: 1 1 33.333%;
    width: 100%;
    background-color: #A92727;
    border-radius: 30px;
    color: white;
    text-align: center;
    font-weight: bold;
    
}

.espacio-boton{
    justify-content: center;
}

.botoncito{
    background-color: #282832;
    padding: 16px 50px;
    line-height: 5px;
}

.clase-imagen .imagen{
    width: 100%;
    height: 50px;
    background-size: cover;
    background-position: center;
}


.contIMG {
  width: 100%; /* Ajusta según tus necesidades */
  height: 175px; /* Ajusta según tus necesidades */
  background-size: cover; /* Ajusta según tus necesidades */
  background-position: center; /* Ajusta según tus necesidades */
  /* Agrega otros estilos según tus necesidades */

}



</style>
