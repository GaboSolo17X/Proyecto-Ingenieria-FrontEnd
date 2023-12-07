<template>
  <v-card class="cartita">
    <v-card-title class="font-weight-bold"
      >Evaluacion del estudiante
      <v-btn @click="regresar" class="regresar"> Regresar </v-btn>
    </v-card-title>
    <v-table class="bordes" width="450px">
      <thead>
        <tr>
          <th class="text-left">Pregunta</th>
          <th class="text-left">Respuesta</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in evaluaciones" :key="item.pregunta">
          <td>{{ item.pregunta }}</td>
          <td>{{ item.respuesta }}</td>
        </tr>
      </tbody>
    </v-table>
  </v-card>
</template>
<script>
export default {
  props: { idEvaluacion: Number },
  methods: {
    regresar() {
      this.$router.back();
    },
  },
  data() {
    return {
      evaluaciones: [
        {
          pregunta:
            "1. ¿El docente demuestra estar actualizado y tener dominio de la disciplina que imparte?",
          respuesta: "",
        },
        {
          pregunta:
            "2. ¿El contenido de la asignatura se desarrolla con adecuada profundidad para el nivel de educación universitaria?",
          respuesta: "",
        },
        {
          pregunta:
            "3. ¿Al iniciar el programa académico el docente le proporcionó en forma física o digital el programa de la asignatura?",
          respuesta: "",
        },
        {
          pregunta:
            "4. ¿El docente indica las fuentes de consulta accesibles para el desarrollo de esta asignatura?",
          respuesta: "",
        },
        {
          pregunta:
            "5. ¿Que cualidades personales y profesionales identifica en el docente?",
          respuesta: "",
        },
        {
          pregunta:
            "6. ¿Ha identificado usted en su docente alguna actitud o practica que no sea apropiada para un profesor universitario?",
          respuesta: "",
        },
      ],
    };
  },
  async beforeCreate() {
    try {
      const res = await fetch(
        "http://localhost:3000/jefeDepartamento/obtenerEvaluacion",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ idEvalucion: this.idEvaluacion }),
        }
      );
      const data = await res.json();
      const { evaluacionFound } = data;
      const { respuestas, respuestaTexto1, respuestaTexto2 } = evaluacionFound;
      const respuestasArray = respuestas.split(",");
      for (let i = 0; i < respuestasArray.length; i++) {
        this.evaluaciones[i].respuesta = respuestasArray[i];
      }
      this.evaluaciones[4].respuesta = respuestaTexto1;
      this.evaluaciones[5].respuesta = respuestaTexto2;
    } catch (error) {
      console.log(error);
    }
  },
};
</script>
<style scoped>
.cartita {
  background-color: #c6d6d6;
  padding: 10px;
  margin: 10px;
  border-radius: 5px;
  box-shadow: none;
}

.text-left {
  background-color: #a92727 !important;
  color: white !important;
  font-weight: bold !important;
}

.bordes {
  border-collapse: collapse;
  width: 100%;
  margin-top: 1rem;
}

.bordes th,
.bordes td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.bordes th {
  background-color: #a92727;
  color: white;
}

.v-btn {
  background-color: #a92727;
  color: white;
  height: 40px;
  box-shadow: none;
  margin-left: 8rem;
}
</style>
