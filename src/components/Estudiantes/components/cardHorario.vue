<template>
  <v-card class="mx-15 mb-5" elevation="1" width="300" height="365">
    <v-row>
      <v-col style="text-align: center">
        <h3 class="py-5 font-weight-black titulo">{{ clase.nombreClase }}</h3>
      </v-col>
    </v-row>

    <v-card-text>
      Aula: {{ clase.aula }} <br />
      Edificio: {{ clase.edificio }} <br />
      Dias: {{ clase.dias }} <br />
      Horas: {{ clase.horaInicial }} - {{ clase.horaFinal }}
    </v-card-text>

    <v-card-text>
      <!-- emergente de docente -->
      <v-dialog width="500">
        <template v-slot:activator="{ props }">
          <v-btn
            block
            class="text-none"
            color="grey-lighten-5"
            size="x-large"
            variant="flat"
            v-bind="props"
            text="Ver docente"
            @click="verDocente(clase.idSeccion)"
          >
          </v-btn>
        </template>

        <template v-slot:default="{ isActive }">
          <v-card>
            <v-row>
              <v-col class="Intro my-3"><h2>INTRODUCCION A LA CLASE</h2></v-col>
            </v-row>

           <hr>
            <v-card-text class="py-0 pt-5">
              <v-row>
                <v-col cols="4"
                  ><v-img
                    class="fotoDocente"
                    cover
                    height="120"
                    width="120"
                    :src="'http://localhost:3000/' + infoDocente.fotoDocente"
                  ></v-img
                ></v-col>
                <v-col class="nombre"
                  ><h2 class="nameDocente">{{ infoDocente.nombre }}</h2></v-col
                >
              </v-row>
              <!-- <v-row class="mb-5"></v-row> -->
              <!-- <v-row>
                <v-col cols="3">
                  
                </v-col>
              </v-row> -->
            </v-card-text>
            <v-card-text>
              <iframe
                width="450"
                height="250"
                :src="infoDocente.videoSeccion"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
              ></iframe>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn text="Cerrar" @click="isActive.value = false"></v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>

      <v-btn
        block
        class="text-none"
        color="grey-darken-4"
        size="x-large"
        variant="flat"
        @click="cancelarMatricula(clase.idSeccion)"
      >
        Cancelar
      </v-btn>
    </v-card-text>
  </v-card>
</template>
<script>
import { ref, onMounted } from "vue";
export default {
  name: "clase",
  props: ["clase"],
  setup() {
    const infoDocente = ref([]);
    const estudiante = ref();
    const estudianteEs = async () => {
      estudiante.value = JSON.parse(localStorage.getItem("Estudiante"));
    };

    const cancelarMatricula = async (idSeccion) => {
      console.log(idSeccion);
      try {
        const res = await fetch(
          " http://localhost:3000/estudiante/deleteMatricula",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              cuenta: estudiante.value.numeroCuenta,
              idseccion: idSeccion,
            }),
          }
        );
        const data = await res.json();
        console.log(data);
        window.alert("Se ha eliminado la clase");
        window.location.reload();
      } catch (error) {
        console.error("Error al cancelar la sección", error);
      }
    };

    const verDocente = async (id) => {
      try {
        const res = await fetch(
          "http://localhost:3000/estudiante/getInfoSeccion",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              idSeccion: id,
            }),
          }
        );
        const data = await res.json();
        console.log(data);
        console.log(id);
        infoDocente.value = data.infoDocenteSeccion;
        console.log(infoDocente);
      } catch (error) {
        console.error("Error al cargar el docente", error);
      }
    };

    onMounted(() => {
      estudianteEs();
    });

    return {
      cancelarMatricula,
      verDocente,
      infoDocente,
    };
  },
};
</script>
<style scoped>
.nombre {
  display: flex;
  align-items: center;
}
.fotoDocente {
  border-radius: 50%;
}
.nameDocente {
  text-align: left;
}
.Intro {
  text-align: center;
  color: #fbd411;
}
.v-btn {
  border-radius: 30px;
  margin-bottom: 10px;
}
.v-card {
  border-radius: 30px;
  background-color: #77181e;
  color: white;
}
.titulo {
  color: #fbd411;
}
</style>
