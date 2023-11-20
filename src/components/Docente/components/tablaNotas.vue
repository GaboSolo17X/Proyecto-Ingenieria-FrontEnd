<template>
  

  <div class="tabla">
    <v-table
    fixed-header
    height="400px"
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
        <!-- <th class="text-left">
          icono
        </th> -->

      </tr>
    </thead>
    <tbody>
      <tr v-for="estudiante in datos"
          :key="estudiante.numeroCuenta"
          >
        <td>{{estudiante.numeroCuenta}}</td>
        <td>{{estudiante.nombres+' '+estudiante.apellidos}}</td>
        <td><v-text-field v-model="estudiante.nota" label="0 -100" variant="outlined" density="compact" class="campo" :rules="[
         (v) => !!v || 'El valor es requerido', 
         (v) => (v >= 0 && v <= 100) || 'Ingresa un valor entre 0 y 100']"></v-text-field></td>
        <td><v-text-field v-model="estudiante.estado" label="APR/RPD/NSP/ABN" variant="outlined" density="compact" class="campo" :rules = "[
      (v) => !!v || 'El valor es requerido', 
      (v) => /^(APR|RPD|NSP|ABN)$/.test(v) || 'Ingresa un valor válido (APR, REP, NP, ABN)' ]"></v-text-field></td>
        <!-- <td><v-icon :icon="estudiante.icono"></v-icon></td> -->
      </tr>
    </tbody>
  </v-table>
  </div>
  <br>
  <v-btn @click="guardarDatos">Guardar Datos</v-btn>
 
</template>

<script>
import { ref } from 'vue';

export default {
  props:{datos:{type: Object,
      default: () => ({})},},
  
      
  setup(props){

    const idSeccion=ref()
    const datosAGuardar=ref([])
    const guardarDatos = () => {
      // Itera sobre los datos y recopila las notas y estados
      // datosAGuardar.value = props.datos.push(estudiante => ({
      //   numeroCuenta: estudiante.numeroCuenta,
      //   nota: estudiante.nota,
      //   estado: estudiante.estado,
      // }));

      props.datos.forEach(estudiante=>{
        datosAGuardar.value.push({
          numeroCuenta: estudiante.numeroCuenta,
          nota: estudiante.nota,
          estado: estudiante.estado,
        })
      })
  

      const primerEstudiante = props.datos[0];
      idSeccion.value = primerEstudiante ? primerEstudiante.id : null;
      // Ahora puedes enviar 'datosAGuardar' a tu base de datos
      console.log('Datos a guardar:', datosAGuardar.value);
      console.log('Id de la Seccion:', idSeccion)
      // Lógica para enviar los datos a la base de datos

      const datosPorEnviar={
      idSeccion:idSeccion.value,
      arrayEstudiantesNota:datosAGuardar.value
    };
    const sec=[{sec:0,al:'hola'},'2']
    console.log(sec)

    console.log(datosPorEnviar)
      const subirNota = async () => {
        
        try {
          const res = await fetch('http://localhost:3000/matricula/subirNota', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify(datosPorEnviar)
          });
          const data = await res.json();
          console.log(data)
  
        } catch (error) {
          console.log(error)
  
        }
      };

      subirNota()

      
    };

    

    

    return{
      guardarDatos,
    
    }
   
    }
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

.campo{
  margin-top:8px;
  width:100px;
}


</style>