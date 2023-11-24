<template>
  <v-card flat color="#c6d6d6" title="Estudiantes Matriculados">
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
      <v-table fixed-header height="300px" class="tabla">
        <thead class="encabezado">
          <tr>
            <th class="text-left">Numero de cuenta</th>
            <th class="text-left">Nombre completo</th>
            <th class="text-left">Correo electrónico</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="fila in displayedClases" :key="fila.numero">
            <td>{{ fila.numero }}</td>
            <td>{{ fila.nombre }}</td>
            <td>{{ fila.correo }}</td>
          </tr>
        </tbody>
      </v-table>
      <v-pagination
      v-model="currentPage"
      :length="Math.ceil(clases.length / itemsPerPage)"
    ></v-pagination>
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
            correo: 'weslin@barahona.unah',
          },
          {
            numero: 20191004061,
            nombre: 'Weslin Moises Barahona Carbajal',
            correo: 'weslin@barahona.unah',
          },
          {
            numero: 20201004061,
            nombre: 'Weslin Barahona',
            correo: 'weslin@barahona.unah',
          },
          {
            numero: 20201004061,
            nombre: 'Weslin Barahona',
            correo: 'weslin@barahona.unah',
          },
          {
            numero: 20201004061,
            nombre: 'Gabriel Solorzano',
            correo: 'gabriel@solo.unah',
          },
          {
            numero: 20201008955,
            nombre: 'Elisabeth Armijo',
            correo: 'eli@armijo.unah',
          },
        ],
        currentPage: 1,
        itemsPerPage: 3,
      }
    },
    
    methods: {
      
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
      
    displayedClases() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.clases.slice(startIndex, endIndex);
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