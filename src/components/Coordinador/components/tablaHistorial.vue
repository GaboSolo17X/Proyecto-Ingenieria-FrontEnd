<template>
  <v-card flat title="Estudiantes UNAH">
    <template v-slot:text>
      <v-row align="center">
        <v-col>
          <v-text-field
            v-model="search"
            label="Buscar estudiante con su número de cuenta"
            single-line
            variant="outlined"
            append-inner-icon="mdi-magnify"
            hide-details
            class="text-field"
            rounded
            :rules="[(v) => !!v || 'solo puede ingresar dígitos']"
            @input="validar"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-btn @click="buscar(search)"> Buscar </v-btn>
          <v-btn class="derecha">
            <router-link
              @click="regresar"
              to="/ventanaEstudiantes"
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
      <v-table fixed-header height="300px">
        <thead class="encabezado">
          <tr>
            <th class="text-left">Numero de cuenta</th>
            <th class="text-left">Nombre</th>
            <th class="text-left">Centro</th>
            <th class="text-left">Indice</th>
            <th class="text-left"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="fila in clases" :key="fila.numero">
            <td>{{ fila.numero }}</td>
            <td>{{ fila.nombre }}</td>
            <td>{{ fila.centro }}</td>
            <td>{{ fila.indice }}</td>
            <td>
              <v-btn
                size="x-small"
                @click="verHistorial(fila.numero, fila.nombre, fila.indice)"
                >ver historial</v-btn
              >
            </td>
          </tr>
        </tbody>
      </v-table>
    </div>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      search: "",
      clases: [],
    };
  },

  methods: {
    validar() {
      this.search = this.search.replace(/[^0-9]/g, "");
    },
    verHistorial(idEstudiante, nombreEstudiante, indiceEstudiante) {
      this.$router.push({
        name: "detalleEstudiante",
        params: {
          id: idEstudiante,
          nombre: nombreEstudiante,
          indice: indiceEstudiante,
        },
      });
    },
    regresar() {
      this.$router.back();
    },

    async buscar(historial) {
      console.log(historial);
      const res = await fetch(
        "http://localhost:3000/coordinador/historialAcademicoEstudiante",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ numeroCuenta: historial }),
        }
      );
      const data = await res.json();
      console.log(data);
      console.log(res.status);
      if (data.codigoError == 1) {
        window.alert("No existe el estudiante");
        this.search = null;
      } else if (data.codigoError == 2) {
        window.alert("El estudiante no tiene historiales disponibles");
        this.search = null;
      } else {
        this.clases.push({
          numero: data.estudiante.numeroCuenta,
          nombre: data.estudiante.nombres + " " + data.estudiante.apellidos,
          centro: data.estudiante.centroRegional,
          indice: data.indice,
        });
        window.localStorage.setItem(
          "historial",
          JSON.stringify(data.historial)
        );
      }
    },
  },
  //  computed: {
  //    clases() {
  //      const searchTerm = this.search.toLowerCase()
  //      return this.filas.filter(item =>
  //        Object.values(item).some(value =>
  //          String(value).toLowerCase().includes(searchTerm)
  //        )
  //      )
  //    },
  //  },
};
</script>
<style scoped>
.text-left {
  background-color: #a92727 !important;
  color: white !important;
  font-family: "Rubik";
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
.derecha {
  margin-left: 1rem;
}
</style>
