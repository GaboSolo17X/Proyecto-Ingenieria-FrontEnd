<template>
  <v-card color="#C6D6D6" flat title="Asignaturas con lista de espera">
    <div class="tabla">
      <v-table fixed-header height="500px" class="tabla">
        <thead class="encabezado">
          <tr>
            <th class="text-left">No</th>
            <th class="text-left">Número de cuenta</th>
            <th class="text-left">Nombre completo</th>
            <th class="text-left">Indice</th>
            <th class="text-left"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="fila in filas" :key="fila.numero">
            <td>{{ fila.no }}</td>
            <td>{{ fila.numero }}</td>
            <td>{{ fila.nombre }}</td>
            <td>{{ fila.indice }}</td>
            <td>
              <v-btn size="x-small" variant="flat" class="boton" @click="darCupo()">
          <v-icon right>
            <i class="fa:fas fa-solid fa-circle-plus"></i>
          </v-icon>
          brindar cupo
        </v-btn>
            </td>
          </tr>
        </tbody>
      </v-table>
    </div>
    <v-row class="text-center">
     <v-col>
        <v-btn>
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
        filas: [
          {
            no:1,
            numero: 20201004061,
            nombre: 'Gabriel Omar Solorzano',
            indice: 90,
          },
          {
            no:2,
            numero: 20201004052,
            nombre: 'Yensi Elisabeth Armijo',
            indice: 100,
          },
          {
            no:3,
            numero: 20191004061,
            nombre: 'Weslin Moises Barahona',
            indice: 86,
          },
          {
            no:4,
            numero: 20181004061,
            nombre: 'Victor Miguel Barahona',
            indice: 92,
          },
          {
            no:5,
            numero: 20201005081,
            nombre: 'Andrea Nicolle Gallardo',
            indice: 99,
          },
          {
            no:1,
            numero: 20201004061,
            nombre: 'Gabriel Omar Solorzano',
            indice: 90,
          },
        ],
      }
    },
    methods: {
      verLista(codigo, nombreAsignatura, enEspera) {
        this.$router.push({
          name: 'detalleEspera',
          params: { codigo: codigo,
                    nombre: nombreAsignatura,
                    enEspera: enEspera,
           },
        })
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