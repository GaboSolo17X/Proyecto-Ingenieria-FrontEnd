<template>
  <div class="tabla">
    <v-table
    fixed-header
    height="500px"
  >
    <thead class="encabezado">
      <tr>
        <th class="text-left">
          Numero de cuenta
        </th>
        <th class="text-left">
          Nombre completo
        </th>
        <th class="text-left">
          Nota
        </th>
        <th class="text-left">
          Observacion
        </th>
        <th class="text-left">
          icono
        </th>

      </tr>
    </thead>
    <tbody>
      <tr v-for="estudiante in estudiantes"
          :key="estudiante.cuenta"
          >
        <td>{{estudiante.cuenta}}</td>
        <td>{{estudiante.nombre}}</td>
        <td><v-text-field label="nota" variant="outlined" density="compact" class="campo"></v-text-field></td>
        <td>{{estudiante.obs}}</td>
        <td><v-icon :icon="estudiante.icono"></v-icon></td>
      </tr>
    </tbody>
  </v-table>
  </div>
 
</template>

<script>

export default ({
    data(){
  return{
    estudiantes:[
      {
        cuenta:'20201004061',
        nombre: 'Jose Mario',
        nota: 64,
        obs:'REP',
        icono:'fa:fas fa-solid fa-circle-xmark'
      },
      {
        cuenta:'20201004061',
        nombre: 'Gabriel Omar Solorzano',
        nota:98,
        obs:'APR',
        icono:'fa:fas fa-solid fa-circle-check'
      }
    ]
  }
}
})
// import {ref,onMounted} from 'vue';
//   export default {
//     setup(){
//     const estudiantes = ref([])
  
//     onMounted(async () => {
//         try {
//         const res = await fetch('http://localhost:3030/estudiante/getestudiantes',{
//           method:'GET',
//           headers:{
//             'Content-Type':'application/json'
//           }
//         });
      
//         const estudiante= await res.json();
//         console.log(estudiante)
//         for (let index = 0; index < estudiante.length; index++) {
//           let EstudianteGuardar ={
//             nombre: estudiante[index].nombres+ ' '+estudiante[index].apellidos,
//             cuenta: estudiante[index].numeroCuenta,
//             carrera: estudiante[index].carrera,
//             correo: estudiante[index].correoPersonal,
//             centro: estudiante[index].centroRegional,

//           }
//           estudiantes.value.push(EstudianteGuardar)
//         }


//       } catch (error) {
//         console.error('Error al cargar los datos desde el archivo JSON:', error);
//       }
//     });

    // return {
    //   estudiantes
    // };


  //   },
  // }
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

.campo{
  margin-top:8px;
}

</style>