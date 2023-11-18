<template>
    <div >
      <v-row>
        <v-col cols="4">
          <Lateral/>
        </v-col>
        <v-col cols="8">
          <div class="contenido">
            <Encabezado  title="Subida de Notas" v-if="docente" :datos="docente"/>
          </div>
        <div class="asignatura">
            <v-select
              v-model="selectedItem"
              label="Seleccionar la Clase"
              :items="clasesSelect"
              variant="outlined"
            ></v-select>
        </div>
        <div class="componentesDocentes">
        <TablaNotas  :datos="alumnosArray"/>
        </div>
      </v-col>
    </v-row>
  </div>

</template>

<script>
import Lateral from '../components/lateral.vue'
import Encabezado from  '../components/encabezado.vue'
import TablaNotas from '../components/tablaNotas.vue'
import SelectAsignatura from '../components/selectAsignatura.vue'
import { ref,onMounted, watch} from 'vue';

export default {
components: {Lateral,Encabezado, TablaNotas, SelectAsignatura},
setup(){

  const docente=ref()
  const numeroEmpleadoDocente=ref()
  const clasesSelect = ref([])
    const asignaturas = ref([])
    const seccion = ref([])
    const selectedItem = ref(null);
    const clasesFilter=ref([])
    const docenteEs = async () => {
      console.log("El docente es")
      docente.value = JSON.parse(localStorage.getItem('DocentePrueba'))
      numeroEmpleadoDocente.value = docente.value.numeroEmpleadoDocente

      console.log(docente)

      try {
        const res = await fetch('http://localhost:3000/docente/getSeccionesDocente', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
            },
          body: JSON.stringify({
              numeroEmpleadoDocente: numeroEmpleadoDocente.value,
            })
        });
        const data = await res.json();
        console.log(data)
        // clases.value = data.map(clases=>clases)
        asignaturas.value = data.asignaturas;
        seccion.value = data.secciones;


        asignaturas.value.forEach(nestedArray => {
          nestedArray.forEach(item => {
            // Now 'item' contains the information inside the nested array
            console.log(item);

           console.log (item.idAsignatura)
            seccion.value.forEach(seccionItem=>{
              const seccionID=seccionItem.idAsignatura
              if(item.idAsignatura===(seccionID)){
                console.log("Tenemos un match con "+item.nombreClase)
                
                clasesFilter.value.push({
                idSeccion: seccionItem.idSeccion,
                nombreClase: item.nombreClase,
                nombreSeccion:seccionItem.nombreSeccion
              });
               const clase=ref()
               clase.value=seccionItem.nombreSeccion+'-'+item.nombreClase
               console.log(clase)
               clasesSelect.value.push(clase.value);

              
              // clases.value=item.nombreClase
              // console.log(clases)

              }

            });
          });
        });

      } catch (error) {
        console.log(error)

      }
    };



    let idSeccion=ref()

    watch(selectedItem, (newValue, oldValue) => {
      console.log('Cambiamos el valor de ', oldValue, ' a ', newValue);

      console.log(clasesFilter)
      clasesFilter.value.forEach(nestedArray => {
        if(newValue!=nestedArray.nombreSeccion+'-'+nestedArray.nombreClase){
          console.log(nestedArray.nombreClase)
          console.log(nestedArray.idSeccion)
          idSeccion=nestedArray.idSeccion
        }
      })
      console.log('El id seccion donde se cargaran los usuarios es: '+idSeccion)
      estudiantes()
    });



    const alumnos=ref()
    const alumnosArray=ref([])
    const estudiantes = async () => {
    
      try {
        const res = await fetch(' http://localhost:3000/docente/getEstudiantesSeccion', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
            },
          body: JSON.stringify({
            idSeccion: idSeccion,
            })
        });
        const data = await res.json();
        console.log(data)
        alumnos.value = data.estudiantes;
        console.log(alumnos.nombres)

        alumnosArray.value.splice(0, alumnosArray.value.length); 

        alumnos.value.forEach(item => {

          alumnosArray.value.push({
                numeroCuenta: item.numeroCuenta,
                nombres: item.nombres,
                apellidos: item.apellidos
              });

        console.log(alumnosArray)
      })
      


      } catch (error) {
        console.log(error)

      }
    };
   
    
    onMounted(() => {
      docenteEs();
    });

  return{
    docente,
    selectedItem,
    clasesSelect,
    clasesFilter,
    idSeccion,
    alumnosArray
    
   
 
  }
}
}


</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@300;500&display=swap');

.asignatura{
    width: 270px;
    margin-top: 100px;
    position: relative;
    right: 100px !important;
}

.componentesDocentes{
margin-top: 10px;
left: 230px !important;
width: calc((100% - 230px) - 0px);
}

.rubik{
  font-family: 'Rubik';
}

.navBarCont{
display: flex;
flex-direction: column;
}

.contenido{
top: 0px;
z-index: 1004;
transform: translateY(0%);
position: fixed;
left: 230px;
width: calc((100% - 230px) - 0px);
}
</style>