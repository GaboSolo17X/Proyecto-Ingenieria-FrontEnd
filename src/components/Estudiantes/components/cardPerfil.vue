<template>
  <v-col cols="4">
    <v-card class="mx-auto text" color="white" rounded height="230px">
      <v-row class="pt-3">
        <v-col cols="2"></v-col>
        <v-col
          ><v-img
            :src="'http://localhost:3000/' + card.fotoEstudiante"
            class="imagen"
            width="120"
            height="120"
            cover
          ></v-img
        ></v-col>
        <v-col cols="2"></v-col>
      </v-row>

      <v-card-actions class="d-flex flex-column">
        <v-btn
          color="#282832"
          variant="flat"
          rounded="xl"
          class="buttom"
          @click="seleccionarFoto(card.idfotoEstudiante)"
          >Seleccionar
        </v-btn>
      </v-card-actions>
      <v-row>
        <v-col></v-col>
        <v-btn
          class="mt-2"
          density="comfortable"
          icon="fa-solid fa-trash-can"
          @click="eliminarFoto(card.idfotoEstudiante)"
        ></v-btn
        ><v-col></v-col>
      </v-row> </v-card
  ></v-col>
</template>

<script>
import { ref, onMounted } from "vue";
export default {
  name: "card",
  props: ["card"],
  setup() {
    const seleccionarFoto = (idCard) => {
      console.log(idCard);
      actualizarFotoPrincipal(idCard);
      setTimeout(recargar, 1000);
    };

    const estudiante = ref();
    const estudianteEs = async () => {
      estudiante.value = JSON.parse(localStorage.getItem("Estudiante"));
    };
    const recargar = () => {
      window.location.reload();
    };

    const actualizarFotoPrincipal = async (id) => {
      try {
        const formData = new FormData();
        formData.append("cuenta", estudiante.value.numeroCuenta);
        formData.append("idfotoEstudiante", id);
        formData.append("descripción", "");
        const res = await fetch(
          " http://localhost:3000/perfilEstudiante/modPerfilEstudiante",
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await res.json().then(actualizarLsFoto());
        // console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    const actualizarLsFoto = async () => {
      try {
        const res = await fetch(
          "http://localhost:3000/perfilEstudiante/actualizarLocalStorage",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              numeroCuenta: estudiante.value.numeroCuenta,
            }),
          }
        );
        const data = await res.json();
        console.log(data);
        const infoUsuario = JSON.stringify(data.infoEstudiante);
        console.log(infoUsuario);
        localStorage.clear();
        localStorage.setItem("Estudiante", infoUsuario);
      } catch (error) {
        console.log(error);
      }
    };

    const eliminarFoto = async (id) => {
      console.log(id);
      try {
        const formData = new FormData();
        formData.append("cuenta", estudiante.value.numeroCuenta);
        formData.append("idfotoEstudiante", id);
        const res = await fetch(
          " http://localhost:3000/perfilEstudiante/deleteFoto",
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await res.json();
        console.log(data.message);
        //esto se ejecuta cuando la foto eliminada
        //es la foto que esta seleccionada en el encabezado
        if (data.message == "Foto eliminada y actualizada") {
          const infoUsuario = JSON.stringify(data.infoEstudiante);
          console.log(infoUsuario);
          localStorage.clear();
          localStorage.setItem("Estudiante", infoUsuario);
        }
         window.location.reload();
      } catch (error) {
        console.log(error);
      }
    };

    onMounted(() => {
      estudianteEs();
    });

    return {
      // isSelected,
      seleccionarFoto,
      eliminarFoto,
    };
  },
};
</script>

<style>
.imagen {
  padding: 10px !important;
  border-radius: 50%;
  background-size: cover;
}
</style>
