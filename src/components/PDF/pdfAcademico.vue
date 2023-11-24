<template>
    <div>
        <Nota1 id="canvas" :estudiante="nombre" :numCuenta="numCuenta" :carrera="carrera" :datos="groupedData1" />
        <Nota2 id="canvas2" :datos="groupedData2" />
        <indice id="canvasin" />
        <final id="canvasfi" :estudiante="nombre" :numCuenta="numCuenta" :carrera="carrera" :pagina="pagina"/>
        <button @click="generarPDF">Generar PDF</button>
    </div>
</template>
  
<script>
import { ref } from 'vue';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import Nota1 from '../PDF/tablaPDF.vue';
import Nota2 from '../PDF/tablaPDFCon.vue';
import indice from '../PDF/tablaPDFIndice.vue';
import final from '../PDF/tablaPDFfinal.vue';


export default {
    components: {
        Nota1,
        Nota2,
        indice,
        final,
    },
    setup() {


        const numCuenta=ref()
        const nombre=ref()
        const carrera=ref()
        const pagina = ref();

        numCuenta.value='20201000915'
        nombre.value='GABRIEL OMAR SOLORZANO OLIVA'
        carrera.value='PERIODISMO'
        const datos2 = [
            {
                name: "IS-201",
                asignatura: "INTRODUCCION A LA ING.EN SISTEMAS",
                cali: 90,
                uv: 5,
                periodo: "Primer Periodo",
                anio: "2020",
            },
            {
                name: "IS-201",
                asignatura: "Introduccion a la Ing.en Sistemas",
                cali: 90,
                uv: 5,
                periodo: "Primer Periodo",
                anio: "2020",
            },
            {
                name: "IS-201",
                asignatura: "Introduccion a la Ing.en Sistemas",
                cali: 90,
                uv: 5,
                periodo: "Primer Periodo",
                anio: "2020",
            },
            {
                name: "IS-201",
                asignatura: "Introduccion a la Ing.en Sistemas",
                cali: 90,
                uv: 5,
                periodo: "Primer Periodo",
                anio: "2020",
            },
            {
                name: "IS-201",
                asignatura: "Introduccion a la Ing.en Sistemas",
                cali: 90,
                uv: 5,
                periodo: "Segundo Periodo",
                anio: "2020",
            },
            {
                name: "IS-201",
                asignatura: "Introduccion a la Ing.en Sistemas",
                cali: 90,
                uv: 5,
                periodo: "Segundo Periodo",
                anio: "2020",
            },
            {
                name: "IS-201",
                asignatura: "Introduccion a la Ing.en Sistemas",
                cali: 90,
                uv: 5,
                periodo: "Segundo Periodo",
                anio: "2020",
            },
            {
                name: "IS-201",
                asignatura: "Introduccion a la Ing.en Sistemas",
                cali: 90,
                uv: 5,
                periodo: "Tercer Periodo",
                anio: "2020",
            },
            {
                name: "IS-301",
                asignatura: "BASES DE DATOS 2",
                cali: 90,
                uv: 5,
                periodo: "Primer Periodo",
                anio: "2021",
            },
            // {
            //     name: "IS-301",
            //     asignatura: "BASES DE DATOS 2",
            //     cali: 90,
            //     uv: 5,
            //     periodo: "Primer Periodo",
            //     anio: "2021",
            // },
            // {
            //     name: "IS-301",
            //     asignatura: "BASES DE DATOS 2",
            //     cali: 90,
            //     uv: 5,
            //     periodo: "Primer Periodo",
            //     anio: "2021",
            // },
            // {
            //     name: "IS-301",
            //     asignatura: "BASES DE DATOS 2",
            //     cali: 90,
            //     uv: 5,
            //     periodo: "Primer Periodo",
            //     anio: "2021",
            // },
            // {
            //     name: "IS-401",
            //     asignatura: "REDES 2",
            //     cali: 90,
            //     uv: 5,
            //     periodo: "Segundo Periodo",
            //     anio: "2021",
            // },
            // {
            //     name: "IS-401",
            //     asignatura: "REDES 2",
            //     cali: 90,
            //     uv: 5,
            //     periodo: "Segundo Periodo",
            //     anio: "2021",
            // },
            // {
            //     name: "IS-401",
            //     asignatura: "REDES 2",
            //     cali: 90,
            //     uv: 5,
            //     periodo: "Segundo Periodo",
            //     anio: "2021",
            // },
            // {
            //     name: "IS-401",
            //     asignatura: "REDES 2",
            //     cali: 90,
            //     uv: 5,
            //     periodo: "Segundo Periodo",
            //     anio: "2021",
            // },
            // {
            //     name: "IS-501",
            //     asignatura: "INGENIERIA",
            //     cali: 60,
            //     uv: 5,
            //     periodo: "Tercer Periodo",
            //     anio: "2021",
            // },
            // {
            //     name: "IS-501",
            //     asignatura: "INGENIERIA",
            //     cali: 60,
            //     uv: 5,
            //     periodo: "Tercer Periodo",
            //     anio: "2021",
            // },
            // {
            //     name: "IS-501",
            //     asignatura: "INGENIERIA",
            //     cali: 60,
            //     uv: 5,
            //     periodo: "Tercer Periodo",
            //     anio: "2021",
            // },
            // {
            //     name: "IS-501",
            //     asignatura: "INGENIERIA",
            //     cali: 60,
            //     uv: 5,
            //     periodo: "Tercer Periodo",
            //     anio: "2021",
            // },
            // {
            //     name: "IS-501",
            //     asignatura: "INGENIERIA",
            //     cali: 60,
            //     uv: 5,
            //     periodo: "Tercer Periodo",
            //     anio: "2021",
            // },
        ];

        const maxRegistrosNota1 = 12;
        const clasesNota1 = datos2.slice(0, maxRegistrosNota1);
        const clasesNota2 = datos2.slice(maxRegistrosNota1, maxRegistrosNota1 * 2);
        const clasesNota3 = datos2.slice(maxRegistrosNota1 * 2);

        // Group data by year and period
        const groupedData1 = clasesNota1.reduce((result, item) => {
            if (!result[item.anio]) {
                result[item.anio] = {};
            }

            if (!result[item.anio][item.periodo]) {
                result[item.anio][item.periodo] = [];
            }

            result[item.anio][item.periodo].push(item);
            return result;
        }, {});

        const groupedData2 = clasesNota2.reduce((result, item) => {
            if (!result[item.anio]) {
                result[item.anio] = {};
            }

            if (!result[item.anio][item.periodo]) {
                result[item.anio][item.periodo] = [];
            }

            result[item.anio][item.periodo].push(item);
            return result;
        }, {});
        const groupedData3 = clasesNota3.reduce((result, item) => {
            if (!result[item.anio]) {
                result[item.anio] = {};
            }

            if (!result[item.anio][item.periodo]) {
                result[item.anio][item.periodo] = [];
            }

            result[item.anio][item.periodo].push(item);
            return result;
        }, {});


        


        const generarPDF = async () => {

                const doc = new jsPDF();
                const opcionesPDF = { unit: 'mm', format: 'a4', orientation: 'portrait' };
                doc.setProperties({
                title: 'Certificado Academico',
                subject: 'Documento PDF',
                author: 'Tu Nombre',
              });


            //    // Captura el contenido de Componente1
            //    const canvas1 = await html2canvas(document.getElementById('canvas'), {
            //     ...opcionesPDF,
            //     scale: 0.9,
            //   });
            //   const imgData1 = canvas1.toDataURL('image/png');
            //   doc.addImage(imgData1, 'PNG', 10, 10);

            //   doc.addPage(opcionesPDF);
            //   const escala2 = doc.internal.pageSize.getWidth() / document.getElementById('canvas2').offsetWidth;
            //   // Captura el contenido de Componente2
            //   const canvas2 = await html2canvas(document.getElementById('canvas2'), {
            //     ...opcionesPDF,
            //     scale: 0.9,
            //   });

            //   const imgData2 = canvas2.toDataURL('image/png');

            //   // Ajusta la posición y el tamaño según sea necesario
            //   doc.addImage(imgData2, 'PNG', 10, 10);

            //   doc.addPage(opcionesPDF);

            //   const canvas3 = await html2canvas(document.getElementById('canvas3'), {
            //     ...opcionesPDF,
            //     scale: 0.9,
            //   });

            //   const imgData3 = canvas3.toDataURL('image/png');
            //   doc.addImage(imgData3, 'PNG', 10, 10);

            //   doc.addPage(opcionesPDF);

            //   const canvas4 = await html2canvas(document.getElementById('canvas4'), {
            //     ...opcionesPDF,
            //     scale: 0.9,
            //   });

            //   const imgData4 = canvas4.toDataURL('image/png');
            //   doc.addImage(imgData4, 'PNG', 10, 10);

            //   doc.save('Certificado.pdf');

            //     // const canvas=document.getElementById('canvas')
            //     // html2canvas(canvas).then(function(canvas){
            //     //     const imgData=canvas.toDataURL('image/png')
            //     //     const doc=new jsPDF()
            //     //     doc.addImage(imgData,'PNG',10,10)
            //     //     doc.save('output.pdf')
            //     // })

           
            console.log(groupedData1)
            console.log(groupedData2)
            console.log(groupedData3)
            const array1=ref([])
            const array2=ref([])


            if (Object.keys(groupedData2).length > 0) {
                // No es un objeto vacío, por lo tanto, se puede realizar el push
                array1.value.push(groupedData2)
            } else {
                // Es un objeto vacío, puedes hacer algo más si es necesario
                console.warn('groupedData2 es un objeto vacío.');
            }

            if (Object.keys(groupedData3).length > 0) {
                // No es un objeto vacío, por lo tanto, se puede realizar el push
                array2.value.push(groupedData3);
            } else {
                // Es un objeto vacío, puedes hacer algo más si es necesario
                console.warn('groupedData3 es un objeto vacío.');
            }
            

            console.log(array1)
            console.log(array2)

            

            const generarPagina = async (componenteId) => {
                const canvas = await html2canvas(document.getElementById(componenteId), {
                    ...opcionesPDF,
                    scale: 0.9,
                });
                const imgData = canvas.toDataURL('image/png');
                doc.addImage(imgData, 'PNG', 10, 10);
                if(componenteId=='canvasfi'){
                    console.log('Fin ')
                }else{
                    doc.addPage(opcionesPDF);
                }
              
            };

            await generarPagina('canvas');
            pagina.value=1;

            if (array1.value.length > 0) {
                console.log('Entre1')
                console.log(array1.value.length)
                console.log(array1.length)
                await generarPagina('canvas2');
                pagina.value=2;
            }

            if (array2.value.length > 0) {
                console.log('Entre2')
                console.log(array1.value.length)
                await generarPagina('canvas3');
            }

            await generarPagina('canvasin');
            await generarPagina('canvasfi');

            doc.save('Certificado.pdf');
        }


        return {
            
            generarPDF,
            groupedData1,
            groupedData2,
            groupedData3,
            numCuenta,
            nombre,
            carrera,
            pagina,
        };
    },
};
</script>