<template>
  <div>
    <v-card class="form">
      <v-row>
        <v-col>
          <v-subheader class="font-weight-bold"
            >Asignatura seleccionada: {{$route.params.asignatura}}</v-subheader
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
          <v-subheader class="font-weight-bold ">Edificio:</v-subheader>
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
          <v-subheader class="font-weight-bold " >Aula:</v-subheader>
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
          <v-subheader class="font-weight-bold ">Hora final:</v-subheader>
        </v-col>
        <v-col>
          <v-select
            v-model="selectedEndHour"
            :items="hours"
            variant="solo"
            rounded
            label="Final"
            :rules="[(v) => !!v || 'Seleccione la hora final']"
          ></v-select>
        </v-col>
      </v-row>

      <!-- Class Information -->
      <v-row>
        <v-col>
          <v-subheader class="font-weight-bold">UV:</v-subheader>
        </v-col>
      </v-row>

      <v-row>
        <v-col class="subhead">
          <v-subheader class="font-weight-bold">Dias:</v-subheader>
        </v-col>
        <v-col v-for="(day, index) in days" :key="index">
          <v-checkbox v-model="selectedDays[index]" :label="day"></v-checkbox>
        </v-col>
      </v-row>

      <v-row>
        <v-col class="subhead">
          <v-subheader class="font-weight-bold ">Cupos:</v-subheader>
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
      <v-row >
        <v-col>
          <v-btn @click="crearSeccion" class="crear" >Crear sección</v-btn>
        </v-col>
        <v-col>
          <v-btn @click="cancelarSeccion" class="cancelar">Cancelar</v-btn>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
  export default {
    props: ['asignatura'],
    data() {
      return {
        className: 'Clase seleccionada',
        teachers: ['Weslin Barahona', 'Gabriel Solorzano', 'Yensi Armijo'],
        buildings: ['B2', 'B1'],
        classrooms: ['401', '402', '401'],
        hours: ['08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM'],
        days: ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
        selectedTeacher: null,
        selectedBuilding: null,
        selectedClassroom: null,
        selectedStartHour: null,
        selectedEndHour: null,
        selectedDays: [false, false, false, false, false, false],
        numberOfStudents: null,
      }
    },
    methods: {
      crearSeccion() {
        window.alert('Seccion creada')
      },
      cancelarSeccion() {
        window.alert('Aqui nunca hubo una seccion')
        this.$router.push('/asignaturas');
      },
    },
  }
</script>

<style scoped>
  .form {
    border-radius: 30px;
    background-color: #dee7e7;
    padding: 20px;
  }

  .crear{
    background-color: goldenrod;
    border-radius: 30px;
    box-shadow: none;
    height: 40px;
    margin-left: 50%;
    color: white;
  }
  .cancelar{
    background-color: #A92727;
    border-radius: 30px;
    box-shadow: none;
    height: 40px;
    color: white;
  }
  .subhead{
    padding-top: 2rem;
    max-width: 8rem;
  }

  .v-select{
    width: 70%;
  }

  .cupos{
    width: 30%;
  }

</style>
