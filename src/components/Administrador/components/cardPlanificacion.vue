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
  isAfter,
} from "date-fns";

export default {
  setup() {
    const form = ref({
      fechaInicio: null,
      fechaFin: null,
    });
    const isFormValid = ref(false);

    const fechaInicioProcesoPlanificacion = ref(null);
    const fechaFinProcesoPlanificacion = ref(null);

    const validateForm = () => {
      if (form.value.fechaInicio && form.value.fechaFin) {
        isFormValid.value = true;
      } else {
        isFormValid.value = false;
        window.alert(
          "Por favor seleccione las fechas de planificación académica"
        );
      }
    };

    const showAlertSuccess = () => {
      window.alert("Se han guardado las fechas de planificación exitosamente.");
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
        guardarFechaPlanificacion();
      }
    };

    // Función para enviar fechas de planificacion
    const guardarFechaPlanificacion = async () => {
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
          // window.location.reload();
          limpiarInputs();
        } else {
          //2. condición de que escoja fechas posteriores a la fecha del sistema
          if (
            isBefore(parseISO(fechaInicio.value), new Date()) ||
            parseISO(fechaInicio.value) === new Date()
          ) {
            showAlertFail(
              "La fecha de Inicio de planificación académica no puede asignarse a días anteriores a la fecha actual: " +
                new Date() +
                "Por favor escoja un rango de fechas de dos semanas posteriores al día de hoy."
            );
            limpiarInputs();
          } else {
            //3. condicion de rango de 2 semanas
            const rangoDias = calcularRangoDias(
              fechaInicio.value,
              fechaFin.value
            );
            if (rangoDias > 14 || rangoDias < 14) {
              showAlertFail(
                "El rango de fechas seleccionado para el proceso de planificación académica debe tener estrictamente 14 días, " +
                  " rango actual seleccionado: " +
                  rangoDias +
                  " días"
              );
              limpiarInputs();
            } else {
              //4. evaluar si ya hay una fecha existente y mostrar alerta
              console.log(fechaFinProcesoPlanificacion.value)
              console.log(fechaInicioProcesoPlanificacion.value)
              if (fechaInicioProcesoPlanificacion.value!== null && fechaFinProcesoPlanificacion.value!==null) {
                let resultado = window.confirm("Ya existe un rango de fechas para el proceso de Planificación académica, "+
                "si continua se reestablecerá la fecha de la planificación y tendrá que establecer nuevamente las fechas para "+
                "los procesos de matrícula, cancelaciones excepcionales y registro de calificaciones.");
                if (resultado) {//api de reseteo
                  const res = await fetch ("http://localhost:3000/administrador/actualizarSolicitudPlanificacion",
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      fechaInicio: fechaInicio.value,
                      fechaFin: fechaFin.value,
                      idProceso: 4,
                    }),
                  } 
                  ).then( limpiarInputs () ).finally(showAlertSuccess());
                } else { // no hace nada si presiona cancelar
                  limpiarInputs();
                }
              } else {
                //guardado de fecha por default
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
                      idProceso: 4,
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
      } catch (error) {
        console.log(error);
      }
    };

    const calcularRangoDias = (inicio, fin) => {
      const inicia = parseISO(inicio);
      const termina = parseISO(fin);
      const diffDays = differenceInDays(termina, inicia);
      return Math.abs(diffDays) + 1; // +1 para incluir el día de inicio en el rango
    };

    //aca estoy obteniendo la fecha de planificación para evaluar si ya hay una fecha asignada en caso de que quiera modificarla el admin
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
          if (estadoProcesos[i].idProceso == 4) {
            fechaInicioProcesoPlanificacion.value =
              estadoProcesos[i].fechaInicioDelProceso;
            fechaFinProcesoPlanificacion.value =
              estadoProcesos[i].fechaFinDelProceso;
          }
        }
        console.log(
          "fecha de planificacion inicio: " +
            fechaInicioProcesoPlanificacion.value
        );
        console.log(
          "fecha de planificacion fin: " + fechaFinProcesoPlanificacion.value
        );
      } catch (error) {
        console.log(error);
      }
    };

    const limpiarInputs = () => {
      form.value.fechaInicio = null;
      form.value.fechaFin = null;
    };

    onMounted(() => {
      obtenerProcesos();
    });

    return {
      form,
      guardarFechaPlanificacion,
      onSubmit,
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
