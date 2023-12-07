<template>
  <v-card flat title="Listado de docente" class="tabla">
    <template v-slot:text>
      <v-row align="center">
        <v-col>
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
        </v-col>
        <v-col>
          <v-btn class="derecha">
            <router-link
              @click="regresar"
              to="/ventanaDocente"
              class="regresar"
            >
              <v-icon right>
                <i class="fa:fas fa-solid fa-circle-left"></i>
              </v-icon>
              Regresar
            </router-link>
          </v-btn>
        </v-col>
      </v-row>
    </template>
    <div class="tabla">
      <v-table fixed-header height="300px" class="tabla">
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
              <v-btn size="x-small" @click="reiniciarClave(fila.numero)"
                >Reiniciar</v-btn
              >
            </td>
          </tr>
        </tbody>
      </v-table>
      <v-row class="text-center">
        <v-col>
          <v-btn
            class="mover"
            rounded
            @click="previousPage"
            :disabled="currentPage === 1"
            ><v-icon left>
              <i class="fa:fas fa-solid fa-arrow-left"></i> </v-icon
          ></v-btn>
          <span class="pagina">{{ currentPage }}</span>
          <v-btn
            class="mover"
            rounded
            @click="nextPage"
            :disabled="currentPage * 4 >= filas.length"
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
      filas: [],
      currentPage: 1,
      recordsPerPage: 3,
    };
  },
  methods: {
    async reiniciarClave(numeroEmpleadoDocente) {
      try {
        const res = await fetch(
          "http://localhost:3000/jefeDepartamento/restablecerContraseniaDocente",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              numeroEmpleadoDocente: numeroEmpleadoDocente,
            }),
          }
        );
        const data = await res.json();
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    },
    regresar() {
      this.$router.back();
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },

    nextPage() {
      const maxPage = Math.ceil(this.filas.length / this.recordsPerPage);
      if (this.currentPage < maxPage) {
        this.currentPage++;
      }
    },
  },
  computed: {
    empleados() {
      const searchTerm = this.search.toLowerCase();
      const filteredData = this.filas.filter((item) =>
        Object.values(item).some((value) =>
          String(value).toLowerCase().includes(searchTerm)
        )
      );
      const start = (this.currentPage - 1) * this.recordsPerPage;
      const end = start + this.recordsPerPage;
      return filteredData.slice(start, end);
    },
  },
  async beforeCreate() {
    const jefe = JSON.parse(window.localStorage.getItem("JefeDep"));
    try {
      const res = await fetch(
        "http://localhost:3000/jefeDepartamento/obtenerDocente",
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
      const { secciones } = data;
      for (let i = 0; i < secciones.length; i++) {
        console.log(data);
        this.filas.push({
          numero: secciones[i].numero,
          nombre: secciones[i].nombre,
          correo: secciones[i].correoDocente,
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

.botones {
  background-color: #a92727;
  color: white;
  height: 40px;
  box-shadow: none;
}
.v-btn {
  background-color: #a92727;
  color: white;
  height: 40px;
  box-shadow: none;
}
.regresar {
  color: white;
  text-decoration: none;
}
.regresar {
  color: white;
  text-decoration: none;
}
.tabla {
  background-color: #c6d6d6;
}

.mover {
  background-color: #282832;
  color: white;
  box-shadow: none;
}

.derecha {
  margin-left: 1rem;
}

.pagina {
  padding: 3px;
  color: #282832;
  font-weight: bold;
}
</style>
