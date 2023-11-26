<template>
  <div class="form" style="background-color: #282832">
    <v-sheet class="pa-12 mb-12 ml-5" rounded style="background-color: #282832">
      <v-card class="mx-auto mt-10 rounded-lg bg-color">
        <div class="encabezadoSolicitud rounded-t-lg">
          <v-row>
            <v-col>
              <v-card-text class="pa-0 text-center">
                <h1 class="mb-1">
                  {{ datos.nombres }} {{ " " }}{{ datos.apellidos }}
                </h1>
              </v-card-text>
            </v-col>
          </v-row>
          <v-row class="mb-1">
            <v-col style="text-align: right"
              ><h3>{{ datos.numeroCuenta }}</h3></v-col
            >
            <v-col style="text-align: center"
              ><h3>{{ datos.centroRegional }}</h3></v-col
            >
            <v-col style="text-align: left"
              ><h3>Indice: {{ ' ' }} {{ indiceAcadem }}</h3></v-col
            >
            <v-col style="text-align: left"
              ><h3>{{ datos.carrera }}</h3></v-col
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
                {{ descripcActual }}
              </p>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="3"><h3 class="titulos">Nueva descripción:</h3></v-col>
            <v-col>
              <!-- v-model="form.descripcion" -->
              <v-textarea
              v-model="form.nuevaDescripcion"
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
                  :key="card.idfotoEstudiante"
                  :card="card"
                />
                <!-- esta es la card para subir imagen -->
                <v-col cols="4">
                  <v-card
                  v-show="isSubirFotoVisible"
                    class="mx-auto text"
                    color="white"
                    rounded
                    height="230px"
                  >
                    <v-row>
                      <v-col class="pt-15 px-10">
                        <v-file-input
                          accept="image.png, image/jpeg, image/bmp image/jfif"
                          placeholder="Sube una nueva imagen"
                          prepend-icon="fa-solid fa-camera"
                          label="Nueva"
                          small-chips
                          @change="handleFileChange"
                        ></v-file-input>
                      </v-col>
                    </v-row>

                    <v-card-actions class="d-flex flex-column">
                      <v-btn
                        color="#282832"
                        variant="flat"
                        rounded="xl"
                        class="px-10"
                        @click="subirFoto()"
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
            <v-col cols="3"></v-col>
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
          <v-row>
            <v-col cols="3"></v-col>
            <v-col cols="4">
              <router-link
                to="/principalEstudiantes"
                style="text-decoration: none"
              >
                <v-btn
                  block
                  rounded
                  color="#282832"
                  size="large"
                  type="submit"
                  variant="elevated"
                >
                  Volver
                </v-btn>
              </router-link>
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
  props: {
    datos: Object,
  },
  components: { CardFoto },
  setup() {
    const indiceAcadem = ref();
    const isSubirFotoVisible = ref(true);
    const isFormFotoValid = ref(false);
    const isFormdescripValid = ref(false);
    const descripcActual = ref("");
    const form = ref({
      nuevaDescripcion: "",
    });

    const formFoto = ref({
      nuevaFoto: null,
    });
    const cards = ref([]);

    const estudiante = ref();
    const estudianteEs = async () => {
      estudiante.value = JSON.parse(localStorage.getItem("Estudiante"));
      console.log(estudiante.value);
    };

    const subirFoto = async () => {
      validateFoto(); // Validar el formulario antes de enviar
    };

    const enviarFoto = async (foto) => {
      try {
        const formData = new FormData();
        formData.append("cuenta", estudiante.value.numeroCuenta);
        formData.append("fotoEstudiante", foto);
        const res = await fetch(
          " http://localhost:3030/perfilEstudiante/addFoto",
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await res.json();
         console.log(data.message);
      } catch (error) {
        console.log(error);
      }
    };

    const actualizarDescripción = async () => {
      try {
        const formData = new FormData();
        formData.append("numeroCuenta", estudiante.value.numeroCuenta);
        formData.append("idfotoEstudiante", '' );
        formData.append("descripcion", form.value.nuevaDescripcion);
        const res = await fetch(
          " http://localhost:3030/perfilEstudiante/modPerfilEstudiante",
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await res.json();
        // console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    const validateFoto = () => {
      if (formFoto.value.nuevaFoto) {
        isFormFotoValid.value = true;
        enviarFoto(formFoto.value.nuevaFoto);
        window.location.reload();
        //console.log("foto enviada");
      } else {
        isFormFotoValid.value = false;
        window.alert("No ha seleccionado ninguna foto");
      }
    };

    const validateDescripcion = () => { //editar esto
      if (form.value.nuevaDescripcion) {
        isFormdescripValid.value = true;
        actualizarDescripción();
        // console.log("descripción valida");
         window.location.reload();
      } else {
        isFormdescripValid.value = false;
        window.alert("No hay cambios nuevos en la descripción ");
      }
    };

    const getDescripcion = async () => {
      try {
        const formData = new FormData();
        formData.append("cuenta", estudiante.value.numeroCuenta);
        const res = await fetch(
          "http://localhost:3030/perfilEstudiante/perfilEstudianteById",
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await res.json();
        console.log(data);
        descripcActual.value = data.formContenido.descripcion;
        console.log(descripcActual);
      } catch (error) {
        console.log(error);
      }
    };

    const getFotos = async () => {
      try {
        const formData = new FormData();
        formData.append("cuenta", estudiante.value.numeroCuenta);
        const res = await fetch(
          " http://localhost:3030/perfilEstudiante/getFotosEstudianes",
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await res.json();
        // console.log(data);
        cards.value = data.fotos;
        console.log(cards);
        console.log(cards.value.length);
        mostrarSubir();
      } catch (error) {
        console.log(error);
      }
    };

    const getIndice = async () => {
      try {
        const res = await fetch(
          "http://localhost:3030/estudiante/getIndiceAcademico",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              cuentaEstudiante : estudiante.value.numeroCuenta,
            }),
          }
        );
        const data = await res.json();
        console.log(data);
        indiceAcadem.value=data.indiceAcademico;
        console.log(indiceAcadem);
      } catch (error) {
        console.error("Error al cargar el indice del estudiante", error);
      }
    };


    const handleFileChange = (e) => {
      const file = e.target.files[0];
      formFoto.value.nuevaFoto = file;
      console.log(file);
    };

    const mostrarSubir =()=>{
      if (cards.value.length<3) {
        isSubirFotoVisible.value = true;
        console.log("Me muestro")
        console.log("Mi tamanio "+cards.value.length)
      } else {
        isSubirFotoVisible.value = false;
        console.log("No me muestro")
        console.log("Mi tamanio "+cards.value.length)
      }
    }

    onMounted(() => {
      estudianteEs();
      getDescripcion();
      getFotos();
      getIndice();
     
    });

    const onSubmit = async () => {
      validateDescripcion(); // Validar la descripción
    };

    return {
      indiceAcadem,
      isSubirFotoVisible,
      form,
      cards,
      descripcActual,
      handleFileChange,
      subirFoto,
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
