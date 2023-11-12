<template>
    <div class="form ">
      <v-sheet class="pa-12 " rounded style="background-color: #282832">
        <v-card
            style="margin-bottom: 25%;"
          class="mx-auto  mt-15 rounded-lg bg-color"
          max-width="600 "
        >
          <div class="encabezadoSolicitud rounded-t-lg">
            <v-row>
              <v-col>
                <v-card-text class="pa-0 text-center">
                  <h1 class="mb-3">Certificado</h1>
                </v-card-text>
              </v-col>
            </v-row>
          </div>
          <v-form class="pa-9 pt-2" @submit.prevent="onSubmit">
            <v-card-text class="pa-0 text-center pt-3" style="color: #282832;">
                  <h3 class="mb-3">Puedes descargar tu certificado de estudios aquí</h3>
                </v-card-text>
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
                  Descargar
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
                <router-link to=  "/principalEstudiantes"  class="subrayadoNo">
                  Volver</router-link>
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
  
      onMounted(async () => {});
  
      const isFormValid = ref(false);
  
      const validateForm = () => {
        if (form.value.justificacion) {
          isFormValid.value = true;
          showAlertSuccess();
        } else {
          isFormValid.value = false;
        }
      };
  
      const showAlertSuccess = () => {
        window.alert("Se ha enviado la solictud correctamente.");
        window.history.back();
      };
  
      const onSubmit = async () => {
        validateForm();
        if (isFormValid.value) {
      //te regresa a la pagina principal de solicitudes
        } 
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
    font-family: "Rubik";
    width: 150%;
    padding-right: 100px;
    margin-left: -100px;
  }
  </style>
  