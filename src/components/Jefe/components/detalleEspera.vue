<template>
  <v-card color="#C6D6D6" flat title="Asignaturas con lista de espera">
    <div class="tabla">
      <v-table fixed-header height="500px" class="tabla">
        <thead class="encabezado">
          <tr>
            <th class="text-left">No</th>
            <th class="text-left">Número de cuenta</th>
            <th class="text-left">Nombre completo</th>
            <th class="text-left">Indice</th>
            <th class="text-left"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="fila in filas" :key="fila.numero">
            <td>{{ fila.no }}</td>
            <td>{{ fila.numero }}</td>
            <td>{{ fila.nombre }}</td>
            <td>{{ fila.indice }}</td>
            <td>
              <v-btn
                size="x-small"
                variant="flat"
                class="boton"
                @click="darCupo(this.idSeccion, fila.numero, fila.no)"
              >
                <v-icon right>
                  <i class="fa:fas fa-solid fa-circle-plus"></i>
                </v-icon>
                brindar cupo
              </v-btn>
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
  props: {
    idSeccion: Number,
  },
  data() {
    return {
      filas: [],
    };
  },
  methods: {
    verLista(codigo, nombreAsignatura, enEspera) {
      this.$router.push({
        name: "detalleEspera",
        params: {
          codigo: codigo,
          nombre: nombreAsignatura,
          enEspera: enEspera,
        },
      });
    },
    regresar() {
      this.$router.back();
    },
    async darCupo(idSeccion, numeroCuenta, no) {
      const res = await fetch(
        "http://localhost:3000/jefeDepartamento/aceptarEstudianteListaEspera",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idSeccion: idSeccion,
            numeroCuenta: numeroCuenta,
          }),
        }
      );
      const data = await res.json().finally(() => {
        this.actualizarTabla();
      });
    },
    async actualizarTabla() {
      this.filas = [];
      const res = await fetch(
        "http://localhost:3000/jefeDepartamento/obtenerListaEsperaInfo",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idSeccion: this.idSeccion,
          }),
        }
      );
      const data = await res.json();
      const { listaEsperaInfo } = data;
      for (let i = 0; i < listaEsperaInfo.length; i++) {
        this.filas.push({
          no: i + 1,
          numero: listaEsperaInfo[i].numeroCuenta,
          nombre: listaEsperaInfo[i].nombreCompleto,
          indice: listaEsperaInfo[i].indiceGlobal,
        });
      }
    },
  },
  async beforeCreate() {
    const res = await fetch(
      "http://localhost:3000/jefeDepartamento/obtenerListaEsperaInfo",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idSeccion: this.idSeccion,
        }),
      }
    );
    const data = await res.json();
    const { listaEsperaInfo } = data;
    for (let i = 0; i < listaEsperaInfo.length; i++) {
      this.filas.push({
        no: i + 1,
        numero: listaEsperaInfo[i].numeroCuenta,
        nombre: listaEsperaInfo[i].nombreCompleto,
        indice: listaEsperaInfo[i].indiceGlobal,
      });
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

.tabla {
  background-color: #c6d6d6;
}

.boton {
  color: darkred;
  font-weight: bold;
  text-decoration: none;
  background-color: #c6d6d6;
}
</style>
