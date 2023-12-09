<template>
  <v-card class="tarjeta">
    <v-card-title>¡La carga académica de este periodo se encuentra lista! <br /> Elija el formato en
      que desea descargarla.</v-card-title>
    <v-card-actions>
      <v-btn @click="download('pdf')">
          <v-icon right>
            <i class="fa:fas fa-solid fa-file-pdf"></i>
          </v-icon>
          Descargar PDF
        </v-btn>
      <v-btn @click="download('xlsx')">
        <v-icon right>
          <i class="fa:fas fa-solid fa-file-excel"></i>
        </v-icon>
        Descargar hoja de calculo
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import { ref } from "vue";
import CoordinadorVue from '@/views/LandingViews/Coordinador.vue';
  export default {
    methods: {
      download(tipoArchivo) {
        const Coordinador = window.localStorage.getItem('Coordinador')
        const jsonCoordinador = JSON.parse(Coordinador)
        const {numeroEmpleadoDocente} = jsonCoordinador
        fetch('http://localhost:3000/coordinador/cargaAcademica', {
          method:'POST',
          headers:{
            'Content-Type':'application/json',
          },
          body:JSON.stringify({numeroEmpleadoDocente, tipoArchivo})
        
        }) .then(response=>response.blob()) .then(blob=>{
          let url = window.URL.createObjectURL(blob)
          let a = document.createElement('a')
          a.href=url
          if(tipoArchivo=='pdf'){
            a.download='cargaAcademica.pdf'
            a.click()
          } else {
            a.download='cargaAcademica.xlsx'
            a.click()
          }
        })
      .catch((error)=>{console.log(error)})
      },
    },
  }
</script>
<style scoped>

  .tarjeta {
    background-color: #282832;
    color: white;
    font-family: 'Rubik';
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    align-content: center;
    height: 20rem;
  }

  .v-btn {
    background-color: #a92727;
    color: white;
    height: 45px;
    margin-top: 3rem;
  }
</style>