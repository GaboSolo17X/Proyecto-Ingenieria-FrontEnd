<template>
  <div>
    <v-card class="form">
      <v-row>
        <v-col>
          <v-subheader class="font-weight-bold"
            >Asignatura seleccionada:
            {{ $route.params.asignatura }}</v-subheader
          >
        </v-col>
      </v-row>

      <v-row>
        <v-col class="subhead">
          <v-subheader class="font-weight-bold">Docente:</v-subheader>
        </v-col>
        <v-col>
          <v-select
            v-model="selectedTeacher"
            :items="teachers"
            label="Elegir docente"
            variant="solo"
            rounded
            :rules="[(v) => !!v || 'Seleccione un docente']"
          ></v-select>
        </v-col>
      </v-row>

      <v-row>
        <v-col class="subhead">
          <v-subheader class="font-weight-bold">Edificio:</v-subheader>
        </v-col>
        <v-col>
          <v-select
            v-model="selectedBuilding"
            :items="buildings"
            label="Edificios"
            variant="solo"
            rounded
            :rules="[(v) => !!v || 'Seleccione un edificio']"
          ></v-select>
        </v-col>
        <v-col class="subhead">
          <v-subheader class="font-weight-bold">Aula:</v-subheader>
        </v-col>
        <v-col>
          <v-select
            v-model="selectedClassroom"
            :items="classrooms"
            label="Aulas"
            variant="solo"
            rounded
            :rules="[(v) => !!v || 'Seleccione un aula']"
          ></v-select>
        </v-col>
        <v-col class="subhead">
          <v-subheader class="font-weight-bold">UV: {{ this.uv }}</v-subheader>
        </v-col>
      </v-row>

      <!-- Class Information -->

      <v-row>
        <v-col class="subhead">
          <v-subheader class="font-weight-bold">Días:</v-subheader>
        </v-col>
        <v-col class="dias">
          <div class="days-container">
            <div v-for="(day, index) in days" :key="index" class="day">
              <input
                type="checkbox"
                :id="'day' + index"
                v-model="selectedDays[index]"
                class="custom-checkbox"
              />
              <label :for="'day' + index" class="custom-label">{{ day }}</label>
            </div>
          </div>
        </v-col>
      </v-row>

      <v-row>
        <v-col class="subhead">
          <v-subheader class="font-weight-bold">Hora Inicial:</v-subheader>
        </v-col>
        <v-col>
          <v-select
            v-model="selectedStartHour"
            :items="hours"
            label="Inicio"
            variant="solo"
            rounded
            :rules="[(v) => !!v || 'Seleccione la hora inicial']"
          ></v-select>
        </v-col>
        <v-col class="subhead">
          <v-subheader class="font-weight-bold">Hora final:</v-subheader>
        </v-col>
        <v-col>
          <v-select
            v-model="selectedEndHour"
            :items="finalHours"
            variant="solo"
            rounded
            label="Final"
            :rules="[(v) => !!v || 'Seleccione la hora final']"
          ></v-select>
        </v-col>
      </v-row>

      <v-row>
        <v-col class="subhead">
          <v-subheader class="font-weight-bold">Cupos:</v-subheader>
        </v-col>
        <v-col>
          <v-text-field
            v-model="numberOfStudents"
            label="Cupos seccion"
            type="number"
            variant="solo"
            rounded
            class="cupos"
          ></v-text-field>
        </v-col>
      </v-row>

      <!-- Buttons -->
      <v-row>
        <v-col>
          <v-btn @click="crearSeccion" class="crear">Crear sección</v-btn>
        </v-col>
        <v-col>
          <v-btn @click="cancelarSeccion" class="cancelar">Cancelar</v-btn>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import _ from "lodash";
export default {
  props: {
    asignatura: String,
    uv: Number,
  },

  data() {
    return {
      className: "Clase seleccionada",
      teachers: [],
      buildings: [],
      classrooms: [],
      hours: [],
      finalHours: [],
      days: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
      selectedTeacher: null,
      selectedBuilding: null,
      selectedClassroom: null,
      selectedStartHour: null,
      selectedEndHour: null,
      selectedDays: [false, false, false, false, false, false, false],
      numberOfStudents: null,
      asignaturas: [
        "Arquitectura",
        "Derecho",
        "Psicologia",
        "Medicina",
        "Ingenieria en Sistemas",
      ],
    };
  },
  watch: {
    selectedTeacher: function (newVal, oldVal) {
      this.buildings = [];
      this.selectedBuilding = null;
      this.obtenerEdificios();
    },
    selectedBuilding: function (newVal, oldVal) {
      if (newVal == null) {
        this.selectedClassroom = null;
        this.classrooms = [];
      } else {
        this.selectedClassroom = null;
        this.classrooms = [];
        this.obtenerAulas(newVal);
      }
    },
    selectedClassroom: function (newVal, oldVal) {
      if (newVal == null) {
        this.selectedDays = [false, false, false, false, false, false, false];
        this.selectedStartHour = null;
        this.selectedEndHour = null;
        this.hours = [];
        this.finalHours = [];
      } else {
        this.selectedDays = [false, false, false, false, false, false, false];
        this.selectedStartHour = null;
        this.selectedEndHour = null;
        this.hours = [];
        this.finalHours = [];
      }
    },
    selectedDays: {
      //poner un retrazo de 1 segundo para que no se haga la peticion cada vez que se cambia un dia
      handler: _.debounce(function (newVal, oldVal) {
        let contador2 = 0;
        for (let index = 0; index < newVal.length; index++) {
          if (newVal[index] == true) {
            contador2++;
          }
        }
        if (contador2 > 0) {
          if (
            this.selectedTeacher == null &&
            this.selectedClassroom == null &&
            this.selectedBuilding == null
          ) {
            alert(
              "Elija primero el docente, el edificio y el aula para poder elegir los días"
            );
            this.isUpdatingSelectedDays = true;
            this.selectedDays = [
              false,
              false,
              false,
              false,
              false,
              false,
              false,
            ];
          } else {
            let contador = 0;
            for (let index = 0; index < newVal.length; index++) {
              if (newVal[index] == true) {
                contador++;
              }
            }

            if (contador !== 0) {
              if (contador > this.uv) {
                window.alert(
                  "No puedes elegir más días que las unidades valorativas"
                );
                this.selectedDays = [
                  false,
                  false,
                  false,
                  false,
                  false,
                  false,
                  false,
                ];
                contador = 0;
              } else if (this.uv % contador !== 0) {
                window.alert(
                  "No se pueden repartir las horas completas en el número de días seleccionado"
                );
                this.selectedDays = [
                  false,
                  false,
                  false,
                  false,
                  false,
                  false,
                  false,
                ];
                contador = 0;
              } else {
                this.obtenerHorasDisponibles(
                  this.selectedTeacher,
                  this.selectedBuilding,
                  this.selectedClassroom,
                  newVal,
                  this.uv
                );
              }
            }
          }
        }
      }, 1000),
      deep: true,
    },
    selectedStartHour: function (newVal, oldVal) {
      if (newVal == null) {
      } else {
        let contador = 0;
        for (let index = 0; index < this.selectedDays.length; index++) {
          if (this.selectedDays[index] == true) {
            contador++;
          }
        }
        let horasNecesaras = Math.ceil(this.uv / contador) * 100;
        // La hora elegida cambiarla de formato '07:00' a 700 y luego sumarle las horas necesarias
        let horaElegida = parseInt(newVal.replace(":", ""));
        let horaFinal = horaElegida + horasNecesaras;
        //Ahora se debe convertir la hora de formato 700 a formato '07:00'
        let horaFinalString = horaFinal.toString();
        let horaFinalString2 = horaFinalString.slice(0, -2);
        let horaFinalString3 = horaFinalString.slice(-2);
        let horaFinalString4 = horaFinalString2 + ":" + horaFinalString3;
        if (horaFinalString4.length < 5) {
          horaFinalString4 = "0" + horaFinalString4;
        }
        this.selectedEndHour = horaFinalString4;
        let horasNecesaras2 = Math.ceil(this.uv / contador);

        if (horasNecesaras2 == 1) {
          // agregar la siguiente hora que sigue despues del valor del newVal al array hours Ejemplo si elijo 07:00 agregar 08:00
          let indice2 = this.hours.indexOf(newVal);
          let horaIntroducir = horaElegida + 100;
          let horaIntroducirString = horaIntroducir.toString();
          let horaIntroducirString2 = horaIntroducirString.slice(0, -2);
          let horaIntroducirString3 = horaIntroducirString.slice(-2);
          let horaIntroducirString4 =
            horaIntroducirString2 + ":" + horaIntroducirString3;
          if (horaIntroducirString4.length < 5) {
            horaIntroducirString4 = "0" + horaIntroducirString4;
          }

          let indiceHoraIntroducir = this.hours.indexOf(horaIntroducirString4);
          if (indiceHoraIntroducir == -1) {
            let newHours = [...this.hours];
            newHours.splice(indice2 + 1, 0, horaIntroducirString4);
            this.finalHours = newHours;
          } else {
            this.finalHours = this.hours;
          }
        } else {
          this.finalHours = this.hours;
        }
      }
    },
    selectedEndHour: function (newVal, oldVal) {
      if (newVal == null) {
      } else {
        let horasCompletas = [
          "07:00",
          "08:00",
          "09:00",
          "10:00",
          "11:00",
          "12:00",
          "13:00",
          "14:00",
          "15:00",
          "16:00",
          "17:00",
          "18:00",
          "19:00",
        ];
        console.log(newVal);

        let horaElegida = parseInt(newVal.replace(":", ""));
        if (horaElegida > 2000) {
          window.alert("La hora final no puede ser mayor a las 20:00");
          this.selectedEndHour = null;
          this.selectedStartHour = null;
        }
        //Aqui se obtienen las horas entre la hora inicial y la hora final
        let horas = this.finalHours;
        let indiceFinal = horas.indexOf(newVal);
        let horasEntre = horas.slice(0, indiceFinal + 1);
        horasEntre.unshift(this.selectedStartHour);

        // Entraer un subconjunto de horas entre el inicio y el final pero del array de horas completas
        let indiceInicio = horasCompletas.indexOf(this.selectedStartHour);
        let indiceFinal2 = horasCompletas.indexOf(newVal);
        let horasEntre2 = horasCompletas.slice(indiceInicio, indiceFinal2 + 1);

        // comprobar que horas no existen entre las horas completas y las horas entre
        let horasNoDisponibles = horasEntre2.filter(
          (hora) => !horasEntre.includes(hora)
        );

        // si existen horas no disponibles, entonces enviar una alerta de que hay un translape porque el docente ya tiene una clase a esa hora y limpiar el campo de hora final
        if (horasNoDisponibles.length > 0) {
          window.alert(
            "El docente ya tiene una clase entre su hora inicial y las horas necesarias correspondientes a las unidades valorativas y la selección de días"
          );
          this.selectedEndHour = null;
          this.selectedStartHour = null;
        }
      }
    },
  },
  methods: {
    async crearSeccion() {
      if (
        this.selectedTeacher == null ||
        this.selectedBuilding == null ||
        this.selectedClassroom == null ||
        this.selectedStartHour == null ||
        this.selectedEndHour == null ||
        this.numberOfStudents == null ||
        this.selectedDays.length === 0 ||
        !this.selectedDays.some((day) => day === true)
      ) {
        window.alert("Por favor llene todos los campos");
      } else {
        const diasSeleccionados = this.days.filter(
          (day, index) => this.selectedDays[index]
        );
        let dias = "";
        for (let i = 0; i < diasSeleccionados.length; i++) {
          switch (diasSeleccionados[i]) {
            case "Lunes":
              dias += "Lu";
              break;
            case "Martes":
              dias += "Ma";
              break;
            case "Miércoles":
              dias += "Mi";
              break;
            case "Jueves":
              dias += "Ju";
              break;
            case "Viernes":
              dias += "Vi";
              break;
            case "Sábado":
              dias += "Sa";
              break;
          }
        }
        try {
          const res = await fetch(
            "http://localhost:3000/jefeDepartamento/crearSeccion",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                nombreDocente: this.selectedTeacher,
                edificio: this.selectedBuilding,
                aula: this.selectedClassroom,
                horaInicial: this.selectedStartHour,
                horaFinal: this.selectedEndHour,
                cupos: this.numberOfStudents,
                dias: dias,
                nombreAsignatura: this.$route.params.asignatura,
              }),
            }
          );
          const data = await res.json();
          if (res.status === 200) {
            window.alert("Seccion creada exitosamente");
            this.$router.push("/asignaturas");
          }
        } catch (error) {
          console.log(error);
        }
      }
    },
    cancelarSeccion() {
      this.$router.push("/asignaturas");
    },
    async obtenerEdificios() {
      const jefe = JSON.parse(window.localStorage.getItem("JefeDep"));
      try {
        const res = await fetch(
          "http://localhost:3000/jefeDepartamento/obtenerEdificios",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              numeroEmpleadoDocente: jefe.numeroEmpleadoDocente,
            }),
          }
        );
        const data = await res.json();
        const { edificiosFound } = data;
        for (let i = 0; i < edificiosFound.length; i++) {
          this.buildings.push(edificiosFound[i].nombreEdificio);
        }
      } catch (error) {
        console.log(error);
      }
    },

    async obtenerAulas(nombreEdificio) {
      this.classrooms = [];
      try {
        const res = await fetch(
          "http://localhost:3000/jefeDepartamento/obtenerAulas",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              nombreEdificio: nombreEdificio,
            }),
          }
        );
        const data = await res.json();
        const { aulasFound } = data;
        for (let i = 0; i < aulasFound.length; i++) {
          this.classrooms.push(aulasFound[i].numeroAula);
        }
      } catch (error) {
        console.log(error);
      }
    },
    async obtenerHorasDisponibles(docente, edificio, aula, dias, uv) {
      try {
        const res = await fetch(
          "http://localhost:3000/jefeDepartamento/obtenerHorasDisponibles",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              nombreDocente: docente,
              nombreEdificio: edificio,
              numeroAula: aula,
              dias: dias,
              uv: uv,
            }),
          }
        );
        const data = await res.json();
        console.log(data);
        const { horas } = data;
        this.hours = horas;
      } catch (error) {
        console.log(error);
      }
    },
  },
  async created() {
    const jefe = JSON.parse(window.localStorage.getItem("JefeDep"));

    // OBTENIENDO DOCENTES DEL DEPARTAMENTO
    try {
      const res = await fetch(
        "http://localhost:3000/jefeDepartamento/obtenerDocentesDepartamento",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            numeroEmpleadoDocente: jefe.numeroEmpleadoDocente,
          }),
        }
      );
      const data = await res.json();
      const { docenteFound } = data;
      for (let i = 0; i < docenteFound.length; i++) {
        this.teachers.push(
          docenteFound[i].nombres + " " + docenteFound[i].apellidos
        );
      }
    } catch (error) {
      console.log(error);
    }
  },
};
</script>

<style scoped>
.form {
  border-radius: 30px;
  background-color: #dee7e7;
  padding: 20px;
}

.crear {
  background-color: goldenrod;
  border-radius: 30px;
  box-shadow: none;
  height: 40px;
  margin-left: 50%;
  color: white;
}
.cancelar {
  background-color: #a92727;
  border-radius: 30px;
  box-shadow: none;
  height: 40px;
  color: white;
}
.subhead {
  padding-top: 2rem;
  max-width: 8rem;
}

.v-select {
  width: 70%;
}

.cupos {
  width: 30%;
}

.days-container {
  display: flex;
  justify-content: space-between;
}

.day {
  margin-right: 10px;
}

.custom-checkbox {
  position: absolute;
  opacity: 0;
  border-radius: 5px;
}

.custom-label {
  display: inline-block;
  position: relative;
  padding-left: 30px;
  cursor: pointer;
}

.custom-label::before {
  content: "";
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  border: 2px solid #2196f3;
  background-color: #fff;
  border-radius: 5px;
}

.custom-checkbox:checked + .custom-label::before {
  background-color: #2196f3;
  border: 2px solid #2196f3;
  border-radius: 5px;
}
.dias {
  display: flex;
  align-items: flex-end;
}
</style>
