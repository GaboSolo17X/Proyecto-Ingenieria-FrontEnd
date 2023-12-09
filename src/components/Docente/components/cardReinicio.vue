<template>
  <v-card class="mx-auto pa-8 pb-3 cartita" max-width="448" rounded="lg">
    <v-img
      class="mx-auto"
      max-width="228"
      max-height="110px"
      src="../assets/logoUnah.png"
    ></v-img>
    <v-card-title class="text-center font-weight-bold titulo"
      >Reinicio clave
    </v-card-title>
    <v-card-title class="text-center font-weight-bold titulo"
      >Numero empleado: {{ numeroEmpleadoDocente }}</v-card-title
    >

    <div class="text-subtitle-1 d-flex align-center justify-space-between">
      Nueva contraseña
    </div>

    <v-text-field
      v-model="nueva"
      :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
      :type="visible ? 'text' : 'password'"
      :rules="[(v) => !!v || 'escriba la contraseña']"
      density="compact"
      placeholder="Ingrese una nueva contraseña"
      prepend-inner-icon="mdi-lock-outline"
      variant="outlined"
      @click:append-inner="visible = !visible"
    ></v-text-field>
    <div class="text-subtitle-1 d-flex align-center justify-space-between">
      Confirme su contraseña, por favor
    </div>

    <v-text-field
      v-model="confirmar"
      :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
      :type="visible ? 'text' : 'password'"
      density="compact"
      placeholder="vuelva a ingresar la contraseña"
      prepend-inner-icon="mdi-lock-outline"
      variant="outlined"
      :rules="[(v) => !!v || 'escriba la contraseña']"
      @click:append-inner="visible = !visible"
    ></v-text-field>

    <v-btn block class="mb-8" size="large" @click="validarContrasenias()">
      Cambiar clave
    </v-btn>
  </v-card>
</template>
<script>
export default {
  props: {
    numeroEmpleadoDocente: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    visible: false,
    nueva: "",
    confirmar: "",
    snackbar: null,
  }),
  methods: {
    async validarContrasenias() {
      if (this.nueva === this.confirmar) {
        try {
          const res = await fetch(
            "http://localhost:3000/docente/reinicioClave",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                numeroEmpleadoDocente: this.numeroEmpleadoDocente,
                claveDocenteNueva: this.nueva,
              }),
            }
          );
          const data = await res.json();
          if (res.status === 200) {
            window.alert("Contraseña cambiada con éxito");
            this.$router.push("/login-docentes");
          } else {
            window.alert("Error al cambiar la contraseña");
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        window.alert("Las contraseñas no coinciden");
        this.nueva = "";
        this.confirmar = "";
      }
    },
  },
};
</script>
<style scoped>
.cartita {
  background-color: #a92727;
  color: white !important;
  box-shadow: none !important;
}
.cartita :deep(.v-messages) {
  color: yellow !important;
}
.v-btn {
  background-color: #282832;
  border-radius: 30px;
  color: white;
}

.titulo {
  color: white;
}
</style>
