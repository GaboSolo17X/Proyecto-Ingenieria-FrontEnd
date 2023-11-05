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
        v-for="item in alumnos"
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
          

    const alumnos = ref([])
  
   onMounted(async () => {
      try {
        const res = await fetch('http://localhost:3001/getestudiantes',{
          method:'GET',
          headers:{
            'Content-Type':'application/json'
          }
        });
        const data = await res.json();
        console.log(data)

        // Divide los datos en carreras y carrerasSec
        console.log("cargando estudiantes")
        //carreras.value = data.map(carrera => carrera.nombreCarrera);

      } catch (error) {
        console.error('Error al cargar los datos desde el archivo JSON:', error);
      }

  
    });

    return {
    };


    },

    data () {
      return {
        alumnos: [
          {
            nombre: 'Gabriel Omar Solorzano Oliva',
            cuenta: 20201000000,
            carrera: 'Ingeniería en Sistemas',
            correo: 'gabrielomar@gmail.com',
            centro: 'CU',
          },
          {
            nombre: 'Gabriel Omar Solorzano Oliva',
            cuenta: 20201000001,
            carrera: 'Ingeniería en Sistemas',
            correo: 'gabrielomar@gmail.com',
            centro: 'CU',
          },
          {
            nombre: 'Gabriel Omar Solorzano Oliva',
            cuenta: 20201000002,
            carrera: 'Ingeniería en Sistemas',
            correo: 'gabrielomar@gmail.com',
            centro: 'CU',
          },
          {
            nombre: 'Gabriel Omar Solorzano Oliva',
            cuenta: 20201000003,
            carrera: 'Ingeniería en Sistemas',
            correo: 'gabrielomar@gmail.com',
            centro: 'CU',
          },
          {
            nombre: 'Gabriel Omar Solorzano Oliva',
            cuenta: 20201000004,
            carrera: 'Ingeniería en Sistemas',
            correo: 'gabrielomar@gmail.com',
            centro: 'CU',
          },
          {
            nombre: 'Gabriel Omar Solorzano Oliva',
            cuenta: 20201000005,
            carrera: 'Ingeniería en Sistemas',
            correo: 'gabrielomar@gmail.com',
            centro: 'CU',
          },
          {
            nombre: 'Gabriel Omar Solorzano Oliva',
            cuenta: 20201000006,
            carrera: 'Ingeniería en Sistemas',
            correo: 'gabrielomar@gmail.com',
            centro: 'CU',
          },
          {
            nombre: 'Gabriel Omar Solorzano Oliva',
            cuenta: 20201000007,
            carrera: 'Ingeniería en Sistemas',
            correo: 'gabrielomar@gmail.com',
            centro: 'CU',
          },
          {
            nombre: 'Gabriel Omar Solorzano Oliva',
            cuenta: 20201000008,
            carrera: 'Ingeniería en Sistemas',
            correo: 'gabrielomar@gmail.com',
            centro: 'CU',
          },
          {
            nombre: 'Gabriel Omar Solorzano Oliva',
            cuenta: 20201000009,
            carrera: 'Ingeniería en Sistemas',
            correo: 'gabrielomar@gmail.com',
            centro: 'CU',
          },
          {
            nombre: 'Gabriel Omar Solorzano Oliva',
            cuenta: 20201000010,
            carrera: 'Ingeniería en Sistemas',
            correo: 'gabrielomar@gmail.com',
            centro: 'CU',
          },
          {
            nombre: 'Gabriel Omar Solorzano Oliva',
            cuenta: 20201000011,
            carrera: 'Ingeniería en Sistemas',
            correo: 'gabrielomar@gmail.com',
            centro: 'CU',
          },
          {
            nombre: 'Gabriel Omar Solorzano Oliva',
            cuenta: 20201000012,
            carrera: 'Ingeniería en Sistemas',
            correo: 'gabrielomar@gmail.com',
            centro: 'CU',
          }
          
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