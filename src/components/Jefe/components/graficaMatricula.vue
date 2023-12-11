<template>
  <v-card>
    <div class="tabla">
      <div class="chartBox">
        <div class="container">
          <div class="containerBody">
            <canvas id="myChart"></canvas>
          </div>
        </div>
      </div>
    </div>
  </v-card>
</template>

<script>
import { onMounted } from "vue";
import Chart from "chart.js/auto";

export default {
  setup() {
    onMounted(() => {
      const ctx = document.getElementById("myChart");
      const myChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: [
            "Ingenieria del software",
            "Bases de Datos I",
            "Redes de datos I",
            "Introduccion a la ingenieria en sistemas",
            "Seguridad Informatica",
            "Sistemas de Informacion",
            "Auditoria Informatica",
            "Arquitectura de computadoras",
            "Ingles I",
            "Sistemas Operativos I",
            "Inteligencia Artificial",
            "Lenguajes de programación",
            "Ingenieria del software",
            "Bases de Datos I",
            "Redes de datos I",
            "Introduccion a la ingenieria en sistemas",
            "Seguridad Informatica",
            "Sistemas de Informacion",
            "Auditoria Informatica",
            "Arquitectura de computadoras",
            "Ingles I",
            "Sistemas Operativos I",
            "Inteligencia Artificial",
            "Lenguajes de programación",
          ],
          datasets: [
            {
              label: "Matriculados en el periodo",
              data: [
                12, 19, 20, 25, 12, 23, 13, 15, 30, 18, 16, 27, 12, 19, 20, 25,
                12, 23, 13, 15, 30, 18, 16, 27,
              ],
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });

      const containerBody = document.querySelector(".containerBody");
      const total = myChart.data.labels.length;
      if (total > 6) {
        const newWidth = 700 + (total - 6) * 50;
        containerBody.style.width = `${newWidth}px`;
      }
    });

    const getAnioYMes = () => {
      const fechaActual = new Date();
      const anioActual = fechaActual.getFullYear();
      const mesActual = fechaActual.getMonth() + 1;

      console.log(`El año es: ${anioActual}`);
      console.log(`Estamos en el mes: ${mesActual}`);
    };

    // ... (other setup logic if needed)
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Rubik:wght@300;500&display=swap");
.encabezado {
  background-color: darkred;
  color: white;
}

.boton {
  color: darkred;
  font-weight: bold;
}

.chartBox {
  padding: 20px;
  margin-top: 5px;
  /* width: 850px;*/
}

.container {
  width: 830px;
  max-width: 830px;
  overflow-x: scroll;
}

.containerBody {
  height: 500px;
}

.tabla {
  padding: 10px;
}
</style>
