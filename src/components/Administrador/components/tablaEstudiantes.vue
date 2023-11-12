<template>
  <div class="tabla">
    <v-table
    fixed-header
    height="500px"
  >
    <thead class="encabezado">
      <tr>
        <th class="text-left">
          Nombre completo
        </th>
        <th class="text-left">
          Numero de cuenta
        </th>
        <th class="text-left">
          Carrera
        </th>
        <th class="text-left">
          Correo
        </th>
        <th class="text-left">
          Centro
        </th>

      </tr>
    </thead>
    <tbody>
      <tr
        v-for="item in estudiantes"
        :key="item.cuenta"
      >
        <td>{{ item.nombre }}</td>
        <td>{{ item.cuenta }}</td>
        <td>{{ item.carrera }}</td>
        <td>{{ item.correo }}</td>
        <td>{{ item.centro }}</td>
      </tr>
    </tbody>
  </v-table>
  </div>
 
</template>

<script>
import {ref,onMounted} from 'vue';
  export default {
    setup(){
    const estudiantes = ref([])
  
    onMounted(async () => {
        try {
        const res = await fetch('http://localhost:3000/estudiante/getestudiantes',{
          method:'GET',
          headers:{
            'Content-Type':'application/json'
          }
        });
      
        const estudiante= await res.json();
        console.log(estudiante)
        for (let index = 0; index < estudiante.length; index++) {
          let EstudianteGuardar ={
            nombre: estudiante[index].nombres+ ' '+estudiante[index].apellidos,

            cuenta: estudiante[index].numeroCuenta,
            carrera: estudiante[index].carrera,
            correo: estudiante[index].correoPersonal,
            centro: estudiante[index].centroRegional,

          }
          estudiantes.value.push(EstudianteGuardar)
        }


      } catch (error) {
        console.error('Error al cargar los datos desde el archivo JSON:', error);
      }
    });

    return {
      estudiantes,
    };


    },
  }
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Rubik:wght@300;500&display=swap');
.tabla{
  width: 150%;
  /*margin-right: 500px;*/
  padding-right: 100px;
 margin-left: -100px;
}

.text-left{
  background-color: #A92727 !important;
  color:white !important;
  font-family: 'Rubik';
}
</style>