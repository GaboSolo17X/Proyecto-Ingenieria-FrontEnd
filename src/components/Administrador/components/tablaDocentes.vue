<template>
  <form v-show="isDocentesVisible" @submit.prevent="onSubmit">
    <div class="tabla" >
      <v-table
      fixed-header
      height="450px"
    >
      <thead class="encabezado">
        <tr>
          <th class="text-left">
           Nombre completo
          </th>
          <th class="text-left">
            Identidad
          </th>
          <th class="text-left">
            Carrera
          </th>
          <th class="text-left">
            Centro regional
          </th>
          <th class="text-left">
            Correo
          </th>
  
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in docentes"
          :key="item.identidad"
        >
          <td>{{ item.nombre }}</td>
          <td>{{ item.identidad }}</td>
          <td>{{ item.carrera }}</td>
          <td>{{ item.centro }}</td>
          <td>{{ item.correo }}</td>
        </tr>
      </tbody>
    </v-table>
    </div>
    <div class="divBoton " >
          <v-btn block rounded="xl" type="submit" class="botones">
            Nuevo
          </v-btn>
    </div>
  </form>

    <FormDocentes v-show="isFormVisible"/>
  </template>
  
  <script>
  import {ref,onMounted} from 'vue';
  import FormDocentes from '../components/formDocentes.vue'

    export default {
      components:{FormDocentes},

      setup(){
        const isFormVisible=ref(false);
        const isDocentesVisible=ref(true);
      
        const showForm=()=>{
          isFormVisible.value= true;
          isDocentesVisible.value= false;
        }
          const onSubmit =  () => {
            showForm();
          };

        const docentes =ref([])
        onMounted(async () => {
            try {
              const res = await fetch('http://localhost:3000/docente/getdocentes',{
                method:'GET',
                headers:{
                  'Content-Type':'application/json'
                }
              });


              const docente= await res.json();
              console.log(docente)
              for (let index = 0; index < docente.length; index++) {
              let docenteGuardar ={
                nombre: docente[index].nombres+ ' '+docente[index].apellidos,
                identidad: docente[index].identidad,
                carrera: docente[index].nombreCarrera,
                centro: docente[index].centroRegional,
                correo: docente[index].correo,
              }
              docentes.value.push(docenteGuardar)
              console.log(docentes);
            }
          } catch (error) {
            console.error('Error al cargar los datos desde el archivo JSON:', error);
          }
        });
          return{
            isFormVisible,
            isDocentesVisible,
            docentes,
            showForm,
            onSubmit
          };
      },
    }
  </script>
  
  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@300;500&display=swap');

  .divBoton{
    margin-left: 92%;
    margin-top: 30px;
    width: 40%;
  }
  .botones{
    background-color: #77181E;
    color: white;
    font-family: 'Rubik';
    text-align: center;
    width: 200px;
  }
  .image{
    width: 38.5px;
    height: 40px;
    border-radius: 360px;
  }
  .tabla{
    width: 165%;
   margin-left: -200px;
  }
  
  .text-left{
    background-color: #A92727 !important;
    color:white !important;
    font-family: 'Rubik';
  }
  </style>