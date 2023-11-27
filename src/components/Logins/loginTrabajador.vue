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
                <v-img 
                class="imgMargin"
                 width="150px"
                 height="150px"
                :aspect-ratio="1"
                src="../../assets/pumaTrabajador.png">
                </v-img>
              </v-col>
              <v-col cols="12" lg="12" md="12">
                <h1 class="bien text-center">¡Bienvenidos Pumas {{puesto}}!</h1>
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
                v-model="numeroEmp"
                 :rules="[(v) => /^\d+$/.test(v) || 'Solo se permiten dígitos']"
                  class="shrink round"
                  dense
                  light
                  label="Numero de Empleado"
                  variant="outlined"
                  type="text"
                  rounded
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-col lg="8" md="8" cols="12" class="py-0">
                <v-text-field
                  v-model="claveEmp"
                  :rules="[(v) => !!v || 'Llenar campo vacio']"
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
                <v-btn class="boton mt-2" large rounded   @click="login(this.numeroEmp, this.claveEmp, this.router, this.nombre, this.dir)"
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
import { ref, onMounted } from 'vue';
import { useRoute,useRouter } from 'vue-router';



export default {

  data(){
    return{
      password:'',
      number:'',
    };
  },

  setup() {
    const router=useRouter();
    const route = useRoute();
    const puesto = ref('');
    const dir=ref('');
    const icon=ref('');
    const numeroEmp = ref('');
    const claveEmp = ref('');
    const nombre = ref('');
    const rules = ref({
    required: (value) => !!value || 'Llenar campo vacio',
    });
   

    onMounted(() => {
      
      // Mapea las rutas a los saludos correspondientes
      const puestos = {
        '/login-docentes': 'Docentes',
        '/login-coordinador': 'Coordinadores',
        '/login-administrador': 'Administradores',
        '/login-jefeDep': '  Jefe de Departamentos',
      };

      const direcciones={
        '/login-docentes': '/docentes',
        '/login-coordinador': '/coordinador',
        '/login-administrador': '/administrador',
        '/login-jefeDep': '/jefe'
      }

      const icons={
        '/login-docentes': 'fa-solid fa-user-graduate',
        '/login-coordinador': 'fa-solid fa-user-shield',
        '/login-administrador': 'fa-solid fa-user-gear',
        '/login-jefeDep': 'fa-solid fa-user-tie'
      }

      
      const nombres = {
        '/login-docentes': 'docente',
        '/login-coordinador': 'coordinador',
        '/login-administrador': 'administrador',
        '/login-jefeDep': 'jefeDepartamento',
      };
      // /docentes
      // Asigna el saludo correspondiente
      puesto.value = puestos[route.path] || ''; 

      dir.value= direcciones[route.path] || ''

      icon.value= icons[route.path] || ''

      

      // claveEmp.value = claveEmps[route.path] || ''

      nombre.value = nombres[route.path] || ''


    });

    return {
      rules,
      puesto,
      dir,
      icon,
      rules,
      numeroEmp,
      claveEmp,
      nombre,
      router
    };
  },

   methods: {
    login: async (numeroEmp, claveEmp,router, nombre,dir) => {
      console.log(numeroEmp, claveEmp, nombre,dir)
      try { 
        const res = await fetch('http://localhost:3000/'+nombre+'/login', {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: numeroEmp,
            clave: claveEmp,
          }),
        });
        const data = await res.json();
        console.log(data.message);


        if(data.message == "Credenciales Incorrectas" || data.message == "Error en el servidor"){
          window.alert('Credenciales Incorrectas');
        }else
        if(data.message=="Login exitoso"){
         
          if(dir==='/docentes'){
            const infoUsuario =  JSON.stringify(data.docente)
            console.log(infoUsuario)
            localStorage.setItem('DocentePrueba',infoUsuario)
          } 
          if(dir==='/coordinador'){
            const infoUsuario = JSON.stringify( data.coordinador)
            console.log(infoUsuario)
            localStorage.setItem('Coordinador',infoUsuario  )
          } 
          if(dir==='/administrador'){
             const infoUsuario = JSON.stringify( data.administrador)
             console.log(infoUsuario)
            localStorage.setItem('Administrador', infoUsuario)
          } 
          if(dir==='/jefe'){
            const infoUsuario = JSON.stringify( data.jefe)
            console.log(infoUsuario)
            localStorage.setItem('JefeDep', infoUsuario)
          } 
          router.push(dir);
          
        }
      } catch (error) {
        console.log(error)
        // window.alert('Credenciales Incorrectas');
      }
    },
  },
};

</script>

<style scoped>
.imgMargin{
  margin-top: 30px;
}
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
  color: #282832;
}

.numeritos >>> input::-webkit-outer-spin-button,
.numeritos >>> input::-webkit-inner-spin-button {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
}
</style>