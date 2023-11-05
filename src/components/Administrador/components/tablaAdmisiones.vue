<template>
    <div class="tabla">
      <v-table
      fixed-header
      height="500px"
    >
      <thead class="encabezado">
        <tr>
          <th class="text-left">
           Identidad
          </th>
          <th class="text-left">
           Nombre completo
          </th>
          <th class="text-left">
            Telefono
          </th>
          <th class="text-left">
            Carrera principal
          </th>
          <th class="text-left">
            Carrera secundaria
          </th>
          <th class="text-left">
            Correo
          </th>
          <th class="text-left">
            Centro regional
          </th>
  
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in alumnos"
          :key="item.cuenta"
        >
          <td>{{ item.identidad }}</td>
          <td>{{ item.nombre }}</td>
          <td>{{ item.telefono }}</td>
          <td>{{ item.carreraP }}</td>
          <td>{{ item.carreraS }}</td>
          <td>{{ item.correo }}</td>
          <td>{{ item.centro }}</td>
        </tr>
      </tbody>
    </v-table>
    </div>
   
  </template>
  
  <script>
    export default {
      data () {
        return {
          alumnos: [
            {
                identidad:'0801-3003-10121',
                nombre:'Gabriel Omar Solorzano Oliva Maquiavélico',
                telefono:'90897867',
                carreraP:'Ingeniería aeroespacial',
                carreraS:'Trabajo Social',
                correo:'mataabuelas@gmail.com',
                centro:'CU',
            },
          ],
        }
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