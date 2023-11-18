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
              label="Seleccionar"
              :items="clases"
              variant="outlined"
            ></v-select>
        </div>
        <div class="componentesDocentes">
        <TablaNotas/>
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
import { ref,onMounted } from 'vue';

export default {
components: {Lateral,Encabezado, TablaNotas, SelectAsignatura},
setup(){

  const docente=ref()
  const numeroEmpleadoDocente=ref()
  const clases = ref([])
    const asignaturas = ref([])
    const seccion = ref([])
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
              //   clases.value.push({
              //   idSeccion: seccionItem.idSeccion,
              //   nombreClase: item.nombreClase,
              // });
              const clase=ref()
               clase.value=seccionItem.nombreSeccion+'-'+item.nombreClase
               console.log(clase)
                clases.value.push(clase.value);

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
    
    onMounted(() => {
      docenteEs();
    });

  return{
    docente,
    clases
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