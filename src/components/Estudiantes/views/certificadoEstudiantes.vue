<template>
  <div>
    <body style="background-color: #282832">
      <v-row>
        <v-col cols="4">
          <Lateral />
        </v-col>
        <v-col cols="8">
          <div class="contenido">
            <Encabezado
              title="Certificado de estudios"
              v-if="estudiante"
              :datos="estudiante"
            />
          </div>
          <div class="componentesDocentes">
            <!-- <CardCertificado :nomb="nombre" :cuen="cuenta" :carre="carrera"/> -->
            <div class="form">
              <v-sheet class="pa-12" rounded style="background-color: #282832">
                <v-card
                  style="margin-bottom: 25%"
                  class="mx-auto mt-15 rounded-lg bg-color"
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
                    <v-card-text
                      class="pa-0 text-center pt-3"
                      style="color: #282832"
                    >
                      <h3 class="mb-3">
                        Puedes descargar tu certificado de estudios aquí
                      </h3>
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
                          <router-link
                            to="/principalEstudiantes"
                            class="subrayadoNo"
                          >
                            Volver</router-link
                          >
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-form>
                </v-card>
              </v-sheet>
            </div>
          </div>
        </v-col>
      </v-row>
    </body>
  </div>
  <div class="pdf">
    <Nota1
      id="canvas"
      :estudiante="nombre"
      :numCuenta="cuenta"
      :carrera="carrera"
      :datos="groupedDat1"
      :random="numAleatorio"
    />
    <Nota2 id="canvas2" :datos="groupedData2" :random="numAleatorio" />
    <indice id="canvasin" :random="al2" :indice="indices" :sum1="MUL" :sum2="UVS"/>
    <final
      id="canvasfi"
      :estudiante="nombre"
      :numCuenta="cuenta"
      :carrera="carrera"
      :pagina="pagina"
      :random="al3"
    />
  </div>
</template>

<script>
import Lateral from "../components/lateral.vue";
import Encabezado from "../components/encabezado.vue";
import CardCertificado from "../components/cardCertificado.vue";
import { ref, onMounted } from "vue";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

import Nota1 from "../../PDF/tablaPDF.vue";
import Nota2 from "../../PDF/tablaPDFCon.vue";
import indice from "../../PDF/tablaPDFIndice.vue";
import final from "../../PDF/tablaPDFfinal.vue";

export default {
  components: {
    CardCertificado,
    Lateral,
    Encabezado,
    Nota1,
    Nota2,
    indice,
    final,
  },

  setup() {
    const estudiante = ref();
    const nombre = ref();
    const cuenta = ref();
    const carrera = ref();
    const numAleatorio = ref();
    const al2 = ref();
    const al3 = ref();

    const generarFormatoNumero = () => {
      const numero = Math.floor(Math.random() * 10000000);
      return numero.toString().padStart(7, "0");
    };

    const estudianteEs = async () => {
      console.log("El estudiante es");
      estudiante.value = JSON.parse(localStorage.getItem("Estudiante"));
      console.log(estudiante);
      nombre.value =
        estudiante.value.nombres.toUpperCase() +
        " " +
        estudiante.value.apellidos.toUpperCase();
      console.log(nombre);
      cuenta.value = estudiante.value.numeroCuenta;
      carrera.value = estudiante.value.carrera.toUpperCase();
      console.log(cuenta.value);
      console.log(carrera);

      matricularEspera(cuenta);
    };
    onMounted(() => {
      estudianteEs();
      numAleatorio.value = generarFormatoNumero();

      al2.value = parseInt(numAleatorio.value, 10) + 1;
      al3.value = Number(numAleatorio.value) + 2;

      console.log(al2.value);
      console.log(al3.value);
    });

    const pagina = ref();
    const datos2 = ref([]);

    let groupedData1;
    let groupedData2;
    let groupedData3;

    const groupedDat1 = ref({});
    const groupedDat2 = ref({});
    const groupedDat3 = ref({});
    const indices = ref();
    const UVS=ref()
    const MUL=ref()

    // nombreE.value=props.nomb;
    // carreraE.value=props.carre;
    // numCuentaE.value=props.cuen;
    console.log("HOLA " + cuenta);

    const matricularEspera = async (cu) => {
      console.log(cuenta.value);
      console.log(cu.value);
      try {
        const res = await fetch(
          "http://localhost:3000/estudiante/infoCertificado",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              cuenta: cu.value,
            }),
          }
        );
        const data = await res.json();
        // window.location.reload();
        console.log(data);

        datos2.value = data.infoCertificado;

        console.log(datos2);

        const sumatoriaCali = datos2.value.reduce(
          (sum, item) => sum + item.cali,
          0
        );
        const sumatoriaUV = datos2.value.reduce(
          (sum, item) => sum + item.uv,
          0
        );

        const sumatoriaCaliUV = datos2.value.reduce(
          (sum, item) => sum + item.cali * item.uv,
          0
        );

        console.log("Sumatoria de calificaciones:", sumatoriaCali);
        console.log("Sumatoria de unidades de valor:", sumatoriaUV);
        console.log(
          "Sumatoria de la multiplicación de cali por uv:",
          sumatoriaCaliUV
        );

        UVS.value=sumatoriaUV
        MUL.value=sumatoriaCaliUV

        const resultadoDivision = Math.round(sumatoriaCaliUV / sumatoriaUV);
        indices.value = resultadoDivision;

        console.log("Resultado de la división:", resultadoDivision);

        const maxRegistrosNota1 = 12;
        const clasesNota1 = datos2.value.slice(0, maxRegistrosNota1);
        const clasesNota2 = datos2.value.slice(
          maxRegistrosNota1,
          maxRegistrosNota1 * 2
        );
        const clasesNota3 = datos2.value.slice(maxRegistrosNota1 * 2);

        groupedData1 = clasesNota1.reduce((result, item) => {
          if (!result[item.anio]) {
            result[item.anio] = {};
          }

          if (!result[item.anio][item.periodo]) {
            result[item.anio][item.periodo] = [];
          }

          result[item.anio][item.periodo].push(item);
          return result;
        }, {});

        groupedData2 = clasesNota2.reduce((result, item) => {
          if (!result[item.anio]) {
            result[item.anio] = {};
          }

          if (!result[item.anio][item.periodo]) {
            result[item.anio][item.periodo] = [];
          }

          result[item.anio][item.periodo].push(item);
          return result;
        }, {});

        groupedData3 = clasesNota3.reduce((result, item) => {
          if (!result[item.anio]) {
            result[item.anio] = {};
          }

          if (!result[item.anio][item.periodo]) {
            result[item.anio][item.periodo] = [];
          }

          result[item.anio][item.periodo].push(item);
          return result;
        }, {});

        groupedDat1.value = groupedData1;
        groupedDat2.value = groupedData2;
        groupedDat3.value = groupedData3;
      } catch (error) {
        console.error("Error al cargar las clases aprobadas", error);
      }
    };

    const generarPDF = async () => {
      const doc = new jsPDF();
      const opcionesPDF = { unit: "mm", format: "a4", orientation: "portrait" };
      doc.setProperties({
        title: "Certificado Academico",
        subject: "Documento PDF",
        author: "Tu Nombre",
      });

      console.log(groupedData1);
      console.log(groupedDat1);
      console.log(groupedData2);
      console.log(groupedData3);
      const array1 = ref([]);
      const array2 = ref([]);

      if (Object.keys(groupedData2).length > 0) {
        // No es un objeto vacío, por lo tanto, se puede realizar el push
        array1.value.push(groupedData2);
      } else {
        // Es un objeto vacío, puedes hacer algo más si es necesario
        console.warn("groupedData2 es un objeto vacío.");
      }

      if (Object.keys(groupedData3).length > 0) {
        // No es un objeto vacío, por lo tanto, se puede realizar el push
        array2.value.push(groupedData3);
      } else {
        // Es un objeto vacío, puedes hacer algo más si es necesario
        console.warn("groupedData3 es un objeto vacío.");
      }

      console.log(array1);
      console.log(array2);

      const generarPagina = async (componenteId) => {
        // const elemento = document.getElementById(componenteId);

        // // Toggle visibility before capture
        // elemento.style.display = "block"; // or 'visibility: visible'

        // const canvas = await html2canvas(elemento, {
        //   ...opcionesPDF,
        //   scale: 0.9,
        // });

        // // Toggle visibility back to hidden
        // elemento.style.display = "none";
        const canvas = await html2canvas(
          document.getElementById(componenteId),
          {
            ...opcionesPDF,
            scale: 0.9,
          }
        );
        const imgData = canvas.toDataURL("image/png");
        doc.addImage(imgData, "PNG", 10, 10);
        if (componenteId == "canvasfi") {
          console.log("Fin ");
        } else {
          doc.addPage(opcionesPDF);
        }
      };

      await generarPagina("canvas");
      pagina.value = 1;
      numAleatorio.value = numAleatorio.value + 1;

      if (array1.value.length > 0) {
        console.log("Entre1");
        console.log(array1.value.length);
        console.log(array1.length);
        await generarPagina("canvas2");
        pagina.value = 2;
        numAleatorio.value = numAleatorio.value + 2;
      }

      if (array2.value.length > 0) {
        console.log("Entre2");
        console.log(array1.value.length);
        await generarPagina("canvas3");
        numAleatorio.value = numAleatorio.value + 3;
      }

      await generarPagina("canvasin");

      await generarPagina("canvasfi");

      // if(array1.value.length>0){
      //   await generarPagina("canvasin");
      //   numAleatorio.value=numAleatorio.value+4
      // } else{
      //    await generarPagina("canvasin");
      //    numAleatorio.value=numAleatorio.value+2
      // }

      // if(array2.value.length>0){
      //   await generarPagina("canvasfi");
      //   numAleatorio.value=numAleatorio.value+5
      // } else{
      //   await generarPagina("canvasfi");
      //    numAleatorio.value=numAleatorio.value+3
      // }

      doc.save("Certificado.pdf");
    };

    return {
      estudiante,
      nombre,
      cuenta,
      carrera,
      generarPDF,
      groupedData1,
      groupedDat1,
      groupedData2,
      groupedDat2,
      groupedData3,
      groupedDat3,
      pagina,
      numAleatorio,
      al2,
      al3,
      UVS,
      MUL,
      indices

    };
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Rubik:wght@300;500&display=swap");

.componentesDocentes {
  margin-top: 100px;
  left: 230px !important;
  width: calc((100% - 230px) - 0px);
}

.rubik {
  font-family: "Rubik";
}

.navBarCont {
  display: flex;
  flex-direction: column;
}

.contenido {
  top: 0px;
  z-index: 1004;
  transform: translateY(0%);
  position: fixed;
  left: 230px;
  width: calc((100% - 230px) - 0px);
}

.subrayadoNo {
  text-decoration: none;
  color: aliceblue;
}

p {
  color: #282832;
  margin-bottom: 5px;
}

.encabezadoSolicitud {
  background-color: #77181e;
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

.pdf {
  margin-left: -1000px;
}
</style>
