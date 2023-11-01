<template>
  <body>
    <v-container>
      <v-row class="titulo">
        <v-col class="titulo" cols="12">
          <v-sheet class="titulo pa-2">
            <h1 class="unah text-center">UNAH</h1>
          </v-sheet>
        </v-col>
      </v-row>
      <v-card
        class="mt-n12 pa-5 rounded-xl"
        color="blue-lighten-5"
        width="100%"
      >
        <v-row justify="space-between">
          <v-col class="left-side">
            <v-row class="row-logo mr-auto ml-auto">
              <v-col class="pumImg" cols="12" lg="12" md="12">
                <img src="./assets/estudiante.png" />
              </v-col>
              <v-col cols="12" lg="12" md="12">
                <h1 class="bien text-center">¡Bienvenidos, Pumitas!</h1>
              </v-col>
              <v-col cols="12" lg="12" md="12">
                <router-link to="/"
                  ><h3 class="enlace text-center">Volver</h3></router-link
                >
              </v-col>
            </v-row>
          </v-col>
          <v-divider vertical dark class="cut"></v-divider>
          <v-col class="right-side text-center">
            <v-row justify="center">
              <v-col class="pb-0">
                <v-icon :icon="icon" class="icono"></v-icon>
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-col class="pt-0">
                <h2>Iniciar Sesion</h2>
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-col lg="8" md="8" cols="12" class="pb-0">
                <v-text-field
                  v-model="numeroCuenta"
                  :rules="[rules.required]"
                  class="numeritos shrink round"
                  dense
                  light
                  label="Numero de cuenta"
                  variant="outlined"
                  type="number"
                  rounded
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-col lg="8" md="8" cols="12" class="py-0">
                <v-text-field
                  v-model="claveEstudiante"
                  :rules="[rules.required]"
                  class="shrink round"
                  dense
                  light
                  type="password"
                  label="Contraseña"
                  variant="outlined"
                  rounded
                  v-on:keyup.enter="login"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-col cols="12" md="12" lg="12" class="pt-0">
                <v-btn large rounded color="blue" dark @click="login(this.numeroCuenta, this.claveEstudiante)"
                  >Ingresar</v-btn
                >
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </body>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { required, minLength, maxLength } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      password: "",
      number: "",
      
    };
  },

  setup() {
    const numeroCuenta = ref("");
    const claveEstudiante = ref("");
    const route = useRoute();
    const puesto = ref("");
    const dir = ref("");
    const icon = ref("");
    const rules = ref({
      required: (value) => !!value || "Llenar campo vacio",
    });
    // const

    onMounted(() => {
      // Mapea las rutas a los saludos correspondientes
      const puestos = {
        "/estudiantes": "Hola estudiantes",
        "/login-docentes": "Docentes",
        "/login-coordinador": "Coordinadors",
        "/login-administrador": "Administradores",
        "/login-jefeDep": "  Jefe de Departamentos",
      };

      const direcciones = {
        "/estudiantes": "/docentes",
        "/login-docentes": "/docentes",
        "/login-coordinador": "/coordinador",
        "/login-administrador": "/administrador",
        "/login-jefeDep": "/jefe",
      };

      const icons = {
        "/estudiantes": "fa-solid fa-user",
        "/login-docentes": "fa-solid fa-user-graduate",
        "/login-coordinador": "fa-solid fa-user-shield",
        "/login-administrador": "fa-solid fa-user-gear",
        "/login-jefeDep": "fa-solid fa-user-tie",
      };

      // /docentes
      // Asigna el saludo correspondiente
      puesto.value = puestos[route.path] || "Hola"; // Saludo por defecto

      dir.value = direcciones[route.path] || "";

      icon.value = icons[route.path] || "";
    });

    return {
      puesto,
      dir,
      icon,
      rules,
      numeroCuenta,
      claveEstudiante,
    };
  },
  methods: {
    login: async (numeroCuenta, claveEstudiante) => {
      console.log(numeroCuenta, claveEstudiante)
      try { 
        const res = await fetch("http://localhost:3000/estudiante/login", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            numeroCuenta: numeroCuenta,
            claveEstudiante: claveEstudiante,
          }),
        });
        const data = await res.json();
        console.log(data);
      } catch (error) {
        console.log(error)
      }
    },
  },
};
</script>

<style scoped>
body {
  display: flex;
  flex-direction: column;
  margin: 0px;
  min-height: 100vh;
  background-color: #e7f2ff;
  width: 100%;
  height: 100vh;
}
.unah {
  font-size: 60px;
  color: rgb(5, 39, 103);
  margin-bottom: 40px;
}

.bien {
  color: white;
}
h3 {
  color: rgb(251, 212, 17);
}
.titulo {
  background-color: #e7f2ff;
}
.left-side {
  background-color: rgb(5, 39, 103);
  flex: 1;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
}
.right-side {
  background-color: #a8cfff;
  flex: 1;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
}

a {
  border-bottom: 2px solid rgb(251, 212, 17);
}

img {
  max-height: 100%;
  max-width: 25%;
}

.pumImg {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: stretch;
  align-content: stretch;
}

/* .round{
  background-color: white;
} */
.icono {
  color: rgb(5, 39, 103);
}

.numeritos >>> input::-webkit-outer-spin-button,
.numeritos >>> input::-webkit-inner-spin-button {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
}
</style>
