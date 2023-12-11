<template>
  <v-sheet class="pa-15 " rounded style="background-color: #77181e;" height="600px">
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
          label="Número de cuenta"
          hide-details="auto"
          variant="solo-filled"
          rounded
        >
        </v-text-field>

        
        <br />
        <v-btn
          block
          rounded
          color="#282832"
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

   

    const reinicioContrasenia = async (cuenta) => {
      try {
        // const formData = new FormData();
        // formData.append("numeroCuenta", cuenta);
        const res = await fetch(
          " http://localhost:3000/estudiante/recuperacionClave",
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
        //  console.log(msg)
        switch (data.message) {
          case 'El estudiante no existe':
          window.alert("Este numero de cuenta no existe, intentelo de nuevo");
          // window.location.reload()
          form.value.cuenta="";
            break;
        
          default:
          showAlertSuccess(); //Esto si la cuenta existe
            break;
        }
          
      } catch (error) {
        console.log(error);
      }
    };

    const isFormValid = ref(false);

    const validateForm = () => {
      if (form.value.cuenta) {
        isFormValid.value = true;
        console.log(form.value.cuenta)
        reinicioContrasenia(form.value.cuenta)
          // ms=='El estudiante no existe'
          // window.alert("Este numero de cuenta no existe");
        
        
      } else {
        isFormValid.value = false;
        window.alert("Por favor Ingrese su número de cuenta");
      }
    };

    const showAlertSuccess = () => {
      window.alert("Se ha enviado un mensaje a tu correo electrónico, sigue las instrucciones para acceder a tu cuenta.");
      window.history.back();
    };

    const onSubmit = async () => {
      // console.log(msg)
          validateForm();
      
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
@import url("https://fonts.googleapis.com/css2?family=Rubik:wght@300;800&display=swap");

.formulario :deep(.v-messages) {
  color: yellow !important;
}
.v-sheet {
  margin-top: 80px;
  font-family: "Rubik", sans-serif;
}

.bg-color {
  background-color: #a92727;
  color: white;
}

.bg-color-body {
  background-color: #a92727;
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
