<template>
  <div class="form">
    <v-sheet class="pa-12 mb-12" rounded style="background-color: #282832">
      <v-card class="mx-auto mt-10 rounded-lg bg-color" max-width="600 ">
        <div class="encabezadoSolicitud rounded-t-lg">
          <v-row>
            <v-col>
              <v-card-text class="pa-0 text-center">
                <h1 class="mb-3">
                  {{ datos.nombres }} {{ " " }} {{ datos.apellidos }}
                </h1>
              </v-card-text>
            </v-col>
          </v-row>
        </div>
        <v-form class="pa-9 pt-2" @submit.prevent="onSubmit">
          <p>Seleccione el centro al que desea hacer el cambio</p>
          <v-select
            v-model="form.centroRe"
            :items="centroFiltro"
            :rules="[(v) => !!v || 'Seleccione una carrera', (v) => true]"
            label="Centros"
            required
            variant="solo-filled"
            append-inner-icon="fa-solid fa-chevron-down"
          ></v-select>

          <p>Razones por las cuales desea realizar este cambio de centro:</p>
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
  props: { datos: Object },
  setup() {
    const isFormValid = ref(false);
    const centros = ["UNAH-VS", "UNAH-CU", "CURLA"];
    const centroFiltro = ref([]);
    const centroActual = ref();
    const form = ref({
      justificacion: "",
      centroRe: null,
    });

    const validateForm = () => {
      if (form.value.justificacion && form.value.centroRe) {
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

    const estudiante = ref();
    const estudianteEs = async () => {
      console.log("El estudiante es");
      estudiante.value = JSON.parse(localStorage.getItem("Estudiante"));
      centroActual.value = estudiante.value.centroRegional;
      centroFiltro.value = centros
        .filter((centro) => centro !== centroActual.value)
        .map((centro) => centro);
    };

    onMounted(() => {
      estudianteEs();
    });

    const pruebaCentro = async () => {
      try {
        const formData = new FormData();
        formData.append("cuenta", estudiante.value.numeroCuenta);
        formData.append("centroCambio", form.value.centroRe);
        formData.append("justificacion", form.value.justificacion);
        const res = await fetch(
          "http://localhost:3000/estudiante/solicitudCambioCentro",
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await res.json();
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    const onSubmit = async () => {
      validateForm();
      if (isFormValid.value) {
        pruebaCentro();
      }
    };

    const goBack = () => {
      window.history.back();
      form.value.justificacion = "";
      form.value.centroRe = null;
    };

    return {
      form,
      centroFiltro,
      showAlertSuccess,
      goBack,
      onSubmit,
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
