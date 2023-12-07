<template>
  <v-sheet v-show="isFormVisible" class="pa-12" rounded>
    <v-card class= "mx-auto px-6 py-8 rounded-xl bg-color" max-width="700" >
        <v-card-text class="pa-0 text-center">
        <h1 class="mb-5">A un paso para llegar a ser PUMA</h1>
         <p >Porfavor llena todos los campos para que sea admitida tu solicitud</p>
      </v-card-text>
    </v-card>
    <v-card class="mx-auto px-6 py-8 mt-10 rounded-xl bg-color-body" max-width="700 " >
      <v-form class="pa-9 formulario"  @submit.prevent="onSubmit">
        <v-text-field 
          v-model="form.name"
          :rules="[(v) => !!v || 'Llene el campo', (v) => /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$/.test(v) || 'Solo letras permitidas']"
          class="mb-5" 
          label="Nombres" 
          hide-details="auto"
          variant="solo-filled"
          rounded>
       </v-text-field>

        <v-text-field 
          v-model="form.lastName"
          :rules="[(v) => !!v || 'Llene el campo', (v) => /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$/.test(v) || 'Solo letras permitidas']"
          class="mb-5" 
          label="Apellidos" 
          hide-details="auto"
          variant="solo-filled"
          rounded>
       </v-text-field>

        <v-select
          v-model="form.carrPri"
          :items="carreras"
          :rules="[(v) => !!v || 'Seleccione una carrera']"
          label="Carrera Principal"
          required
          variant="solo-filled"
          rounded
         
        ></v-select>

        <v-select
          v-model="form.carrSec"
          :items="carrerasSec"
          
          :rules="[(v) => !!v || 'Seleccione una carrera']"
          label="Carrera Secundaria"
          required
          variant="solo-filled"
          rounded
          @click="carreraPri"
        ></v-select>

        <v-text-field 
         v-model="form.identidad"
         :rules="[(v) => !!v || 'No se permiten campos vacios']"
          class="mb-5 numeritos"
          label="Identidad" 
          hide-details="auto"
          variant="solo-filled"
          type="text"
          @input="formatText"
          placeholder="0000-0000-00000"
          rounded>
          
        </v-text-field>

        <v-text-field 
        v-model="form.telefono"
          class="mb-5 numeritos"
          :rules="[(v) => /^\d+$/.test(v) || 'Solo se permiten dígitos',(v) => v.length === 8 || 'Debe tener exactamente 8 dígitos', (v) => !!v || 'No se permiten campos vacios']"
          label="Telefono" 
          hide-details="auto"
          variant="solo-filled"
          type="text"
          maxlength="8"
          rounded>
        </v-text-field>

        <v-text-field
          v-model="form.email"
          
          :rules="[(v) => /^[a-z0-9+.-]+@[a-z.-]+\.[a-z]+$/i.test(v) || 'Ingrese un correo electrónico válido']"
          class="mb-2"
          clearable
          label="Correo Personal"
          variant="solo-filled"
          rounded
        ></v-text-field>

        <v-select
          v-model="form.centroRe"
          :items="centros"
          :rules="[(v) => !!v || 'No se permiten campos vacios']"
          label="Centro Regional"
          required
          variant="solo-filled"
          rounded
        ></v-select>

        <v-file-input 
         
           show-size 
           accept=".png, .jpg, .jpeg"
           :rules="[(v) => !!v || 'Se requiere una imagen']"
           
           label="Certificado de Secundaria"
           variant="solo-filled"
           rounded
           prepend-icon="fa-solid fa-image"
           inner-append-icon="fa-solid fa-circle-xmark"
           @change="handleFileChange"
        ></v-file-input>

        <br />
        <v-btn
          block
          rounded
          color="#a92727"
          size="large"
          type="submit"
          variant="elevated"
        >
          Enviar
        </v-btn>
      </v-form>
    </v-card>
  </v-sheet>

  <CardEx class="card" v-show="isCardExVisible" :mensaje="mensaje.value"/>
 
</template>

<script>
import { ref, onMounted, watch} from 'vue';
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
    //  certificado: null,
   });

   const centros = ['UNAH-VS', 'UNAH-CU', 'CURLA'];

   const carreras = ref([])
   const carrerasSec= ref([])
   const carrerasTot= ref([])
   const tipExamen = ref([])
  
   
   onMounted(async () => {
      try {
        const res = await fetch('http://localhost:3030/carreras',{
          method:'GET',
          headers:{
            'Content-Type':'application/json'
          }
        });
        const data = await res.json();
        console.log(data)

        // Divide los datos en carreras y carrerasSec
        console.log("cargando nombre carreras")
        carreras.value = data.map(carrera => carrera.nombreCarrera);
        console.log("cargando toda carreras")
        carrerasTot.value = data.map(carrera => carrera);
        console.log("cargando carreras sin examen ")
        carrerasSec.value = data.filter(carrera => !carrera.examen).map(carrera => carrera.nombreCarrera);
        console.log("cargando examenes carreras")
        tipExamen.value = data.map(carrera => carrera.examen);

        console.log(carreras,carrerasSec,carrerasTot,tipExamen)

      } catch (error) {
        console.error('Error al cargar los datos desde el archivo JSON:', error);
      }

  
    });
    // const numericValue=form.value.identidad
    // const formatText=()=>{


    //   numericValue.replace=(/(\d{4}))(\d{4})(\d{5})/,'$1-$2-$3');
    // };

    // watch(formatText);

  
 /*************************************************************************************************************************/


  //   const handleCarrPriChange = () => {
  //   // Verificar si la carrera principal seleccionada está en la lista de carreras secundarias
  //   const selectedCarrPri = form.value.carrPri;
  //   if (selectedCarrPri && form.value.carrSec.includes(selectedCarrPri)) {
  //     // Eliminar la carrera secundaria seleccionada
  //     form.value.carrSec = form.value.carrSec.filter(carrera => carrera !== selectedCarrPri);
  //   }
  // };

  // console.log(handleCarrPrichange());


  

    const exad=ref()
    const getTipoExamen = () => {
      const selectedCarreraData = carrerasTot.value.find((carrera) => carrera.nombreCarrera === form.value.carrPri);

      console.log(selectedCarreraData)
      if (selectedCarreraData) {
        exad.value = selectedCarreraData.examen;
      } else {
        exad.value = "Solo debes hacer PAA"; // Limpiar el tipo de examen si no se encuentra la carrera
      }

    };
    
    const carreraPri = () => {
      // Filtrar las carreras secundarias según la condición y la selección del primer v-select
      console.log('Entrando al cambio de carrera' );
      const selectedCarrera = form.value.carrPri
      carrerasSec.value = carrerasTot.value
        .filter(carrera => !carrera.examen && carrera.nombreCarrera !== selectedCarrera)
        .map(carrera => carrera.nombreCarrera);

   
      // console.log(carrerasSec);
    };

 

    const mensaje = ref('Por detallar Examen')
    const enviarExamen=()=>{
      mensaje.value= exad
    }
    
const isFormValid = ref(false);

const validateForm = () => {
  if (
    form.value.name &&
    form.value.lastName &&
    form.value.carrPri &&
    form.value.carrSec &&
    form.value.identidad &&
    form.value.telefono &&
    form.value.email &&
    form.value.centroRe 
    // form.value.certificado
  ) {
    isFormValid.value = true;
  } else {
    isFormValid.value = false;
  }
};

// console.log(form.value.identidad)

// watch(form.identidad, (newValue) => {
//       // Añadir guiones automáticamente después de cada grupo de 4 dígitos
//       form.value.identidad= newValue.replace(/(\d{4})\-?(\d{0,4})\-?(\d{0,5})?/, '$1-$2-$3');
//     });
/*************************************************************************************************************************/
 //Mandando a la base de datos el formulario

 const handleFileChange=(e)=>{
  const file = e.target.files[0];
  form.value.certificado=file
  console.log(file)
 }

 const isCardExVisible=ref(false)
    const isFormVisible=ref(true)
    const showCardEx = () => {
      isCardExVisible.value = true;
      isFormVisible.value=false;
    };
 
 const pruebaRegistro=async()=>{
  try {
    const formData=new FormData();
    formData.append('nombres',form.value.name);
    formData.append('apellidos',form.value.lastName);
    formData.append('carreraPrincipal',form.value.carrPri);
    formData.append('carreraSecundaria',form.value.carrSec);
    formData.append('centroRegional',form.value.centroRe);
    formData.append('correoPersonal',form.value.email);
    formData.append('identidad',form.value.identidad);
    formData.append('telefono',form.value.telefono);
    formData.append('fotoCertificado',form.value.certificado);
    const res=await fetch('http://localhost:3000/aspirante/create',{
      method:'POST',
      body: formData
    });
    const data=await res.json();
    console.log(data)

    if(data.message==="El aspirante ya existe"){
      window.alert(data.message)
    window.location.reload();

      isCardExVisible.value = false;
    }

  } catch (error) {
    console.log(error)
    
  }
 }

const onSubmit = async () => {
  validateForm(); // Validar el formulario antes de enviar

  if (isFormValid.value) {
    // Realizar el envío del formulario si es válido
    console.log(form.value);
    getTipoExamen();
    enviarExamen();
    showCardEx();
    pruebaRegistro();
  }
};

    

  const formatText=()=>{
    let numericValue=form.value.identidad.replace(/\D/g, '');
    numericValue= numericValue.substring(0,13);
    form.value.identidad= numericValue.replace(/(\d{4})(\d{4})(\d{5})/, '$1-$2-$3');

  }

 


   return {
        form,
        carreras,
        carrerasSec,
        centros,
        isCardExVisible,
        isFormVisible,
        mensaje,
        carreraPri,
        handleFileChange,
        onSubmit,
        formatText
        

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

.bg-color{
  background-color: #282832;
  color: white;
}
.bg-color-body{
  background-color:  #282832;
  color: white;
}

/* .v-messages{
  color: white !important;
  font-family: 'Rubik', sans-serif;
  #C6D6D6
} */

.numeritos >>> input::-webkit-outer-spin-button,
.numeritos >>> input::-webkit-inner-spin-button {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
}

.card{
  margin-top: 100px;
}

.v-messages{
  color: white !important;
}
/* .v-input--error:not(.v-input--disabled) .v-input__details > .v-icon, .v-input--error:not(.v-input--disabled) .v-input__details .v-messages, .v-input--error:not(.v-input--disabled) .v-input__prepend > .v-icon, .v-input--error:not(.v-input--disabled) .v-input__prepend .v-messages, .v-input--error:not(.v-input--disabled) .v-input__append > .v-icon, .v-input--error:not(.v-input--disabled) .v-input__append .v-messages{
  color: white !important;
  font-family: 'Rubik', sans-serif;

} */
.v-input--error:not(.v-input--disabled) .v-input__details > .v-icon, .v-input--error:not(.v-input--disabled) .v-input__details .v-messages, .v-input--error:not(.v-input--disabled) .v-input__prepend > .v-icon, .v-input--error:not(.v-input--disabled) .v-input__prepend .v-messages, .v-input--error:not(.v-input--disabled) .v-input__append > .v-icon, .v-input--error:not(.v-input--disabled) .v-input__append .v-messages {
    color: white !important;
}

.formulario :deep(.v-messages){
  color: yellow !important;
}
</style>
