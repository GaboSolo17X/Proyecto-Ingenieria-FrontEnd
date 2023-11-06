<template>
<v-container fluid>
      <v-row dense>
        <v-col cols="">
    <v-card class="clase mx-auto"
    max-width="350">
            <v-img :src="clase.src" class="clase-imagen">
            </v-img>
                <v-card-title>FACULTAD DE INGENIERIA</v-card-title>
                <v-card-subtitle>{{clase.title}}</v-card-subtitle>
            <v-card-actions class="espacio-boton">
                <v-btn large rounded color="white" class="botoncito" text-center @click="cambiarPagina(clase.title)">ver</v-btn>
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
}


</style>
