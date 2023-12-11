<template>
  <div>
    <body style="background-color: #282832">
      <v-row>
        <v-col cols="3">
          <Lateral />
        </v-col>
        <v-col class="mine">
          <div class="contenido">
            <Encabezado
              title="Tus Calificaciones"
              v-if="estudiante"
              :datos="estudiante"
            />
          </div>
          <v-row v-show="isClaseVisible">
            <v-col class="rubik infoEvaluacion align-center d-flex flex-column">
              <p>
                Evaluar el desempeño de los docentes es una parte crucial de
                nuestro compromiso de brindar educación de alta calidad. Sus
                comentarios proporcionan información valiosa que nos ayuda a
                mejorar las experiencias de enseñanza y aprendizaje:
              </p>
            </v-col>
          </v-row>
          <div class="componentesDocentes">
            <div class="contenedorCards">
              <v-row>
              <CardClase
                v-show="isClaseVisible"
                v-for="clase in clases"
                :key="clase.idAsignatura"
                :clase="clase"
                @mostrar-form="showEvaluacion"
              />
            </v-row>
            </div>
            
            <v-row v-show="isClaseVisible">
              <v-col></v-col>
              <v-col>
                <router-link
                  to="/notasPeriodoEstudiantes"
                  class="subrayadoNo text"
                >
                  <v-btn
                    color="white"
                    variant="flat"
                    rounded="xl"
                    class="pa-6 boton"
                  >
                    VER CALIFICACIONES</v-btn
                  ></router-link
                >
              </v-col>
              <v-col></v-col>
            </v-row>
            <v-row v-show="isClaseVisible">
              <v-col cols=""></v-col>
              <v-col cols="" class="text">
                <router-link
                  to="/principalEstudiantes"
                  class="rubik subrayadoNo"
                >
                  <v-btn
                    color="white"
                    variant="flat"
                    rounded="xl"
                    class="py-6 px-10 mt-5 text"
                  >
                    VOLVER</v-btn
                  ></router-link
                >
              </v-col>
              <v-col cols=""></v-col>
            </v-row>
            <FormEvaluacion
              :clase="nombreClaseForm"
              :docente="nombreCatedraticoForm"
              :idSeccion="idSeccionForm"
              v-show="isEvaluacionVisible"
              @mostrar-cards="showCards"
            />
          </div>
        </v-col>
      </v-row>
    </body>
  </div>
</template>

<script>
import CardClase from "../components/cardClase.vue";
import Lateral from "../components/lateral.vue";
import Encabezado from "../components/encabezado.vue";
import FormEvaluacion from "../components/formEvalDocentes.vue";
import { ref, onMounted } from "vue";

export default {
  components: { CardClase, Lateral, Encabezado, FormEvaluacion },
  setup() {
    const isEvaluacionVisible = ref(false);
    const isClaseVisible = ref(true);
    const clases =ref ([]);
    // const cards = [
    //   {
    //     src: require("../assets/principal2.png"),
    //     nombre: "IS-100 Introducción a la Ingeniería en Sistemas",
    //     catedratico: "Gabriel Omar Solorzano Oliva",
    //     horaInicio: "1800",
    //     horaFin: "1900",
    //     dias: "Lu,Ma,Mi,Ju",
    //     seccion: "1801",
    //     altura: "400",
    //   },
    // ];

    const nombreClaseForm = ref("");
    const nombreCatedraticoForm = ref("");
    const idSeccionForm =ref ();

    const showEvaluacion = (payload) => {
      nombreClaseForm.value = payload.nombreClase;
      nombreCatedraticoForm.value = payload.nombreDocente;
      idSeccionForm.value= payload.id;
      isEvaluacionVisible.value = true;
      isClaseVisible.value = false;
    };

    const showCards = () => {
      isEvaluacionVisible.value = false;
      isClaseVisible.value = true;
    };

    const estudiante = ref();
    const estudianteEs = async () => {
      console.log("El estudiante es");
      estudiante.value = JSON.parse(localStorage.getItem("Estudiante"));
      console.log(estudiante);
    };
    const readMatricula = async () => {
      try {
        const res = await fetch(
          "http://localhost:3000/estudiante/readMatricula",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              numeroCuenta: estudiante.value.numeroCuenta,
            }),
          }
        );
        const data = await res.json();
        console.log(data);
        const nombresMatricula = data.clasesMatriculadas.map(
          (objeto) => objeto
        );
        clases.value=nombresMatricula;
        console.log(nombresMatricula);
      } catch (error) {
        console.error("Error al leer la matricula del estudiante :(", error);
      }
    };

    const comprobacionEstado = async ( ) =>{
      try {
        const res = await fetch('http://localhost:3000/administrador/ObtenerEstadoProceso', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        })
        const data = await res.json()
        const {estadoProcesos} = data
        console.log(estadoProcesos)
        for(let i = 0; i < estadoProcesos.length; i++){
          if(estadoProcesos[i].idProceso == 3){
            if(estadoProcesos[i].estado == true){
              if(estadoProcesos[i].fechaInicioDelProceso == null || estadoProcesos[i].fechaFinDelProceso == null){
                window.alert("El proceso de calificaciones no está activo");
                window.history.back();
              }else{
              let fechaInicio = new Date(estadoProcesos[i].fechaInicioDelProceso);
              let fechaFin = new Date(estadoProcesos[i].fechaFinDelProceso);
              fechaInicio.setDate(fechaInicio.getDate() + 1);
              fechaFin.setDate(fechaFin.getDate() + 1);
              let intervaloDeFecha = [];
              for (let i = fechaInicio; i <= fechaFin; i.setDate(i.getDate() + 1)) {
                let fechaString = formatearFecha(new Date(i));
                intervaloDeFecha.push(fechaString);
              }
              //obtener el dia actual
              let fechaActual = formatearFecha(new Date());
              console.log(fechaActual);

              //comprobar si el dia actual esta dentro del intervalo de fechas
              let comprobacion = intervaloDeFecha.includes(fechaActual);
              if(comprobacion == true){
                console.log("El proceso de calificaciones está activo");
              }else{
                window.alert("El proceso de calificaciones no está activo");
                window.history.back();
              }

              }


            
            }else{
              window.alert("El proceso de calificaciones no está activo");
              window.history.back();
            }
          }else{

          }
        }
      } catch (error) {
        console.log(error)
      }
    }
    
    const formatearFecha = (fecha) => {
      let dia = fecha.getDate();
      let mes = fecha.getMonth() + 1;
      let anio = fecha.getFullYear();
      if (mes < 10) {
        mes = "0" + mes;
      }
      if (dia < 10) {
        dia = "0" + dia;
      }
      let fechaString = anio + "-" + mes + "-" + dia;
      return fechaString;
    }; 

    onMounted(() => {
      estudianteEs();
      readMatricula();
      comprobacionEstado()
    });

    return {
      clases,
      isClaseVisible,
      isEvaluacionVisible,
      nombreClaseForm,
      nombreCatedraticoForm,
      idSeccionForm,
      estudiante,
      showEvaluacion,
      showCards,
    };
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Rubik:wght@300;500&display=swap");
.boton {
  display: flex;
  justify-content: center;
}

.mine{
  height: 160vh
}
.text {
  font-family: "Rubik";
  display: flex;
  justify-content: center;
  align-content: center;
  text-align: center;
}

.subrayadoNo {
  text-decoration: none;
  color: black;
}
.infoEvaluacion {
  color: white;
  margin-top: 70px;
  padding-right: 200px;
  text-align: justify;
  font-size: 20px;
}
.componentesDocentes {
  margin-top: 10px;
  /* left: 230px !important; */
  margin-left: -15px;
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
  /* top: 0px; */
  z-index: 1004;
  transform: translateY(0%);
  position: fixed;
  left: 230px;
  width: calc((100% - 230px) - 0px);
}

.contenedorCards {
   
    max-height: 675px;
    overflow-x:hidden;
    overflow-y:scroll;
    margin-bottom: 10px;
  }

  .contenedorCards::-webkit-scrollbar {
  width: 12px;
  
}


.contenedorCards::-webkit-scrollbar-thumb {
  background-color: rgb(219, 179, 46); 
  border-radius: 6px
}


.contenedorCards::-webkit-scrollbar-track {
  background-color: #f1f1f1; 
  border-radius: 6px
}
  /* .scrollable-row {
    
    max-width: 100%; 
    overflow-x: auto; 
    white-space: nowrap; 
  } */
</style>
