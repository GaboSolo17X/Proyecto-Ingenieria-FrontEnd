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
      style="background-color: #77181E!important;"
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
                <div class="fieldRound">
                  <v-text-field
                  base-color="white"
                  class="shrink round"
                  variant="outlined"
                  v-model="numeroCuenta"
                  :rules="[(v) => /^\d+$/.test(v) || 'Solo se permiten dígitos',required]"
                  dense
                  light
                  label="Numero de cuenta"
                  type="text"
                  rounded
                ></v-text-field>
                </div>
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
                <v-btn class="boton" large rounded  dark @click="login(this.numeroCuenta, this.claveEstudiante, this.router, this.nombre )"
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
import { useRoute, useRouter} from "vue-router";


export default {
  data() {
  
    return {
      password: "",
      number: "",
      
    };
  },

  setup() {
    const router=useRouter();
    const nombre = ref("");
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
      }
 

      const direcciones = {
        "/estudiantes": "/estudiantes",
      }


      const icons = {
        "/estudiantes": "fa-solid fa-user",
      }

      // /docentes
      // Asigna el saludo correspondiente
      puesto.value = puestos[route.path] || "Hola"; // Saludo por defecto

      dir.value = direcciones[route.path] || "";

      icon.value = icons[route.path] || "";

      nombre.value="estudiante";
    });

    return {
      puesto,
      dir,
      icon,
      rules,
      numeroCuenta,
      claveEstudiante,
      nombre,
      router
    
    };
  },
  methods: {
    login: async (numeroCuenta, claveEstudiante,router,nombre) => {
      console.log(numeroCuenta, claveEstudiante)
      try { 
        const res = await fetch('http://localhost:3030/estudiante/login', {
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
        console.log(data.message)

        if(data.message=='Login exitoso'){
          router.push('/estudiantes')
      }

               
      } catch (error) {
        console.log(error)
      }
    },
  },
};
</script>

<style scoped>
.boton{
  background-color: #282832;
  color:white;
}
body {
  display: flex;
  flex-direction: column;
  margin: 0px;
  min-height: 100vh;
  background-color: #77181E;
  width: 100%;
  height: 100vh;
}
.unah {
  font-size: 60px;
  color: rgb(255, 255, 255);
  background-color: #77181E;
  margin-bottom: 40px;
}

.bien {
  color: white;
}
h3 {
  color: rgb(255, 255, 255);
}
.titulo {
  background-color: #77181E;
}
.left-side {
  background-color: #A92727;
  flex: 1;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
}
.right-side {
  background-color: #FFFFFF;
  flex: 1;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
}

a {
  border-bottom: 2px solid rgb(255, 255, 255);
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