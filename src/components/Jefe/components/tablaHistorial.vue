<template>
  <v-card flat color="#c6d6d6">
    <template v-slot:text>
      <v-text-field
        v-model="search"
        label="Buscar estudiante"
        single-line
        variant="outlined"
        append-inner-icon="mdi-magnify"
        hide-details
        class="text-field"
        rounded
      ></v-text-field>
    </template>
    <div class="tabla">
      <v-table fixed-header height="400px" class="tabla">
        <thead class="encabezado">
          <tr>
            <th class="text-left">Numero de cuenta</th>
            <th class="text-left">Nombre</th>
            <th class="text-left">Centro</th>
            <th class="text-left">Indice</th>
            <th class="text-left"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="fila in clases" :key="fila.numero">
            <td>{{ fila.numero }}</td>
            <td>{{ fila.nombre }}</td>
            <td>{{ fila.centro }}</td>
            <td>{{ fila.indice }}</td>
            <td>
              <v-btn size="x-small" @click="verHistorial(fila.numero, fila.nombre, fila.indice)"
                >ver historial</v-btn
              >
            </td>
          </tr>
        </tbody>
      </v-table>
    </div>
    <v-row class="text-center">
     <v-col>
        <v-btn>
          <router-link @click="regresar" to="/parteEstudiante" class="regresar">
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
        filas: [
          {
            numero: 20201004061,
            nombre: 'Weslin Barahona',
            centro: 'CU',
            indice: 90,
          },
          {
            numero: 20191004061,
            nombre: 'Weslin Moises Barahona Carbajal',
            centro: 'CU',
            indice: 85,
          },
          {
            numero: 20201004061,
            nombre: 'Weslin Barahona',
            centro: 'CU',
            indice: 67,
          },
          {
            numero: 20201004061,
            nombre: 'Weslin Barahona',
            centro: 'CU',
            indice: 98,
          },
          {
            numero: 20201004061,
            nombre: 'Gabriel Solorzano',
            centro: 'CU',
            indice: 100,
          },
          {
            numero: 20201004061,
            nombre: 'Weslin Barahona',
            centro: 'CU',
          },
        ],
      }
    },
    methods: {
      verHistorial(idEstudiante, nombreEstudiante, indiceEstudiante) {
        this.$router.push({
          name: 'detalleHistorial',
          params: { id: idEstudiante,
                    nombre: nombreEstudiante,
                    indice: indiceEstudiante,
           },
        })
      },
      regresar() {
      this.$router.back();
    },
    },
    computed: {
      clases() {
        const searchTerm = this.search.toLowerCase()
        return this.filas.filter(item =>
          Object.values(item).some(value =>
            String(value).toLowerCase().includes(searchTerm)
          )
        )
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

  .tabla{
    background-color: #c6d6d6;
  }

</style>