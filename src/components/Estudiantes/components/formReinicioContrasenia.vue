<template>
  <v-sheet class="pa-10" rounded >
    <v-card class="mx-auto px-6 py-8 rounded-xl bg-color" max-width="700">
      <v-card-text class="pa-0 text-center">
        <h1 class="mb-5">Por favor ingrese su número de cuenta </h1>
      </v-card-text>
    </v-card>
    <v-card
      class="mx-auto px-6 py-8 mt-10 rounded-xl bg-color-body"
      max-width="700 "
    >
      <v-form class="pa-9 formulario" @submit.prevent="onSubmit">
        <v-text-field
          v-model="form.cuenta"
          :rules="[
            (v) => /^\d+$/.test(v) || 'Solo se permiten dígitos',
            required,
          ]"
          class="mb-5"
          label="Numero de cuenta"
          hide-details="auto"
          variant="solo-filled"
          rounded
        >
        </v-text-field>

        <!-- <v-select
          v-model="form.carrPri"
          :items="carreras"
          :rules="[(v) => !!v || 'Seleccione una carrera', (v) => true]"
          label="Carrera Principal"
          required
          variant="solo-filled"
          rounded
        ></v-select>

        <v-text-field
          v-model="form.email"
          :rules="[
            (v) =>
              /^[a-z0-9+.-]+@[a-z.-]+\.[a-z]+$/i.test(v) ||
              'Ingrese un correo electrónico válido',
            (v) => true,
          ]"
          class="mb-2"
          clearable
          label="Correo Personal"
          variant="solo-filled"
          rounded
        ></v-text-field> -->

        <br />
        <v-btn
          block
          rounded
          color="#77181E"
          size="large"
          type="submit"
          variant="elevated"
        >
          Reiniciar
        </v-btn>
      </v-form>
    </v-card>
  </v-sheet>
</template>

<script>
import { ref, onMounted } from "vue";

export default {
  setup() {
    const form = ref({
      // name: "",
      cuenta: "",
      // carrPri: null,
      // email: "",
    });

    const carreras = ref([]);
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

    const reinicioContrasenia = async (cuenta) => {
      try {
        // const formData = new FormData();
        // formData.append("numeroCuenta", cuenta);
        const res = await fetch(
          " http://localhost:3030/estudiante/recuperacionClave",
          {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
          },
            body: JSON.stringify({numeroCuenta : cuenta})
          }
        );
        const data = await res.json();
         console.log(data.message);
      } catch (error) {
        console.log(error);
      }
    };

    const isFormValid = ref(false);

    const validateForm = () => {
      if (form.value.cuenta) {
        isFormValid.value = true;
        console.log(form.value.cuenta)
        reinicioContrasenia(form.value.cuenta);
        showAlertSuccess();
      } else {
        isFormValid.value = false;
        window.alert("Por favor Ingrese su número de cuenta");
      }
    };

    const showAlertSuccess = () => {
      window.history.back();
      window.alert("Se ha enviado un mensaje a tu correo electrónico, sigue las instrucciones para acceder a tu cuenta.");
      
    };

    const onSubmit = async () => {
      validateForm(); 
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
@import url("https://fonts.googleapis.com/css2?family=Rubik:wght@300;800&display=swap");

.formulario :deep(.v-messages) {
  color: yellow !important;
}
.v-sheet {
  margin-top: 80px;
  font-family: "Rubik", sans-serif;
}

.bg-color {
  background-color: #282832;
  color: white;
}

.bg-color-body {
  background-color: #282832;
  color: white;
}

.numeritos >>> input::-webkit-outer-spin-button,
.numeritos >>> input::-webkit-inner-spin-button {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
}

.card {
  margin-top: 100px;
}

.v-input--error:not(.v-input--disabled) .v-input__details .v-messages {
  color: white;
  font-family: "Rubik", sans-serif;
}
</style>
