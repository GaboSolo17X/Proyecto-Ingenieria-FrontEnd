<template>
  <div class="background-container">

    <div>.</div>
    <div class="numberN">{{random}}</div>
    <div class="data">
        <v-row class="estudiante"><p>Este documento pertenece a {{estudiante}}, matriculado(a)</p></v-row>
        <v-row class="cuenta">
            <!-- <p>20201000956</p>
            <p class="carrera">INGENIERIA EN SISTEMAS</p> -->
            <p>con el número de cuenta {{numCuenta}}, en la carrera de: {{carrera}}</p>
        </v-row>
        <v-row class="msg">
            <p class="one">{{ pagina + 2 }}</p><p class="two">{{ pagina + 2 }}</p>
        </v-row>
    
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

  export default {
    props: {
    estudiante:String, 
    numCuenta:String, 
    carrera:String,
    pagina:Number,
    random:Number,
    },

    setup(){

    
        return{

        }
    }
    
  }
</script>

<style scoped>

  @import url('https://fonts.googleapis.com/css2?family=Archivo:wght@300&display=swap');

.background-container {
margin: 0;
  padding: 0;
  height: 100vh;
  background-image: url('../PDF/img/White4.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 8.5in; 
  height: 11in;
  /* display: flex;
  justify-content: center;
  align-items: center; */
  color: black;
  /* opacity: 0.5; */
  
}

.numberN{
    margin-top: 145px;
    margin-left: 60px;
    color:#cb5364;
    font-size: 1.5rem;
    font-family: 'Archivo', sans-serif;
}

.v-table{
    background-color: unset;
    margin-top: 11px;
    margin-left: 40px;
    font-size: 1rem;
    font-family: serif;
    color:black
    
}

/* .v-table .labe {
  height: 50px; 
} */

.text-left{
    color:black !important;
}

.contTable :deep(.v-table__wrapper){
    margin-top: 340px;
    margin-left: 35px;
}

.cod{
    width:100px;
}

.name{
    width:350px
}
.cali{
    width:0px
}
.uv{
    width:0px
}

.fila-personalizada {
  height: 40px; /* Ajusta el valor según tus necesidades */
}

.contTable .v-table tbody .fila-personalizada {
  height: 20px;
}



.data{
    margin-top: 16px;
}
.saludo{
    margin-top:1px !important;
    margin-left: 45px;
    font-size:1rem;
    font-family: serif;
}
.cuenta{
    margin-top:19px !important;
    margin-left: 55px;
    font-size: 1rem;
    font-family: serif;

}
.msg{
    margin-top:21px!important;
    margin-left: 55px;
    font-size: 1rem;
    font-family: serif;
}

.estudiante{
    margin-top:283px !important;
    margin-left: 55px;
    font-size: 1rem;
    font-family: serif;
    /* letter-spacing: -1px; */
    /* font-weight: bold; */
}
.carrera{
    margin-left:110px;
    font-size: 1rem;
    font-family: serif;

    
}

.one{
  margin-top:4.5px;
  margin-left: 68px;
}

.two{
  margin-top:4.5px;
  margin-left: 355px;
}
</style>