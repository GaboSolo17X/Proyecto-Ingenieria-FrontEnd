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
          Identidad
        </th>
        <th class="text-left">
          Carrera Principal
        </th>
        <th class="text-left">
          Carrera Secundaria
        </th>
        <th class="text-left">
          Correo
        </th>
        <th class="text-left">
          Centro
        </th>
        <th class="text-left">
          Telefono
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="item in alumnos"
        :key="item.identidad"
      >
        <td>{{ item.nombre }}</td>
        <td>{{ item.identidad }}</td>
        <td>{{ item.carreraP }}</td>
        <td>{{ item.carreraS }}</td>
        <td>{{ item.correo }}</td>
        <td>{{ item.centro }}</td>
        <td>{{ item.telefono }}</td>
      </tr>
    </tbody>
  </v-table>
  </div>
 
</template>

<script>
import {ref,onMounted} from 'vue';
  export default {
    setup(){
      const alumnos = ref([])
      onMounted(async () => {
        try {
        const res = await fetch('http://localhost:3030/aspirante/get/prueba',{
          method:'GET',
          headers:{
            'Content-Type':'application/json'
          }
        });
        

        const {aspirante}= await res.json();
        console.log(aspirante)
        for (let index = 0; index < aspirante.length; index++) {
          let alumnoGuardar ={
            nombre: aspirante[index].nombres+ ' '+aspirante[index].apellidos,
            identidad: aspirante[index].identidad,
            carreraP: aspirante[index].carreraPrincipal,
            carreraS: aspirante[index].carreraSecundaria,
            correo: aspirante[index].correoPersonal,
            centro: aspirante[index].centroRegional,
            telefono: aspirante[index].telefono,
          }
          alumnos.value.push(alumnoGuardar)
        }


      } catch (error) {
        console.error('Error al cargar los datos desde el archivo JSON:', error);
      }
    });
    
    return {
      alumnos,
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