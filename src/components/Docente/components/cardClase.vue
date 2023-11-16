<template>
<v-container fluid>
      <v-row dense>
        <v-col cols="">
    <v-card class="clase mx-auto"
    max-width="350" max-height="500px">

    <div class="contIMG">

            <v-img :src="clase.banner" class="clase-imagen">
                </v-img>
        </div>
                <v-card-title>{{clase.nombreClase}}</v-card-title>
                <v-card-subtitle>Facultad de {{ clase.facultad }}</v-card-subtitle>
            <v-card-actions class="espacio-boton">
                <v-btn large rounded color="white" class="botoncito" text-center @click="cambiarPagina(clase.nombreClase, clase.id, clase.idSeccion)">ver</v-btn>
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
    props:['clase'],
    methods:{
        cambiarPagina(title, id, idSeccion){
            this.$router.push({name:'clase',params:{title:title,idSeccion:idSeccion}});
            // this.$router.push({name:'claseid',params:{idSeccion:idSeccion}});
            console.log("Este es el nombre de la clase "+title)
            console.log("Este es el id de la clase "+id)
            console.log("Este es el id de la seccion "+idSeccion)

        }
    }
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
