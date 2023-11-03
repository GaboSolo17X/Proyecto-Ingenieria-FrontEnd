<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-card class="mx-auto" max-width="800" height="500px" variant="flat">
        <v-card-item>
          <div class="text-overline">
            Muy bien preparate para tus examenes:
            <div>PAA</div>
            <div>{{ mensaje }}</div>
          </div>
        </v-card-item>
        <v-card-item>
          <v-row align="center" justify="center" class="ma-0">
            <v-img src="../assets/study.png" height="200px" width="250px"></v-img>
            <v-img src="../assets/study2.png" height="200px" width="250px"></v-img>
          </v-row>
        </v-card-item>

      </v-card>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    mensaje: String,
  },
};
</script>

<style scoped>
.v-card {
  width: 1000px;
  height: 350px;
  font-family: "Rubik", sans-serif;
  background-color: transparent;
}

.text-overline {
  font-size: 2.5rem !important;
  font-weight: 800;
  line-height: 2rem;
  letter-spacing: 0.1666666667em !important;
  font-family: "Rubik", sans-serif !important;
  text-transform: uppercase !important;
  text-align: center;
  color: #282832;
  margin-bottom: 150px;
  height: 100px;
  line-height: 50px;
}

.v-card-actions {
  display: flex;
  flex: none;
  width: 100%;
  padding: 0.5rem;
  justify-content: center;
}
</style>
