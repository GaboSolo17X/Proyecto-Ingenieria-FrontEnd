
<template>
    <v-card>
      <v-layout>
        <v-navigation-drawer :width=230
          class="menuLat"
          theme="dark"
          permanent
        >
          <v-list color="transparent">
            <div class="logo_center">
              <div class="logo"></div>
            </div>
            <h6  class="textoUNAH" >UNAH</h6>
            <hr>
            <div style="margin-top: 15px;" >
              <v-row>
                <v-col cols="4" class="iconoscenter">
                  <div class="iconos"><v-icon  icon="fa:fas fa-solid fa-house" ></v-icon></div>
                </v-col>
                <v-col>
                  <div >
                  <router-link to="/principalEstudiantes" active-class="amarillo" class="enlace"> 
                  <v-list-item   title="Inicio">
                  </v-list-item></router-link>
                  </div>
                  
                </v-col>
              </v-row>
            </div>
            <div >
              <v-row>
                <v-col cols="4"  class="iconoscenter">
                  <div class="iconos"><v-icon  icon="fa:fas fa-solid fa-comment" ></v-icon></div>
                </v-col>
                <v-col>
                  <div >
                  <router-link to="/" active-class="amarillo" class="enlace"> 
                  <v-list-item   title="Mis chats">
                  </v-list-item></router-link>
                  </div>
                  
                </v-col>
              </v-row>
            </div>
            <div >
              <v-row>
                <v-col cols="4" class="iconoscenter" >
                  <div class="iconos"><v-icon  icon="fa:fas fa-solid fa-certificate" ></v-icon></div>
                </v-col>
                <v-col>
                  <div >
                  <router-link to="/" active-class="amarillo" class="enlace"> 
                  <v-list-item  style="margin-bottom: -10px;" title="Certificado ">
                  </v-list-item >
                  <v-list-item   style="margin-top: -10px;" title=" Académico">
                  </v-list-item>
                </router-link>
                  </div>
                  
                </v-col>
              </v-row>
            </div>


          </v-list>
  
          <template v-slot:append>
            <div class="pa-2">
              <router-link to="/">
                <v-btn block class="enlace">
                  Salir
              </v-btn>
              </router-link>
            </div>
          </template>
        </v-navigation-drawer>
        <v-main style="height: 100%"></v-main>
      </v-layout>
    </v-card>
    <router-view/>
  </template>

<script>
export default {

}
</script>

<style scoped>
 @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@300&display=swap');
 .iconoscenter{
display: flex;
justify-content: center;

 }
 .textoUNAH{
  display: flex;
  justify-content: center;
 }

 .derecho{
  padding: left 2px, !important;
  color: white;
  text-decoration: none;
  font-size: 1.2rem;
 }
.menuLat{
    background-color: #77181E;
    color: aliceblue;
    font-family: 'Rubik', sans-serif;
    font-size: 60px;
}
.enlace{
  padding: left 2px, !important;
  color: white;
  text-decoration: none !important;
}

.amarillo{
  color: #FBD411;
}
.abajo{
  display: flex;
	flex-direction: column;
	flex-wrap: nowrap;
	justify-content: flex-end;
	align-items: center;
	align-content: center;
}

.arriba{
  display: flex;
	flex-direction: column;
	flex-wrap: nowrap;
	justify-content: flex-start;
	align-items: center;
	align-content: center;
}
.iconos{
  font-size: 1.1rem;
  display: flex;
  justify-content: center;
	align-items: center;
	align-content: stretch;
  margin-left: 100%;

}
.texto{
  margin-left: 15px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}
.logo{
  background-image: url('../assets/pumaEstudiante.png');
  height: 160px;
  width: 160px;
}

.logo_center{
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center !important;
  margin-left: 16px;
}
</style>


