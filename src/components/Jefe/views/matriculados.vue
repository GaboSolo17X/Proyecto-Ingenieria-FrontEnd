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
              title="MATRICULA ESTUDIANTE"
            />
          </div>
          <div class="componentesDocentes">
            <TablaMatricula />
          </div>
        </v-col>
      </v-row>
    </body>
  </div>
</template>

<script>
import Lateral from "../components/lateral.vue";
import Encabezado from "../components/encabezado.vue";
import TablaMatricula from "../components/tablaMatricula.vue";
import { ref, onMounted } from "vue";

export default {
  components: { Lateral, Encabezado, TablaMatricula },
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
          if(estadoProcesos[i].idProceso == 2){
            if(estadoProcesos[i].estado == false){
  
            }else{
              window.alert("El proceso de matrículas sigue activo, no puede acceder a esta página");
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
  margin-top: 150px;
  left: 230px !important;
  width: 900px;
  height: 409px;
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
