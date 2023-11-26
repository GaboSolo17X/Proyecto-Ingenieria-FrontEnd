<template>
  <v-card flat>
    <div class="tabla">
      <v-table fixed-header height="450px">
        <thead class="encabezado">
          <tr>
            <th class="text-left">Codigo</th>
            <th class="text-left">Nombre</th>
            <th class="text-left">Nota</th>
            <th class="text-left">Observacion</th>
            <th class="text-left">Periodo</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in clases" :key="item.codigo" :search="search">
            <td>{{ item.codigo }}</td>
            <td>{{ item.nombre }}</td>
            <td>{{ item.nota }}</td>
            <td>{{ item.observacion }}</td>
            <td>{{ item.periodo }}</td>
          </tr>
        </tbody>
      </v-table>
    </div>
    <v-row class="text-center">
     <v-col>
        <v-btn>
          <router-link @click="regresar" to="/historial" class="regresar">
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
        clases: [
          {
            codigo: 'IS-811',
            nombre: 'Seguridad Informatica',
            nota: 90,
            observacion: 'APR',
            periodo: 'III PERIODO 2023',
          },
          {
            codigo: 'IS-511',
            nombre: 'Redes de datos I',
            nota: 82,
            observacion: 'APR',
            periodo: 'I PERIODO 2023',
          },
          {
            codigo: 'IS-711',
            nombre: 'Disenio Digital',
            nota: 66,
            observacion: 'APR',
            periodo: 'II PERIODO 2023',
          },
          {
            codigo: 'IS-412',
            nombre: 'Sistemas Operativos I',
            nota: 93,
            observacion: 'APR',
            periodo: 'II PERIODO 2023',
          },
          {
            codigo: 'IS-711',
            nombre: 'Disenio Digital',
            nota: 66,
            observacion: 'APR',
            periodo: 'II PERIODO 2023',
          },
          {
            codigo: 'IS-711',
            nombre: 'Disenio Digital',
            nota: 66,
            observacion: 'APR',
            periodo: 'II PERIODO 2023',
          },
        ],
      }
    },
    methods:{
      regresar() {
      this.$router.back();
    },
    }
  }
</script>
<style scoped>
  .text-left {
    background-color: #a92727 !important;
    color: white !important;
    font-family: 'Rubik';
  }

  .v-btn {
    background-color: #a92727;
    color: white;
    height: 45px;
  }
  .regresar{
    color: white;
    text-decoration: none;
  }

</style>