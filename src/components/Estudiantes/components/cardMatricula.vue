<template>
  <v-card class="mx-auto my-12" max-width="280" max-height="500" height="430">
    <template v-slot:loader="{ isActive }">
      <v-progress-linear
        :active="isActive"
        color="deep-purple"
        height="4"
        indeterminate
      ></v-progress-linear>
    </template>
    <!-- <v-avatar>
                <v-img
                   :src="'http://localhost:3030/'+clase.foto"
                   alt="John"
                 ></v-img>
              </v-avatar>  -->
    <v-img
      :src="'http://localhost:3030/' + clase.foto"
      class="imagen mt-5"
      width="120"
      height="120"
      cover
    ></v-img>
    <v-row class="align-center d-flex flex-column" >
      <v-col >
        <v-card-item class="justify-center" style="text-align: justify">
          <v-card-title>{{ clase.nombre }}</v-card-title>
        </v-card-item>
      </v-col>
    </v-row>

    <v-card-text>
      <v-row align="center" class="mx-0"> </v-row>

      <div class="my-2 text-subtitle-1 gestion">
        {{ clase.docente }}
      </div>
    </v-card-text>

    <v-divider class="mx-4 mb-1"></v-divider>

    <div class="px-3 text-center">
      <v-chip-group label variant="outlined">
        <v-chip label
          >Seccion <br />
          {{ clase.nombreSeccion }}</v-chip
        >

        <v-chip label
          >Dias <br />
          {{ clase.dias }}</v-chip
        >

        <v-chip label
          >Cupos <br />
          {{ clase.cupos }}
        </v-chip>

        <v-chip label
          >UV <br />
          {{ clase.uv }}
        </v-chip>
      </v-chip-group>
    </div>
    <v-divider class="mx-4 mb-1"></v-divider>

    <v-card-actions class="justify-center">
      <v-col cols="auto">
        <v-dialog transition="dialog-top-transition" width="auto">
          <template v-slot:activator="{ props }">
            <v-btn
              color="grey-darken-4"
              v-bind="props"
              @click="matricularClase(clase.idAsignatura, clase.idSeccion)"
              >Matricular</v-btn
            >
          </template>
          <template v-slot:default="{ isActive }">
            <v-card>
              <v-toolbar
                color="grey-darken-4"
                title="Registro UNAH"
              ></v-toolbar>
              <v-card-text>
                <div class="text-h2 pa-6">¡Clase matriculada con exito!</div>
              </v-card-text>
              <v-card-actions class="justify-end">
                <v-btn
                  color="grey-darken-4"
                  variant="text"
                  @click="isActive.value = false"
                  >Cerrar</v-btn
                >
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
      </v-col>
    </v-card-actions>
  </v-card>
</template>
<script>
import { ref, onMounted } from "vue";
export default {
  name: "clase",
  props: ["clase"],
  setup() {
    const estudiante = ref();
    const estudianteEs = async () => {
      console.log("El estudiante es");
      estudiante.value = JSON.parse(localStorage.getItem("Estudiante"));
    };
    onMounted(() => {
      estudianteEs();
    });

    const matricularClase = async (idAsignatura, idSeccion) => {
      console.log("Asignatura " + idAsignatura);
      console.log("Seccion " + idSeccion);

      try {
        const res = await fetch(
          "http://localhost:3030/estudiante/createMatricula",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              cuenta: estudiante.value.numeroCuenta,
              idClase: idAsignatura,
              idseccion: idSeccion,
            }),
          }
        );
        const data = await res.json();
        console.log(data);
      } catch (error) {
        console.error("Error al crear la matrícula", error);
      }
    };

    return {
      matricularClase,
    };
  },
};
</script>

<style scoped>
.v-chip {
  height: auto !important;
  text-align: center;
}

.v-card {
  background-color: #77181e;
  border-radius: 30px;
  color: white;
}

.v-btn {
  background-color: white;
  border-radius: 30px;
  width: 120px;
}

.v-card-item + .v-card-text {
  padding-bottom: 0;
  text-align: center;
}

.v-img {
  margin-left: 70px;
}

.imagen {
  border-radius: 50%;
}
</style>
