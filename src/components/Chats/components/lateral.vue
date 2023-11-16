<template>
    <v-card>
      <v-layout>
        <v-navigation-drawer :width=100
          class="menuLat"
          theme="dark"
          permanent
        >
          <v-list color="transparent">
            <v-list-item
          > <div class="logo"></div></v-list-item>
          <hr>
          <v-list-item class="iconoscenter">
                 <router-link to="/principalEstudiantes" active-class="amarillo" class="enlace">
                        <v-icon class="iconos" icon="fa:fas fa-solid fa-house" ></v-icon>
                 </router-link>
          </v-list-item>

          <v-list-item class="iconoscenter ">
                 <router-link to="/"  class="enlace">
                        <v-icon class="iconos amarillo" icon="fa:fas fa-solid fa-comment" ></v-icon>
                 </router-link>
          </v-list-item>

          <v-list-item class="iconoscenter">
                 <router-link to="/certificadoEstudiantes" active-class="amarillo" class="enlace">
                        <v-icon class="iconos" icon="fa:fas fa-solid fa-certificate" ></v-icon>
                 </router-link>
          </v-list-item>

          </v-list>
  
          <template v-slot:append>
            <div class="pa-2">
              <router-link to="/" class="enlace">
                <v-btn block class="enlace">
                  Salir
              </v-btn>
              </router-link>
            </div>
          </template>
        </v-navigation-drawer>
        <v-navigation-drawer permanent class="secondBar">
          
          <template v-slot:prepend>
            <v-row class="cat">
            <v-col cols="4" class="colsc">
              <v-btn class="btn" :class="{ 'btnSel': selectedTab === 'chats' }" @click="selectTab('chats')" variant="outlined" rounded="xl">Contactos</v-btn>
            </v-col>
            <v-col cols="4" class="colsc">
              <v-btn class="btn" :class="{ 'btnSel': selectedTab === 'grupos' }" @click="selectTab('grupos')" variant="outlined" rounded="xl">Grupos</v-btn>

            </v-col>
            <v-col cols="4" class="colsc">
              <v-btn class="btn" :class="{ 'btnSel': selectedTab === 'solicitudes' }" @click="selectTab('solicitudes')" variant="outlined" rounded="xl">Solicitudes</v-btn>

            </v-col>
          </v-row>
          <hr>
          </template>
          
        <v-card v-show="selectedTab === 'chats'" class="myChats" color="transparent">
          <div v-for="chat in chats" :key="chat.id" @click="selectedChat(chat)">
            <v-card rounded="xl" class="chats">
              <v-row class="rows">
                  <v-col cols="4">
                     <v-avatar>
                       <v-img
                         :src=chat.img
                         alt="John"
                       ></v-img>
                     </v-avatar>
                  </v-col>
                  <v-col class="names">
                      <span>{{ chat.sender}}</span>
                  </v-col>
              </v-row>
           </v-card>
          </div>
        </v-card>

        <v-card v-show="selectedTab === 'grupos'" class="myGroups" color="transparent">
          <template v-slot:prepend >
            <v-row class="new">
                <v-btn variant="text">
                  <v-icon class="more" icon="fa-solid fa-circle-plus" ></v-icon>
                 <span class="title">Crear Grupo</span>
               </v-btn>
            </v-row>
          </template>
          <hr>
          <div v-for="grupo in grupos" :key="grupo.id" @click="selectGroup(grupo)">
            <v-card rounded="xl" class="chats">
              <v-row class="rows">
                  <v-col cols="4">
                     <v-avatar>
                       <v-img
                         :src=grupo.img
                         alt="John"
                       ></v-img>
                     </v-avatar>
                  </v-col>
                  <v-col class="groups">
                      <span>{{ grupo.codigo}}</span>
                      <span>{{ grupo.clase}}</span>
                  </v-col>
              </v-row>
           </v-card>
          </div>
        </v-card>

        <v-card v-show="selectedTab === 'solicitudes'" class="myRequest" color="transparent">
          <template v-slot:prepend>
            <v-row class="new">
              <v-btn variant="text" @click="selectPop('solicitudes')" >
                <v-icon class="more" icon="fa-solid fa-circle-plus" ></v-icon>
                <span class="title">Agregar Estudiante</span>
              </v-btn>
            </v-row>
          </template>
          <hr>
          <div v-for="solicitud in solicitudes" :key="solicitud.id" >
            <v-card rounded="xl" class="request">
              <v-row class="rows">
                  <v-col cols="4">
                     <v-avatar>
                       <v-img
                         :src=solicitud.img
                         alt="John"
                       ></v-img>
                     </v-avatar>
                  </v-col>
                  <v-col class="nombres">
                    {{solicitud.nombre}}
                    {{ solicitud.apellido }}
                    {{ solicitud.id }}

                  </v-col>
                  <v-col class="soliciBTN">
                    <v-btn class="btnA"  variant="outlined" rounded="xl">Aceptar</v-btn>
                    <v-btn class="btnR"  variant="outlined" rounded="xl">Rechazar</v-btn>
                  </v-col>
            
              </v-row>
           </v-card>
          </div>
        </v-card>

      </v-navigation-drawer>
        <v-main style="height: 100%"></v-main>
      </v-layout>
    </v-card>

  
        <v-card v-show="selectedPop === 'solicitudes'" width="auto">
          <v-card class="PopPup">
            <v-card-text class="textoPop">
              ¡FELICIDADES!, <br />
              su puntaje ha sido admitido para ambas carreras, <br />
              por favor seleccione una:
            </v-card-text>
          </v-card>
        </v-card>



  </template>

<script>
export default {
  data() {
    return {
      chats: [
        { id: 1, sender: 'Usuario1', message: 'Hola, ¿cómo estás?', img: 'https://cdn.vuetifyjs.com/images/lists/4.jpg' },
        { id: 2, sender: 'Usuario2', message: '¡Hola! Estoy bien, gracias.', img: 'https://cdn.vuetifyjs.com/images/lists/1.jpg' },
        { id: 3, sender: 'Usuario3', message: '¡Hola! Estoy bien, gracias.', img: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
        { id: 4, sender: 'Usuario4', message: '¡Hola! Estoy bien, gracias.', img: 'https://cdn.vuetifyjs.com/images/lists/3.jpg' },
        { id: 5, sender: 'Usuario5', message: '¡Hola! Estoy bien, gracias.', img: 'https://cdn.vuetifyjs.com/images/lists/1.jpg' },
        { id: 6, sender: 'Usuario6', message: '¡Hola! Estoy bien, gracias.', img: 'https://cdn.vuetifyjs.com/images/lists/3.jpg' },
        { id: 7, sender: 'Usuario7', message: '¡Hola! Estoy bien, gracias.', img: 'https://cdn.vuetifyjs.com/images/lists/1.jpg' },
        { id: 8, sender: 'Usuario8', message: '¡Hola! Estoy bien, gracias.', img: 'https://cdn.vuetifyjs.com/images/lists/1.jpg' },
        { id: 9, sender: 'Usuario9', message: '¡Hola! Estoy bien, gracias.', img: 'https://cdn.vuetifyjs.com/images/lists/3.jpg' },
        { id: 10, sender: 'Usuario10', message: '¡Hola! Estoy bien, gracias.', img: 'https://cdn.vuetifyjs.com/images/lists/4.jpg' },

      ],
      selectedTab: 'chats',
      grupos: [
        { id: 1, codigo: 'IS501', clase: 'Base de Datos 1', img: 'https://cdn.vuetifyjs.com/images/lists/2.jpg', integrantes: [1,2,3,4,5] },
        { id: 2, codigo: 'IS502', clase: 'Base de Datos 2', img: 'https://cdn.vuetifyjs.com/images/lists/1.jpg', integrantes: [1,2,3,4,5] },
        { id: 3, codigo: 'IS501', clase: 'Base de Datos 1', img: 'https://cdn.vuetifyjs.com/images/lists/4.jpg', integrantes: [1,2,3,4,5] },

      ],
      selectedTab: 'grupos',
      solicitudes: [
        { id: 20201000915, nombre: 'Gabriel', apellido: 'Solorzano', img: 'https://cdn.vuetifyjs.com/images/lists/3.jpg'},
        { id: 20201000914, nombre: 'Mario', apellido: 'Raudales', img: 'https://cdn.vuetifyjs.com/images/lists/1.jpg' },
        { id: 20201000912, nombre: 'Gabriel', apellido: 'Solorzano', img: 'https://cdn.vuetifyjs.com/images/lists/2.jpg'},

      ],
      selectedTab: 'solicitud',

      selectedPop: null,
    };
  },
  methods: {
    selectedChat(chat) {
      console.log(chat)
    },
    selectGroup(group) {
      console.log(group)
    },
    selectTab(tab) {
      this.selectedTab = tab;
    },
    selectPop(pop){
    this.selectedPop=pop
    },
  },

}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Rubik:wght@300;800&display=swap');
 .iconoscenter{
display: flex;
justify-content: center;
 }

.menuLat{
    background-color: #77181E;
    color: aliceblue;
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
  font-size: 2.4rem;
  margin-top: 80px;
}

.logo{
  background-image: url('../assets/pumaEstudiante.png');
  background-size: cover; 
  background-position: center; 
  background-repeat: no-repeat;
  height: 60px;
  width: 60px;
  margin-left:5px;
  margin-bottom: 20px;
}

.logo_center{
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center !important;
  margin-left: 16px;
}

/* Second Bar */
.secondBar{
  width: 310px !important;
  background-color: #a92727;
}



.btn{
  color:white;
  border-color: white;
  font-size: 10px;
  font-family: 'Rubik', sans-serif;
  border-color: white;
  font-weight: 800;

}

.btnSel{
  background-color: white;
  color:black;
  font-family: 'Rubik', sans-serif !important;
  font-size: 10px;
  border-color: white;
  font-weight: 800;
}

.cat{
  padding: 5px;
  margin: 0px;
}

.colsc{
  padding: 5px;
  display: flex;
  justify-content: center;
}

.myChats .myGroups {
  height: 100%;
  padding-left: 10px;
  padding-right: 10px;
  overflow: auto

}

/* My Chats */
.chats{
    height: 60px;
    margin-top: 10px;
}
.rows{
    margin: 0px;
    flex-wrap: nowrap;
}

.names{
    display: flex;
    align-items: center;
}

.groups{
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: -100px;
  margin-top: -5px;
}

.create{
  display: flex;
  flex-direction: row;
}

.title{
  margin-left: 10px;
  font-family: 'Rubik', sans-serif !important;
  font-weight: 800;
  color: white;
}

.more{
  color: white;
}

.new {
  margin-top: 20px;
  margin-bottom: 20px;
}

.request{
    height: 90px;
    margin-top: 10px;
    font-family: 'Rubik', sans-serif;
  font-weight: 800;
}

.btnA{
  background-color:#282832 ;
  color: aliceblue;
  font-size: 8px;
  font-family: 'Rubik', sans-serif;
  font-weight: 800;

  margin-top: -5px;
  margin-bottom: 5px;

}

.btnR{
  background-color: #FBD411;
  font-size: 8px;
  font-family: 'Rubik', sans-serif;
  font-weight: 800;
}

.soliciBTN{
  display: flex;
  flex-direction: column;
}

.nombres{
  display: flex;
    font-size: 14px;
    margin-left: -30px;
    text-align: center;
}



.PopPup{
  background-color: #282832;
  border-radius: 20px !important;
}

.textoPop {
  color: white;
  font-family: "Rubik";
  font-size: 20px !important;
  text-align: center !important;
}

</style>


