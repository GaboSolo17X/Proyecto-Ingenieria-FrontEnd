<template>
  <v-row class="text-center">
    <v-col>
      <v-btn>
        <router-link @click="regresar" to="/historialJefe" class="regresar">
          <v-icon right>
            <i class="fa:fas fa-solid fa-circle-left"></i>
          </v-icon>
          Regresar
        </router-link>
      </v-btn>
    </v-col>
  </v-row>
</template>
<script>
export default {
  methods: {
    regresar() {
      this.$router.back();
    },
  },
};
</script>
<style scoped>
.v-btn {
  background-color: #a92727;
  color: white;
  height: 45px;
  margin-top: 1rem;
}
.regresar {
  color: white;
  text-decoration: none;
}
</style>
