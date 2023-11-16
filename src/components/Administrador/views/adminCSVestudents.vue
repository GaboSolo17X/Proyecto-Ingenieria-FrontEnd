<template>
  <div>
    <v-row>
      <v-col cols="4">
        <Lateral />
      </v-col>
      <v-col cols="8">
        <div class="contenido">
          <Encabezado title="Archivo CSV de Estudiantes" v-if="trabajador" :datos="trabajador"/>
        </div>
        <div class="componentes" >
          <CardSubidoEstudents
            subida="Seleccione su archivo .csv para hacer el cargado de los estudiantes existentes."
          />
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Lateral from '../components/lateral.vue';
import Encabezado from '../components/encabezado.vue';
import CardSubidoEstudents from '../components/cardSubidoEstudents.vue';
import { ref,onMounted } from 'vue';


export default {
  components: { Lateral, Encabezado, CardSubidoEstudents },
  setup(){
      const trabajador=ref()
      const docenteEs = async () => {
      console.log("El docente es")
      trabajador.value = JSON.parse(localStorage.getItem('Administrador'))
      console.log(trabajador)
    };

    onMounted(() => {
      docenteEs();
    });

      return{
        trabajador
      }
    }
};
</script>

  
  <style scoped>

.componentes{
  margin-top: 110px;
  left: 230px !important;
  width: calc((100% - 230px) - 0px);
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