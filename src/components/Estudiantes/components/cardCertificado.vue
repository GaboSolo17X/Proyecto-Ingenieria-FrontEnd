<template>
    <div class="form ">
      <v-sheet class="pa-12 " rounded style="background-color: #282832">
        <v-card
            style="margin-bottom: 25%;"
          class="mx-auto  mt-15 rounded-lg bg-color"
          max-width="600 "
        >
          <div class="encabezadoSolicitud rounded-t-lg">
            <v-row>
              <v-col>
                <v-card-text class="pa-0 text-center">
                  <h1 class="mb-3">Certificado</h1>
                </v-card-text>
              </v-col>
            </v-row>
          </div>
          <v-form class="pa-9 pt-2">
            <v-card-text class="pa-0 text-center pt-3" style="color: #282832;">
                  <h3 class="mb-3">Puedes descargar tu certificado de estudios aquí {{ numCuentaE }}</h3>
                </v-card-text>
            <br />
            <v-row>
              <v-col>
                <v-btn
                  block
                  rounded
                  color="#282832"
                  size="large"
                  type="submit"
                  variant="elevated"
                  @click="generarPDF"
                >
                  Descargar
                </v-btn>
              </v-col>
              <v-col>
                <v-btn
                  block
                  rounded
                  color="#282832"
                  size="large"
                  variant="elevated"
                >
                <router-link to=  "/principalEstudiantes"  class="subrayadoNo">
                  Volver</router-link>
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card>
      </v-sheet>
    </div>
    <!-- <div >
        <Nota1 id="canvas" :estudiante="nombre" :numCuenta="numCuenta" :carrera="carrera" :datos="groupedData1" />
        <Nota2 id="canvas2" :datos="groupedData2" />
        <indice id="canvasin" />
        <final id="canvasfi" :estudiante="nombre" :numCuenta="numCuenta" :carrera="carrera" :pagina="pagina"/>
  
    </div> -->
  </template>
  
  <script>
  import { onMounted, ref } from "vue";
  import jsPDF from 'jspdf';
  import html2canvas from 'html2canvas';
  
  import Nota1 from '../../PDF/tablaPDF.vue';
  import Nota2 from '../../PDF/tablaPDFCon.vue';
  import indice from '../../PDF/tablaPDFIndice.vue';
  import final from '../../PDF/tablaPDFfinal.vue';
  export default {
    props:{
      cuen:String,
      nomb:String,
      carre:String,
    },
    components: {
        Nota1,
        Nota2,
        indice,
        final,
    },
    setup(props) {
    const numCuentaE=ref()
    const nombreE=ref()
    const carreraE=ref()
    const pagina = ref();
    const datos2 =ref([]); 

    nombreE.value=props.nomb;
    carreraE.value=props.carre;
    numCuentaE.value=props.cuen;
    console.log('HOLA '+numCuentaE)

    const matricularEspera = async () => {
      console.log(numCuentaE)
      try {
        const res = await fetch(
          "http://localhost:3000/estudiante/infoCertificado",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              cuenta:props.cuen
            }),
          }
        );
        const data = await res.json();
        // window.location.reload();
        console.log(data);
      
      } catch (error) {
        console.error("Error al cargar las clases aprobadas", error);
      }
    };

    matricularEspera();

        // const maxRegistrosNota1 = 12;
        // const clasesNota1 = datos2.slice(0, maxRegistrosNota1);
        // const clasesNota2 = datos2.slice(maxRegistrosNota1, maxRegistrosNota1 * 2);
        // const clasesNota3 = datos2.slice(maxRegistrosNota1 * 2);

        // Group data by year and period
        // const groupedData1 = clasesNota1.reduce((result, item) => {
        //     if (!result[item.anio]) {
        //         result[item.anio] = {};
        //     }

        //     if (!result[item.anio][item.periodo]) {
        //         result[item.anio][item.periodo] = [];
        //     }

        //     result[item.anio][item.periodo].push(item);
        //     return result;
        // }, {});

        // const groupedData2 = clasesNota2.reduce((result, item) => {
        //     if (!result[item.anio]) {
        //         result[item.anio] = {};
        //     }

        //     if (!result[item.anio][item.periodo]) {
        //         result[item.anio][item.periodo] = [];
        //     }

        //     result[item.anio][item.periodo].push(item);
        //     return result;
        // }, {});

        // const groupedData3 = clasesNota3.reduce((result, item) => {
        //     if (!result[item.anio]) {
        //         result[item.anio] = {};
        //     }

        //     if (!result[item.anio][item.periodo]) {
        //         result[item.anio][item.periodo] = [];
        //     }

        //     result[item.anio][item.periodo].push(item);
        //     return result;
        // }, {});


        


        // const generarPDF = async () => {

        //         const doc = new jsPDF();
        //         const opcionesPDF = { unit: 'mm', format: 'a4', orientation: 'portrait' };
        //         doc.setProperties({
        //         title: 'Certificado Academico',
        //         subject: 'Documento PDF',
        //         author: 'Tu Nombre',
        //       });

        //     console.log(groupedData1)
        //     console.log(groupedData2)
        //     console.log(groupedData3)
        //     const array1=ref([])
        //     const array2=ref([])


        //     if (Object.keys(groupedData2).length > 0) {
        //         // No es un objeto vacío, por lo tanto, se puede realizar el push
        //         array1.value.push(groupedData2)
        //     } else {
        //         // Es un objeto vacío, puedes hacer algo más si es necesario
        //         console.warn('groupedData2 es un objeto vacío.');
        //     }

        //     if (Object.keys(groupedData3).length > 0) {
        //         // No es un objeto vacío, por lo tanto, se puede realizar el push
        //         array2.value.push(groupedData3);
        //     } else {
        //         // Es un objeto vacío, puedes hacer algo más si es necesario
        //         console.warn('groupedData3 es un objeto vacío.');
        //     }
            

        //     console.log(array1)
        //     console.log(array2)

            

        //     const generarPagina = async (componenteId) => {
        //         const canvas = await html2canvas(document.getElementById(componenteId), {
        //             ...opcionesPDF,
        //             scale: 0.9,
        //         });
        //         const imgData = canvas.toDataURL('image/png');
        //         doc.addImage(imgData, 'PNG', 10, 10);
        //         if(componenteId=='canvasfi'){
        //             console.log('Fin ')
        //         }else{
        //             doc.addPage(opcionesPDF);
        //         }
              
        //     };

        //     await generarPagina('canvas');
        //     pagina.value=1;

        //     if (array1.value.length > 0) {
        //         console.log('Entre1')
        //         console.log(array1.value.length)
        //         console.log(array1.length)
        //         await generarPagina('canvas2');
        //         pagina.value=2;
        //     }

        //     if (array2.value.length > 0) {
        //         console.log('Entre2')
        //         console.log(array1.value.length)
        //         await generarPagina('canvas3');
        //     }

        //     await generarPagina('canvasin');
        //     await generarPagina('canvasfi');

        //     doc.save('Certificado.pdf');
        // }


      return {
      //   generarPDF,
      // groupedData1,
      // groupedData2,
      // groupedData3,
      numCuentaE,
      nombreE,
      carreraE,
      pagina,
   
      };
    },
  };
  </script>
  
  <style scoped>
  @import url("https://fonts.googleapis.com/css2?family=Rubik:wght@300;500&display=swap");
  
  .subrayadoNo{
    text-decoration: none;
    color: aliceblue;
  }
  p{
      color: #282832;
      margin-bottom: 5px;
  }
  .encabezadoSolicitud{
      background-color: #77181E;
  /* border-top-left-radius: 24px;
      border-top-right-radius: 24px; */
      padding: 10px 15px;
      padding-top: 35px;
  }
  .bg-color {
    background-color: #c6d6d6;
    color: white;
  }
  .form {
    font-family: "Rubik";
    width: 150%;
    padding-right: 100px;
    margin-left: -100px;
  }
  </style>
  