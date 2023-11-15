<template>
  <div>
    <body style="background-color: #282832">
      <v-row>
        <v-col cols="3">
          <Lateral />
        </v-col>
        <v-col>
          <div class="contenido">
            <Encabezado title="Matricula de clases" />
          </div>
          <div class="componentesDocentes">
              <ToolbarBuscar class="large-card" />
              <CardDetalles class="small-card" />
            </div>
          <div class="cuadrados">
            <v-row>
              <Matricula
            v-for="clase in clases"
            :key="clase.nombre"
            :clase="clase"
            :card="card"
             />
            </v-row>
            <div class="boton">
            <BotonHorario />
            </div>
          </div>
        </v-col>
      </v-row>
    </body>
  </div>
</template>

<script>
import Lateral from "../components/lateral.vue";
import Encabezado from "../components/encabezado.vue";
import Matricula from '../components/cardMatricula.vue'
import ToolbarBuscar from '../components/toolbarBuscar.vue'
import CardDetalles from '../components/cardDetalles.vue'
import BotonHorario from '../components/botonHorario.vue'
import { ref } from "vue";

export default {
  components: {Lateral, Encabezado, Matricula, ToolbarBuscar , CardDetalles , BotonHorario },
  setup() {
    const clases = [
      {
        nombre: 'Fabiola Mendoza',
        seccion: '0700',
        dias: 'Lu, Ma, Mi',
        cupos: 25
      },
      {
        nombre: 'Weslin Barahona',
        seccion: "1800",
        dias: 'Lu, Ma, Mi',
        cupos: 50
      },
      {
        nombre: 'Elizabeth Maradiaga',
        seccion: "1100",
        dias: 'Lu, Ma, Mi',
        cupos: 15
      },
    ];

    return {
      clases,
    };
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Rubik:wght@300;500&display=swap");
.boton{
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 30px;
  padding-top: 30px;
}

.card{
  width: 20%; 
}

.text {
  font-family: "Rubik";
}
.small-card{
  flex: 1;
}

.large-card{
  flex: 2;
}
.cuadrados{
  display:flex;
  width:900px;
  min-height: 500px;
  overflow: hidden;
  align-items: center;
  justify-content: space-evenly;
  flex-wrap: wrap;
}
.componentesDocentes{
margin-top: 78px;
left: 230px !important;
width: 100;
height: 100;
display: flex;
gap: 15px;
padding-left: 0;
}

.contenido{
top: 0px;
z-index: 1004;
transform: translateY(0%);
position: fixed;
left: 230px;
width: calc((100% - 230px) - 0px);
flex:1;
padding: 20px;
}


.rubik {
  font-family: "Rubik";
}

.navBarCont {
  display: flex;
  flex-direction: column;
}

.contenido {
  /* top: 0px; */
  z-index: 1004;
  transform: translateY(0%);
  position: fixed;
  left: 230px;
  width: calc((100% - 230px) - 0px);
}
</style>
