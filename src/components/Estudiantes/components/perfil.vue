<template>
  <div class="form" style="background-color: #282832">
    <v-sheet class="pa-12 mb-12 ml-5" rounded style="background-color: #282832">
      <v-card class="mx-auto mt-10 rounded-lg bg-color">
        <div class="encabezadoSolicitud rounded-t-lg">
          <v-row>
            <v-col>
              <v-card-text class="pa-0 text-center">
                <h1 class="mb-1">Paco Mariachi almendares Rodriguez</h1>
              </v-card-text>
            </v-col>
          </v-row>
          <v-row class="mb-1">
            <v-col style="text-align: right"><h3>20200000000</h3></v-col>
            <v-col style="text-align: center"><h3>CURLA</h3></v-col>
            <v-col style="text-align: left"
              ><h3>Ingeniería Aeroespacial</h3></v-col
            >
          </v-row>
        </div>
        <v-form class="pa-9 pt-2" @submit.prevent="onSubmit">
          <v-row class="mt-1">
            <v-col cols="3">
              <h3 class="titulos">Descripción actual:</h3></v-col
            >
            <v-col>
              <p>
                Insertar descripción aquí Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Hic illum quidem eos recusandae quos, expedita
                unde qui veniam officiis ea voluptatibus rem, exercitationem
                saepe ipsam fuga soluta. Fugit, modi architecto?
              </p>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="3"><h3 class="titulos">Nueva descripción:</h3></v-col>
            <v-col>
              <v-textarea
                v-model="form.descripcion"
                class="mb-5"
                label="Cuentanos sobre ti"
                hide-details="auto"
                variant="solo-filled"
              >
              </v-textarea>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="3"><h3 class="titulos">Tus imágenes:</h3></v-col>
            <v-col>
              <v-row>
                <CardFoto
                  v-for="card in cards"
                  :key="card.Indice"
                  :card="card"
                />
                <!-- esta es la card para subir imagen -->
                <v-col cols="4">
                  <v-card
                    class="mx-auto text"
                    color="white"
                    rounded
                    height="230px"
                  >
                    <v-row>
                      
                      <v-col class="pt-15 px-10">
                        <v-file-input
                          accept="image/png, image/jpeg, image/bmp"
                          placeholder="Sube una nueva imagen"
                          prepend-icon="fa-solid fa-camera"
                          label="Nueva"
                          small-chips
                        ></v-file-input>
                      </v-col>
                    </v-row>
                    
                    <v-card-actions class="d-flex flex-column">
                      <v-btn
                        color="#282832"
                        variant="flat"
                        rounded="xl"
                        class="px-10"
                      >
                        Subir
                      </v-btn>
                    </v-card-actions>
                  </v-card></v-col
                >
              </v-row>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="4"></v-col>
            <v-col cols="4">
              <v-btn
                block
                rounded
                color="#282832"
                size="large"
                type="submit"
                variant="elevated"
              >
                Guardar cambios
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
import CardFoto from "./cardPerfil.vue";
export default {
  components: { CardFoto },
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
        form.value.descripcion &&
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
      cards: [
        {
          Indice: 1,
          src: require("../assets/usuarioPic.png"),
        },
        {
          Indice: 2,
          src: require("../assets/principal1.png"),
        },
      ],
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

.titulos {
  color: #282832;
  text-align: left;
  font-family: "rubik";
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
  background-color: rgb(223, 223, 236);
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
