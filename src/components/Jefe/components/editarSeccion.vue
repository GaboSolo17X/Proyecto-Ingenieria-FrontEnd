<template>
  <v-card color="#C6D6D6" class="cartita">
    <v-card-title class="text-h5 font-weight-bold">
      Lista de secciones existentes
    </v-card-title>
    <v-card-text class="font-weight-medium">
      Ingenieria en sistemas
    </v-card-text>
    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
        <v-card-title class="text-h5"
          >¿Por qué desea cancelar esta sección?</v-card-title
        >
        <v-card-text>
        <v-text-field v-model="eliminarJusti" label="Escriba una justificacion" :rules="[(v) => !!v || 'Llene el campo']" variant="outlined"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="closeDelete"
            >Cerrar</v-btn
          >
          <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm"
            >Enviar y confirmar</v-btn
          >
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <div class="tabla">
      <v-table fixed-header height="400px" class="tabla">
        <thead class="encabezado">
          <tr>
            <th class="text-left">Codigo</th>
            <th class="text-left">Asignatura</th>
            <th class="text-left">Hi</th>
            <th class="text-left">Hf</th>
            <th class="text-left">Dias</th>
            <th class="text-left">Profesor</th>
            <th class="text-left">Seccion</th>
            <th class="text-left">Cupos</th>
            <th class="text-left"></th>
          </tr>
        </thead>
        <tbody class="tabla">
          <tr v-for="fila in clases" :key="fila.codigo">
            <td>{{ fila.codigo }}</td>
            <td>{{ fila.asignatura }}</td>
            <td>{{ fila.hi }}</td>
            <td>{{ fila.hf }}</td>
            <td>{{ fila.dias }}</td>
            <td>{{ fila.profesor }}</td>
            <td>{{ fila.seccion }}</td>
            <td>
              <v-row>
                <v-btn class="cupos" icon @click="incrementCupos(fila)">
                  <v-icon class="iconito"><i class="fa:fas fa-solid fa-plus"></i></v-icon>
                </v-btn>
                {{ fila.cupos }}
                <v-btn class="cupos" icon @click="decrementCupos(fila)">
                  <v-icon class="iconito"><i class="fa:fas fa-solid fa-minus"></i></v-icon>
                </v-btn>
              </v-row>
            </td>
            <td>
              <v-icon size="small" @click="deleteItem(fila)">
                <i class="fa:fas fa-solid fa-trash"></i>
              </v-icon>
            </td>
          </tr>
        </tbody>
      </v-table>
    </div>
    <v-row class="text-center">
      <v-col>
        <v-btn class="botonRegresar">
          <router-link to="/principalJefe" class="regresar">
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
        dialogDelete: false,
        itemToDelete: null,
        eliminarJusti: '',
        clases: [
          {
            codigo: 'IS-501',
            asignatura: 'Bases de datos I',
            hi: '08:00',
            hf: '09:00',
            dias: 'Lu, Ma, Mi, Ju',
            profesor: 'Weslin Barahona',
            seccion: 1000,
            cupos: 25,
          },
          {
            codigo: 'IS-501',
            asignatura: 'Bases de datos I',
            hi: '08:00',
            hf: '09:00',
            dias: 'Lu, Ma, Mi, Ju',
            profesor: 'Weslin Barahona',
            seccion: 1000,
            cupos: 25,
          },
          {
            codigo: 'IS-501',
            asignatura: 'Bases de datos I',
            hi: '08:00',
            hf: '09:00',
            dias: 'Lu, Ma, Mi, Ju',
            profesor: 'Weslin Barahona',
            seccion: 1000,
            cupos: 25,
          },
          {
            codigo: 'IS-501',
            asignatura: 'Bases de datos I',
            hi: '08:00',
            hf: '09:00',
            dias: 'Lu, Ma, Mi, Ju',
            profesor: 'Weslin Barahona',
            seccion: 1000,
            cupos: 25,
          },
          {
            codigo: 'IS-501',
            asignatura: 'Bases de datos I',
            hi: '08:00',
            hf: '09:00',
            dias: 'Lu, Ma, Mi, Ju',
            profesor: 'Weslin Barahona',
            seccion: 1000,
            cupos: 25,
          },
        ],
      }
    },
    methods: {
      deleteItem(item) {
        // Show the delete confirmation dialog
        this.dialogDelete = true

        // Set the item to be deleted
        this.itemToDelete = item
      },
      closeDelete() {
        // Close the delete confirmation dialog
        this.dialogDelete = false

        // Clear the item to be deleted
        this.itemToDelete = null
      },
      incrementCupos(item) {
        // Increment the 'cupos' value
        item.cupos++
      },

      decrementCupos(item) {
        // Ensure 'cupos' doesn't go below 0
        if (item.cupos > 0) {
          // Decrement the 'cupos' value
          item.cupos--
        }
      },
      deleteItemConfirm() {
        // Perform the actual deletion
        const index = this.clases.indexOf(this.itemToDelete)
        if (index !== -1) {
          this.clases.splice(index, 1)
        }
        this.dialogDelete = false
        console.log('Jutificacion de eliminar seccion:', this.eliminarJusti);

        // borrar la fila
        this.itemToDelete = null
        this.eliminarJusti = '';
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
  .regresar {
    color: white;
    text-decoration: none;
  }

  .cartita {
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

  .tabla {
    background-color: #c6d6d6;
  }

  .cupos {
    height: 1rem;
    width: 1rem;
    border-radius: 5px;
    margin: 3px;
  }

  .iconito {
    font-size: 1rem;
  }

</style>
