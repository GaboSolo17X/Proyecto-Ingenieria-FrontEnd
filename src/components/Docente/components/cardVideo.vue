<template>
<v-container fluid>
      <v-row dense>
            <v-col cols="6">
    <v-card class="clase mx-auto"
    max-width="350">
            <v-img src="../assets/lista.png" class="clase-imagen">
            </v-img>
                <v-card-title>Lista de estudiantes</v-card-title>
            <v-card-actions class="espacio-boton">
                <v-btn large rounded color="white" class="botoncito" text-center @click="descargarLista">descargar</v-btn>
            </v-card-actions>
            <v-spacer></v-spacer>
    </v-card>
    </v-col>
        <v-col cols="6">
    <v-card class="clase mx-auto"
    max-width="350" height="310">
            <v-img src="../assets/seguridad.png" class="clase-imagen">
            </v-img>
                <v-card-title>Subir video introductorio</v-card-title>
            <v-card-actions class="espacio-boton">
                <div class="wrapper">
                    <input type="text" placeholder="Ingresar link"/>
                    <button>Subir</button>
                </div>
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
        cambiarPagina(title){
            this.$router.push({name:'clase',params:{title:title}});
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
    padding-bottom: 15px;
}

.espacio-boton{
    justify-content: center;
}

.botoncito{
    background-color: #282832;
    padding: 16px 50px;
    line-height: 5px;
}

.clase-imagen{
    width: 100%;
}

.wrapper{
    position: relative;
    width: 300px;
    max-width: 100%;
}

.wrapper input{
    background: white;
    border-radius: 50px;
    padding: 10px;
    width: 100%;
    height: 40px !important;
    color: black;
}
.wrapper button{
    position: absolute;
    background-color: darkred;
    border-radius: 0px 20px 20px 0px;
    height: 40px !important;
    transform: translateX(-70px);
    width: 70px;
}
</style>
