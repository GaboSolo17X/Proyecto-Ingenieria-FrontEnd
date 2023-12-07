<template>
  <v-card class="mx-4 mb-5" elevation="1" width="260" height="305">
    <v-row>
      <v-col style="text-align: center;">
        <h4 class="py-4 px-1 font-weight-black titulo">{{ clase.nombreClase }}</h4>
      </v-col>
    </v-row>


    <v-card-text>
      Aula: {{ clase.Aula }} <br />
      Edificio: {{ clase.Edificio }} <br />
      Dias: {{ clase.Dias }} <br />
      Horas: {{ clase.HoraInicio }} - {{ clase.HoraFinal }}  <br />
      <!-- Posición: hola  -->
    </v-card-text>
    <v-card-text class="espera">
    Asignatura en lista de espera
      </v-card-text>
    <v-divider></v-divider>

   <v-dialog width="500">
      <template v-slot:activator="{ props }">
        <v-btn
          class="text-none"
          color="grey-darken-4"
          size="large"
          variant="flat" 
          v-bind="props" 
          text="Cancelar"
          @click="cancelarListaEspera(clase.idListaEspera)"> </v-btn>
      </template>

      <template v-slot:default="{ isActive }">
        <v-card>
          <v-card-text>
          <h3>Clase eliminada de la lista de espera</h3>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn text="Cerrar" @click="isActive.value = false; recargado()"></v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </v-card>
</template>
<script>
export default ({
  name: 'clase',
  props: ['clase'],
  setup(){
    const cancelarListaEspera = async (id) => {
      console.log(id);
      try {
        const res = await fetch(
          "  http://localhost:3000/estudiante/deleteListaEspera",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              idListaEspera: id,
            }),
          }
        );
        const data = await res.json();
        console.log(data);
        // window.location.reload();
      } catch (error) {
        console.error("Error al cancelar la lista de espera ", error);
      }
    };

    const recargado =()=>{
      window.location.reload();
    }
    return{
      cancelarListaEspera,
      recargado,
    }
  }
})
</script>
<style scoped>
.v-btn {
  border-radius: 30px;
  margin-bottom: 10px;
  margin-top: 10px;
  margin-left: 5em;
}

.v-card {
  border-radius: 30px;
  background-color: #77181e;
  color: white;
}

.titulo {
  color: #FBD411;
}

.espera{
    text-align: center;
    font-weight: bold;
}
</style>