<template>
  <div>
    <v-row>
      <v-col cols="3">
        <Lateral />
      </v-col>
      <v-col cols="8">
        <div class="contenido">
          <Encabezado
            title="Carga Academica"
            v-if="CoordinadorInfo"
            :datos="CoordinadorInfo"
          />
        </div>
        <div class="componentesDocentes">
          <TablaCarga />
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Lateral from "../components/lateral.vue";
import Encabezado from "../components/encabezado.vue";
import TablaCarga from "../components/tablaCarga.vue";
import { ref, onMounted } from "vue";
import route from "color-convert/route";
import router from "@/router";

export default {
  components: { Lateral, Encabezado, TablaCarga },
  setup() {
    const CoordinadorInfo = ref();
    const coordinadorEs = async () => {
      console.log("El coordinador es");
      CoordinadorInfo.value = JSON.parse(
        localStorage.getItem("CoordinadorInfo")
      );
      console.log(CoordinadorInfo);
    };
    onMounted(() => {
      coordinadorEs();
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
              window.alert("El proceso de matrículas está activo, no puede acceder a esta página");
              router.push({name: 'ventanaEstudiantes'})
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
      CoordinadorInfo,
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
  margin-top: 8rem;
  left: 230px !important;
  width: 900px;
  text-align: center;
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
