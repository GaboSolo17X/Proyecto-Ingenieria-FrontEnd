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
          <v-row>
            <v-col style="text-align: center">{{ datos.centroRegional }}</v-col>
            <v-col></v-col>
            <v-col cols="5" style="text-align: left">{{ datos.carrera }}</v-col>
          </v-row>
        </div>
        <v-form class="pa-9 pt-2" @submit.prevent="onSubmit">
          <p>Seleccione las clases que desea cancelar</p>
          <v-list class="checkboxs elevation-3 mb-3">
            <v-list-item v-for="(clase, index) in clases" :key="index">
              <v-row>
                <v-col>
                  <input
                    type="checkbox"
                    v-model="form.clasesSeleccionadas[index]"
                  /><label class="ml-3" style="color: rgb(118, 118, 118)">{{
                    clase.nombreClase
                  }}</label>
                </v-col>
              </v-row>
            </v-list-item>
          </v-list>

          <p>Suba aquí su formato pdf de cancelación de clases:</p>
          <v-file-input
            ref="fileInputRef"
            @change="handleFileChange"
            show-size
            accept=".pdf"
            :rules="[(v) => !!v || 'Se requiere un archivo ']"
            label="Subir PDF"
            variant="solo-filled"
            prepend-icon="fa-solid fa-file"
          ></v-file-input>
          <!-- <p>Ingrese la justificacion de su cancelación excepcional:</p>
          <v-textarea
            v-model="form.justificacion"
            :rules="[(v) => !!v || 'Campo Vacio', (v) => true]"
            class="mb-5"
            label="Justifique aquí"
            hide-details="auto"
            variant="solo-filled"
          >
          </v-textarea> -->
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
import { onMounted, ref, computed } from "vue";
export default {
  props: { datos: Object },
  setup() {
    const fileInputRef = ref(null);
    const clases = ref([]); //ver que ondas con el .text
    const isFormValid = ref(false);
    const form = ref({
      clasesSeleccionadas: [],
      pdf: null,
      
    });

    const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (file.type === "application/pdf") {
        form.value.pdf = file;
      } else {
        window.alert("Por favor, seleccione un archivo PDF.");
        form.value.pdf = null;
        clearFileInput();
      }
    };

    const clearFileInput = () => {
      if (fileInputRef.value) {
        fileInputRef.value.reset(); // Reiniciar el valor del input file
      }
    };

    const validateForm = () => {
      if (
        form.value.pdf &&
        form.value.clasesSeleccionadas.length > 0
      ) {
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
      console.log(estudiante);
    };

    const getClases = async () => {
      try {
        const formData = new FormData();
        formData.append("cuenta", estudiante.value.numeroCuenta);
        const res = await fetch(
          "http://localhost:3000/estudiante/readMatricula",
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await res.json();
        clases.value = data.clasesMatriculadas;
        console.log(clases);
      } catch (error) {
        console.log(error);
      }
    };

    onMounted(() => {
      estudianteEs();
      getClases(); 
    });

    const pruebaCancelacion = async () => {
      try {
        const formData = new FormData();
        formData.append("cuenta", estudiante.value.numeroCuenta);
        // formData.append("clases", selectedClassesNames.value);
        const nombresSecciones = form.value.clasesSeleccionadas
          .map((isSelected, index) =>
            isSelected ? clases.value[index].nombreClase : null
          )
          .filter((nombreClase) => nombreClase !== null);
        formData.append("clases", nombresSecciones.join(", "));
        formData.append("cancelacionPdf", form.value.pdf);
        const res = await fetch(
          "http://localhost:3000/estudiante/cancelacionExcepcional",
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
        pruebaCancelacion();
      }
    };

    const goBack = () => {
      window.history.back();
        (form.value.pdf = null),
        (form.value.clasesSeleccionadas = []);
    };

    return {
      form,
      clases,
      fileInputRef,
      handleFileChange,
      showAlertSuccess,
      goBack,
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
