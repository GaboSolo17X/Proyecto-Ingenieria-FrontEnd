<template>
  <div>
    <body style="background-color: #282832">
      <v-row>
        <v-col cols="3">
          <Lateral />
        </v-col>
        <v-col>
          <div class="contenido">
            <Encabezado
              title="Matricula de clases"
              v-if="estudiante"
              :datos="estudiante"
            />
          </div>
          <div class="componentesDocentes">
            <v-row>
              <v-col>
                <v-row>
                  <!-- v-model="departamento" -->
                  <v-col cols="" class="formulario">
                    <v-select
                      v-model="selectDepa"
                      :items="departamentoFiltro"
                      :rules="[
                        (v) => !!v || 'Seleccione un departamento',
                        (v) => true,
                      ]"
                      label="Buscar departamento"
                      required
                      variant="solo-filled"
                      append-inner-icon="fa-solid fa-chevron-down"
                    ></v-select>
                  </v-col>
                </v-row>
                <v-row class="mt-0">
                  <!-- v-model="asignatura" -->
                  <v-col cols="" class="formulario">
                    <v-select
                      v-model="selectClase"
                      :items="asignaturas"
                      :rules="[
                        (v) => !!v || 'Seleccione una asignatura',
                        (v) => true,
                      ]"
                      label="Buscar Asignatura"
                      required
                      variant="solo-filled"
                      append-inner-icon="fa-solid fa-chevron-down"
                    ></v-select>
                  </v-col>
                </v-row>
              </v-col>
              <v-col class="details">
                <CardDetalles class="small-card" />

                <BotonHorario class="hour" />

                <router-link to="/principalEstudiantes" class="subrayadoNo">
                  <v-btn
                    color="white"
                    variant="flat"
                    rounded="xl"
                    class="text py-6 px-10 mt-5"
                  >
                    VOLVER</v-btn
                  ></router-link
                >
              </v-col>
            </v-row>
          </div>
          <div class="cuadrados">
            <v-row>
              <Matricula
                v-for="clase in clases"
                :key="clase.idSeccion"
                :clase="clase"
                :card="card"
              />
            </v-row>
            <!-- <v-row>
              <v-col cols=""></v-col>

              <v-col cols=""></v-col>
            </v-row> -->
          </div>
          <v-row>
            <!-- <v-col cols="">
                  <BotonHorario />
              </v-col> -->
            <!-- <v-col cols="">
              <router-link to="/principalEstudiantes" class="subrayadoNo">
                <v-btn
                  color="white"
                  variant="flat"
                  rounded="xl"
                  class="text py-6 px-10 mt-5"
                >
                  VOLVER</v-btn
                ></router-link
              >
            </v-col> -->
          </v-row>
        </v-col>
      </v-row>
    </body>
  </div>
</template>

<script>
import Lateral from "../components/lateral.vue";
import Encabezado from "../components/encabezado.vue";
import Matricula from "../components/cardMatricula.vue";
import ToolbarBuscar from "../components/toolbarBuscar.vue";
import CardDetalles from "../components/cardDetalles.vue";
import BotonHorario from "../components/botonHorario.vue";
import { ref, onMounted, watch } from "vue";

export default {
  components: {
    Lateral,
    Encabezado,
    Matricula,
    ToolbarBuscar,
    CardDetalles,
    BotonHorario,
  },
  setup() {
    const clases = ref([]);
    // {
    //   nombre: "Fabiola Mendoza",
    //   seccion: "0700",
    //   dias: "Lu, Ma, Mi",
    //   cupos: 25,
    // },
    const indiceAcadem = ref();
    const departamentoFiltro = ref([]);
    const arregloDeObjetos2 = ref([]);
    const asignaturas = ref([]);
    const estudiante = ref();
    const numCuenta = ref();
    const estudianteEs = async () => {
      console.log("El estudiante es");
      estudiante.value = JSON.parse(localStorage.getItem("Estudiante"));
      console.log(estudiante);
    };
    onMounted(() => {
      estudianteEs();
      getIndice();    
      estadoMatricula();
      getCarreras();
      
    });

    const estadoMatricula = async () => {
      try {
        let Indice
        const res2 = await fetch(
          "http://localhost:3000/estudiante/getIndiceAcademico",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              cuentaEstudiante: estudiante.value.numeroCuenta,
            }),
          }
        );
        const data2 = await res2.json();
        const { indiceAcademico } = data2;
        Indice = indiceAcademico;
        console.log('El indice es: ', indiceAcadem.value)




        const res = await fetch('http://localhost:3000/administrador/ObtenerEstadoProceso', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        })
        const data = await res.json();
        const {estadoProcesos} = data;
        for( let i = 0; i < estadoProcesos.length; i++){
          if(estadoProcesos[i].nombreProceso == "Matrícula"){
            if(estadoProcesos[i].estado == true){
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
            


              if ( Indice >= 82 && Indice <= 100) {
               if( fechaActual == intervaloDeFecha[0]){
               }else{
                window.alert("Tu proceso de matricula aún no está activo");
                window.history.back();
               }
              }

              if ( Indice >= 80 && Indice <= 81) {
               if( fechaActual == intervaloDeFecha[1]){
               }else{
                window.alert("Tu proceso de matricula aún no está activo");
                window.history.back();
               }
              }

              if ( Indice >= 70 && Indice <= 79) {
               if( fechaActual == intervaloDeFecha[2]){
               }else{
                window.alert("Tu proceso de matricula aún no está activo");
                window.history.back();
               }
              }

              if ( Indice >= 0 && Indice <= 69) {
               if( fechaActual == intervaloDeFecha[3]){
               }else{
                window.alert("Tu proceso de matricula aún no está activo");
                window.history.back();
               }
              }

            }else{
              window.alert("El proceso de matrícula aún no está activo");
              window.history.back();
            }
          }
        }

      } catch (error) {
        console.log("Error al cargar el estado de la matricula", error)
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

    const getIndice = async () => {
      try {
        const res = await fetch(
          "http://localhost:3000/estudiante/getIndiceAcademico",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              cuentaEstudiante: estudiante.value.numeroCuenta,
            }),
          }
        );
        const data = await res.json();
        const { indiceAcademico } = data;
        indiceAcadem.value = indiceAcademico;
        console.log('El indice es: ', indiceAcadem.value)

      } catch (error) {
        console.error("Error al cargar el indice del estudiante", error);
      }
    };

    const getCarreras = async () => {
      //falta mandar el numero de cuenta creo
      try {
        const res = await fetch(
          "http://localhost:3000/estudiante/getCarreraMatricula",
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
        const nombresCarreras = data.Departamentos.map(
          (objeto) => objeto.nombreCarrera
        );
        console.log(nombresCarreras);
        departamentoFiltro.value = nombresCarreras;
        console.log(departamentoFiltro);
      } catch (error) {
        console.error("Error al cargar las carreras", error);
      }
    };

    const getAsignaturasMatricula = async (carrera) => {
      try {
        const formData = new FormData();
        formData.append("nombreCarrera", carrera);
        formData.append("cuenta", estudiante.value.numeroCuenta);
        const res = await fetch(
          "http://localhost:3000/estudiante/getAsignaturasMatricula",
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await res.json();
        console.log(data);
        const arregloDeObjetos = Object.values(data.asignaturas).map(
          (valor) => valor
        );

        arregloDeObjetos2.value = arregloDeObjetos;
        //  console.log(data.asignaturas);
        console.log(arregloDeObjetos);

        // const nombresClases = arregloDeObjetos.map((objeto) => objeto.nombreClase);
        const nombresAsignaturas = arregloDeObjetos.map(
          (objeto) => objeto.nombreClase
        );
        console.log(nombresAsignaturas);
        asignaturas.value = nombresAsignaturas;
      } catch (error) {
        console.error("Error al cargar las asignaturas", error);
      }
    };

    const nombreAsignatura = ref("");
    const nombreSeccion = ref("");
    const getSecciones = async (asignatura, name, uv) => {
      try {
        const formData = new FormData();
        formData.append("idasignatura", asignatura);
        formData.append("cuenta", estudiante.value.numeroCuenta);
        const res = await fetch(
          "http://localhost:3000/estudiante/getSeccionesDisponibles",
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await res.json();
        console.log(data);
        if(data.message=='No hay secciones disponibles'){
          window.alert("No hay secciones disponibles")
          window.location.reload();
        }
        const nombresSecciones = data.secciones.map((objeto) => objeto);
        console.log(nombresSecciones);
        clases.value.splice(0, clases.value.length);
        nombresSecciones.forEach((clase) => {
          clases.value.push({
            aula: clase.aula,
            cupos: clase.cupos,
            dias: clase.dias,
            edificio: clase.edificio,
            horaFinal: clase.horaFinal,
            horaInicial: clase.horaInicial,
            idAsignatura: clase.idAsignatura,
            idSeccion: clase.idSeccion,
            linkVideo: clase.linkVideo,
            nombreSeccion: clase.nombreSeccion,
            numeroEmpleadoDocente: clase.numeroEmpleadoDocente,
            nombre: name,
            uv: uv,
            docente: clase.nombre,
            foto: clase.fotoDocente,
          });
        });

        console.log(clases);
      } catch (error) {
        console.error("Error al cargar las secciones", error);
      }
    };

    const selectDepa = ref(null);

    watch(selectDepa, (newValue, oldValue) => {
      console.log("Cambiamos el valor de ", oldValue, " a ", newValue);
      getAsignaturasMatricula(newValue);
    });

    const selectClase = ref(null);

    watch(selectClase, (newValue, oldValue) => {
      console.log("Cambiamos el valor de ", oldValue, " a ", newValue);
      let idClase;
      let uv;
      let name;
      arregloDeObjetos2.value.forEach((nestedArray) => {
        if (newValue == nestedArray.nombreClase) {
          idClase = nestedArray.idAsignatura;
          name = nestedArray.nombreClase;
          uv = nestedArray.uv;
        }
      });
      console.log(idClase);
      getSecciones(idClase, name, uv);
    });

    return {
      indiceAcadem,
      clases,
      selectDepa,
      selectClase,
      estudiante,
      departamentoFiltro,
      asignaturas,
    };
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Rubik:wght@300;500&display=swap");
.formulario :deep(.v-messages) {
  color: yellow !important;
}
.boton {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 30px;
  padding-top: 30px;
  text-decoration: none;
  /* margin-left: 50px !important; */
}
.subrayadoNo {
  text-decoration: none;
  color: black;
}

.card {
  width: 20%;
}

.text {
  font-family: "Rubik";
  display: flex;
  justify-content: center;
  align-content: center;
  text-align: center;
}
.small-card {
  flex: 1;
}

.large-card {
  flex: 2;
}
.cuadrados {
  display: flex;
  width: 900px !important ;
  min-height: 500px;
  overflow: hidden;
  align-items: center;
  justify-content: space-evenly;
  flex-wrap: wrap;
}
.componentesDocentes {
  margin-top: 78px;
  left: 230px !important;
  width: 100;
  height: 100;
  display: flex;
  gap: 15px;
  padding-left: 0;
}

.details {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.hour {
  margin-top: 20px;
}
.contenido {
  top: 0px;
  z-index: 1004;
  transform: translateY(0%);
  position: fixed;
  left: 230px;
  width: calc((100% - 230px) - 0px);
  flex: 1;
  padding: 20px;
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
</style>
