<template>
  <v-card flat >
    <div class="tabla" >
      <v-table
      fixed-header
      height="450px"
    >
      <thead class="encabezado">
        <tr>
          <th class="text-left">
           Codigo
          </th>
          <th class="text-left">
            Nombre
          </th>
          <th class="text-left">
            Seccion
          </th>
          <th class="text-left">
            Edificio
          </th>
          <th class="text-left">
            Aula
          </th>
          <th class="text-left">
            Número de docente
          </th>
          <th class="text-left">
            Docente
          </th>
          <th class="text-left">
            Estudiantes
          </th>
          <th class="text-left">
            Cupos
          </th>
  
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in clases"
          :key="item.codigo"
          :search="search"
        >
          <td>{{ item.codigo }}</td>
          <td>{{ item.nombre }}</td>
          <td>{{ item.seccion }}</td>
          <td>{{ item.edificio }}</td>
          <td>{{ item.aula }}</td>
          <td>{{ item.numeroDocente }}</td>
          <td>{{ item.docente }}</td>
          <td>{{ item.estudiantes }}</td>
          <td>{{ item.cupos }}</td>
        </tr>
      </tbody>
    </v-table>
    </div>
    <v-row class="text-center mt-4">
      <v-col>
        <v-btn @click="downloadPDF">
          <v-icon right>
            <i class="fa:fas fa-solid fa-file-pdf"></i>
          </v-icon>
          Descargar PDF
        </v-btn>
      </v-col>

      <v-col>
        <v-btn @click="downloadCSV">
          <v-icon right>
            <i class="fa:fas fa-solid fa-file-excel"></i>
          </v-icon>
          Descargar CSV
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
import { ref } from "vue";
  export default {
    setup() {
      let clases = ref([]);
        clases = [
          {
            codigo: 'IS-811',
            nombre: 'Seguridad Informatica',
            seccion: 1100,
            edificio: 'B2',
            aula: 402,
            numeroDocente: 18098213,
            docente: 'Weslin Barahona',
            estudiantes: 24,
            cupos: 5,
          },
          {
            codigo: 'IS-811',
            nombre: 'Seguridad Informatica',
            seccion: 1100,
            edificio: 'B2',
            aula: 402,
            numeroDocente: 18098213,
            docente: 'Weslin Barahona',
            estudiantes: 24,
            cupos: 5,
          },
          {
            codigo: 'IS-811',
            nombre: 'Seguridad Informatica',
            seccion: 1100,
            edificio: 'B2',
            aula: 402,
            numeroDocente: 18098213,
            docente: 'Weslin Barahona',
            estudiantes: 24,
            cupos: 5,
          },
          {
            codigo: 'IS-811',
            nombre: 'Seguridad Informatica',
            seccion: 1100,
            edificio: 'B2',
            aula: 402,
            numeroDocente: 18098213,
            docente: 'Weslin Barahona',
            estudiantes: 24,
            cupos: 5,
          },
          {
            codigo: 'IS-511',
            nombre: 'Base Datos',
            seccion: 1100,
            edificio: 'B2',
            aula: 402,
            numeroDocente: 18098213,
            docente: 'Weslin Barahona',
            estudiantes: 24,
            cupos: 5,
          },
          {
            codigo: 'IS-811',
            nombre: 'Seguridad Informatica',
            seccion: 1100,
            edificio: 'B2',
            aula: 402,
            numeroDocente: 18098213,
            docente: 'Weslin Barahona',
            estudiantes: 24,
            cupos: 5,
          },
          {
            codigo: 'IS-811',
            nombre: 'Seguridad Informatica',
            seccion: 1100,
            edificio: 'B2',
            aula: 402,
            numeroDocente: 18098213,
            docente: 'Weslin Barahona',
            estudiantes: 24,
            cupos: 5,
          }
        ];
      return {
        search: '',
        clases,
    };
    },
    methods: {
      downloadPDF() {
        console.log('Descargando PDF')
      },
      downloadCSV() {
        console.log('Descargando CSV')
      },
    },
  }
</script>
<style scoped>

.text-left{
  background-color: #A92727 !important;
  color:white !important;
  font-family: 'Rubik';
  text-align: center;
}

.v-btn{
  background-color: #A92727;
  color: white;
  height: 45px;
}
</style>