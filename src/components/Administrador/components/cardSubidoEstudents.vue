<template>
<v-card class="mx-auto tarjeta " width="90%" >
    <div class="titulo">{{ subida }}</div>
    <div class="archivo">
      <form @submit.prevent="onSubmit">
        <v-file-input
          @change="handleFileChange"
          v-model="form.csv"
          :rules="[(v) => !!v || 'Se requiere un archivo', (v) => true]"
          accept=".csv, .xls, .xlsx"
          append-inner-icon="fa:fas fa-solid fa-file"
          bg-color="white"
          placeholder="Subir archivo"
          label="Seleccione aquí"
        ></v-file-input>

        <div class="divBoton">
          <v-btn 
          @click="enviarCsvEstudiantes"
          block rounded="xl" type="submit" class="botones">
            Subir
          </v-btn>
        </div>
      </form>
    </div>
  </v-card>
</template>

<script>
import { ref,onMounted} from 'vue';
import { useRoute } from 'vue-router';


export default {
  components:{},
  props: {
    subida: String,
  },
  setup() {
    const form = ref({
      csv: null,
    });

    const usrfile= ref('');
    const isFormValid = ref(false);
    const route = useRoute();
    const nombre =ref('');
    const link=ref('');
    const ruta=ref('');

    const handleFileChange = (e) => {
      const file = e.target.files[0];
      usrfile.value = file;
    };

    const enviarCsvEstudiantes =async()=>{
      try {
        const formData = new FormData();//cuando se envia algo :D
        formData.append("usrfile",usrfile.value);
        const res = await fetch ("http://localhost:3000/upload/creacion",{
          method: "POST",
          body: formData,
        })
        const data =await res.json();
        console.log(data);
      } catch (error) {
        console.log(error)
      }
    }

    onMounted(() => {
      
      // Mapea las rutas a los saludos correspondientes
      const nombres = {
        '/adminCSV':  'admisiones',
        '/adminCSVestudents': 'estudiantes',
      };

      const links={
        '/adminCSV':  'subircsv',
        '/adminCSVestudents': 'creacion',
      };

      const rutas = {
        '/adminCSV':  'get/prueba',
        '/adminCSVestudents': 'getestudiantes',
      };
      // /docentes
      // Asigna el saludo correspondiente
      nombre.value = nombres[route.path] || ''; 
      link.value = links[route.path] || ''; 
      ruta.value = rutas[route.path] || ''; 

    });

    const validateForm = () => {
      if (form.value.csv) {
        isFormValid.value = true;
      } else {
        isFormValid.value = false;
      }
    };

    const onSubmit = async () => {
      validateForm();
      
      if (isFormValid.value) {
        showAlertSuccess();
        if (nombre.value==='admisiones') {
        }
        if (nombre.value==='estudiantes') {
        }
  
      }
    };

    const showAlertSuccess = () => {
      if (window.alert('Se ha cargado el archivo correctamente.')) {
      }

    };

    return {
      form,
      nombre,
      ruta,
      usrfile,
      handleFileChange,
      enviarCsvEstudiantes,
      onSubmit,
    };
  },
};
</script>

<style scoped>


@import url('https://fonts.googleapis.com/css2?family=Rubik:wght@300;500&display=swap');


.divBoton{
    width: 90%; 
    display: flex;
    flex-direction: column;
    justify-content: center; 
    margin: 30px;
    align-items: center;
}
.botones{
    background-color: #77181E;
    color: white;
    font-family: 'Rubik';
    text-align: center;
    width: 200px;
}
.titulo{
    color: white;
  font-family: 'Rubik';
  font-size: 30px;
  text-align: center; /* Agrega esta propiedad para centrar horizontalmente */
  display: flex;
  flex-direction: column;
  justify-content: center; /* Elimina align-content y align-items */
  margin: 30px;
}

.archivo{
    width: 90%;
    margin-left: -20px;
}
.tarjeta{
    background-color: #282832;
    color: white;
    font-family: 'Rubik';
    border-radius: 15px;
    display: flex;
	flex-direction: column;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;
	align-content: center;
}
</style>