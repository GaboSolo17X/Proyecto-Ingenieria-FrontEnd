<template>
  <v-card color="#C6D6D6" flat>
    <div class="tabla">
      <v-table fixed-header height="450px" class="tabla">
        <thead class="encabezado">
          <tr>
            <th class="text-left">Indice</th>
            <th class="text-left">Evaluacion</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="fila in filas" :key="fila.no">
            <td>{{ fila.no }}</td>
            <td>
              <v-btn size="x-small" @click="verEvaluacion()"
                >visualizar</v-btn
              >
            </td>
          </tr>
        </tbody>
      </v-table>
    </div>
    <v-row class="text-center">
     <v-col>
        <v-btn>
          <router-link @click="regresar" to="/generalEvaluaciones" class="regresar">
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
        filas: [
          {
            no:1,
          },
          {
            no:2,
          },
          {
            no:3,
          },
          {
            no:4,
          },
          {
            no:5,
          },
          {
            no:6,
          },
        ],
      }
    },
    methods: {
      verEvaluacion() {
        this.$router.push('/detalleEvaluacion')
      },
      regresar() {
      this.$router.back();
    },
    darCupo() {
      window.alert('se le brindo el cupo al estudiante')
    },
    },
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
    height: 40px;
    box-shadow: none;
  }
  .regresar{
    color: white;
    text-decoration: none;
  }

  .tabla {
    background-color: #c6d6d6;
  }

    .boton{
    color: darkred;
    font-weight: bold;
    text-decoration: none;
    background-color: #C6D6D6;
}

</style>