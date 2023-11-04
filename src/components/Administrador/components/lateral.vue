
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

            <div class="texto">
              <div class="iconos"><v-icon  icon="fa:fas fa-solid fa-user" ></v-icon></div>
                <router-link to="/adminDocentes" active-class="amarillo" class="enlace"> 
                  <v-list-item   title="Docentes">
                  </v-list-item></router-link>
            </div>


            <div class="texto">
              <div class="iconos"><v-icon  icon="fa:fas fa-solid fa-book" ></v-icon></div>
              <router-link to="/adminPlanificacion" active-class="amarillo" class="enlace">
                <v-list-item   title="Planificación"></v-list-item>
              </router-link>
            </div>
            <div class="texto">
              <div class="iconos"><v-icon  icon="fa:fas fa-solid fa-book-open" ></v-icon></div>
              <router-link to="/adminMatricula" active-class="amarillo" class="enlace">
              <v-list-item  title="Matrícula" ></v-list-item>
            </router-link>
            </div>
            <div class="texto">
              <div class="iconos"><v-icon  icon="fa:fas fa-solid fa-user-xmark" ></v-icon></div>
              <div >
                <router-link to="/adminExcepcionales"  active-class="amarillo" class="enlace">
                  <v-list-item  title="Cancelaciones " class="abajo"></v-list-item>
                  <v-list-item  title="Excepcionales " class="arriba"></v-list-item>
                </router-link>
              </div>
              
            </div>
            <div class="texto">
              <div class="iconos"><v-icon  icon="fa:fas fa-solid fa-file" ></v-icon></div>
              <router-link to="/adminCSV" active-class="amarillo" class="enlace">
              <v-list-item  title="Archivos " class="abajo"></v-list-item>
              <v-list-item  title="de admisión" class="arriba"></v-list-item>
            </router-link>
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
.menuLat{
    background-color: #77181E;
    color: aliceblue;
    font-family: 'Rubik', sans-serif;
    font-size: 50px;
}
.enlace{
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
  font-size: large;
  display: flex;
  justify-content: center;
	align-items: center;
	align-content: stretch;

}
.texto{
  margin-left: 15px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}
.logo{
  background-image: url('../assets/pumaAdmin.png');
  height: 200px;
  width: 200px;
}

.logo_center{
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center !important;
  border-bottom: 2px solid white;
}
</style>


