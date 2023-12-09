<template>
  <v-card color="#C6D6D6" class="cartita">
    <div class="header-container">
      <v-card-title class="text-h5 font-weight-bold">
        Registrar sección
        <v-card-text class="font-weight-medium">
          Asignaturas del departamento
        </v-card-text>
      </v-card-title>
      <v-btn class="botonRegresar">
        <router-link @click="regresar" to="/principalJefe" class="regresar">
          <v-icon right>
            <i class="fa:fas fa-solid fa-circle-left"></i>
          </v-icon>
          Regresar
        </router-link>
      </v-btn>
    </div>

    <div class="tabla">
      <v-table fixed-header height="370px" class="tabla">
        <thead class="encabezado">
          <tr>
            <th class="text-left">Código</th>
            <th class="text-left">Asignatura</th>
            <th class="text-left">Centro</th>
            <th class="text-left">UV</th>
            <th class="text-left"></th>
          </tr>
        </thead>
        <tbody class="tabla">
          <tr v-for="fila in clasesPaginadas" :key="fila.codigo">
            <td>{{ fila.codigo }}</td>
            <td>{{ fila.asignatura }}</td>
            <td>{{ fila.centro }}</td>
            <td>{{ fila.uv }}</td>
            <td>
              <v-btn
                size="x-small"
                variant="flat"
                class="boton"
                @click="cambiarPagina(fila.asignatura, fila.uv)"
              >
                <v-icon right>
                  <i class="fa:fas fa-solid fa-circle-plus"></i>
                </v-icon>
                crear sección
              </v-btn>
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
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      search: "",
      clases: [],
      currentPage: 1,
      recordsPerPage: 5,
    };
  },
  methods: {
    cambiarPagina(asignatura, uv) {
      this.$router.push({
        name: "crearSeccion",
        params: { asignatura: asignatura, uv: uv },
      });
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
        "http://localhost:3000/jefeDepartamento/obtenerAsignaturasDepartamento",
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
      const { asignaturasFound } = data;
      for (let i = 0; i < asignaturasFound.length; i++) {
        this.clases.push({
          codigo: asignaturasFound[i].codigoAsignatura,
          asignatura: asignaturasFound[i].nombreClase,
          centro: asignaturasFound[i].centroRegional,
          uv: asignaturasFound[i].uv,
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

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}
</style>
