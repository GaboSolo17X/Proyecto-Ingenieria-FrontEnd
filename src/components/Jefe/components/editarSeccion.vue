<template>
  <v-card color="#C6D6D6" class="cartita">
    <v-card-title class="text-h5 font-weight-bold">
      Lista de secciones existentes
    </v-card-title>
    <v-card-text class="font-weight-medium">
      Ingeniería en sistemas
    </v-card-text>
    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
        <v-card-title class="text-h5"
          >¿Por qué desea cancelar esta sección?</v-card-title
        >
        <v-card-text>
          <v-text-field
            v-model="eliminarJusti"
            label="Escriba una justificacion"
            :rules="[(v) => !!v || 'Llene el campo']"
            variant="outlined"
          ></v-text-field>
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
      <v-table fixed-header height="450px" class="tabla">
        <thead class="encabezado">
          <tr>
            <th class="text-left">Código</th>
            <th class="text-left">Asignatura</th>
            <th class="text-left">Hi</th>
            <th class="text-left">Hf</th>
            <th class="text-left">Dias</th>
            <th class="text-left">Profesor</th>
            <th class="text-left">Sección</th>
            <th class="text-left">Cupos</th>
            <th class="text-left"></th>
          </tr>
        </thead>
        <tbody class="tabla">
          <tr v-for="fila in clasesPaginadas" :key="fila.codigo">
            <td>{{ fila.codigo }}</td>
            <td>{{ fila.asignatura }}</td>
            <td>{{ fila.hi }}</td>
            <td>{{ fila.hf }}</td>
            <td>{{ fila.dias }}</td>
            <td>{{ fila.profesor }}</td>
            <td>{{ fila.seccion }}</td>
            <td>
              <v-row>
                <v-btn
                  class="cupos"
                  icon
                  @click="incrementCupos(fila, fila.idSeccion)"
                >
                  <v-icon class="iconito"
                    ><i class="fa:fas fa-solid fa-plus"></i
                  ></v-icon>
                </v-btn>
                {{ fila.cupos }}
                <v-btn
                  class="cupos"
                  icon
                  @click="decrementCupos(fila, fila.idSeccion)"
                >
                  <v-icon class="iconito"
                    ><i class="fa:fas fa-solid fa-minus"></i
                  ></v-icon>
                </v-btn>
              </v-row>
            </td>
            <td>
              <v-icon size="small" @click="deleteItem(fila, fila.idSeccion)">
                <i class="fa:fas fa-solid fa-trash"></i>
              </v-icon>
            </td>
          </tr>
        </tbody>
      </v-table>
      <v-row class="text-center">
        <v-col>
          <v-btn
            rounded
            class="mover"
            @click="previousPage"
            :disabled="currentPage === 1"
            ><v-icon left>
              <i class="fa:fas fa-solid fa-arrow-left"></i> </v-icon
          ></v-btn>
          <span class="pagina">{{ currentPage }}</span>
          <v-btn
            rounded
            class="mover"
            @click="nextPage"
            :disabled="currentPage * 4 >= clases.length"
            ><v-icon right>
              <i class="fa:fas fa-solid fa-arrow-right"></i> </v-icon
          ></v-btn>
        </v-col>
      </v-row>
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
import _ from "lodash";
export default {
  data() {
    return {
      dialogDelete: false,
      itemToDelete: null,
      seccionToDelete: null,
      eliminarJusti: "",
      clases: [],
      currentPage: 1,
      recordsPerPage: 4,
    };
  },
  methods: {
    deleteItem(item, idSeccion) {
      this.dialogDelete = true;
      this.itemToDelete = item;
      this.seccionToDelete = idSeccion;
    },
    closeDelete() {
      this.dialogDelete = false;
      this.itemToDelete = null;
    },
  
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },

    nextPage() {
      const maxPage = Math.ceil(this.clases.length / this.recordsPerPage);
      if (this.currentPage < maxPage) {
        this.currentPage++;
      }
    },

    // introduccir un retraso de un segundo para el cambio de cupos en la base de datos
    async incrementCupos(item, idSeccion) {
      let cupos = item.cupos + 1;
      item.cupos++;
      setTimeout(async () => {
        const res = await fetch(
          "http://localhost:3000/jefeDepartamento/actualizarCuposSeccion",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              idSeccion: idSeccion,
              cupos: cupos,
            }),
          }
        );
        const data = await res.json();
        console.log("hola");
        console.log(data);
      }, 1000);
    },

    async decrementCupos(item, idSeccion) {
      if (item.cupos > 1) {
        let cupos = item.cupos - 1;
        item.cupos--;
        setTimeout(async () => {
          const res = await fetch(
            "http://localhost:3000/jefeDepartamento/actualizarCuposSeccion",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                idSeccion: idSeccion,
                cupos: cupos,
              }),
            }
          );
          const data = await res.json();
          console.log("hola");
          console.log(data);
        }, 1000);
      } else {
        window.alert("En las secciones debe haber por lo menos un cupo");
      }
    },
    async deleteItemConfirm() {
      const res = await fetch(
        "http://localhost:3000/jefeDepartamento/cancelacionSeccion",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idSeccion: this.seccionToDelete,
            motivo: this.eliminarJusti,
          }),
        }
      )
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((err) => console.log(err))
        .finally(() => {
          const index = this.clases.indexOf(this.itemToDelete);
          if (index !== -1) {
            this.clases.splice(index, 1);
          }
          this.dialogDelete = false;
          console.log("Jutificacion de eliminar seccion:", this.eliminarJusti);
          this.itemToDelete = null;
          this.eliminarJusti = "";
        });
    },
  },
  computed: {
    clasesPaginadas() {
      const start = (this.currentPage - 1) * this.recordsPerPage;
      const end = start + this.recordsPerPage;
      return this.clases.slice(start, end);
    },
  },
  async beforeCreate() {
    try {
      const jefe = JSON.parse(window.localStorage.getItem("JefeDep"));
      const res = await fetch(
        "http://localhost:3000/jefeDepartamento/obtenerSecciones",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            numeroEmpleadoDocente: jefe.numeroEmpleadoDocente,
          }),
        }
      );
      const data = await res.json();
      const { arraySecciones } = data;
      for (let i = 0; i < arraySecciones.length; i++) {
        const fechaInicial = new Date(arraySecciones[i].seccion.horaInicial);
        const horasUTCInicial = fechaInicial
          .getUTCHours()
          .toString()
          .padStart(2, "0");
        const minutosUTCInicial = fechaInicial
          .getUTCMinutes()
          .toString()
          .padStart(2, "0");
        const horaFormateadaUTCInicial = `${horasUTCInicial}:${minutosUTCInicial}`;
        if (arraySecciones[i].seccion.idSeccion < 10) {
          arraySecciones[i].seccion.idSeccion = arraySecciones[
            i
          ].seccion.idSeccion
            .toString()
            .padStart(2, "0");
        } else {
          arraySecciones[i].seccion.idSeccion =
            arraySecciones[i].seccion.idSeccion.toString();
        }
        const seccionHora = `${horasUTCInicial}${arraySecciones[i].seccion.idSeccion}`;

        const fechaFinal = new Date(arraySecciones[i].seccion.horaFinal);
        const horasUTCFinal = fechaFinal
          .getUTCHours()
          .toString()
          .padStart(2, "0");
        const minutosUTCFinal = fechaFinal
          .getUTCMinutes()
          .toString()
          .padStart(2, "0");
        const horaFormateadaUTCFinal = `${horasUTCFinal}:${minutosUTCFinal}`;

        this.clases.push({
          codigo: arraySecciones[i].codigoAsignatura,
          asignatura: arraySecciones[i].nombreClase,
          hi: horaFormateadaUTCInicial,
          hf: horaFormateadaUTCFinal,
          dias: arraySecciones[i].seccion.dias,
          profesor: arraySecciones[i].nombreCompletoProfesor,
          seccion: arraySecciones[i].nombreSeccion,
          cupos: arraySecciones[i].seccion.cupos,
          idSeccion: arraySecciones[i].seccion.idSeccion,
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
};
</script>
<style scoped>
.text-left {
  background-color: #a92727 !important;
  color: white !important;
  font-family: "Rubik";
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

.mover {
  background-color: #282832;
  color: white;
  box-shadow: none;
}

.pagina {
  padding: 3px;
  color: #282832;
  font-weight: bold;
}
</style>
