<template>
  <v-card flat>
    <div class="tabla">
      <v-table fixed-header height="350px" class="tabla">
        <thead class="encabezado">
          <tr>
            <th class="text-left">Código</th>
            <th class="text-left">Nombre</th>
            <th class="text-left">Nota</th>
            <th class="text-left">Observación</th>
            <th class="text-left">Periodo</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in Clases" :key="item.codigo" :search="search">
            <td>{{ item.codigo }}</td>
            <td>{{ item.nombre }}</td>
            <td>{{ item.nota }}</td>
            <td>{{ item.observacion }}</td>
            <td>{{ item.periodo }}</td>
          </tr>
        </tbody>
      </v-table>
      <v-pagination
        v-model="currentPage"
        :length="Math.ceil(clases.length / itemsPerPage)"
      ></v-pagination>
    </div>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      clases: [],
      currentPage: 1,
      itemsPerPage: 5,
    };
  },
  computed: {
    Clases() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.clases.slice(startIndex, endIndex);
    },
  },
  methods: {
    regresar() {
      this.$router.back();
    },
  },
  async beforeCreate() {
    const historial = JSON.parse(window.localStorage.getItem("historial"));
    console.log(historial.length);
    console.log("Hola");
    for (let i = 0; i < historial.length; i++) {
      const res = await fetch(
        "http://localhost:3000/coordinador/getAsignatura",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ idAsignatura: historial[i].idAsignatura }),
        }
      );

      const data = await res.json();
      const { nombreClase, codigoAsignatura } = data.asignatura;
      console.log(nombreClase, codigoAsignatura);
      console.log(historial);
      this.clases.push({
        codigo: codigoAsignatura,
        nombre: nombreClase,
        nota: historial[i].calificacion,
        observacion: historial[i].estado,
        periodo: historial[i].periodo + "-" + "2023",
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
  height: 45px;
}
.regresar {
  color: white;
  text-decoration: none;
}

.tabla {
  background-color: #c6d6d6;
}
</style>
