<template>
  <v-container>
    <v-row align="center" justify="center">
        <v-card
          class="mx-auto"
          max-width="800"
          variant="flat"
        >
          <v-card-item>
              <div class="text-overline ">
                ¿Quieres formar parte de esta gran comunidad universitaria?
              </div>
          </v-card-item>

          <v-card-actions>
            <router-link to="/formulario">
              <v-btn class="btn" rounded>
              Inscribite Aquí
            </v-btn>
            </router-link>
          </v-card-actions>
        </v-card>

    </v-row>
  </v-container>


</template>

<script>
export default {

}
</script>

<style scoped>
.v-card{
    width: 1000px;    
    height: 350px;
    font-family: 'Rubik', sans-serif;
    background-color: transparent;
}
.text-overline {
    font-size: 2.5rem !important;
    font-weight: 800;
    line-height: 2rem;
    letter-spacing: 0.1666666667em !important;
    font-family: 'Rubik', sans-serif !important;
    text-transform: uppercase !important;
    text-align: center;
    color: #77181E;
    margin-bottom: 150px;
    height: 100px;
    line-height: 50px;
}

.btn{
    background-color: #77181E;
    color: white;
    width: 300px;
    font-weight: 800;
    height: 60px;
    font-size: 1.1rem;
}

.v-card-actions {
    display: flex;
    flex: none;
    width: 100%;
    padding: 0.5rem;
    justify-content: center;
}

</style>