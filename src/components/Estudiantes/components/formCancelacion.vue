<template>
  <div class="form">
    <v-sheet class="pa-12 mb-12" rounded style="background-color: #282832">
      <v-card class="mx-auto mt-10 rounded-lg bg-color" max-width="600 ">
        <div class="encabezadoSolicitud rounded-t-lg">
          <v-row>
            <v-col>
              <v-card-text class="pa-0 text-center">
                <h1 class="mb-3">Paco Mariachi almendares Rodriguez</h1>
              </v-card-text>
            </v-col>
          </v-row>
          <v-row>
            <v-col style="text-align: center">CURLA</v-col>
            <v-col></v-col>
            <v-col cols="5" style="text-align: left"
              >Ingeniería Aeroespacial</v-col
            >
          </v-row>
        </div>
        <v-form class="pa-9 pt-2" @submit.prevent="onSubmit">
          <p>Seleccione las clases que desea cancelar</p>

          <!-- <v-list v-model="clasesSeleccionadas" class="checkboxs elevation-3 mb-3">
              <v-list-item v-for="(clase, index) in clases" :key="index">
                  <checkbox :label="clase.text">Hola</checkbox>
                </v-list-item>
            </v-list> -->
          <v-list
            v-model="clasesSeleccionadas"
            class="checkboxs elevation-3 mb-3"
          >
            <v-list-item v-for="(clase, index) in clases" :key="index">
              <v-row>
                <v-col>
                  <input type="checkbox" /><label class="ml-3" style="color: rgb(118, 118, 118);">{{ clase.text }}</label >
                </v-col>
              </v-row>
            </v-list-item>
          </v-list>

          <p>Suba aquí su formato pdf de cancelación de clases:</p>
          <v-file-input
            v-model="form.pdf"
            @change="handleFileChange"
            show-size
            accept=".pdf"
            :rules="[(v) => !!v || 'Se requiere un archivo ', (v) => true]"
            label="Subir PDF"
            variant="solo-filled"
            prepend-icon="fa-solid fa-file"
          ></v-file-input>
          <p>Ingrese la justificacion de su cancelación excepcional:</p>
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
              >
                <router-link to="/solicitudesEstudiantes" class="subrayadoNo">
                  Volver</router-link
                >
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
    const clases = [
      { text: "Ecuaciones Diferenciales" },
      { text: "Dibujo II" },
      { text: "Ingenieria de Software" },
    ];
    const isFormValid = ref(false);
    const form = ref({
      clasesSeleccionadas: null,
      pdf: null,
      justificacion: "",
    });

    const validateForm = () => {
      if (
        form.value.justificacion &&
        form.value.pdf &&
        form.value.clasesSeleccionadas
      ) {
        isFormValid.value = true;
        showAlertSuccess();
      } else {
        isFormValid.value = false;
      }
    };

    const handleFileChange = (e) => {
      const file = e.target.files[0];
      form.value.pdf = file;
      console.log(file);
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
      clases,
      handleFileChange,
      showAlertSuccess,
      onSubmit,
    };
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Rubik:wght@300;500&display=swap");

.checkboxs {
  background-color: rgb(246, 246, 246);
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
