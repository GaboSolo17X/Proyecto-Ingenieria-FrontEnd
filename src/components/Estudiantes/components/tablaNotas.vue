<template>
  <div class="tabla">
    <v-table fixed-header class="">
      <thead>
        <tr>
          <th class="textoTabla">CODIGO</th>
          <th class="textoTabla">ASIGNATURA</th>
          <th class="textoTabla">HI</th>
          <th class="textoTabla">HF</th>
          <th class="textoTabla">DIAS</th>
          <th class="textoTabla">PROFESOR</th>
          <th class="textoTabla">CALIFICACION</th>
          <th class="textoTabla">OBS</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in notas" :key="item.codigo">
          <td class="textoCuerpo">{{ item.codigo }}</td>
          <td class="textoCuerpo">{{ item.asignatura }}</td>
          <td class="textoCuerpo">{{ item.hI }}</td>
          <td class="textoCuerpo">{{ item.hF }}</td>
          <td class="textoCuerpo">{{ item.dias }}</td>
          <td class="textoCuerpo">{{ item.profesor }}</td>
          <td class="textoCuerpo">{{ item.calificacion }}</td>
          <td class="textoCuerpo">{{ item.obs }}</td>
        </tr>
      </tbody>
      
    </v-table>
    <v-row>
        <v-col></v-col><v-col></v-col>
        
        <v-col></v-col><v-col></v-col>
        <v-col class="mt-8">
              <v-btn
                block
                rounded
                color="#282832"
                size="large"
                variant="elevated">
                <router-link
                  to="/calificacionesEstudiantes"
                  class="subrayadoNo">
                  Volver</router-link>
              </v-btn>
            </v-col>
      </v-row>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    let notas = ref([]);

    notas = [
      {
        codigo: "IS200",
        asignatura: "Introducción a la Ingeniería en sistemas",
        hI: "1900",
        hF: "2000",
        dias: "Lu,Ma,Mi",
        profesor: "Miguel Eduardo Aguilar ",
        calificacion: "100",
        obs: "APR",
      },
      {
        codigo: "IS200",
        asignatura: "Introducción a la Ingeniería en sistemas",
        hI: "1900",
        hF: "2000",
        dias: "Lu,Ma,Mi",
        profesor: "Miguel Eduardo Aguilar ",
        calificacion: "100",
        obs: "APR",
      },
      {
        codigo: "IS200",
        asignatura: "Introducción a la Ingeniería en sistemas",
        hI: "1900",
        hF: "2000",
        dias: "Lu,Ma,Mi",
        profesor: "Miguel Eduardo Aguilar ",
        calificacion: "100",
        obs: "APR",
      },
      {
        codigo: "IS200",
        asignatura: "Introducción a la Ingeniería en sistemas",
        hI: "1900",
        hF: "2000",
        dias: "Lu,Ma,Mi",
        profesor: "Miguel Eduardo Aguilar ",
        calificacion: "100",
        obs: "APR",
      },
      {
        codigo: "IS200",
        asignatura: "Introducción a la Ingeniería en sistemas",
        hI: "1900",
        hF: "2000",
        dias: "Lu,Ma,Mi",
        profesor: "Miguel Eduardo Aguilar ",
        calificacion: "100",
        obs: "APR",
      },
    ];

    return {
      notas,
    };
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Rubik:wght@300;500&display=swap");
.subrayadoNo {
  text-decoration: none;
  color: aliceblue;
}
.tabla {
  width: 156%;
  padding-right: 95px;
  margin-left: -110px;
  margin-top: 50px;
  
}

.textoTabla {
  background-color: #a92727 !important;
  color: white !important;
  font-family: "Rubik";
  text-align: center!important;
}

.textoCuerpo{
  font-family: "Rubik";
  text-align: center;
}
</style>
