<template>
  <v-card class="mx-auto, tarjeta" width="100%">
    <div class="titulo">
      <h6>{{ pregunta }}</h6>
    </div>
    <v-form @submit.prevent="onSubmit">
      <v-row class="mt-5 mx-3">
        <v-col cols="12">
          <v-row style="font-size: 1.5rem">
            <v-col> Seleccione la fecha de inicio: </v-col>
            <v-col cols="5">
              <input
                type="date"
                id="fechaInicio"
                v-model="form.fechaInicio"
                class="inputWhite"
              />
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12">
          <v-row style="font-size: 1.5rem">
            <v-col> Seleccione la fecha de finalización: </v-col>
            <v-col cols="5">
              <input
                type="date"
                id="fechaFin"
                v-model="form.fechaFin"
                class="inputWhite"
              />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <div>
        <div class="divBoton">
          <v-row>
            <v-col>
              <v-btn
                size="large"
                type="submit"
                block
                rounded="xl"
                class="botones"
                style="background-color: #53be4e"
                >Habilitar</v-btn
              >
            </v-col>
            <!-- <v-col cols="2"></v-col> -->
            <!-- este boton lo tengo sin el submit 
              porque creo que no hay que enviar na -->
            <!--<v-col>
              <v-btn
                size="large"
                block
                rounded="xl"
                class="botones"
                style="background-color: #a92727"
                @click="deshabilitarProcesoCancelaciones"
                >Deshabilitar</v-btn
              >
            </v-col>-->
          </v-row>
        </div>
      </div>
    </v-form>
  </v-card>
</template>

<script>
import { ref, onMounted } from "vue";
import {
  differenceInDays,
  isBefore,
  add,
  isWithinInterval,
  parseISO,
} from "date-fns";

export default {
  props: { pregunta: String },
  setup() {
    const form = ref({
      fechaInicio: null,
      fechaFin: null,
    });
    const isFormValid = ref(false);

    const fechaInicioProcesoMatricula = ref(null);
    const fechaFinProcesoMatricula = ref(null);

    const validateForm = () => {
      if (form.value.fechaInicio && form.value.fechaFin) {
        isFormValid.value = true;
      } else {
        isFormValid.value = false;
        window.alert(
          "Por favor seleccione las fechas de cancelación excepcional "
        );
      }
    };

    const showAlertSuccess = () => {
      window.alert(
        "Se han guardado las fechas de cancelación excepcional exitosamente."
      );
      window.location.reload();
    };

    const showAlertFail = (mensaje) => {
      window.alert(mensaje);
    };

    const onSubmit = async () => {
      validateForm();

      if (isFormValid.value) {
        habilitarProcesoCancelaciones();
      }
    };

    // Función para enviar fechas de cancelacion
    const habilitarProcesoCancelaciones = async () => {
      console.log("Fecha de inicio seleccionada:", fechaInicio.value);
      console.log("Fecha de finalización seleccionada:", fechaFin.value);
      try {
        //1. agregar if else para que la fecha de inicio sea menor que la final
        if (
          fechaInicio.value > fechaFin.value ||
          fechaInicio.value == fechaFin.value
        ) {
          showAlertFail(
            "La fecha de Inicio seleccionada es mayor o igual a la fecha de finalización, por favor seleccione correctamente"
          );
          limpiarInputs();
        } else {
          //2. si la fecha de inicio seleccionada o la fecha fin coinciden exactamente con las fechas ya existentes en planificacion
          if (
            fechaInicio.value === fechaInicioProcesoMatricula.value ||
            fechaFin.value === fechaFinProcesoMatricula.value
          ) {
            showAlertFail(
              "La fecha de inicio o fecha de finalización seleccionada coincide con las fechas del proceso de matrícula, por favor seleccione fechas para cancelaciones en un rango máximo de 2 semanas después del " +
                fechaFinProcesoMatricula.value +
                " recuerde que el periodo de cancelaciones debe durar estrictamente 11 semanas"
            );
            limpiarInputs();
          } else {
            //3. las fechas del proceso siguiente no sean antes que el proceso anterior
            const fechasAnteriores = verificarFechasAnteriores(
              fechaInicio.value,
              fechaFin.value
            );
            if (fechasAnteriores == true) {
              showAlertFail(
                "Las fechas seleccionadas no pueden ser fechas anteriores al periodo de Matrícula: " +
                  fechaInicioProcesoMatricula.value +
                  " --> " +
                  fechaFinProcesoMatricula.value +
                  " por favor seleccione de nuevo"
              );
              limpiarInputs();
            } else {
              //4. que no sean mucho despues xd poner un rango como de 2 semanas
              const masDosSemanas = verificarDosSemanas(
                fechaInicio.value,
                fechaFin.value
              );
              if (masDosSemanas == true) {
                showAlertFail(
                  "El rango de fechas seleccionadas excede el límite de dos semanas después de la fecha final de matrícula, por favor seleccione un rango que no exceda dos semanas después del " +
                    fechaFinProcesoMatricula.value +
                    " recuerde que el periodo de cancelaciones debe durar estrictamente 11 semanas ó 77 días"
                );
                limpiarInputs();
              } else {
                //5. que no haya traslape entre el rango de planificacion
                const traslape = verificarSuperposicionFechas(
                  fechaInicio.value,
                  fechaFin.value
                );
                if (traslape == true) {
                  showAlertFail(
                    "El rango de fechas seleccionado se traslapa con las fechas existentes de Matricula: " +
                      fechaInicioProcesoMatricula.value +
                      " --> " +
                      fechaFinProcesoMatricula.value +
                      ", por favor seleccione fechas para cancelaciones en un rango máximo de 2 semanas después del " +
                      fechaFinProcesoMatricula.value +
                      " recuerde que el periodo de cancelaciones debe durar estrictamente 11 semanas o 77 días"
                  );
                  limpiarInputs();
                } else {
                  //6.  rango de 11 semanas de cancelaciones= 77 dias
                 
                  const rangoDias = calcularRangoDias(
                    fechaInicio.value,
                    fechaFin.value
                  );
                  
                  if (rangoDias > 77 || rangoDias < 77) {
                    showAlertFail(
                      "El rango de fechas seleccionado para el proceso de matrícula debe tener estrictamente 11 semanas ó 77 días, " +
                        " rango actual seleccionado: " +
                        rangoDias +
                        " días"
                    );
                    limpiarInputs();
                  } else {
                    const res = await fetch(
                      "http://localhost:3030/administrador/actualizarEstadoProceso",
                      {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          fechaInicio: fechaInicio.value,
                          fechaFin: fechaFin.value,
                          idProceso: 1,
                        }),
                      }
                    );
                    const data = await res.json();
                    console.log(data);
                    showAlertSuccess();
                  }
                }
              }
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    //funciones de calculos de fechas y rangos
    const calcularRangoDias = (inicio, fin) => {
      const inicia = parseISO(inicio);
      const termina = parseISO(fin);
      const diffDays = differenceInDays(termina, inicia);
      return Math.abs(diffDays) + 1; // +1 para incluir el día de inicio en el rango
    };

    const verificarFechasAnteriores = (inicio, fin) => {
      const inicia = parseISO(inicio);
      const termina = parseISO(fin);
      const inicioProceso = parseISO(fechaInicioProcesoMatricula.value);
      // const finProceso = parseISO(fechaFinProcesoMatricula.value);

      if (isBefore(inicia, inicioProceso) || isBefore(termina, inicioProceso)) {
        return true; //las fechas son anteriores al proceso de planificacion
      }
    };

    const verificarDosSemanas = (inicio, fin) => {
      const inicia = parseISO(inicio);
      const termina = parseISO(fin);
      const finProceso = parseISO(fechaFinProcesoMatricula.value);

      const dosSemanasDespues = add(finProceso, { weeks: 2 });

      // Verificar si la fecha de inicio excede dos semanas después de finProceso
      if (inicia > dosSemanasDespues) {
        return true; // Excede dos semanas después de finProceso
      }
    };

    const verificarSuperposicionFechas = (inicio, fin) => {
      const inicia = parseISO(inicio);
      const termina = parseISO(fin);
      const inicioProceso = parseISO(fechaInicioProcesoMatricula.value);
      const finProceso = parseISO(fechaFinProcesoMatricula.value);

      const rangoProcesoPlanificacion = {
        start: inicioProceso,
        end: finProceso,
      };
      const rangoNuevaAsignacion = { start: inicia, end: termina };

      const superposicion =
        isWithinInterval(inicia, rangoProcesoPlanificacion) ||
        isWithinInterval(termina, rangoProcesoPlanificacion) ||
        isWithinInterval(inicioProceso, rangoNuevaAsignacion) ||
        isWithinInterval(finProceso, rangoNuevaAsignacion);

      if (superposicion) {
        return true; //hay traslape
      }
    };

    const obtenerProcesos = async () => {
      try {
        const res = await fetch(
          "http://localhost:3030/administrador/ObtenerEstadoProceso",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await res.json();
        const { estadoProcesos } = data;
        for (let i = 0; i < estadoProcesos.length; i++) {
          if (estadoProcesos[i].idProceso == 2) {
            fechaInicioProcesoMatricula.value =
              estadoProcesos[i].fechaInicioDelProceso;
            fechaFinProcesoMatricula.value =
              estadoProcesos[i].fechaFinDelProceso;
          }
        }
        console.log(
          "fecha de matricula inicio: " + fechaInicioProcesoMatricula.value
        );
        console.log(
          "fecha de matricula fin: " + fechaFinProcesoMatricula.value
        );
        if (
          fechaInicioProcesoMatricula.value == null &&
          fechaFinProcesoMatricula.value == null
        ) {
          showAlertFail(
            "Las fechas para el proceso de Cancelaciones excepcionales, deben ser configuradas solo si ya existen fechas para matrículas, por favor siga el siguiente orden de asignación: Planificación --> Matrícula --> Cancelaciones --> Calificaciones."
          );
          window.history.back();
        }
      } catch (error) {
        console.log(error);
      }
    };

    const limpiarInputs =()=>{
      form.value.fechaInicio=null;
      form.value.fechaFin=null;
    }

    onMounted(() => {
      obtenerProcesos();
    });

    return {
      form,
      habilitarProcesoCancelaciones,
      onSubmit,
      obtenerProcesos,
    };
  },
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Rubik:wght@300;500&display=swap");

input[type="date"]::-webkit-calendar-picker-indicator {
  filter: invert(1);
}
.labelWhite,
.inputWhite {
  color: white;
}

.divBoton {
  width: 90%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 30px;
  align-items: center;
}
.botones {
  color: white;
  font-family: "Rubik";
  text-align: center;
  width: 100%;
}

.titulo {
  color: white;
  font-family: "Rubik";
  font-size: 30px;
  text-align: center; /* Agrega esta propiedad para centrar horizontalmente */
  display: flex;
  flex-direction: column;
  justify-content: center; /* Elimina align-content y align-items */
  margin: 30px;
}

.archivo {
  width: 90%;
}
.tarjeta {
  background-color: #282832;
  color: white;
  font-family: "Rubik";
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  align-content: center;
}
</style>
