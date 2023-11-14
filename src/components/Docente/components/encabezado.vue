
  <template >
        <v-card class="contenidoNav" max-width="200" >
      <v-layout >
        <v-app-bar density="compact">
          <v-app-bar-title >{{ title}}</v-app-bar-title>
  
          <template v-slot:append>
            <p class="nombreUser">{{ }}</p>
            <div class="ImgUser"></div>  
          </template>
        </v-app-bar>
      </v-layout>
    </v-card>
  </template>
  
  <script>
  export default {
    props:{title:String,
          datos:Object},
    setup(){

      console.log(datos)
    return{
    
    };
    }
  }
  </script>
  
  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@300;800&display=swap');

.v-app-bar{
  height: 60px;
  border-bottom: solid;
  border-bottom-color:  #77181E;
  box-shadow: none !important;
}

.contenidoNav{
    width: 50%;
}
  .v-app-bar-title{
    font-size: 30px;
    font-family: 'Rubik', sans-serif;
    color: #77181E;
    
  }
  .ImgUser{
    background-image: url("../assets/usuarioPic.png");
    width: 38.5px;
height: 40px;
border-radius: 360px;
margin-right: 10px;
  }
  
  .nombreUser{
    font-family: 'Rubik', sans-serif;
    margin-right: 30px;
    color: #77181E;
  }

  </style>