<template>
    <div class="form">
    <v-sheet class="pa-12" rounded>
        
    <v-card class="mx-auto px-6 py-8 mt-10 rounded-xl bg-color" max-width="600 " >
        <v-form class="pa-9"  @submit.prevent="onSubmit">
            <v-card-text class="pa-0 text-center">
        <h1 class="mb-5 ">Nuevo Docente</h1><br>
        </v-card-text>
            
        <v-text-field 
          v-model="form.name"
          :rules="[(v) => !!v || 'Campo Vacio', (v) => true]"
          class="mb-5" 
          label="Nombres" 
          hide-details="auto"
          variant="solo-filled"
          rounded>
       </v-text-field>

        <v-text-field 
          v-model="form.lastName"
          :rules="[(v) => !!v || 'Campo Vacio', (v) => true]"
          class="mb-5" 
          label="Apellidos" 
          hide-details="auto"
          variant="solo-filled"
          rounded>
       </v-text-field>

       <v-text-field 
         v-model="form.identidad"
         :rules="[(v) => /^[0-9-]+$/.test(v) || 'Solo se permiten números y guiones', (v) => v.length <= 15 || 'Máximo 15 caracteres']"
          class="mb-5 numeritos"
          label="Identidad" 
          hide-details="auto"
          variant="solo-filled"
          type="text"
          rounded>
        </v-text-field>

       <v-select
          v-model="form.carr"
          :items="carreras"
          :rules="[(v) => !!v || 'Seleccione una carrera',(v) => true]"
          label="Carrera Docente"
          required
          variant="solo-filled"
          rounded
        ></v-select>

        <v-select
          v-model="form.centroRe"
          :items="centros"
          :rules="[(v) => !!v || 'Campo Vacio', (v) => true]"
          label="Centro Regional"
          required
          variant="solo-filled"
          rounded
        ></v-select>

        <v-text-field
          v-model="form.email"
          
          :rules="[(v) => /^[a-z0-9+.-]+@[a-z.-]+\.[a-z]+$/i.test(v) || 'Ingrese un correo electrónico válido', (v) => true]"
          class="mb-2"
          clearable
          label="Correo"
          variant="solo-filled"
          rounded
        ></v-text-field>


        <v-file-input 
           v-model="form.imagen"
           @change="handleFileChange"
           show-size 
           accept="image/*"
           :rules="[(v) => !!v || 'Se requiere una imagen',(v) => true]" 
           label="Imagen del docente"
           variant="solo-filled"
           rounded
           prepend-icon="fa-solid fa-image"
           inner-append-icon="fa-solid fa-circle-xmark"
        ></v-file-input>

        <br />
        <v-btn
          block
          rounded
          color="#A92727"
          size="large"
          type="submit"
          variant="elevated"
        >
          Guardar
        </v-btn>
      </v-form>
    </v-card>
  </v-sheet>
    </div>
</template>

<script>
import { onMounted, ref} from 'vue';
import {  useRouter, useRoute } from 'vue-router';
export default {

    setup(){

        const form = ref({
        name: '',
        lastName: '',
        identidad: '',
        carr: null,
        centroRe: null,
        email: '',
        imagen: null,
    });

    onMounted(async ()=>{
      getCarreras();
    })
      
    
    const centros = ['UNAH-VS', 'UNAH-CU', 'CURLA'];
    const carreras = ref([]);

    const isFormValid = ref(false);

    const getCarreras =async()=>{
      try {
        const res =await fetch ('http://localhost:3000/carreras/',{
          method: 'GET',
          headers:{
          'Content-Type':'application/json'
          }
        })
        const data =await res.json();
        console.log(data.length)
        for (let index = 0; index < data.length; index++) {
          carreras.value.push(data[index].nombreCarrera);
          //console.log(data[index])
        }
      } catch (error) {
        console.log(error)
      }

    }
    const validateForm = () => {
        if (
            form.value.name &&
            form.value.lastName &&
            form.value.identidad &&
            form.value.carr &&
            form.value.centroRe &&
            form.value.email &&
            form.value.imagen 
        ) {
            isFormValid.value = true;
        } else {
            isFormValid.value = false;
        }
    };

  const handleFileChange=(e)=>{
  const file = e.target.files[0];
  form.value.imagen=file
  console.log(file)
 }
 
 const pruebaRegistro=async()=>{
  try {
    const formData=new FormData();
    formData.append('nombres',form.value.name);
    formData.append('apellidos',form.value.lastName);
    formData.append('identidad',form.value.identidad);
    formData.append('nombreCarrera',form.value.carr);
    formData.append('centroRegional',form.value.centroRe);
    formData.append('correo',form.value.email);
    formData.append('fotoDocente',form.value.imagen);
    const res=await fetch('http://localhost:3000/docente/register',{
      method:'POST',
      body: formData
    });
    const data=await res.json();
    console.log(data)
  } catch (error) {
    console.log(error)
    
  }
 }

    const showAlertSuccess = () => {
      window.alert('Se ha guardado el registro correctamente.');
      // Navegar a la ruta 'adminDocentes'
      //router.push({ name: 'adminDocentes' });
      window.location.reload();//recarga la pagina una vez se valida el form y se da clic en guardar
    };

    const onSubmit = async () => {
    validateForm();
    if (isFormValid.value) {
        showAlertSuccess();
        pruebaRegistro();
      }// Validar el formulario antes de enviar
    };

    return {
        form,
        centros,
        carreras,
        handleFileChange,
        pruebaRegistro,
        getCarreras,
        onSubmit

    }
    }
}
</script>

<style scoped>
 @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@300;500&display=swap');
.bg-color{
  background-color:  #282832;
  color: white;
}
.form{
    margin-top: -15%;
    font-family: 'Rubik';
width: 150%;
padding-right: 100px;
 margin-left: -100px;
}
</style>