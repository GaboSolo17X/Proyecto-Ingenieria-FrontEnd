<template>
  <v-card color="#C6D6D6" class="cartita">
    <div class="header-container">
      <v-card-title class="text-h5 font-weight-bold">
        Asignaturas con lista de espera
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
      <v-table fixed-header height="500px" class="tabla">
        <thead class="encabezado">
          <tr>
            <th class="text-left">Código</th>
            <th class="text-left">Asignatura</th>
            <th class="text-left">Hi</th>
            <th class="text-left">Hf</th>
            <th class="text-left">Días</th>
            <th class="text-left">Docente</th>
            <th class="text-left">Cupos</th>
            <th class="text-left">En espera</th>
            <th class="text-left"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="fila in filas" :key="fila.codigo">
            <td>{{ fila.codigo }}</td>
            <td>{{ fila.asignatura }}</td>
            <td>{{ fila.hi }}</td>
            <td>{{ fila.hf }}</td>
            <td>{{ fila.dias }}</td>
            <td>{{ fila.docente }}</td>
            <td>{{ fila.cupos }}</td>
            <td>{{ fila.espera }}</td>
            <td>
              <v-btn
                size="x-small"
                @click="
                  verLista(
                    fila.codigo,
                    fila.asignatura,
                    fila.espera,
                    fila.idSeccion
                  )
                "
                >ver lista</v-btn
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
      filas: [],
    };
  },
  methods: {
    verLista(codigo, nombreAsignatura, enEspera, idSeccion) {
      this.$router.push({
        name: "detalleEspera",
        params: {
          codigo: codigo,
          nombre: nombreAsignatura,
          enEspera: enEspera,
          idSeccion: idSeccion,
        },
      });
    },
    regresar() {
      this.$router.back();
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

        const res2 = await fetch(
          "http://localhost:3000/jefeDepartamento/obtenerListaEspera",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              idSeccion: arraySecciones[i].seccion.idSeccion,
            }),
          }
        );
        const data2 = await res2.json();
        const { listaEsperaFound } = data2;

        if (listaEsperaFound == 0) {
        } else {
          this.filas.push({
            codigo: arraySecciones[i].codigoAsignatura,
            asignatura: arraySecciones[i].nombreClase,
            hi: horaFormateadaUTCInicial,
            hf: horaFormateadaUTCFinal,
            dias: arraySecciones[i].seccion.dias,
            docente: arraySecciones[i].nombreCompletoProfesor,
            cupos: arraySecciones[i].seccion.cupos,
            idSeccion: arraySecciones[i].seccion.idSeccion,
            espera: listaEsperaFound,
          });
        }
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

.cartita {
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

.tabla {
  background-color: #c6d6d6;
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
</style>
