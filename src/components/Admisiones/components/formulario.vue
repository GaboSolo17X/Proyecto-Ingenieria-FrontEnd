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

  <CardEx v-show="isCardExVisible" :mensaje="mensaje"/>
 
</template>

<script>
import { ref, onMounted} from 'vue';
import CardEx from '../components/cardExamen.vue'

export default {
  components: {CardEx},
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
   const carrerasTot= ref([])
   const tipExamen = ref([])

   
   onMounted(async () => {
      try {
        const response = await import('../dataPrueba/carreras.json');
        const data1=response.default;
     

        // Divide los datos en carreras y carrerasSec
        carreras.value = data1.map(carrera => carrera.nombreCarrera);
        carrerasTot.value = data1.map(carrera => carrera);
        carrerasSec.value = data1.filter(carrera => !carrera.tipoExamen).map(carrera => carrera.nombreCarrera);
        tipExamen.value = data1.map(carrera => carrera.tipoExamen);

        console.log(response.default)
        console.log(carreras,carrerasSec,carrerasTot,tipExamen)

        
   

    

      } catch (error) {
        console.error('Error al cargar los datos desde el archivo JSON:', error);
      }

    

    // examen=getTipoExamen();

    });



    const exad=ref()

    const getTipoExamen = () => {
      const selectedCarrera = form.value.carrPri;
      const selectedCarreraData = carrerasTot.value.find((carrera) => carrera.nombreCarrera === "selectedCarrera");

      console.log(selectedCarreraData)
      if (selectedCarreraData) {
        exad.value = JSON.stringify(selectedCarreraData.tipoExamen);
      } else {
        exad.value = "Solo debes hacer PAA"; // Limpiar el tipo de examen si no se encuentra la carrera
      }
    };
    
    getTipoExamen()

    const mensaje = ref('Por detallar Examen')
    const enviarExamen=()=>{
      mensaje.value= exad
    }
    
    const isCardExVisible=ref(false)
    const showCardEx = () => {
      isCardExVisible.value = true;
      console.log(isCardExVisible)
    };

 

   return {
        form,
        carreras,
        carrerasSec,
        centros,
        isCardExVisible,
        mensaje,
          

      
            onSubmit: async()=>{
            console.log(form.value)
            console.log(enviarExamen)
            enviarExamen()
            showCardEx()
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
