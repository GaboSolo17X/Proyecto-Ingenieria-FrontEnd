<template>
  <v-card>
    <div class="tabla">
      <v-row>
        <v-col>
          <v-select
            v-model="selectedTeacher"
            :items="teachers"
            label="Seleccionar un docente"
            variant="outlined"
          ></v-select>
        </v-col>
        <v-col>
          <v-select
            v-model="selectedClass"
            :items="teacherClasses[selectedTeacher]"
            label="Seleccionar la clase"
            variant="outlined"
          ></v-select>
        </v-col>
      </v-row>
      <div class="chartBox">
        <canvas id="myChart"></canvas>
      </div>
    </div>
  </v-card>
</template>

<script>
import { ref, onMounted, watch } from "vue";
import Chart from "chart.js/auto";

export default {
  setup() {
    const selectedTeacher = ref(null);
    const selectedClass = ref(null);
    const teachers = [
      "Weslin Moises Barahona",
      "Gabriel Omar Solorzano",
      "Daddy Yankee",
    ];

    const teacherClasses = {
      "Weslin Moises Barahona": ["Virtudes Humanas", "Filosofia", "Español"],
      "Gabriel Omar Solorzano": [
        "Programacion avanzada",
        "ser un exito",
        "chambea chambea",
      ],
      "Daddy Yankee": ["Perreo hasta el suelo", "Reggaeton 101", "La gasolina"],
    };

    const classValues = {
      "Virtudes Humanas": [11, 8, 5, 3],
      Filosofia: [20, 4, 1, 5],
      Español: [4, 1, 2, 26],
      "Programacion avanzada": [17, 8, 2, 3],
      "ser un exito": [12, 7, 4, 5],
      "chambea chambea": [11, 5, 7, 3],
      "Perreo hasta el suelo": [25, 3, 2, 0],
      "Reggaeton 101": [11, 5, 7, 3],
      "La gasolina": [25, 3, 2, 0],
    };

    let myChart;

    onMounted(() => {
      renderChart();
    });

    const renderChart = () => {
      const ctx = document.getElementById("myChart");
      myChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["Excelente", "Muy Bueno", "Bueno", "Deficiente"],
          datasets: [
            {
              label: "Desempeño del docente",
              data: [0, 0, 0, 0], // Initialize with zeros
              backgroundColor: [
                "rgba(75, 192, 192, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(255, 99, 132, 0.2)",
              ],
              borderColor: [
                "rgba(75, 192, 192, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(255, 99, 132, 1)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    };

    watch(selectedTeacher, (newTeacher) => {
      selectedClass.value = null;
      updateChartData(); // Reset chart data
    });

    watch([selectedTeacher, selectedClass], ([teacher, selectedClassName]) => {
      // Handle chart update based on selectedTeacher and selectedClass
      updateChartData();
      console.log(
        `Selected Teacher: ${teacher}, Selected Class: ${selectedClassName}, Values: ${classValues[selectedClassName]}`
      );
    });

    const updateChartData = () => {
      myChart.data.datasets[0].label = "Desempeño del docente";
      myChart.data.datasets[0].data = [0, 0, 0, 0];
      if (selectedTeacher.value && selectedClass.value) {
        myChart.data.datasets[0].label = `Desempeño de ${selectedTeacher.value} en ${selectedClass.value}`;
        myChart.data.datasets[0].data = classValues[selectedClass.value];
      }
      myChart.update();
    };

    return {
      selectedTeacher,
      selectedClass,
      teachers,
      teacherClasses,
    };
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
  width: 850px;
}

.tabla {
  padding: 10px;
}
</style>
