
  <template >
        <v-card class="contenidoNav" max-width="200" 
        >
      <v-layout >
        <v-app-bar color="#282832" density="compact">
          <v-app-bar-title >{{ title}}</v-app-bar-title>
  
          <template v-slot:append>
            <router-link to="/perfilEstudiante" active-class="amarillo" class="enlace">
              <p class="nombreUser">Paco Mariachi</p>
              <div class="ImgUser"></div>  
            </router-link>
          </template>
        </v-app-bar>
      </v-layout>
    </v-card>
  </template>
  
  <script>
  export default {
    props:{title:String,
    datos:Object
  },
    setup(){

    }
  }
  </script>
  
  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@300;800&display=swap');

  .enlace{
  padding: left 2px, !important;
  color: white;
  text-decoration: none !important;
  display: flex;
  flex-wrap: nowrap;
}

.amarillo{
  color: #FBD411;
}
.contenidoNav{
    width: 50%;
}
  .v-app-bar-title{
    font-size: 30px;
    font-family: 'Rubik', sans-serif;
    color: white;
  }
  .ImgUser{
    background-size: cover; 
  background-position: center; 
    background-image: url("../assets/usuarioPic.png");
    width: 38.5px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
  }
  
  .nombreUser{
    font-family: 'Rubik', sans-serif;
    margin-right: 30px;
    padding-top: 6px;
    color: white;
  }
  </style>