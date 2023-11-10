<template>
    <v-sheet class="pa-12" rounded>
      <v-card class= "mx-auto px-6 py-8 rounded-xl bg-color" max-width="700" >
          <v-card-text class="pa-0 text-center">
          <h1 class="mb-5">COMPLETAR FORMULARIO</h1>
        </v-card-text>
      </v-card>
      <v-card class="mx-auto px-6 py-8 mt-10 rounded-xl bg-color-body" max-width="700 " >
        <v-form class="pa-9"  @submit.prevent="onSubmit">
          
  
          <v-text-field 
            v-model="form.cuenta"
            :rules="[
                      (v) => /^\d+$/.test(v) || 'Solo se permiten dígitos',
                      required,
                    ]"
            class="mb-5" 
            label="Numero de cuenta" 
            hide-details="auto"
            variant="solo-filled"
            rounded>
         </v-text-field>
  
          <v-select
            v-model="form.carrPri"
            :items="carreras"
            :rules="[(v) => !!v || 'Seleccione una carrera',(v) => true]"
            label="Carrera Principal"
            required
            variant="solo-filled"
            rounded
          ></v-select>
  
          <v-text-field
            v-model="form.email"
            
            :rules="[(v) => /^[a-z0-9+.-]+@[a-z.-]+\.[a-z]+$/i.test(v) || 'Ingrese un correo electrónico válido', (v) => true]"
            class="mb-2"
            clearable
            label="Correo Personal"
            variant="solo-filled"
            rounded
          ></v-text-field>
  
          <br />
          <v-btn
            block
            rounded
            color="#282832"
            size="large"
            type="submit"
            variant="elevated"
          >
            Reiniciar
          </v-btn>
        </v-form>
      </v-card>
    </v-sheet>
   
  </template>
  
  <script>
  import { ref, onMounted} from 'vue';
  
  
  export default {
  setup(){
      const form = ref({
       name: '',
       cuenta: '',
       carrPri: null,
       email: '',
     });
  
     const carreras = ref([])
    
     
    //  onMounted(async () => {
    //     try {
    //       const res = await fetch('http://localhost:3030/carreras',{
    //         method:'GET',
    //         headers:{
    //           'Content-Type':'application/json'
    //         }
    //       });
    //       const data = await res.json();
    //       console.log(data)
         
    //     } catch (error) {
    //       console.error('Error al cargar los datos desde el archivo JSON:', error);
    //     }
  
    
    //   });
  
      
  const isFormValid = ref(false);
  
  const validateForm = () => {
    if (
      form.value.cuenta &&
      form.value.carrPri &&
      form.value.email 
    ) {
      isFormValid.value = true;
    } else {
      isFormValid.value = false;
    }
  };
  
  
  const onSubmit = async () => {
    validateForm(); // Validar el formulario antes de enviar
  
    if (isFormValid.value) {
      // Realizar el envío del formulario si es válido
      console.log(form.value);
    }
  };
  
  
     return {
          form,
          carreras,
          onSubmit
          
  
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
    background-color:  #a92727;
    color: white;
  }

  .bg-color-body{
    background-color:  #C6D6D6;
    color: white;
  }
  
  .numeritos >>> input::-webkit-outer-spin-button,
  .numeritos >>> input::-webkit-inner-spin-button {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
  }
  
  .card{
    margin-top: 100px;
  }
  
  .v-input--error:not(.v-input--disabled) .v-input__details .v-messages{
    color: white;
    font-family: 'Rubik', sans-serif;
  
  }
  
  </style>
  