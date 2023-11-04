<template>
    <v-card v-show="isCardSubidaVisible"
      class="mx-auto, tarjeta"
      width="90%">
    <div class="titulo">
        Seleccione su archivo .csv para 
        hacer el cargado de los resultados 
           de las pruebas de admisión.
    </div>
    <div class="archivo">
      <form @submit.prevent="onSubmit">
          <v-file-input
            v-model="form.csv"
            :rules="[(v) => !!v || 'Campo Vacio', (v) => true]"
            append-inner-icon="fa:fas fa-solid fa-file"
            bg-color="white"
            accept="image/png, image/jpeg, image/bmp"
            placeholder="'Subir archivo'"
            label="seleccione aquí"
          ></v-file-input>
          
            <div class="divBoton">
              <v-btn 
                block rounded="xl" 
                type="submit" 
                class="botones" >
                Subir
              </v-btn>
          </div>
      </form>
    </div>
</v-card>

<CardExito v-show="isCardExitoVisible"/>

</template>

<script>
import {ref} from 'vue';
import CardExito from '../components/cardExito.vue'

export default{
components:{CardExito},

  setup(){
    const form=ref({
      csv: null
    })
    const isCardSubidaVisible=ref(true)
    const isCardExitoVisible=ref(false)
    const showCardEx =()=>{
      isCardExitoVisible.value =true;
      isCardSubidaVisible.value=false;
    };

    return{
      form,
      isCardExitoVisible,
      isCardSubidaVisible,
      onSubmit: async()=>{
        showCardEx()
      },
    }
  }
}
</script>

<style scoped>


@import url('https://fonts.googleapis.com/css2?family=Rubik:wght@300;500&display=swap');

.divBoton{
    width: 90%; 
    display: flex;
    flex-direction: column;
    justify-content: center; 
    margin: 30px;
    align-items: center;
}
.botones{
    background-color: #77181E;
    color: white;
    font-family: 'Rubik';
    text-align: center;
    width: 200px;
}
.titulo{
    color: white;
  font-family: 'Rubik';
  font-size: 30px;
  text-align: center; /* Agrega esta propiedad para centrar horizontalmente */
  display: flex;
  flex-direction: column;
  justify-content: center; /* Elimina align-content y align-items */
  margin: 30px;
}

.archivo{
    width: 90%;
    margin-left: -20px;
}
.tarjeta{
    background-color: #282832;
    color: white;
    font-family: 'Rubik';
    border-radius: 15px;
    display: flex;
	flex-direction: column;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;
	align-content: center;
}
</style>