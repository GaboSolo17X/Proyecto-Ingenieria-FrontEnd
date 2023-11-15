<template>
  <div class="form">
    <v-sheet class="pa-12 mb-12" rounded style="background-color: #282832">
      <v-card
        class="mx-auto  mt-10 rounded-lg bg-color"
        max-width="600 "
      >
        <div class="encabezadoSolicitud rounded-t-lg">
          <v-row>
            <v-col>
              <v-card-text class="pa-0 text-center">
                <h1 class="mb-3">Paco Mariachi almendares Rodriguez</h1>
              </v-card-text>
            </v-col>
          </v-row>
          <v-row>
            <v-col style="text-align: right;">20200000000</v-col>
            <v-col style="text-align: center;">CURLA</v-col>
            <v-col style="text-align: left;">Ingeniería Aeroespacial</v-col>
          </v-row>
        </div>
        <v-form class="pa-9 pt-2" @submit.prevent="onSubmit">
          <p>Ingrese la justificación para su solicitud de reposición:</p>
          <v-textarea
            v-model="form.justificacion"
            :rules="[(v) => !!v || 'Campo Vacio', (v) => true]"
            class="mb-5"
            label="Justifique aquí"
            hide-details="auto"
            variant="solo-filled"
          >
          </v-textarea>
          <br />
          <v-row>
            <v-col>
              <v-btn
                block
                rounded
                color="#282832"
                size="large"
                type="submit"
                variant="elevated"
              >
                Enviar Solicitud
              </v-btn>
            </v-col>
            <v-col>
              <v-btn
                block
                rounded
                color="#282832"
                size="large"
                variant="elevated"
                @click="goBack()"
              >
                Volver
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card>
    </v-sheet>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
export default {
  setup() {
    const form = ref({
        justificacion: "",
    });


    const isFormValid = ref(false);

    const validateForm = () => {
      if (form.value.justificacion) {
        isFormValid.value = true;
        showAlertSuccess();
      } else {
        isFormValid.value = false;
        window.alert("Por favor complete todos los campos");
      }
    };

    const showAlertSuccess = () => {
      window.alert("Se ha enviado la solictud correctamente.");
      window.history.back();
    };

    const onSubmit = async () => {
      validateForm();
    };

    const goBack = () => {
      window.history.back();
      form.value.justificacion = ""
    };
    return {
      form,
      showAlertSuccess,
      goBack,
      onSubmit
    };
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Rubik:wght@300;500&display=swap");

.subrayadoNo{
  text-decoration: none;
  color: aliceblue;
}
p{
    color: #282832;
    margin-bottom: 5px;
}
.encabezadoSolicitud{
    background-color: #77181E;
/* border-top-left-radius: 24px;
    border-top-right-radius: 24px; */
    padding: 10px 15px;
    padding-top: 35px;
}
.bg-color {
  background-color: #c6d6d6;
  color: white;
}
.form {
  margin-top: -15%;
  font-family: "Rubik";
  width: 150%;
  padding-right: 100px;
  margin-left: -100px;
}
</style>
