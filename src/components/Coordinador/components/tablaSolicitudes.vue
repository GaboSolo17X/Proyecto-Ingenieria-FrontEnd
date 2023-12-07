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
                    <v-btn
                      size="x-small"
                      variant="flat"
                      class="boton"
                      @click="openDialogCarrera(fila, fila.idSolicitud)"
                      >Revisar</v-btn
                    >
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
                    <v-btn
                      size="x-small"
                      variant="flat"
                      class="boton"
                      @click="openDialogCancelacion(fila, fila.idSolicitud)"
                      >Revisar</v-btn
                    >
                  </td>
                </tr>
              </tbody>
            </v-table>
          </div>
        </v-window-item>

        <v-window-item value="centro">
          <div class="tabla">
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
                    <v-btn
                      size="x-small"
                      variant="flat"
                      class="boton"
                      @click="openDialogCentro(fila, fila.idSolicitud)"
                      >Revisar</v-btn
                    >
                  </td>
                </tr>
              </tbody>
            </v-table>
          </div></v-window-item
        >
      </v-window>
    </v-card-text>
    <!-- DIALOGO PARA CAMBIAR DE CENTRO -->
    <v-dialog v-model="dialogcentro" max-width="800">
      <v-card class="mx-auto cartita">
        <div class="grid-container ma-3">
          <div class="grid-item">{{ selectedRow.nombre }}</div>
          <div class="correo">{{ selectedRow.correo }}</div>
          <div class="grid-item">{{ selectedRow.centro }}</div>
          <div class="grid-item">{{ selectedRow.numero }}</div>
          <div class="grid-item"></div>
          <div class="grid-item">indice: {{ selectedRow.indice }}%</div>
        </div>
        <v-card-text>
          <div class="segunda">
            <div class="segundacol large">
              Centro actual: {{ selectedRow.centro }}
            </div>
            <div class="elicono small">
              <v-icon icon="fa:fas fa-solid fa-rotate"></v-icon>
            </div>
            <div class="segundacol large">
              Centro deseado:{{ selectedRow.cambio }}
            </div>
          </div>
        </v-card-text>

        <v-card-text>
          <div class="justificacion">
            <h3>Justificacion</h3>
            <br />
            {{ selectedRow.justificacion }}
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
                @click="actualizarSolicitud('true', selectedRow.idSolicitud)"
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
                @click="actualizarSolicitud('false', selectedRow.idSolicitud)"
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
      <v-card class="mx-auto cartita">
        <!-- First Row -->
        <div class="grid-container ma-3">
          <!-- Row 1 -->
          <div class="grid-item">{{ selectedRow.nombre }}</div>
          <div class="correo">{{ selectedRow.correo }}</div>
          <div class="grid-item">{{ selectedRow.centro }}</div>

          <!-- Row 2 -->
          <div class="grid-item">{{ selectedRow.numero }}</div>
          <div class="grid-item"></div>
          <div class="grid-item">indice: {{ selectedRow.indice }} %</div>
        </div>
        <!-- Second Row -->
        <v-card-text>
          <div class="segunda">
            <!-- Row 1 -->
            <div class="segundacol large">
              Carrera actual:{{ selectedRow.carrera }}
            </div>
            <div class="elicono small">
              <v-icon icon="fa:fas fa-solid fa-rotate"></v-icon>
            </div>
            <div class="segundacol large">
              Carrera deseada:{{ selectedRow.deseada }}
            </div>
          </div>
        </v-card-text>

        <v-card-text>
          <div class="justificacion">
            <h3>Justificacion</h3>
            <br />
            {{ selectedRow.justificacion }}
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
                @click="actualizarSolicitud('true', selectedRow.idSolicitud)"
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
                @click="actualizarSolicitud('false', selectedRow.idSolicitud)"
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
      <v-card class="mx-auto cartita">
        <div class="grid-container ma-3">
          <div class="grid-item">{{ selectedRow.nombre }}</div>
          <div class="correo">{{ selectedRow.correo }}</div>
          <div class="grid-item">{{ selectedRow.centro }}</div>
          <div class="grid-item">{{ selectedRow.numero }}</div>
          <div class="grid-item"></div>
          <div class="grid-item">indice: {{ selectedRow.indice }}%</div>
        </div>
        <v-card-text>
          <div class="segunda">
            <div class="segundacol">
              <ul>
                <li>Clases que desea cancelar:</li>
                <li v-for="clase in selectedRow.cancelada" :key="clase">
                  {{ clase }}
                </li>
              </ul>
            </div>
            <div class="elicono"></div>
            <div class="iconazo">
              <v-btn
                class="btniconazo"
                @click="descargar(selectedRow.recurso, selectedRow.nombre)"
              >
                <span class="normal">Descargar justificacion pdf</span>
                <v-icon icon="fa:fas fa-solid fa-file"></v-icon>
              </v-btn>
            </div>
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
                @click="actualizarSolicitud('true', selectedRow.idSolicitud)"
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
                @click="actualizarSolicitud('false', selectedRow.idSolicitud)"
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
import { saveAs } from "file-saver";
export default {
  props: ["carreras"],
  data() {
    return {
      tab: null,
      selectedRow: null,
      dialogcarrera: false,
      dialogcentro: false,
      dialogcancelaciones: false,
      carreras: [],
      cancelaciones: [],
      centro: [],
    };
  },
  methods: {
    async openDialogCarrera(row, idSolicitud) {
      const res = await fetch(
        "http://localhost:3000/coordinador/obtenerSolicitud",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ idSolicitud: idSolicitud }),
        }
      );
      const data = await res.json();
      row.indice = data.solicitud.indiceGlobal;
      row.carrera = data.solicitud.carrera;
      row.deseada = data.solicitud.diccionario;
      row.justificacion = data.solicitud.justificacion;
      row.recurso = data.solicitud.recurso;
      row.idSolicitud = idSolicitud;
      row.centro = data.solicitud.centroRegional;
      this.selectedRow = row;
      this.dialogcarrera = true;
    },
    async openDialogCentro(row, idSolicitud) {
      const res = await fetch(
        "http://localhost:3000/coordinador/obtenerSolicitud",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ idSolicitud: idSolicitud }),
        }
      );
      const data = await res.json();
      row.indice = data.solicitud.indiceGlobal;
      row.carrera = data.solicitud.carrera;
      row.cambio = data.solicitud.diccionario;
      row.justificacion = data.solicitud.justificacion;
      row.centro = data.solicitud.centroRegional;
      row.recurso = data.solicitud.recurso;
      row.idSolicitud = idSolicitud;
      console.log(data);
      this.selectedRow = row;
      this.dialogcentro = true;
    },
    async openDialogCancelacion(row, idSolicitud) {
      const res = await fetch(
        "http://localhost:3000/coordinador/obtenerSolicitud",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ idSolicitud: idSolicitud }),
        }
      );
      const data = await res.json();
      row.indice = data.solicitud.indiceGlobal;
      row.carrera = data.solicitud.carrera;

      row.cancelada = data.solicitud.diccionario
        .split(",")
        .map((item) => item.trim());
      row.centro = data.solicitud.centroRegional;
      row.recurso = data.solicitud.recurso;
      row.idSolicitud = idSolicitud;
      console.log(data);
      this.selectedRow = row;
      this.dialogcancelaciones = true;
    },
    closeDialog() {
      // Close the dialog
      this.dialogcarrera = false;
      this.dialogcentro = false;
      this.dialogcancelaciones = false;
    },
    async descargar(recurso, nombre) {
      console.log(recurso);
      try {
        let ruta =
          //"public/solicitudes/1700271462922-cancelacion-plan de estudios organigrama.pdf";
          recurso;
        const urlDescarga = `http://localhost:3000/descargar/${encodeURIComponent(
          ruta
        )}`;
        fetch(urlDescarga, {
          method: "GET",
        })
          .then((response) => response.blob())
          .then((blob) => {
            // Crear un enlace temporal para iniciar la descarga
            const enlaceDescarga = document.createElement("a");
            enlaceDescarga.href = URL.createObjectURL(blob);
            enlaceDescarga.download = "Justificacion" + "-" + nombre;
            enlaceDescarga.click();
          });
      } catch (error) {
        console.error("Error:", error);
      }
    },

    async actualizarSolicitud(estado, idSolicitud) {
      if (estado == "true") {
        try {
          const res = await fetch(
            "http://localhost:3000/coordinador/actualizarSolicitud",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                estado: "Aprobada",
                idSolicitud: idSolicitud,
              }),
            }
          )
            .then(this.actualizarComponente(idSolicitud))
            .finally(this.closeDialog());
          const data = await res.json();
          console.log(data);
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          const res = await fetch(
            "http://localhost:3000/coordinador/actualizarSolicitud",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                estado: "Rechazada",
                idSolicitud: idSolicitud,
              }),
            }
          )
            .then(this.actualizarComponente(idSolicitud))
            .finally(this.closeDialog());
          const data = await res.json();
          console.log(data);
        } catch (error) {
          console.log(error);
        }
      }
    },

    actualizarComponente(idSolicitud) {
      this.carreras = this.carreras.filter(
        (solicitud) => solicitud.idSolicitud !== idSolicitud
      );
      this.centro = this.centro.filter(
        (solicitud) => solicitud.idSolicitud !== idSolicitud
      );
      this.cancelaciones = this.cancelaciones.filter(
        (solicitud) => solicitud.idSolicitud !== idSolicitud
      );
    },
  },
  async beforeCreate() {
    const res = await fetch("http://localhost:3000/coordinador/solicitudes", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);
    for (let i = 0; i < data.solicitudes.length; i++) {
      const { nombreCompleto, correo } = data.estudiante[i];
      const { tipoSolicitud } = data.solicitudes[i];
      if (tipoSolicitud == "Cambio de Carrera") {
        this.carreras.push({
          numero: data.solicitudes[i].numeroCuenta,
          nombre: nombreCompleto,
          correo: correo,
          idSolicitud: data.solicitudes[i].idSolicitud,
        });
      } else if (tipoSolicitud == "Cambio de Centro") {
        this.centro.push({
          numero: data.solicitudes[i].numeroCuenta,
          nombre: nombreCompleto,
          correo: correo,
          idSolicitud: data.solicitudes[i].idSolicitud,
        });
      } else {
        this.cancelaciones.push({
          numero: data.solicitudes[i].numeroCuenta,
          nombre: nombreCompleto,
          correo: correo,
          idSolicitud: data.solicitudes[i].idSolicitud,
        });
      }
    }
  },
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Rubik:wght@300;500&display=swap");
.encabezado {
  background-color: darkred;
  color: white;
}

.boton {
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
.btniconazo {
  width: 100%;
  height: 100%;
  background-color: #77181e;
  border-style: none;
  box-shadow: none;
  color: white;
  font-size: 50px;
}
.iconazo {
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
  width: 300px;
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

.iconazo :deep(.v-btn__content) {
  display: flex;
  flex-direction: column;
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
.normal {
  font-size: 10px;
  margin-bottom: 10px;
  padding: 10px;
  font-family: rubik;
}
</style>
