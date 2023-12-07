<template>
  <v-card color="#C6D6D6" flat>
    <div class="tabla">
      <v-table fixed-header height="400px" class="tabla">
        <thead class="encabezado">
          <tr>
            <th class="text-left">Número de cuenta</th>
            <th class="text-left">Nombre completo</th>
            <th class="text-left">Nota</th>
            <th class="text-left">Observación</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="fila in filas" :key="fila.numero">
            <td>{{ fila.numero }}</td>
            <td>{{ fila.nombre }}</td>
            <td>{{ fila.nota }}</td>
            <td>{{ fila.observacion }}</td>
          </tr>
        </tbody>
      </v-table>
    </div>
    <v-row class="text-center">
      <v-col>
        <v-btn>
          <router-link @click="regresar" to="/calificaciones" class="regresar">
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
    nombre: String,
    clase: String,
    seccion: String,
    idseccion: Number,
  },
  data() {
    return {
      filas: [],
    };
  },
  methods: {
    regresar() {
      this.$router.back();
    },
  },
  async beforeCreate() {
    console.log(this.nombre, this.clase, this.seccion, this.idseccion);
    try {
      const res = await fetch(
        "http://localhost:3000/jefeDepartamento/obtenerNotasDocenteClase",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nombreDocente: this.nombre,
            codigoAsignatura: this.clase,
            seccion: this.seccion,
            idseccion: this.idseccion,
          }),
        }
      );
      const data = await res.json();
      const { calificaciones } = data;
      for (let i = 0; i < calificaciones.length; i++) {
        this.filas.push({
          numero: calificaciones[i].numeroCuenta,
          nombre: calificaciones[i].nombreCompleto,
          nota: calificaciones[i].nota,
          observacion: calificaciones[i].observacion,
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
