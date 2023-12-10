<template>
  <div>
    <body style="background-color: #c6d6d6">
      <v-row>
        <v-col cols="3">
          <Lateral />
        </v-col>
        <v-col cols="8">
          <div class="contenido">
            <Encabezado
              v-if="JefeInfo"
              :datos="JefeInfo"
              title="EVALUACIONES"
            />
          </div>
          <div class="componentesDocentes">
            <TablaEvaluacion />
          </div>
        </v-col>
      </v-row>
    </body>
  </div>
</template>

<script>
import Lateral from "../components/lateral.vue";
import Encabezado from "../components/encabezado.vue";
import TablaEvaluacion from "../components/tablaEvaluacion.vue";
import { ref, onMounted } from "vue";

export default {
  components: { Lateral, Encabezado, TablaEvaluacion },
  setup() {
    const JefeInfo = ref();
    const jefeEs = async () => {
      console.log("El jefe es");
      JefeInfo.value = JSON.parse(localStorage.getItem("JefeInfo"));
      console.log(JefeInfo);
    };
    onMounted(() => {
      jefeEs();
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
          if(estadoProcesos[i].idProceso == 3){
            if(estadoProcesos[i].estado == true){
              if(estadoProcesos[i].fechaInicioDelProceso == null || estadoProcesos[i].fechaFinDelProceso == null){
              window.alert("El proceso de calificaciones no está activo");
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
                window.alert("El proceso de calificaciones no está activo");
                window.history.back();
              }

              }
              

            
            }else{
              window.alert("El proceso de calificaciones no está activo");
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



    return {
      JefeInfo,
    };
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Rubik:wght@300;500&display=swap");

.asignatura {
  width: 270px;
  margin-top: 100px;
  position: relative;
  right: 100px !important;
}

.componentesDocentes {
  margin-top: 80px;
  left: 230px !important;
  width: 100%;
  height: 479px;
}

.rubik {
  font-family: "Rubik";
}

.navBarCont {
  display: flex;
  flex-direction: column;
}

.contenido {
  top: 0px;
  z-index: 1004;
  transform: translateY(0%);
  position: fixed;
  left: 230px;
  width: calc((100% - 230px) - 0px);
}
</style>
