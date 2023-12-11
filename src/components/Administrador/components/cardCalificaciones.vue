<template>
  <v-card class="mx-auto, tarjeta ml-5" width="120%">
    <v-row class="encabezadoPlanificacion">
      <v-col style="text-align: center">
        <router-link
          to="/adminPlanificacion"
          active-class="amarillo"
          class="enlace"
        >
          Planificación académica
        </router-link>
      </v-col>

      <v-col style="text-align: center" class="linea">
        <router-link
          to="/adminCalificaciones"
          active-class="amarillo"
          class="enlace"
        >
          Registro de calificaciones
        </router-link>
      </v-col>
    </v-row>

    <v-form @submit.prevent="onSubmit">
      <v-row class="mt-5 mx-3">
        <v-col cols="12">
          <v-row style="font-size: 1.3rem">
            <v-col> Seleccione la fecha de inicio: </v-col>
            <v-col cols="4">
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
          <v-row style="font-size: 1.3rem">
            <v-col> Seleccione la fecha de finalización: </v-col>
            <v-col cols="4">
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
          <div>
            <v-btn
              block
              size="large"
              rounded="xl"
              class="botones"
              type="submit"
              style="background-color: #a92727"
              >GUARDAR</v-btn
            >
          </div>
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
  setup() {
    const form = ref({
      fechaInicio: null,
      fechaFin: null,
    });
    const isFormValid = ref(false);

    const fechaInicioProcesoCancelacion = ref(null);
    const fechaFinProcesoCancelacion = ref(null);

    const validateForm = () => {
      if (form.value.fechaInicio && form.value.fechaFin) {
        isFormValid.value = true;
      } else {
        isFormValid.value = false;
        window.alert(
          "Por favor seleccione las fechas de registro de calificaciones"
        );
      }
    };

    const showAlertSuccess = () => {
      window.alert(
        "Se han guardado las fechas de registro de calificaciones exitosamente."
      );
      window.location.reload();
    };

    const showAlertFail = (mensaje) => {
      window.alert(mensaje);
      //El rango establecido se traslapa con el rango de fechas para el proceso de Planificación académica, por favor ingrese un rango diferente.
    };

    const onSubmit = async () => {
      validateForm();

      if (isFormValid.value) {
        //ejecutar la api de envio de fecha
        guardarFechaCalificaciones();
      }
    };

    // Función para enviar fechas de planificacion
    const guardarFechaCalificaciones = async () => {
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
            fechaInicio.value === fechaInicioProcesoCancelacion.value ||
            fechaFin.value === fechaFinProcesoCancelacion.value
          ) {
            showAlertFail(
              "La fecha de inicio o fecha de finalización seleccionada coincide con las fechas del proceso de cancelaciones excepcionales, por favor seleccione fechas para registro de calificaciones en un rango máximo de 2 semanas después del " +
                fechaFinProcesoCancelacion.value +
                " recuerde que el periodo de registro de calificaciones debe durar estrictamente 3 días"
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
                "Las fechas seleccionadas no pueden ser fechas anteriores al periodo de cancelaciones excepcionales : " +
                  fechaInicioProcesoCancelacion.value +
                  " --> " +
                  fechaFinProcesoCancelacion.value +
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
                  "El rango de fechas seleccionadas excede el límite de dos semanas después de la fecha final de cancelaciones excepcionales, por favor seleccione un rango que no exceda dos semanas después del " +
                    fechaFinProcesoCancelacion.value +
                    " recuerde que el periodo de registro de calificaciones debe durar estrictamente 3 días"
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
                    "El rango de fechas seleccionado se traslapa con las fechas existentes de cancelacion excepcional: " +
                      fechaInicioProcesoCancelacion.value +
                      " --> " +
                      fechaFinProcesoCancelacion.value +
                      ", por favor seleccione fechas para registro de calificaciones en un rango máximo de 2 semanas después del " +
                      fechaFinProcesoCancelacion.value +
                      " recuerde que el periodo de registro de calificaciones debe durar estrictamente 3 días"
                  );
                  limpiarInputs();
                } else {
                  //6.  rango de 3 dias de calificaciones
                  const rangoDias = calcularRangoDias(
                    fechaInicio.value,
                    fechaFin.value
                  );
                  if (rangoDias > 3 || rangoDias < 3) {
                    showAlertFail(
                      "El rango de fechas seleccionado para el proceso de matrícula debe tener estrictamente 3 días, " +
                        " rango actual seleccionado: " +
                        rangoDias +
                        " días"
                    );
                    limpiarInputs();
                  } else {
                    const res = await fetch(
                      "http://localhost:3000/administrador/actualizarEstadoProceso",
                      {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          fechaInicio: fechaInicio.value,
                          fechaFin: fechaFin.value,
                          idProceso: 3,
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
      const inicioProceso = parseISO(fechaInicioProcesoCancelacion.value);
      // const finProceso = parseISO(fechaFinProcesoCancelacion.value);

      if (isBefore(inicia, inicioProceso) || isBefore(termina, inicioProceso)) {
        return true; //las fechas son anteriores al proceso de planificacion
      }
    };

    const verificarDosSemanas = (inicio, fin) => {
      const inicia = parseISO(inicio);
      const termina = parseISO(fin);
      const finProceso = parseISO(fechaFinProcesoCancelacion.value);

      const dosSemanasDespues = add(finProceso, { weeks: 2 });

      // Verificar si la fecha de inicio excede dos semanas después de finProceso
      if (inicia > dosSemanasDespues) {
        return true; // Excede dos semanas después de finProceso
      }
    };

    const verificarSuperposicionFechas = (inicio, fin) => {
      const inicia = parseISO(inicio);
      const termina = parseISO(fin);
      const inicioProceso = parseISO(fechaInicioProcesoCancelacion.value);
      const finProceso = parseISO(fechaFinProcesoCancelacion.value);

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
          "http://localhost:3000/administrador/ObtenerEstadoProceso",
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
          if (estadoProcesos[i].idProceso == 1) {
            fechaInicioProcesoCancelacion.value =
              estadoProcesos[i].fechaInicioDelProceso;
            fechaFinProcesoCancelacion.value =
              estadoProcesos[i].fechaFinDelProceso;
          }
        }
        console.log(
          "fecha de cancelaciones inicio: " +
            fechaInicioProcesoCancelacion.value
        );
        console.log(
          "fecha de cancelaciones fin: " + fechaFinProcesoCancelacion.value
        );
        if (
          fechaInicioProcesoCancelacion.value == null &&
          fechaFinProcesoCancelacion.value == null
        ) {
          showAlertFail(
            "Las fechas para el proceso de registro de calificaciones, deben ser configuradas solo si ya existen fechas para cancelaciones excepcionales, por favor siga el siguiente orden de asignación: Planificación --> Matrícula --> Cancelaciones --> Calificaciones."
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
      guardarFechaCalificaciones,
      onSubmit,
      obtenerProcesos,
    };
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Rubik:wght@300;500&display=swap");
/* esto para el icono de calendario en chrome y edge */
input[type="date"]::-webkit-calendar-picker-indicator {
  filter: invert(1);
}
.labelWhite,
.inputWhite {
  color: white;
}
.enlace {
  color: white;
  text-decoration: none !important;
  font-size: 1.5rem;
}

.amarillo {
  color: #fbd411;
}

.encabezadoPlanificacion {
  background-color: #a92727;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}

.encabezadoPlanificacion v-col {
  flex: 1;
  text-align: center;
  padding: 10px 0;
}

.divBoton {
  width: 90%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 30px;
  align-items: center;
}

.botones {
  color: white;
  font-family: "Rubik";
  text-align: center;
  width: 50%;
}

.tarjeta {
  background-color: #282832;
  color: white;
  font-family: "Rubik";
  border-radius: 0px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  align-content: center;
}

.linea {
  border-left: 1px solid white; /* Cambia el color y el grosor según sea necesario */
  /* Ajusta la altura de la línea según tus necesidades */
  /* Margen opcional para separar la línea de otros elementos */
}
</style>
