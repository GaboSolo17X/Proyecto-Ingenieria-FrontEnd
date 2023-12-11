<template>
  <div >
    <body style="background-color: #282832">
      <v-row>
      <v-col cols="4">
        <Lateral/>
      </v-col>
      <v-col cols="8">
        <div class="contenido">
          <Encabezado  title="Cambio de carrera" v-if="estudiante" :datos="estudiante"/>
        </div>
        <div class="componentesDocentes">
          <FormCambiocarrera v-if="estudiante" :datos="estudiante"/>
        </div>
      </v-col>
    </v-row>
    </body>
  </div>

</template>

<script>
import Lateral from '../components/lateral.vue'
import Encabezado from '../components/encabezado.vue'
import FormCambiocarrera from '../components/formCambioCarrera.vue'
import { ref,onMounted } from 'vue'
export default {
components:{Lateral,Encabezado,FormCambiocarrera},
setup(){
    

    const estudiante=ref()
    const estudianteEs  = async () => {
      console.log("El estudiante es")
      estudiante.value = JSON.parse(localStorage.getItem('Estudiante'))
      console.log(estudiante)
    };
    onMounted(() => {
      estudianteEs ();
      comprobacionEstado();
    });
    const comprobacionEstado = async ( ) =>{
      try {
        const res = await fetch('http://localhost:3000/administrador/ObtenerEstadoProceso', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        })
        const data = await res.json()
        const {estadoProcesos} = data
        console.log(estadoProcesos)
        for(let i = 0; i < estadoProcesos.length; i++){
          if(estadoProcesos[i].idProceso == 4){
            if(estadoProcesos[i].estado == true){
              if(estadoProcesos[i].fechaInicioDelProceso == null || estadoProcesos[i].fechaFinDelProceso == null){
                window.alert("Solo podrás realizar el cambio de carrera hasta que el periodo haya finalizado");
                window.history.back();
              }else{
              let fechaInicio = new Date(estadoProcesos[i].fechaInicioDelProceso);
              let fechaFin = new Date(estadoProcesos[i].fechaFinDelProceso);
              fechaInicio.setDate(fechaInicio.getDate() + 1);
              fechaFin.setDate(fechaFin.getDate() + 1);
              let intervaloDeFecha = [];
              for (let i = fechaInicio; i <= fechaFin; i.setDate(i.getDate() + 1)) {
                let fechaString = formatearFecha(new Date(i));
                intervaloDeFecha.push(fechaString);
              }
              //obtener el dia actual
              let fechaActual = formatearFecha(new Date());
              console.log(fechaActual);

              //comprobar si el dia actual esta dentro del intervalo de fechas
              let comprobacion = intervaloDeFecha.includes(fechaActual);
              if(comprobacion == true){
                console.log("El proceso de calificaciones está activo");
              }else{
                window.alert("Solo podrás realizar el cambio de carrera hasta que el periodo haya finalizado");
                window.history.back();
              }

              }


            
            }else{
              window.alert("Solo podrás realizar el cambio de carrera hasta que el periodo haya finalizado");
              window.history.back();
            }
          }else{

          }
        }
      } catch (error) {
        console.log(error)
      }
    }
    
    const formatearFecha = (fecha) => {
      let dia = fecha.getDate();
      let mes = fecha.getMonth() + 1;
      let anio = fecha.getFullYear();
      if (mes < 10) {
        mes = "0" + mes;
      }
      if (dia < 10) {
        dia = "0" + dia;
      }
      let fechaString = anio + "-" + mes + "-" + dia;
      return fechaString;
    }; 


    return{
      estudiante
    }

    
  }
}
</script>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Rubik:wght@300;500&display=swap');

.componentesDocentes{
margin-top: 100px;
left: 230px !important;
width: calc((100% - 230px) - 0px);
}

.rubik{
  font-family: 'Rubik';
}

.navBarCont{
display: flex;
flex-direction: column;
}

.contenido{
top: 0px;
z-index: 1004;
transform: translateY(0%);
position: fixed;
left: 230px;
width: calc((100% - 230px) - 0px);
}
</style>

