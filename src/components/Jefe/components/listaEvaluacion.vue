<template>
  <v-card color="#C6D6D6" flat>
    <div class="tabla">
      <v-table fixed-header height="450px" class="tabla">
        <thead class="encabezado">
          <tr>
            <th class="text-left">Indice</th>
            <th class="text-left">Evaluacion</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="fila in filas" :key="fila.no">
            <td>{{ fila.no }}</td>
            <td>
              <v-btn size="x-small" @click="verEvaluacion(fila.idEvaluacion)"
                >visualizar</v-btn
              >
            </td>
          </tr>
        </tbody>
      </v-table>
    </div>
    <v-row class="text-center">
      <v-col>
        <v-btn>
          <router-link
            @click="regresar"
            to="/generalEvaluaciones"
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
  </v-card>
</template>
<script>
export default {
  props: {
    numero: String,
    idseccion: Number,
    idasignatura: Number,
  },
  data() {
    return {
      filas: [],
    };
  },
  methods: {
    verEvaluacion(idEvaluacion) {
      this.$router.push({
        name: "detalleEvaluacion",
        params: {
          idEvaluacion: idEvaluacion,
        },
      });
    },
    regresar() {
      this.$router.back();
    },
    darCupo() {
      window.alert("se le brindo el cupo al estudiante");
    },
  },
  async beforeCreate() {
    try {
      const res = await fetch(
        "http://localhost:3000/jefeDepartamento/obtenerEvaluaciones",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            numeroEmpleadoDocente: this.numero,
            idSeccion: this.idseccion,
            idAsignatura: this.idasignatura,
          }),
        }
      );
      const data = await res.json();
      const { evaluaciones } = data;
      for (let i = 0; i < evaluaciones.length; i++) {
        this.filas.push({
          no: i + 1,
          idEvaluacion: evaluaciones[i],
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
