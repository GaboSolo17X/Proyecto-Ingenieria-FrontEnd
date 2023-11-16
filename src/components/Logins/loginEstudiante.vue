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
        style="background-color: #77181e !important"
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
                <v-icon icon="fa-solid fa-user" base-color="red" class="icono"></v-icon>
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
                    class="shrink round"
                    v-model="numeroCuenta"
                    :rules="[
                      (v) => /^\d+$/.test(v) || 'Solo se permiten dígitos']"
                    dense
                    light
                    label="Numero de cuenta"
                    type="text"
                    rounded
                    variant="outlined"
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
                <v-btn
                  class="boton"
                  large
                  rounded
                  dark
                  @click="
                    login(
                      this.numeroCuenta,
                      this.claveEstudiante,
                      this.router,
                      this.nombre
                    )
                  "
                  >Ingresar</v-btn
                >
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-col lg="8" md="8" cols="12" class="py-0">
                <router-link to="/reinicioClaveEstudiantes" class="enlaceContrasenia mb-5"> 
                  ¿Olvidaste tu contraseña?
                </router-link>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
    <template>
      <div>
        <v-dialog v-model="dialog" width="auto">
          <v-card class="PopPup">
            <v-card-text class="textoPop">
              ¡FELICIDADES!, <br />
              su puntaje ha sido admitido para ambas carreras, <br />
              por favor seleccione una:
            </v-card-text>
            <v-btn
              @click="actualizarCarrera(carreraPrincipalBoton)"
              class="botones"
              >{{ carreraPrincipalBoton }}</v-btn
            >
            <v-btn
              @click="actualizarCarrera(carreraSecundariaBoton)"
              class="botones"
              >{{ carreraSecundariaBoton }}</v-btn
            >
          </v-card>
        </v-dialog>
      </div>
    </template>
  </body>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
//  import EleccionCarrera from './components/eleccionCarrera.vue'

export default {
  data() {
    return {
      password: "",
      number: "",
    };
  },

  ///...

  setup() {
    const dialog = ref(false);
    const userNumeroCuenta = ref("");
    const carreraPrincipalBoton = ref("");
    const carreraSecundariaBoton = ref("");
    const router = useRouter();
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
    const login = async (numeroCuenta, claveEstudiante, router, nombre) => {
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
        console.log(data.message)

        if(data.message == "Credenciales Incorrectas" || data.message == "Error en el servidor"){
          window.alert('Credenciales Incorrectas');
        }
        if (data.message != "Credenciales Incorrectas") {
          let { carreraSecundaria, carrera } = data.estudianteLogin;

          carreraPrincipalBoton.value = carrera;
          carreraSecundariaBoton.value = carreraSecundaria;
          userNumeroCuenta.value = data.estudianteLogin.numeroCuenta;

          if (!(carreraSecundaria == null)) {
            dialog.value = true;
       
          } else {
            //AQUI TAMBIEN SE VA A REDIRIGIR A LA PAGINA DEL ESTUDIANTE
            console.log(res.json.message);
            router.push('/estudiantes');

          }
        }

        const token = data.token;
        console.log(token)
        
        localStorage.setItem('Estudiante', token)
        

        //Aqui esta el error de este data intenta sacar info que no esta
        
      } catch (error) {
        console.log(error);
       
      }
    };
    // const

    const actualizarCarrera = async (nombreCarrera) => {
      const res = await fetch(
        "http://localhost:3000/estudiante/actualizarCarrera",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            numeroCuenta: userNumeroCuenta.value,
            carrera: nombreCarrera,
          }),
        }
      );

      if (res.status === 200) {
        //AQUI SE VA A REDIRIGIR A LA PAGINA DEL ESTUDIANTE
             router.push('/estudiantes');
      }
    };

    onMounted(() => {
      // Mapea las rutas a los saludos correspondientes
      const puestos = {
        "/estudiantes": "Hola estudiantes",
      };

      const direcciones = {
        "/estudiantes": "/estudiantes",
      };

      const icons = {
        "/estudiantes": "fa-solid fa-user",
      };

      // /docentes
      // Asigna el saludo correspondiente
      puesto.value = puestos[route.path] || "Hola"; // Saludo por defecto

      dir.value = direcciones[route.path] || "";

      icon.value = icons[route.path] || "";

      nombre.value = "estudiante";
    });

    

    return {
       rules,
      login,
      dialog,
      puesto,
      dir,
      icon,
      rules,
      numeroCuenta,
      claveEstudiante,
      nombre,
      router,
      carreraPrincipalBoton,
      carreraSecundariaBoton,
      actualizarCarrera,
      userNumeroCuenta,
    };
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Rubik:wght@300;500&display=swap');
.enlaceContrasenia{
  text-decoration-color: #282832;
  color: #282832;
  display: flex;
  justify-content: flex-end;
}
.PopPup{
  background-color: #282832;
  border-radius: 20px !important;
}

.textoPop {
  color: white;
  font-family: "Rubik";
  font-size: 20px !important;
  text-align: center !important;
}
.botones {
  width: 50%;
  color: white;
  font-family: "Rubik";
  display: flex;
  text-align: center;
  background-color: #77181e;
  margin: 15px 25%;
  border-radius: 20px !important;
}
.boton {
  background-color: #282832;
  color: white;
}
body {
  display: flex;
  flex-direction: column;
  margin: 0px;
  min-height: 100vh;
  background-color: #77181e;
  width: 100%;
  height: 100vh;
}
.unah {
  font-size: 60px;
  color: rgb(255, 255, 255);
  background-color: #77181e;
  margin-bottom: 40px;
}

.bien {
  color: white;
}
h3 {
  color: rgb(255, 255, 255);
}
.titulo {
  background-color: #77181e;
}
.left-side {
  background-color: #a92727;
  flex: 1;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
}
.right-side {
  background-color: #ffffff;
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
  color: #282832;
}

.numeritos >>> input::-webkit-outer-spin-button,
.numeritos >>> input::-webkit-inner-spin-button {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
}
</style>
