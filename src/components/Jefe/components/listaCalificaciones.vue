<template>
  <v-card color="#C6D6D6" flat>
    <div class="tabla">
      <v-table fixed-header height="400px" class="tabla">
        <thead class="encabezado">
          <tr>
            <th class="text-left">Número de cuenta</th>
            <th class="text-left">Nombre completo</th>
            <th class="text-left">Nota</th>
            <th class="text-left">Observacion</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="fila in filas" :key="fila.numero">
            <td>{{ fila.numero }}</td>
            <td>{{ fila.nombre }}</td>
            <td>{{ fila.nota }}</td>
            <td>{{ fila.observacion }}</td>
          </tr>
        </tbody>
      </v-table>
    </div>
    <v-row class="text-center">
     <v-col>
        <v-btn>
          <router-link @click="regresar" to="/calificaciones" class="regresar">
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
            numero:2020201000915,
            nombre:'Yensi Elisabeth Armijo',
            nota:98,
            observacion:'APR',
          },
          {
            numero:2020201002345,
            nombre:'Gabriel Omar Solorzano',
            nota:65,
            observacion:'APR',
          },
          {
            numero:2020201007862,
            nombre:'Weslin Moises Barahona',
            nota:20,
            observacion:'REP',
          },
          {
            numero:2020201007862,
            nombre:'Victor Miguel Barahona',
            nota:23,
            observacion:'REP',
          },
        ],
      }
    },
    methods: {
      regresar() {
      this.$router.back();
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