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
            <v-col style="text-align: right">Indice Global: 100</v-col>
            <v-col style="text-align: center">CURLA</v-col>
            <v-col style="text-align: left">Ingeniería Aeroespacial</v-col>
          </v-row>
        </div>
        <v-form class="pa-9 pt-2" @submit.prevent="onSubmit">
          <p>Seleccione la carrera a la cual desea hacer el cambio:</p>
          <v-select
            v-model="form.carr"
            :items="carreras"
            :rules="[(v) => !!v || 'Seleccione una carrera', (v) => true]"
            label="Carreras"
            required
            variant="solo-filled"
            append-inner-icon="fa-solid fa-chevron-down"
          ></v-select>

          <p>
            Ingrese las razones por las cuales desea realizar un cambio de
            carrera
          </p>
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
    const isFormValid = ref(false);
    const carreras = ref([]);
    const form = ref({
      justificacion: "",
      carr: null,
    });
    
    onMounted(async () => {
      getCarreras();
    });
    
    const getCarreras = async () => {
      try {
        const res = await fetch("http://localhost:3030/carreras/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        //console.log(data.length);
        for (let index = 0; index < data.length; index++) {
          carreras.value.push(data[index].nombreCarrera);
          //console.log(data[index])
        }
      } catch (error) {
        console.log(error);
      }
    };

    const validateForm = () => {
      if (
        form.value.justificacion &&
        form.value.carr
        ) {
        isFormValid.value = true;
      } else {
        isFormValid.value = false;
      }
    };

    const showAlertSuccess = () => {
      window.alert("Se ha enviado la solictud correctamente.");
    };

    const onSubmit = async () => {
      validateForm();
      if (isFormValid.value) {
        showAlertSuccess();
        window.history.back(); //te regresa a la pagina principal de solicitudes
      }
    };

    return {
      form,
      carreras,
      showAlertSuccess,
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
