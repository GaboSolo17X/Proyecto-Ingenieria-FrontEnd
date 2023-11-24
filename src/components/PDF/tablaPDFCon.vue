<template>
  <div class="background-container">
    <div>.</div>
    <div class="numberN">1234568</div>
    <div class="contTable">
      <v-table density="compact" height="685px">
        <tbody>
          <template v-for="(yearData, year) in datos" :key="year">
            <tr>
              <td colspan="5" class="year">{{ "Año " + year }}</td>
            </tr>
            <template v-for="(periodData, period) in yearData" :key="period">
              <tr>
                <td colspan="5" class="period">{{ period }}</td>
              </tr>
              <tr
                v-for="classData in periodData"
                :key="classData.name"
                class="fila-personalizada"
              >
                <td class="cod">{{ classData.name }}</td>
                <td class="name">{{ classData.asignatura }}</td>
                <td class="cali">
                  {{ classData.cali + "&nbsp;&nbsp;&nbsp; X " }}
                </td>
                <td class="uv">{{ classData.uv + " =" }}</td>
                <td class="res">{{ classData.cali * classData.uv}}</td>
              </tr>
            </template>
          </template>
        </tbody>
      </v-table>
    </div>
  </div>
</template>

<script scoped>
export default {
  props: {
    datos: Object,
  },
  setup() {
    return {};
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Archivo:wght@300&display=swap");

.background-container {
  margin: 0;
  padding: 0;
  height: 100vh;
  background-image: url("../PDF/img/White1.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 8.5in;
  height: 11in;
  /* display: flex;
  justify-content: center;
  align-items: center; */
  color: black;
  /* opacity: 0.5; */
}

.numberN {
  margin-top: 145px;
  margin-left: 60px;
  color: #cb5364;
  font-size: 1.5rem;
  font-family: "Archivo", sans-serif;
}

.v-table {
  background-color: unset;
  margin-top: 11px;
  margin-left: 40px;
  font-size: 1rem;
  font-family: serif;
  color: black;
}

/* .v-table .labe {
  height: 50px; 
} */

.text-left {
  color: black !important;
}

.contTable :deep(.v-table__wrapper) {
  margin-top: 340px;
  margin-left: 35px;
}

.cod {
  width: 100px;
}

.name {
  width: 350px;
}
.cali {
  width: 100px;
}
.uv {
  width: 100px;
}

.fila-personalizada {
  height: 40px; /* Ajusta el valor según tus necesidades */
}

.contTable .v-table tbody .fila-personalizada {
  height: 20px;
}

.data {
  margin-top: 16px;
}
.saludo {
  margin-top: 1px !important;
  margin-left: 45px;
  font-size: 1rem;
  font-family: serif;
}
.cuenta {
  margin-top: 19px !important;
  margin-left: 45px;
  font-size: 1rem;
  font-family: serif;
}
.msg {
  margin-top: 21px !important;
  margin-left: 45px;
  font-size: 1rem;
  font-family: serif;
}

.estudiante {
  margin-top: 20px !important;
  margin-left: 45px;
  font-size: 1rem;
  font-family: serif;
  /* letter-spacing: -1px; */
  /* font-weight: bold; */
}
.carrera {
  margin-left: 110px;
  font-size: 1rem;
  font-family: serif;
}
</style>
