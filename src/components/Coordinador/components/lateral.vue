<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer :width="230" class="menuLat" theme="dark" permanent>
        <v-list color="transparent">
          <div class="logo_center">
            <div class="logo"></div>
          </div>
          <div>
            <v-row>
              <v-col cols="4" class="iconoscenter">
                <router-link
                  to="/principalCoordinador"
                  active-class="amarillo"
                  class="enlace"
                >
                  <div class="iconos">
                    <v-icon icon="fa:fas fa-solid fa-building-columns"></v-icon>
                  </div>
                </router-link>
              </v-col>
              <v-col>
                <div>
                  <router-link
                    to="/principalCoordinador"
                    active-class="amarillo"
                    class="enlace"
                  >
                    <v-list-item
                      style="margin-bottom: -10px"
                      title="Carga "
                    >
                    </v-list-item>
                    <v-list-item style="margin-top: -10px" title=" Académica">
                    </v-list-item>
                  </router-link>
                  </div>
              </v-col>
            </v-row>
          </div>

          <div>
            <v-row>
              <v-col cols="4" class="iconoscenter">
                <router-link to="/ventanaEstudiantes" active-class="amarillo" class="enlace">
                <div class="iconos">
                  <v-icon icon="fa:fas fa-solid fa-graduation-cap"></v-icon>
                </div></router-link>
              </v-col>
              <v-col>
                <div>
                  <router-link to="/ventanaEstudiantes" active-class="amarillo" class="enlace">
                    <v-list-item title="Estudiantes"> </v-list-item
                  ></router-link>
                </div>
              </v-col>
            </v-row>
          </div>
        </v-list>

        <template v-slot:append>
          <div class="pa-2">
            <router-link to="/" class="enlace">
              <v-btn block class="enlace"> Salir </v-btn>
            </router-link>
          </div>
        </template>
      </v-navigation-drawer>
      <v-main style="height: 100%"></v-main>
    </v-layout>
  </v-card>
  <router-view />
</template>

<script>
export default {};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Rubik:wght@300&display=swap");
.iconoscenter {
  display: flex;
    justify-content: flex-end;
    flex-wrap: nowrap;
    align-items: center;
}
.textoUNAH {
  display: flex;
  justify-content: center;
}

.derecho {
  padding: left 2px !important;
  color: white;
  text-decoration: none;
  font-size: 1.2rem;
}
.menuLat {
  background-color: #77181e;
  color: aliceblue;
  font-family: "Rubik", sans-serif;
  font-size: 60px;
}
.enlace {
  padding: left 2px !important;
  color: white;
  text-decoration: none !important;
}

.amarillo {
  color: #fbd411;
}
.abajo {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-end;
  align-items: center;
  align-content: center;
}

.arriba {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  align-content: center;
}
.iconos {
  font-size: 1.1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: stretch;
  margin-left: 100%;
}
.texto {
  margin-left: 15px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}
.logo {
  background-image: url("../assets/pumaverse.png");
  height: 160px;
  width: 160px;
}

.logo_center {
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center !important;
  padding-top: 15px;
  padding-bottom: 15px;
  border-bottom: 2px solid white;
}
</style>


