<template>
  <v-card flat title="Evaluaciones docente" class="tabla">
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
            <th class="text-left">Numero de empleado</th>
            <th class="text-left">Nombre completo</th>
            <th class="text-left">Centro</th>
            <th class="text-left">Clase</th>
            <th class="text-left"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="fila in empleados" :key="fila.numero">
            <td>{{ fila.numero }}</td>
            <td>{{ fila.nombre }}</td>
            <td>{{ fila.centro }}</td>
            <td>{{ fila.clase}}</td>
            <td>
              <v-btn size="x-small" @click="verHistorial(fila.nombre, fila.clase)"
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
          <router-link @click="regresar" to="/ventanaDocente" class="regresar">
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
            numero: 2020201000915,
            nombre: 'Ericka Paulette Aguilar',
            centro: 'UNAH-VS',
            clase: 'IS-210',
          },
          {
            numero: 2019201000915,
            nombre: 'Weslin Moises Barahona',
            centro: 'CURLA',
            clase: 'IS-110',
          },
          {
            numero: 2020201000915,
            nombre: 'Elder Javier Solano',
            centro: 'CU',
            clase: 'IS-810',
          },
          {
            numero: 2019201000915,
            nombre: 'Weslin Moises Barahona',
            centro: 'CURLA',
            clase: 'IS-110',
          },
        ],
      }
    },
    methods: {
      verHistorial(nombreDocente, clase) {
        this.$router.push({
          name: 'verEvaluaciones',
          params: {
                    nombre: nombreDocente,
                    clase: clase,
           },
        })
      },
      regresar() {
      this.$router.back();
    },
    },
    computed: {
      empleados() {
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