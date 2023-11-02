<template>
  <v-sheet class="pa-12" rounded>
    <v-card class= "mx-auto px-6 py-8 rounded-xl " max-width="700" >
        <v-card-text class="pa-0 text-center">
        <h1 class="mb-5">A un paso para llegar a ser PUMA</h1>
         <p >Porfavor llena todos los campos para que sea admitida tu solicitud</p>
      </v-card-text>
    </v-card>
    <v-card class="mx-auto px-6 py-8 mt-10 rounded-xl " max-width="700 " >
      <v-form class="pa-9"  @submit.prevent="onSubmit">
        <v-text-field 
          v-model="form.name"
          :rules="[(v) => !!v || 'Campo Vacio', (v) => true]"
          class="mb-5" 
          label="Nombres" 
          hide-details="auto"
          variant="outlined"
          rounded>
       </v-text-field>

        <v-text-field 
          v-model="form.lastName"
          :rules="[(v) => !!v || 'Campo Vacio', (v) => true]"
          class="mb-5" 
          label="Apellidos" 
          hide-details="auto"
          variant="outlined"
          rounded>
       </v-text-field>

        <v-select
          v-model="form.carrPri"
          :items="carreras"
          :rules="[(v) => !!v || 'Seleccione una carrera',(v) => true]"
          label="Carrera Principal"
          required
          variant="outlined"
          rounded
        ></v-select>

        <v-select
          v-model="form.carrSec"
          :items="carrerasSec"
          :rules="[(v) => !!v || 'Seleccione una carrera', (v) => true]"
          label="Carrera Secundaria"
          required
          variant="outlined"
          rounded
        ></v-select>

        <v-text-field 
         v-model="form.identidad"
         :rules="[(v) => !!v || 'Campo Vacio', (v) => true]"
          class="mb-5"
          label="Identidad" 
          hide-details="auto"
          variant="outlined"
          rounded>
          
        </v-text-field>

        <v-text-field 
        v-model="form.telefono"
        :rules="[(v) => !!v || 'Campo Vacio', (v) => true]"
          class="mb-5"
          label="Telefono" 
          hide-details="auto"
          variant="outlined"
          rounded>
        </v-text-field>

        <v-text-field
          v-model="form.email"
          
          :rules="[(v) => /^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(v) || 'Ingrese un correo electrónico válido', (v) => true]"
          class="mb-2"
          clearable
          label="Correo Personal"
          variant="outlined"
          rounded
        ></v-text-field>

        <v-select
          v-model="form.centroRe"
          :items="centros"
          :rules="[(v) => !!v || 'Campo Vacio', (v) => true]"
          label="Centro Regional"
          required
          variant="outlined"
          rounded
        ></v-select>


        <v-file-input 
           v-model="form.certificado"
           show-size 
           label="Certificado de Secundaria"
           variant="outlined"
           rounded
           prepend-icon="fa-solid fa-file-pdf"
           inner-append-icon="fa-solid fa-circle-xmark"
        ></v-file-input>

        <br />
        <v-btn
          block
          rounded
          color="success"
          size="large"
          type="submit"
          variant="elevated"
        >
          Enviar
        </v-btn>
      </v-form>
    </v-card>
  </v-sheet>

 
</template>

<script>
import { ref, onMounted, defineEmits} from 'vue';
export default {

  props:{tipo:String},
setup(){
    const form = ref({
     name: '',
     lastName: '',
     carrPri: null,
     carrSec: null,
     identidad: '',
     telefono: '',
     email: '',
     centroRe: null,
     certificado: null,
   });

   const centros = ['UNAH-VS', 'UNAH-CU', 'UNAH-CURLA'];

   const carreras = ref([])
   const carrerasSec= ref([])
   const examen =ref()

   
   onMounted(async () => {
      try {
        const response = await import('../dataPrueba/carreras.json');
        const data = response.default;

        // Divide los datos en carreras y carrerasSec
        carreras.value = data.map(carrera => carrera.nombreCarrera);
        carrerasSec.value = data.filter(carrera => !carrera.tipoExamen).map(carrera => carrera.nombreCarrera);

        console.log(carreras,carrerasSec)
      } catch (error) {
        console.error('Error al cargar los datos desde el archivo JSON:', error);
      }

    //   const getTipoExamen = () => {
    //   const selectedCarrera = form.value.carrPri;
    //   const selectedCarreraData = data.find((carrera) => carrera.nombreCarrera === selectedCarrera);

    //   if (selectedCarreraData) {
    //     tipoExamen.value = selectedCarreraData.tipoExamen;
    //   } else {
    //     tipoExamen.value = ''; // Limpiar el tipo de examen si no se encuentra la carrera
    //   }
    // };

    // examen=getTipoExamen();

    });


    const emit=defineEmits(['tipoExamen'])
    const tipoExamen="PAM"

    const enviarExamen=()=>{
      emit('tipoExamen',tipoExamen)

    }
    

    // Llamar a getTipoExamen cuando cambie la selección de la carrera
    // getTipoExamen();
    // // watch(form.carrPri, getTipoExamen);

   return {
        form,
        carreras,
        carrerasSec,
        centros,
          

      
        onSubmit: async()=>{
            console.log(form.value)
            enviarExamen
        },

    }

    
}
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Rubik:wght@300;800&display=swap');

.v-sheet{
    margin-top: 80px;
    font-family: 'Rubik', sans-serif;
}


</style>
