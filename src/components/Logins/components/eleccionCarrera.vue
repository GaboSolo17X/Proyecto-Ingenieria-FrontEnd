<!--
  <template>
  <v-form @submit.prevent="onSubmit" style="background-color:#77181E">
    <v-card
      class="mx-auto, tarjeta"
      width="40%">
    <div class="titulo">
        ¡Felicidades!, usted ha sido admitido en ambas carreras, por favor escoja una:
    </div>
    <div class="archivo">
        <div class="divBoton">
            <div class="botonIzquierda" >
              <v-btn block rounded="xl" class="botones" style="background-color: #A92727; margin-top: 0px;" 
              >Ingeniería Aeroespacial</v-btn>
            </div>
          <div class="botonDerecha">
            <v-btn block rounded="xl" class="botones" style="background-color: #A92727;margin-bottom: 40px;" 
            >Licenciatura en Periodismo</v-btn>
          </div>
        </div>
    </div>


</v-card>
  </v-form>

  </template>
-->
<template>
  <v-dialog width="500">
  <template v-slot:default="{ isActive }">
    <v-card title="Dialog">
      <v-card-text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn
          text="Close Dialog"
          @click="isActive.value = false"
        ></v-btn>
      </v-card-actions>
    </v-card>
  </template>
</v-dialog>
</template>

<script>
  export default {
    setup(){

      const showAlertSuccess = () => {
      window.alert('Se ha realizado correctamente el proceso de selección');
      window.location.reload();//recarga la pagina una vez se valida el form y se da clic en guardar
      };

        const onSubmit = async ()=>{
          showAlertSuccess();
        }
      return{
        onSubmit
      }
    }
}



</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Rubik:wght@300;500&display=swap');
.divBoton{
  width: 70%;
  margin-left: 15%;
}
.botones {
  color: white;
  font-family: 'Rubik';
  text-align: center;
  margin: 20px 0;
  margin-left: 10px;
}

.titulo {
  color: white;
  font-family: 'Rubik';
  font-size: 30px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 30px;
}

.archivo {
  width: 90%;
  margin-left: -20px;
}

.tarjeta {
  background-color: #282832;
  color: white;
  font-family: 'Rubik';
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-left: 30%;
}
</style>
