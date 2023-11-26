<template>
  <v-card>
    <v-tabs v-model="tab" class="encabezado">
      <v-tab value="carrera">Cambio de carrera</v-tab>
      <v-tab value="cancelaciones">Cancelaciones excepcionales</v-tab>
      <v-tab value="centro">Cambio de centro</v-tab>
    </v-tabs>
    <v-card-text>
      <v-window v-model="tab">
        <v-window-item value="carrera">
          <div class="tabla">
            <v-table fixed-header height="400px">
              <tbody>
                <tr v-for="fila in carreras" :key="fila.numero">
                  <td>
                    <v-icon icon="fa:fas fa-solid fa-envelope"></v-icon>
                  </td>
                  <td>{{ fila.nombre }}</td>
                  <td>{{ fila.numero }}</td>
                  <td>{{ fila.correo }}</td>
                  <td>
                    <!-- here is the button -->
                    <v-btn size="x-small" variant="flat" class="boton" @click="openDialogCarrera(fila)">Revisar</v-btn>
                  </td>
                </tr>
              </tbody>
            </v-table>
          </div></v-window-item
        >

        <v-window-item value="cancelaciones">
          <div class="tabla">
            <v-table fixed-header height="400px">
              <tbody>
                <tr v-for="fila in cancelaciones" :key="fila.numero">
                  <td>
                    <v-icon icon="fa:fas fa-solid fa-envelope"></v-icon>
                  </td>
                  <td>{{ fila.nombre }}</td>
                  <td>{{ fila.numero }}</td>
                  <td>{{ fila.correo }}</td>
                  <td>
                    <v-btn size="x-small" variant="flat" class="boton" @click="openDialogCancelacion(fila)">Revisar</v-btn>
                  </td>
                </tr>
              </tbody>
            </v-table>
          </div>
        </v-window-item>

        <v-window-item value="centro"> <div class="tabla">
            <v-table fixed-header height="400px">
              <tbody>
                <tr v-for="fila in centro" :key="fila.numero">
                  <td>
                    <v-icon icon="fa:fas fa-solid fa-envelope"></v-icon>
                  </td>
                  <td>{{ fila.nombre }}</td>
                  <td>{{ fila.numero }}</td>
                  <td>{{ fila.correo }}</td>
                  <td>
                    <!-- here is the button -->
                    <v-btn size="x-small" variant="flat" class="boton" @click="openDialogCentro(fila)">Revisar</v-btn>
                  </td>
                </tr>
              </tbody>
            </v-table>
          </div></v-window-item>
      </v-window>
    </v-card-text>
    <!-- DIALOGO PARA CAMBIAR DE CENTRO -->
         <v-dialog v-model="dialogcentro" max-width="800">
            <v-card class="mx-auto cartita" >

        <div class="grid-container ma-3">

          <div class="grid-item">{{ selectedRow.nombre }}</div>
          <div class="correo">{{ selectedRow.correo }}</div>
          <div class="grid-item">Ciudad Universitaria</div>
          <div class="grid-item">{{ selectedRow.numero }}</div>
          <div class="grid-item"></div>
          <div class="grid-item">indice: 90%</div>
        </div>
        <v-card-text>
          <div class="segunda">
            <div class="segundacol large">Centro actual:UNAH-VS</div>
            <div class="elicono small"><v-icon icon="fa:fas fa-solid fa-rotate"></v-icon></div>
            <div class="segundacol large">Centro deseado:CU</div>
          </div>
        </v-card-text>

        <v-card-text>
          <div class="justificacion">
            <h3>Justificacion</h3>
            <br />
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam...
          </div>
        </v-card-text>

        <v-divider></v-divider>

        <div class="pa-4 text-center">
          <v-row>
            <v-col>
              <v-btn
                class="text-none aceptar"
                min-width="92"
                rounded
                variant="outlined"
                @click="dialog = false"
              >
                Aceptar
              </v-btn>
            </v-col>
            <v-col>
              <v-btn
                class="text-none rechazar"
                min-width="92"
                rounded
                variant="outlined"
                @click="closeDialog"
              >
                Rechazar
              </v-btn>
            </v-col>
          </v-row>
        </div>
      </v-card>
    </v-dialog>
    <!-- DIALOGO PARA CAMBIAR DE CARRERA -->
     <v-dialog v-model="dialogcarrera" max-width="800">
            <v-card class="mx-auto cartita" >
        <!-- First Row -->
        <div class="grid-container ma-3">
          <!-- Row 1 -->
          <div class="grid-item">{{ selectedRow.nombre }}</div>
          <div class="correo">{{ selectedRow.correo }}</div>
          <div class="grid-item">Ciudad Universitaria</div>

          <!-- Row 2 -->
          <div class="grid-item">{{ selectedRow.numero }}</div>
          <div class="grid-item"></div>
          <div class="grid-item">indice: 90%</div>
        </div>
        <!-- Second Row -->
        <v-card-text>
          <div class="segunda">
            <!-- Row 1 -->
            <div class="segundacol large">Carrera actual:Ingenieria en sistemas</div>
            <div class="elicono small"><v-icon icon="fa:fas fa-solid fa-rotate"></v-icon></div>
            <div class="segundacol large">Carrera deseada:Fotografia</div>
          </div>
        </v-card-text>

        <v-card-text>
          <div class="justificacion">
            <h3>Justificacion</h3>
            <br />
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam...
          </div>
        </v-card-text>

        <v-divider></v-divider>

        <div class="pa-4 text-center">
          <v-row>
            <v-col>
              <v-btn
                class="text-none aceptar"
                min-width="92"
                rounded
                variant="outlined"
                @click="dialog = false"
              >
                Aceptar
              </v-btn>
            </v-col>
            <v-col>
              <v-btn
                class="text-none rechazar"
                min-width="92"
                rounded
                variant="outlined"
                @click="closeDialog"
              >
                Rechazar
              </v-btn>
            </v-col>
          </v-row>
        </div>
      </v-card>
    </v-dialog>
        <!-- DIALOG DE CANCELACIONES EXCEPCIONALES  -->
         <v-dialog v-model="dialogcancelaciones" max-width="800">
            <v-card class="mx-auto cartita" >

        <div class="grid-container ma-3">
          <div class="grid-item">{{ selectedRow.nombre }}</div>
          <div class="correo">{{ selectedRow.correo }}</div>
          <div class="grid-item">Ciudad Universitaria</div>
          <div class="grid-item">{{ selectedRow.numero }}</div>
          <div class="grid-item"></div>
          <div class="grid-item">indice: 90%</div>
        </div>
        <v-card-text>
          <div class="segunda">
            <div class="segundacol">
            <ul>
              <li>Clases que desea cancelar:</li>
              <li>IS802  INGENIERIA DE SOFTWARE  1100</li>
              <li>IS802  INGENIERIA DE SOFTWARE  1100</li>
              <li>IS802  INGENIERIA DE SOFTWARE  1100</li>
            </ul>
            </div>
            <div class="elicono"></div>
            <div class="iconazo">
              <v-btn class="btniconazo" @click="descargar">
              <v-icon icon="fa:fas fa-solid fa-file"></v-icon>
              </v-btn>
              </div>
          </div>
        </v-card-text>

        <v-card-text>
          <div class="justificacion">
            <h3>Justificacion</h3>
            <br />
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam...
          </div>
        </v-card-text>

        <v-divider></v-divider>

        <div class="pa-4 text-center">
          <v-row>
            <v-col>
              <v-btn
                class="text-none aceptar"
                min-width="92"
                rounded
                variant="outlined"
                @click="dialog = false"
              >
                Aceptar
              </v-btn>
            </v-col>
            <v-col>
              <v-btn
                class="text-none rechazar"
                min-width="92"
                rounded
                variant="outlined"
                @click="closeDialog"
              >
                Rechazar
              </v-btn>
            </v-col>
          </v-row>
        </div>
      </v-card>
    </v-dialog>
  </v-card>
</template>
<script>
  export default {
    props: ['carreras'],
    data() {
      return {
        tab: null,
        selectedRow: null, // Track the selected row
        dialogcarrera: false, 
        dialogcentro: false,
        dialogcancelaciones: false,  
        carreras: [
          {
            numero: 20201004061,
            nombre: 'Weslin Barahona',
            correo: 'correo5unah@gmail.com',
          },
          {
            numero: 20191004061,
            nombre: 'Weslin Moises Barahona Carbajal',
            correo: 'correo5unah@gmail.com',
          },
          {
            numero: 20181004061,
            nombre: 'Victor Barahona',
            correo: 'correo5unah@gmail.com',
          },
        ],
        cancelaciones: [
          {
            numero: 20201004061,
            nombre: 'Ericka Aguilar',
            correo: 'correo5unah@gmail.com',
          },
          {
            numero: 20191004061,
            nombre: 'Andrea Gallardo',
            correo: 'correo5unah@gmail.com',
          },
          {
            numero: 20181004061,
            nombre: 'Weslin Barahona',
            correo: 'correo5unah@gmail.com',
          },
        ],
        centro: [
          {
            numero: 20201004061,
            nombre: 'Yensi Armijo',
            correo: 'correo5unah@gmail.com',
          },
          {
            numero: 20191004061,
            nombre: 'Gabriel Solorzano',
            correo: 'correo5unah@gmail.com',
          },
          {
            numero: 20181004061,
            nombre: 'Elias Cerna',
            correo: 'correo5unah@gmail.com',
          },
        ],
      }
    },
    methods: {
    openDialogCarrera(row) {
      // Set the selected row and open the dialog
      this.selectedRow = row;
      this.dialogcarrera = true;
    },
    openDialogCentro(row) {
      // Set the selected row and open the dialog
      this.selectedRow = row;
      this.dialogcentro = true;
    },
    openDialogCancelacion(row) {
      // Set the selected row and open the dialog
      this.selectedRow = row;
      this.dialogcancelaciones = true;
    },
    closeDialog() {
      // Close the dialog
      this.dialogcarrera = false;
      this.dialogcentro = false;
      this.dialogcancelaciones = false;
    },
    descargar() {
      alert('Se ha descargado el documento evidencia_justificacion.pdf correctamente');
    },
  },
  }
</script>
<style scoped>
.encabezado{
    background-color: darkred;
    color: white;
}

.boton{
    color: darkred;
    font-weight: bold;
}

  .grid-container {
    display: grid;
    grid-template-rows: repeat(2, auto); 
    grid-template-columns: repeat(3, 1fr); 
    gap: 10px; 
    background-color: #77181e;
    border-radius: 30px;
    color: white;
  }

  .grid-item {
    display: flex;
    align-items: center; 
    justify-content: center;
    padding: 5px;
    text-align: center;
  }

  .correo {
    padding: 10px;
    text-align: start;
  }

  .segunda {
    display: grid;
    grid-template-rows: auto; 
    grid-template-columns: repeat(3, 1fr); 
    gap: 5px; 
    
  }

  .segundacol {
    display: flex;
    align-items: center; 
    justify-content: center;
    padding: 10px;
    text-align: center;
    background-color: #77181e;
    border-radius: 15px;
    color: white;
    font-size: 15px;
    grid-row: span 2;
    width: 300px; 
  }
  .btniconazo{
    width: 100%; 
    height: 100%;
    background-color: #77181e;
    border-style: none;
    box-shadow: none;
    color: white;
    font-size: 50px;
  }
  .iconazo{
    display: flex;
    align-items: center; 
    justify-content: center;
    padding: 10px;
    text-align: center;
    background-color: #77181e;
    border-radius: 15px;
    color: white;
    font-size: 50px;
    grid-row: span 2;
    width: 200px; 
  }
  .elicono {
    padding: 5px;
    margin-top: 10px;
    text-align: center;
    color: white;
    grid-row: span 1; 
    width: 30px;
    margin-left: 40%;

  }
  .cartita {
    background-color: #282832;
    padding: 10px;
    border-radius: 50px;
  }

  .justificacion {
    background-color: white;
    padding: 10px;
    border-radius: 20px;
  }

  .rechazar {
    background-color: #a92727;
    box-shadow: none;
    color: white;
  }

  .aceptar {
    background-color: goldenrod;
    box-shadow: none;
    color: white;
  }
  ul {
      list-style: none; 
      padding: 0; 
      }

  li {
      font-size: 14px; 
      margin-bottom: 8px; 
      }

</style>
