<template>
  <v-card color="#C6D6D6" flat title="Asignaturas con lista de espera">
    <div class="tabla">
      <v-table fixed-header height="500px" class="tabla">
        <thead class="encabezado">
          <tr>
            <th class="text-left">Codigo</th>
            <th class="text-left">Asignatura</th>
            <th class="text-left">Hi</th>
            <th class="text-left">Hf</th>
            <th class="text-left">Dias</th>
            <th class="text-left">Docente</th>
            <th class="text-left">Cupos</th>
            <th class="text-left">En espera</th>
            <th class="text-left"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="fila in filas" :key="fila.codigo">
            <td>{{ fila.codigo }}</td>
            <td>{{ fila.asignatura }}</td>
            <td>{{ fila.hi }}</td>
            <td>{{ fila.hf }}</td>
            <td>{{ fila.dias }}</td>
            <td>{{ fila.docente }}</td>
            <td>{{ fila.cupos }}</td>
            <td>{{ fila.espera }}</td>
            <td>
              <v-btn size="x-small" @click="verLista(fila.codigo, fila.asignatura, fila.espera)"
                >ver lista</v-btn
              >
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
            codigo:'IS-501',
            asignatura: 'Base de datos I',
            hi: 1000,
            hf: 1100,
            dias: 'Lu, Ma, Mi, Ju',
            docente: 'Weslin Barahona',
            cupos: 25,
            espera: 86,
          },
          {
            codigo:'IS-411',
            asignatura: 'Programacion Orientada',
            hi: 1000,
            hf: 1100,
            dias: 'Lu, Ma, Mi, Ju',
            docente: 'Weslin Barahona',
            cupos: 25,
            espera: 86,
          },
          {
            codigo:'IS-511',
            asignatura: 'Redes de datos I',
            hi: 1000,
            hf: 1100,
            dias: 'Lu, Ma, Mi, Ju',
            docente: 'Weslin Barahona',
            cupos: 25,
            espera: 86,
          },
          {
            codigo:'IS-511',
            asignatura: 'Redes de datos I',
            hi: 1000,
            hf: 1100,
            dias: 'Lu, Ma, Mi, Ju',
            docente: 'Weslin Barahona',
            cupos: 25,
            espera: 86,
          },
          {
            codigo:'IS-511',
            asignatura: 'Redes de datos I',
            hi: 1000,
            hf: 1100,
            dias: 'Lu, Ma, Mi, Ju',
            docente: 'Weslin Barahona',
            cupos: 25,
            espera: 86,
          },
          {
            codigo:'IS-511',
            asignatura: 'Redes de datos I',
            hi: 1000,
            hf: 1100,
            dias: 'Lu, Ma, Mi, Ju',
            docente: 'Weslin Barahona',
            cupos: 25,
            espera: 86,
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

</style>