<template>
  <div class="app">
    <v-row>
      <v-col cols="3">
        <Lateral/>
      </v-col>
      <v-col cols="8">
        <div class="contenido">
          <Encabezado  title="Clases de este periodo" v-if="docente" :datos="docente" />
        </div>
        <div class="cuadrados">
        <h1 class="componentesDocentes">Clases por impartir</h1>
        <section class="clases">
          <Clase
          v-for="clase in clases"
          :key="clase.id"
          :clase="clase"
          />
        </section>
        </div>
      </v-col>
    </v-row>
  </div>

</template>

<script>
import Lateral from '../components/lateral.vue'
import Encabezado from  '../components/encabezado.vue'
import Clase from  '../components/cardClase.vue'
import { ref,onMounted } from 'vue';

export default {
components: {Lateral,Encabezado, Clase},

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
      console.log(numeroEmpleadoDocente.value)
        
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

        console.log(asignaturas)
        console.log(seccion)


        asignaturas.value.forEach(nestedArray => {
          nestedArray.forEach(item => {
            // Now 'item' contains the information inside the nested array
            console.log(item);

           console.log (item.idAsignatura)
            seccion.value.forEach(seccionItem=>{
              const seccionID=seccionItem.idAsignatura
              if(item.idAsignatura===(seccionID)){
                console.log("Tenemos un match con "+item.nombreClase)
                clases.value.push({
                id: item.idAsignatura,
                idSeccion: seccionItem.idSeccion,
                nombreClase: item.nombreClase,
                banner: 'http://localhost:3000/'+item.bannerAsignatura,
                horaIni: seccionItem.horaInicial,
                facultad: item.nombreCarrera,
                // Agrega otras propiedades que desees mostrar
              });

              }

            });
          });
        });

        // const asignaturaIds = asignaturas.value.map(asignatura => asignatura.idAsignatura);
        // console.log(asignaturaIds)
        // seccion.value.forEach(seccionItem => {
        //   // Assuming there is an 'id' property in seccionItem, adjust it according to your data structure
        //   const seccionId = seccionItem.idAsignatura;

        //   // Check if the seccionId is present in asignaturaIds
        //   if (asignaturaIds.includes(seccionId)) {
        //     // Do something when the IDs match
        //     console.log(`Hay Match`);
        //   }
        // });

        // clases.value = data.map(item => ({
        //   title: item.titulo, // ajusta a la propiedad real
        //   src: item.src,       // ajusta a la propiedad real
        //   id: item.id          // ajusta a la propiedad real
        // }));


      } catch (error) {
        console.log(error)

      }
    };

    // clases =[
    // {
    //     title:'0900 - INGENIERIA DEL SOFTWARE',
    //     src: require('../assets/software.png'),
    //     id:1
    //   },
    //   {
    //     title:'0800 - SEGURIDAD INFORMATICA',
    //     src: require('../assets/seguridad.png'),
    //     id:2
    //   }
    // ]

    onMounted(() => {
      docenteEs();
    });

    return{
      clases,
      docente,
      
      
   
     
      

    }
}
}
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@300;500&display=swap');
.componentesDocentes{
margin-top: 100px;
left: 230px !important;
width: calc((100% - 230px) - 0px);
}
.app{
  display: flex;
  align-items: flex-start;
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
flex:1;
padding: 20px;
}

.cuadrado{
  display:flex;
  width:700px;
  min-height: 500px;
  overflow: hidden;
  align-items: center;
  justify-content:space-between;

}

.clases{
  display: flex;
  padding:25px;
  margin: 0 auto;
  justify-content:space-evenly;
}

h1{
  color:  #77181E;
}

</style>