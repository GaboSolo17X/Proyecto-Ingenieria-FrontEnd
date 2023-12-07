<template>
  <v-card class="mx-auto" max-width="300">
    <v-table>
      <thead>
        <tr>
          <th class="text-left">Indice</th>
          <th class="text-left">UV</th>
          <th class="text-left">Periodo</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{ indiceAcadem }}</td>
          <td>22</td>
          <td>III - 2023</td>
        </tr>
      </tbody>
    </v-table>
  </v-card>
</template>

<script>
import { onMounted, ref } from "vue";
export default {
  setup() {
    const indiceAcadem = ref();

    const estudiante = ref();
    const carrPri = ref();
    const estudianteEs = async () => {
      console.log("El estudiante es");
      estudiante.value = JSON.parse(localStorage.getItem("Estudiante"));
      carrPri.value = estudiante.value.carrera;
      console.log(estudiante);
      console.log(carrPri);
    };

    const getIndice = async () => {
      try {
        const res = await fetch(
          "http://localhost:3000/estudiante/getIndiceAcademico",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              cuentaEstudiante : estudiante.value.numeroCuenta,
            }),
          }
        );
        const data = await res.json();
        console.log(data);
        indiceAcadem.value=data.indiceAcademico;
        console.log(indiceAcadem);
      } catch (error) {
        console.error("Error al cargar el indice del estudiante", error);
      }
    };

    onMounted(() => {
      estudianteEs();
      getIndice();
    });

    return {
      indiceAcadem
    }
  },
};
</script>

<style scoped>
.text-left {
  background-color: #77181e !important;
  color: white !important;
}
</style>
