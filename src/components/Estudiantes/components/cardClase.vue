<template>
  <v-col cols="6">
    <v-form>
      <v-card
        class="mx-auto text mb-3 pb-2"
        max-width="310"
        :height="card.altura"
        color="#77181E"
        rounded="xl"
      >
        <v-img :src="card.src" width="310" height="130" cover></v-img>

        <v-row>
          <v-col>
            <v-card-title
              class="multiline-text align-center d-flex flex-column"
            >
              {{ card.nombre }}
            </v-card-title>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="info"> HI: {{ card.horaInicio }}</v-col>
          <v-col class="info"> {{ card.dias }}</v-col>
        </v-row>
        <v-row>
          <v-col class="info"> HF:{{ card.horaFin }}</v-col>
          <v-col class="info"> Sección: {{ card.seccion }}</v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-card-actions class="d-flex flex-column">
              <v-btn
                type="submit"
                color="white"
                variant="flat"
                rounded="xl"
                class="buttom"
                @click="mostrarForm(card.nombre, card.catedratico)"
              >
                Evaluar Docente
              </v-btn>
            </v-card-actions>
          </v-col>
        </v-row>
      </v-card>
    </v-form>
  </v-col>
</template>
<script>
export default {
  props: ["card"],
  setup(props, { emit }) {
    const mostrarForm = (nombre,catedratico) => {
      emit("mostrar-form", { nombre, catedratico });
    };
    return {
      mostrarForm,
    };
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Rubik:wght@300;500&display=swap");

.info {
  border: solid 2px;
  border-color: azure;
  display: flex;
  justify-content: center;
}
.text {
  font-family: "Rubik";
}
.multiline-text {
  white-space: normal;
  text-align: center;
}

.subrayadoNo {
  text-decoration: none;
  color: black;
}
.buttom {
  padding: 10px 20px;
}
.text {
  font-family: "Rubik";
}
</style>
