<template>
  <v-card color="#C6D6D6" class="cartita">
    <v-card-title class="text-h5 font-weight-bold">
        Registrar sección
      </v-card-title>
      <v-card-text class="font-weight-medium">
        Asignaturas del departamento
      </v-card-text>

    <div class="tabla">
      <v-table fixed-header height="400px" class="tabla">
        <thead class="encabezado">
          <tr>
            <th class="text-left">Codigo</th>
            <th class="text-left">Asignatura</th>
            <th class="text-left">Centro</th>
            <th class="text-left">UV</th>
            <th class="text-left"></th>
          </tr>
        </thead>
        <tbody class="tabla">
          <tr v-for="fila in clases" :key="fila.codigo">
            <td>{{ fila.codigo }}</td>
            <td>{{ fila.asignatura }}</td>
            <td>{{ fila.centro }}</td>
            <td>{{ fila.uv }}</td>
            <td>
              <v-btn size="x-small" variant="flat" class="boton" @click="cambiarPagina(fila.asignatura)">
          <v-icon right>
            <i class="fa:fas fa-solid fa-circle-plus"></i>
          </v-icon>
          crear seccion 
        </v-btn>
            </td>
          </tr>
        </tbody>
      </v-table>
    </div>
    <v-row class="text-center">
     <v-col>
        <v-btn class="botonRegresar">
          <router-link @click="regresar" to="/principalJefe" class="regresar">
          <v-icon right>
            <i class="fa:fas fa-solid fa-circle-left"></i>
          </v-icon>
          Regresar 
          </router-link>
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
  export default {
    data() {
      return {
        search: '',
        clases: [
          {
            codigo: 'IS-511',
            asignatura: 'Redes de datos I',
            centro: 'CU',
            uv: '04',
          },
          {
            codigo: 'IS-511',
            asignatura: 'Redes de datos I',
            centro: 'CU',
            uv: '04',
          },
          {
            codigo: 'IS-511',
            asignatura: 'Redes de datos I',
            centro: 'CU',
            uv: '04',
          },
          {
            codigo: 'IS-511',
            asignatura: 'Redes de datos I',
            centro: 'CU',
            uv: '04',
          },
          {
            codigo: 'IS-501',
            asignatura: 'Bases de datos I',
            centro: 'CU',
            uv: '04',
          },
          {
            codigo: 'IS-401',
            asignatura: 'Programación Orientada',
            centro: 'CU',
            uv: '04',
          },
        ],
      }
    },
    methods:{
        cambiarPagina(asignatura){
            this.$router.push({name:'crearSeccion',params:{asignatura:asignatura}});
        }
    },
  }
</script>
<style scoped>
  .text-left {
    background-color: #a92727 !important;
    color: white !important;
    font-family: 'Rubik';
  }

  .botonRegresar {
    background-color: #a92727;
    color: white;
    height: 40px;
    box-shadow: none;
  }
  .regresar{
    color: white;
    text-decoration: none;
  }

  .cartita{
    box-shadow: none;
  }
  .boton{
    color: darkred;
    font-weight: bold;
    text-decoration: none;
    background-color: #C6D6D6;
}

.tbody{
  background-color: #C6D6D6;
}

.tabla{
  background-color: #C6D6D6;
}

</style>