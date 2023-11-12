<template>
  <div class="form">
    <v-sheet class="pt-3 mb-0" rounded style="background-color: white">
      <v-card class="mx-auto mt-10 bg-color">
        <v-form class="pa-9 pt-2" @submit.prevent="onSubmit">
          <v-row class="encabezadoSolicitud">
            <v-col cols="6" style="text-align: center">
              nombre clase y nombre catedratico
            </v-col>
            <v-col style="text-align: center">DEFICIENTE</v-col>
            <v-col cols="1" style="text-align: center">BUENO</v-col>
            <v-col style="text-align: center">MUY BUENO</v-col>
            <v-col style="text-align: center">EXCELENTE</v-col>
          </v-row>
          <v-row>
            <v-col cols="6" class="pregunta">
              <p>
                1. ¿El docente demuestra estar actualizado y tener dominio de la
                disciplina que imparte?
              </p>
            </v-col>
            <v-col class="info">
              <input type="radio" v-model="form.pregunta1" value="DEFICIENTE" />
            </v-col>
            <v-col cols="1" class="info">
              <input type="radio" v-model="form.pregunta1" value="BUENO" />
            </v-col>
            <v-col class="info">
              <input type="radio" v-model="form.pregunta1" value="MUY BUENO" />
            </v-col>
            <v-col class="info">
              <input type="radio" v-model="form.pregunta1" value="EXCELENTE" />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6" class="pregunta">
              <p>
                2. ¿El contenido de la asignatura se desarrolla con adecuada
                profundidad para el nivel de educación universitaria?
              </p>
            </v-col>
            <v-col class="info">
              <input type="radio" v-model="form.pregunta2" value="DEFICIENTE" />
            </v-col>
            <v-col cols="1" class="info">
              <input type="radio" v-model="form.pregunta2" value="BUENO" />
            </v-col>
            <v-col class="info">
              <input type="radio" v-model="form.pregunta2" value="MUY BUENO" />
            </v-col>
            <v-col class="info">
              <input type="radio" v-model="form.pregunta2" value="EXCELENTE" />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6" class="pregunta">
              <p>
                3. ¿Al iniciar el programa académico el docente le proporcionó
                en forma física o digital el programa de la asignatura?
              </p>
            </v-col>
            <v-col class="info">
              <input type="radio" v-model="form.pregunta3" value="DEFICIENTE" />
            </v-col>
            <v-col cols="1" class="info">
              <input type="radio" v-model="form.pregunta3" value="BUENO" />
            </v-col>
            <v-col class="info">
              <input type="radio" v-model="form.pregunta3" value="MUY BUENO" />
            </v-col>
            <v-col class="info">
              <input type="radio" v-model="form.pregunta3" value="EXCELENTE" />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6" class="pregunta">
              <p>
                4. ¿El docente indica las fuentes de consulta accesibles para el
                desarrollo de esta asignatura?
              </p>
            </v-col>
            <v-col class="info">
              <input type="radio" v-model="form.pregunta4" value="DEFICIENTE" />
            </v-col>
            <v-col cols="1" class="info">
              <input type="radio" v-model="form.pregunta4" value="BUENO" />
            </v-col>
            <v-col class="info">
              <input type="radio" v-model="form.pregunta4" value="MUY BUENO" />
            </v-col>
            <v-col class="info">
              <input type="radio" v-model="form.pregunta4" value="EXCELENTE" />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6" class="pregunta">
              <p>
                5. ¿Que cualidades personales y profesionales identifica en el
                docente?
              </p>
            </v-col>
            <v-col class="info">
              <v-textarea
                v-model="form.pregunta5"
                :rules="[(v) => !!v || 'Campo Vacio', (v) => true]"
                class="mb-5"
                label="Justifique aquí"
                hide-details="auto"
                variant="solo-filled"
              >
              </v-textarea>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6" class="pregunta">
              <p>
                6. ¿Ha identificado usted en su docente alguna actitud o
                practica que no sea apropiada para un profesor universitario?
              </p>
            </v-col>
            <v-col class="info">
              <v-textarea
                v-model="form.pregunta6"
                :rules="[(v) => !!v || 'Campo Vacio', (v) => true]"
                class="mb-5"
                label="Justifique aquí"
                hide-details="auto"
                variant="solo-filled"
              >
              </v-textarea>
            </v-col>
          </v-row>

          <br />
          <v-row>
            <v-col></v-col>
            <v-col>
              <v-btn
                block
                rounded
                color="#282832"
                size="large"
                type="submit"
                variant="elevated"
              >
                Finalizar encuesta
              </v-btn>
            </v-col>
            <v-col>
              <v-btn
                block
                rounded
                color="#282832"
                size="large"
                variant="elevated"
              >
                <router-link
                  to="/calificacionesEstudiantes"
                  class="subrayadoNo"
                  @click="$emit('mostrarCards')"
                >
                  Volver</router-link
                >
              </v-btn>
            </v-col>
            <v-col></v-col>
          </v-row>
        </v-form>
      </v-card>
    </v-sheet>
  </div>
</template>

<script>
import { onMounted, ref, watch } from "vue";
export default {
  props: ["form"],
  setup(props) {
    const isFormValid = ref(false);
    const form = ref({
      pregunta1: null,
      pregunta2: null,
      pregunta3: null,
      pregunta4: null,
      pregunta5: "",
      pregunta6: "",
    });

    const validateForm = () => {
      if (
        form.value.pregunta1 &&
        form.value.pregunta2 &&
        form.value.pregunta3 &&
        form.value.pregunta4 &&
        form.value.pregunta5 &&
        form.value.pregunta6
      ) {
        isFormValid.value = true;
        showAlertSuccess();
      } else {
        isFormValid.value = false;
        window.alert("Por favor complete todos los campos");
      }
    };

    const showAlertSuccess = () => {
      window.alert("Se ha completado la evaluación correctamente :).");
      window.history.back();
    };

    const onSubmit = async () => {
      validateForm();
    };

    return {
      form,
      showAlertSuccess,
      onSubmit,
    };
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Rubik:wght@300;500&display=swap");

.info {
  text-align: center;
  border: solid 2px;
  border-color: #77181e;
  display: flex;
  justify-content: center;
}
.pregunta {
  text-align: left;
  border: solid 2px;
  border-color: #77181e;
  display: flex;
  justify-content: center;
}
.subrayadoNo {
  text-decoration: none;
  color: aliceblue;
}
p {
  color: #282832;
  margin-bottom: 5px;
}
.encabezadoSolicitud {
  background-color: #77181e;
  /* border-top-left-radius: 24px;
        border-top-right-radius: 24px; */
  padding: 10px 15px;
  padding-top: 20px;
}
.bg-color {
  background-color: white;
  color: white;
}
.form {
  margin-top: 2%;
  font-family: "Rubik";
  width: 155%;
  padding-right: 100px;
  margin-left: -100px;
}
</style>
