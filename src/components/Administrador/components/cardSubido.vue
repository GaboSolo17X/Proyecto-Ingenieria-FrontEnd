<template>
<v-card class="mx-auto tarjeta " width="90%" v-show="isCardCSV">
    <div class="titulo">{{ subida }}</div>
    <div class="archivo">
      <form @submit.prevent="onSubmit">
        <v-file-input
          v-model="form.csv"
          :rules="[(v) => !!v || 'Se requiere un archivo', (v) => true]"
          accept=".csv, .xls, .xlsx"
          append-inner-icon="fa:fas fa-solid fa-file"
          bg-color="white"
          placeholder="Subir archivo"
          label="Seleccione aquí"
        ></v-file-input>

        <div class="divBoton">
          <v-btn block rounded="xl" type="submit" class="botones">
            Subir
          </v-btn>
        </div>
      </form>
    </div>
  </v-card>

  <TablaAdmin v-show="isTableEstu"/>
  <TablaAdmisiones v-show="isTableVisible"/>

</template>

<script>
import { ref,onMounted} from 'vue';
import { useRoute } from 'vue-router';
import TablaAdmin from '../components/tablaAdmin.vue';
import TablaAdmisiones from '../components/tablaAdmisiones.vue'

export default {
  components: {TablaAdmin,TablaAdmisiones },
  props: {
    subida: String,
  },
  setup() {
    const form = ref({
      csv: null,
    });

    const isFormValid = ref(false);
    const route = useRoute();
    const isTableVisible=ref(false)
    const isCardCSV= ref(true)
    const isTableEstu= ref(false)
    const nombre =ref('');
    const link=ref('');
    const ruta=ref('');

    const showTable = (card,estu,admin) => {
       isTableVisible.value=admin;
        isCardCSV.value= card;
        isTableEstu.value=estu;
    };
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
          showTable(false,false,true);
        }
        if (nombre.value==='estudiantes') {
          showTable(false,true,false);
        }
        
        
      }
    };

    const showAlertSuccess = () => {
      if (window.alert('Se ha cargado el archivo correctamente.')) {
      }

    };

    /*const pruebaRegistro=async()=>{
  try {
    const formData=new FormData();
    formData.append('usrfile',form.value.name);
    const res=await fetch('http://localhost:3000/upload/'+ link,{
      method:'POST',
      body: formData
    });
    const data=await res.json();
    console.log(data)
    console.log(message)
  } catch (error) {
    console.log(error)
  }
 }*/

    return {
      form,
      isTableVisible,
      isCardCSV,
      isTableEstu,
      nombre,
      ruta,
      showTable,
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