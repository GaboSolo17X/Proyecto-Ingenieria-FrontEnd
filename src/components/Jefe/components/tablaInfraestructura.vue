<template>
  <v-card color="#C6D6D6" class="cartita">
    <div>
      <v-row>
        <v-col cols="2" class="subhead">
          <h4>Centro:</h4>
        </v-col>
        <v-col>
          <v-select
            v-model="selectedCategory"
            :items="edificios"
            label="Seleccione un centro regional"
            variant="solo"
          ></v-select>
        </v-col>
      </v-row>
      <v-divider class="border-opacity-100 linea" color="error"></v-divider>
      <div class="tabla">
        <h2>Edificios</h2>
        <v-table class="tabla">
          <thead>
            <tr>
              <th class="text-left">Codigo</th>
              <th class="text-left">Centro</th>
              <th class="text-left">Departamento</th>
              <th class="text-left">Aulas</th>
              <th v-if="selectedCategory === 'CU'" class="text-left">
                Niveles
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in filteredItems" :key="item.codigo">
              <td>{{ item.codigo }}</td>
              <td>{{ item.category }}</td>
              <td>{{ item.departamento }}</td>
              <td>{{ item.aulas}}</td>
              <td v-if="selectedCategory === 'CU'">{{ item.niveles }}</td>
            </tr>
          </tbody>
        </v-table>
      </div>
      <v-divider class="border-opacity-100 linea" color="error"></v-divider>

      <div class="tabla">
        <h2>Aulas</h2>
        <v-table v-if="selectedCategory === 'CU'" class="tabla">
          <thead>
            <tr>
              <th class="text-left">Codigo</th>
              <th class="text-left">Edificio</th>
              <th class="text-left">Nivel</th>
              <th class="text-left">Estado</th>
              <th class="text-left">Capacidad</th>
              <th class="text-left">Tipo</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="aula in aulas" :key="aula.codigo">
              <td>{{ aula.codigo }}</td>
              <td>{{ aula.edificio }}</td>
              <td>{{ aula.nivel }}</td>
              <td>{{ aula.estado }}</td>
              <td>{{ aula.capacidad }}</td>
              <td>{{ aula.tipo }}</td>
            </tr>
          </tbody>
        </v-table>
      </div>
    </div>
  </v-card>
</template>

<script>
  export default {
    data() {
      return {
        selectedCategory: null,
        edificios: ['CU', 'UNAH-VS', 'UNAH-CURLA', 'UNAH-CURLP'],
        items: [
          { category: 'Desserts', name: 'Cake', price: '$5', calories: 300 },
          {
            category: 'Desserts',
            name: 'Ice Cream',
            price: '$4',
            calories: 250,
          },
          {
            category: 'CU',
            codigo: 'B1',
            departamento: 'Francisco Morazan',
            aulas: '20',
            niveles: '04',
          },
          {
            category: 'CU',
            codigo: 'B2',
            departamento: 'Francisco Morazan',
            aulas: '20',
            niveles: '04',
          },
        ],
        aulas: [
          {
            codigo: '402',
            edificio: 'B2',
            nivel: 4,
            estado: 'suficiente',
            capacidad: 40,
            tipo: 'aula',
          },
          {
            codigo: '306',
            edificio: 'B2',
            nivel: 3,
            estado: 'en mantenimiento',
            capacidad: 25,
            tipo: 'aula',
          },
          {
            codigo: '202',
            edificio: 'B2',
            nivel: 2,
            estado: 'excelente',
            capacidad: 25,
            tipo: 'Laboratorio',
          },
        ],
      }
    },
    computed: {
      filteredItems() {
        if (!this.selectedCategory) {
          return []
        }

        return this.items.filter(
          item => item.category === this.selectedCategory
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

  .botonRegresar {
    background-color: #a92727;
    color: white;
    height: 40px;
    box-shadow: none;
  }
  .boton {
    color: darkred;
    font-weight: bold;
    text-decoration: none;
    background-color: #c6d6d6;
  }

  .tbody {
    background-color: #c6d6d6;
  }

  .cartita {
    box-shadow: none;
    padding: 10px;
  }

  .subhead {
    padding-top: 2rem;
    max-width: 6rem;
  }

  .tabla {
    background-color: #c6d6d6;
  }

  .linea {
    padding: 10px;
    margin: 10px;
  }
</style>
