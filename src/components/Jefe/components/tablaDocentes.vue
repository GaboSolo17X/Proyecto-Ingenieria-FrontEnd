<template>
  <v-card flat title="Listado de docente" class="tabla">
    <template v-slot:text>
      <v-text-field
        v-model="search"
        label="Buscar"
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
            <th class="text-left">Correo electronico</th>
            <th class="text-left"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="fila in empleados" :key="fila.numero">
            <td>{{ fila.numero }}</td>
            <td>{{ fila.nombre }}</td>
            <td>{{ fila.correo }}</td>
            <td>
              <v-btn size="x-small" @click="reiniciarClave()"
                >Reiniciar</v-btn
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
            correo: 'ericka@aguilar.unah',
          },
          {
            numero: 2020201003460,
            nombre: 'Gabriel Omar Solorzano',
            correo: 'gabriel@solorzano.unah',
          },
          {
            numero: 2020201004455,
            nombre: 'Weslin Moises Barahona',
            correo: 'weslin@barahona.unah',
          },
          {
            numero: 2020201004455,
            nombre: 'Weslin Moises Barahona',
            correo: 'weslin@barahona.unah',
          },
        ],
      }
    },
    methods: {
      reiniciarClave() {
        window.alert('Se le ha enviado el correo respectivo al docente')
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