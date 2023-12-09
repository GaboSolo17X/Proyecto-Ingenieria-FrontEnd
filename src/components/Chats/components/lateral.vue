<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer :width="100" class="menuLat" theme="dark" permanent>
        <v-list color="transparent">
          <v-list-item>
            <div class="logo"></div>
          </v-list-item>
          <hr />
          <v-list-item class="iconoscenter">
            <router-link to="/principalEstudiantes" active-class="amarillo" class="enlace">
              <v-icon class="iconos" icon="fa:fas fa-solid fa-house"></v-icon>
            </router-link>
          </v-list-item>

          <v-list-item class="iconoscenter">
            <router-link to="/" class="enlace">
              <v-icon class="iconos amarillo" icon="fa:fas fa-solid fa-comment"></v-icon>
            </router-link>
          </v-list-item>

          <v-list-item class="iconoscenter">
            <router-link to="/certificadoEstudiantes" active-class="amarillo" class="enlace">
              <v-icon class="iconos" icon="fa:fas fa-solid fa-certificate"></v-icon>
            </router-link>
          </v-list-item>
        </v-list>

        <template v-slot:append>
          <div class="pa-2">
            <router-link to="/" class="enlace">
              <v-btn block class="enlace"> Salir </v-btn>
            </router-link>
          </div>
        </template>
      </v-navigation-drawer>
      <v-navigation-drawer permanent class="secondBar">
        <template v-slot:prepend>
          <v-row class="cat">
            <v-col cols="4" class="colsc">
              <v-btn class="btn" :class="{ btnSel: selectedTab === 'chats' }" @click="selectTab('chats')"
                variant="outlined" rounded="xl">Chats</v-btn>
            </v-col>
            <v-col cols="4" class="colsc">
              <v-btn class="btn" :class="{ btnSel: selectedTab === 'grupos' }" @click="selectTab('grupos')"
                variant="outlined" rounded="xl">Grupos</v-btn>
            </v-col>
            <v-col cols="4" class="colsc">
              <v-btn class="btn" :class="{ btnSel: selectedTab === 'solicitudes' }" @click="selectTab('solicitudes')"
                variant="outlined" rounded="xl">Solicitudes</v-btn>
            </v-col>
          </v-row>
          <hr />
        </template>

        <v-card v-show="selectedTab === 'chats'" class="myChats" color="transparent">
          <template v-slot:prepend>
            <v-row class="new">
              <v-row justify="center">
                <v-dialog v-model="dialogContactos" fullscreen :scrim="false" transition="dialog-bottom-transition">
                  <template v-slot:activator="{ props }">
                    <!-- <v-btn color="primary" dark v-bind="props"> Open Dialog </v-btn> -->
                    <v-btn variant="text" dark v-bind="props">
                      <v-icon class="more" icon="fa-solid fa-circle-plus"></v-icon>
                      <span class="title">Tus Contactos</span>
                    </v-btn>
                  </template>
                  <v-card class="prime2">
                    <form @submit.prevent="submit">
                      <v-toolbar dark class="prime">
                        <v-btn icon dark @click="dialog = false">
                          <v-icon>mdi-close</v-icon>
                        </v-btn>
                        <v-toolbar-title class="titles">TUS CONTACTOS</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-toolbar-items>
                          <v-btn variant="text" class="titles" @click="dialogContactos = false">
                            Cerrar
                          </v-btn>
                        </v-toolbar-items>
                      </v-toolbar>
                      <v-row class="m-0">
                        <v-col class="form">
                          <h2>
                            ¿Quieres iniciar un chat o eliminar algun contacto?
                          </h2>
                          <v-text-field v-model="searchQuery2" label="Buscar" @input="filterContactos2" class="mt-5"
                            append-inner-icon="fa-solid fa-magnifying-glass" single-line hide-details rounded="xl"
                            variant="outlined"></v-text-field>
                          <v-icon class="plus" icon="fa-solid fa-person-circle-question"></v-icon>

                          <!-- <v-btn @click="handleReset">
                            clear
                          </v-btn> -->
                        </v-col>
                        <v-col class="contactos">
                          <h2>Estos son tus contactos</h2>
                          <v-card class="myCont" color="transparent">
                            <div v-for="contact in filteredContactos2" :key="contact.numeroCuenta">
                              <v-card rounded="xl" class="conta">
                                <v-row class="rows">
                                  <v-col cols="2">
                                    <v-avatar>
                                      <v-img :src="'http://localhost:3000/' +
                                        contact.foto
                                        " alt="John"></v-img>
                                    </v-avatar>
                                  </v-col>
                                  <v-col cols="7" class="names">
                                    <span>{{ contact.nombre }}</span>
                                  </v-col>
                                  <v-col cols="3" class="grate">
                                    <v-btn density="compact" variant="text" icon="fa-solid fa-comment" class="btnC"
                                      @click="nuevoChat(contact.numeroCuenta)"></v-btn>
                                    <v-btn density="compact" variant="text" icon="fa-solid fa-trash-can" class="btnE"
                                      @click="
                                        eliminarContacto(contact.numeroCuenta)
                                        "></v-btn>
                                  </v-col>
                                </v-row>
                              </v-card>
                            </div>
                          </v-card>
                        </v-col>
                      </v-row>
                    </form>
                  </v-card>
                </v-dialog>
              </v-row>
            </v-row>
          </template>
          <hr />
          <h3 class="ml-5 mt-2">Tus Chats</h3>
          <div v-for="chat in chats" :key="chat.numeroCuenta" @click="selectedChat(chat.numeroCuenta,chat.nombre,chat.idUsuario,chat.idUsuario2)">
            <v-card rounded="xl" class="chats">
              <v-row class="rows">
                <v-col cols="4">
                  <v-avatar>
                    <v-img :src="'http://localhost:3000/'+ chat.foto" alt="John"></v-img>
                  </v-avatar>
                </v-col>
                <v-col class="names">
                  <span>{{ chat.nombre }}</span>
                </v-col>
              </v-row>
            </v-card>
          </div>
        </v-card>

        <v-card v-show="selectedTab === 'grupos'" class="myGrupos" color="transparent">
          <template v-slot:prepend>
            <v-row class="new">
              <v-row justify="center">
                <v-dialog v-model="dialogCrearGrupo" fullscreen :scrim="false" transition="dialog-bottom-transition">
                  <template v-slot:activator="{ props }">
                    <!-- <v-btn color="primary" dark v-bind="props"> Open Dialog </v-btn> -->
                    <v-btn variant="text" dark v-bind="props">
                      <v-icon class="more" icon="fa-solid fa-circle-plus"></v-icon>
                      <span class="title">Crear Grupo</span>
                    </v-btn>
                  </template>
                  <v-card class="prime2">
                    <form @submit.prevent="submit">
                      <v-toolbar dark class="prime">
                        <v-btn icon dark @click="dialog = false">
                          <v-icon>mdi-close</v-icon>
                        </v-btn>
                        <v-toolbar-title class="titles">CREAR GRUPO</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-toolbar-items>
                          <v-btn variant="text" class="titles" @click="dialogCrearGrupo = false">
                            Cerrar
                          </v-btn>
                          <v-btn variant="text" type="submit" class="titles" @click="dialogCrearGrupo = false">
                            Guardar
                          </v-btn>
                        </v-toolbar-items>
                      </v-toolbar>
                      <v-row class="m-0">
                        <v-col class="form">
                          <h2>Ponle un nombre al grupo</h2>
                          <v-text-field v-model="nombreGrupo" label="Nombre" class="mt-5"
                            :rules="[(v) => !!v || 'Este campo es requerido']" variant="outlined"></v-text-field>
                          <v-icon class="plus" icon="fa-solid fa-people-group"></v-icon>

                          <!-- <v-btn @click="handleReset">
                            clear
                          </v-btn> -->
                        </v-col>
                        <v-col class="contactos">
                          <h2>Selecciona a los integrantes</h2>
                          <v-card class="myCont" color="transparent">
                            <div v-for="contact in contactos" :key="contact.numeroCuenta">
                              <v-card rounded="xl" class="conta">
                                <v-row class="rows">
                                  <v-col cols="3">
                                    <v-avatar>
                                      <v-img :src="'http://localhost:3000/' +
                                        contact.foto
                                        " alt="John"></v-img>
                                    </v-avatar>
                                  </v-col>
                                  <v-col cols="7" class="names">
                                    <span>{{ contact.nombre }}</span>
                                  </v-col>
                                  <v-col cols="2" class="check">
                                    <input type="checkbox" :value="contact.numeroCuenta"
                                      v-model="usuariosSeleccionados" />
                                  </v-col>
                                </v-row>
                              </v-card>
                            </div>
                          </v-card>
                        </v-col>
                      </v-row>
                    </form>
                  </v-card>
                </v-dialog>
              </v-row>
            </v-row>
          </template>
          <hr />
          <h3 class="ml-5 mt-2">Tus Grupos</h3>
          <v-card class="myGroups" color="transparent">
            <div v-for="grupo in grupos" :key="grupo.id" @click="selectGroup(grupo.idGrupo, grupo.nombreGrupo)">
              <v-card rounded="xl" class="chats">
                <v-row class="rows">
                  <v-col cols="3">
                    <v-avatar>
                      <v-img :src="'http://localhost:3000/' + grupo.fotoGrupo" alt="John"></v-img>
                    </v-avatar>
                  </v-col>
                  <v-col cols="9" class="groups">
                    <span>{{ grupo.nombreGrupo }}</span>
                  </v-col>
                </v-row>
              </v-card>
            </div>
          </v-card>
        </v-card>

        <v-card v-show="selectedTab === 'solicitudes'" class="myRequest" color="transparent">
          <template v-slot:prepend>
            <v-row class="new">
              <v-row justify="center">
                <v-dialog v-model="dialogAgregarEstudiante" fullscreen :scrim="false"
                  transition="dialog-bottom-transition">
                  <template v-slot:activator="{ props }">
                    <!-- <v-btn color="primary" dark v-bind="props"> Open Dialog </v-btn> -->
                    <v-btn variant="text" dark v-bind="props">
                      <v-icon class="more" icon="fa-solid fa-circle-plus"></v-icon>
                      <span class="title">Agregar Estudiante</span>
                    </v-btn>
                  </template>
                  <v-card class="prime2">
                    <v-toolbar dark class="prime">
                      <v-btn icon dark @click="dialog = false">
                        <v-icon>mdi-close</v-icon>
                      </v-btn>
                      <v-toolbar-title class="titles">SOLICITUDES DE AMISTAD</v-toolbar-title>
                      <v-spacer></v-spacer>
                      <v-toolbar-items>
                        <v-btn variant="text" type="submit" class="titles" @click="dialogAgregarEstudiante = false">
                          Cerrar
                        </v-btn>
                      </v-toolbar-items>
                    </v-toolbar>

                    <v-row class="m-0">
                      <v-col class="form">
                        <h2>Buscar estudiante</h2>
                        <v-text-field v-model="searchQuery" label="Buscar" @input="filterContactos" class="mt-5"
                          append-inner-icon="fa-solid fa-magnifying-glass" single-line hide-details rounded="xl"
                          variant="outlined"></v-text-field>

                        <v-icon class="plus">fa-solid fa-user-plus</v-icon>
                        <!-- <v-btn @click="handleReset">
                            clear
                          </v-btn> -->
                      </v-col>

                      <v-col class="contactos">
                        <h2>Estudiantes del Campus Universitario</h2>
                        <v-card class="myCont" color="transparent">
                          <div v-for="(user, index) in filteredContactos" :key="user.numeroCuenta">
                            <v-card rounded="xl" class="conta">
                              <v-row class="rows">
                                <v-col cols="2">
                                  <v-avatar>
                                    <v-img :src="'http://localhost:3000/' +
                                      user.fotoPerfil
                                      " alt="John"></v-img>
                                  </v-avatar>
                                </v-col>
                                <v-col cols="8" class="names">
                                  <span>{{ user.nombre }}</span>
                                  <span class="account">{{
                                    user.numeroCuenta
                                  }}</span>
                                </v-col>
                                <v-col cols="2" class="check">
                                  <v-btn class="btnA2" variant="outlined" rounded="xl" @click="
                                    solicitudEnviada(user.numeroCuenta, index)
                                    " :disabled="user.solicitudEnviada">Enviar</v-btn>
                                  <!-- <v-btn
                                    class="btnA2"
                                    v-show="btnEnviado"
                                    variant="outlined"
                                    rounded="xl"
                                    :disabled="true"
                                    @click="solicitudEnviada(user.numeroCuenta)"
                                    >Enviar</v-btn
                                  > -->
                                </v-col>
                              </v-row>
                            </v-card>
                          </div>
                        </v-card>
                      </v-col>
                    </v-row>
                  </v-card>
                </v-dialog>
              </v-row>
            </v-row>
          </template>

          <hr />
          <h3 class="ml-5 mt-2">Solicitudes Recibidas</h3>
          <div v-for="solicitud in solicitudes" :key="solicitud.idUsuario">
            <v-card rounded="xl" class="request">
              <v-row class="rows">
                <v-col cols="4">
                  <v-avatar>
                    <v-img :src="'http://localhost:3000/' + solicitud.foto" alt="John"></v-img>
                  </v-avatar>
                </v-col>
                <v-col class="nombres">
                  {{ solicitud.nombre }}
                  {{ solicitud.idUsuario }}
                </v-col>
                <v-col class="soliciBTN">
                  <v-btn class="btnA" variant="outlined" rounded="xl" @click="
                    aceptarSoli(
                      solicitud.idUsuario,
                      solicitud.idUsuario2,
                      solicitud.idSolicitud
                    )
                    ">Aceptar</v-btn>
                  <v-btn class="btnR" variant="outlined" rounded="xl" @click="
                    rechazarSoli(
                      solicitud.idUsuario,
                      solicitud.idUsuario2,
                      solicitud.idSolicitud
                    )
                    ">Rechazar</v-btn>
                </v-col>
              </v-row>
            </v-card>
          </div>
        </v-card>
      </v-navigation-drawer>
      <v-main style="height: 100%"></v-main>
    </v-layout>
  </v-card>

  <chatbox v-show="activeChat" :name="sender" :recibe="recibe" :sal="salas" class="chatbox" />
  <groupChat v-show="activeGroupChat" class="groupChat" v-if="usuariosGrupos" :users="usuariosGrupos" :name="chatName" />
</template>

<script>
import chatbox from "../components/chatBox.vue";
import groupChat from "../components/groupChatBox.vue";
import { socket, connectSocket, actualizar,joinSala,verificacionSala} from "../socket/socket";
import { ref, onMounted } from "vue";


export default {
  components: {
    chatbox,
    groupChat,
  },

  props: {
    cuenta: String,
    centro: String,
  },

  setup(props) {
    const nombreGrupo = ref("");
    const usuariosSeleccionados = ref([]);
    const activeChat = ref(false);
    const sender = ref("");
    const chatName = ref("");
    const usuarios = ref([]);
    const solicitudes = ref([]);
    const contactos = ref([]);

    //  const connect = ()=>  {
    //    socket.connect();
    //  }

    // const disconnect = ()=> {
    //   socket.disconnect();
    // }

    //CONTACTOS

    const eliminarCon = async (id) => {
      console.log(centro);
      try {
        const res = await fetch("http://localhost:3000/chat/eliminarContacto", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cuentaEstu: cuenta,
            cuentaOtro: id,
          }),
        });
        const data = await res.json();
        console.log(data.message);

        // if(data.message=='Solicitud enviada'){

        // }
      } catch (error) {
        console.log(error);
      }
    };

    const eliminarContacto = (cuenta) => {
      console.log("Eliminaste a " + cuenta);
      eliminarCon(cuenta);
      getContactos();
      filterContactos2();
      searchQuery2.value = "";
    };

    const nuevoChat = (cuenta) => {
      console.log("Creaste chat con " + cuenta);
    };

    // const btnEnviar = ref(true);
    // const btnEnviado = ref(false);

    const cuenta = props.cuenta;
    const centro = props.centro;

    const obtenerEstudiantes = async () => {
      console.log(centro);
      try {
        const res = await fetch(
          "http://localhost:3000/chat/getEstudiantesCentro",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              centroEstu: centro,
              cuentaEstu: cuenta,
            }),
          }
        );
        const data = await res.json();
        console.log(data);

        usuarios.value = data.estudiantesInfo;
        console.log(usuarios.value);

        usuarios.value = usuarios.value.filter(
          (usuario) => !usuario.contactado || usuario.contactado === false
        );
      } catch (error) {
        console.log(error);
      }
    };

    const enviarSolicitud = async (id) => {
      console.log(centro);
      try {
        const res = await fetch("http://localhost:3000/chat/createSolicitud", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cuentaEstu: cuenta,
            cuentaSoli: id,
          }),
        });
        const data = await res.json();
        console.log(data.message);

        // if(data.message=='Solicitud enviada'){

        // }
      } catch (error) {
        console.log(error);
      }
    };

    const filteredContactos = ref([]);
    const filteredContactos2 = ref([]);
    const searchQuery = ref("");
    const searchQuery2 = ref("");

    const filterContactos = () => {
      const query = searchQuery.value.toLowerCase();
      filteredContactos.value = usuarios.value.filter((contacto) => {
        const nombreInicial = contacto.nombre.charAt(0).toLowerCase();
        return (
          nombreInicial === query ||
          contacto.nombre.toLowerCase().includes(query) ||
          contacto.numeroCuenta.includes(query)
        );
      });
    };

    const filterContactos2 = () => {
      const query = searchQuery2.value.toLowerCase();
      filteredContactos2.value = contactos.value.filter((contacto) => {
        const nombreInicial = contacto.nombre.charAt(0).toLowerCase();
        return (
          nombreInicial === query ||
          contacto.nombre.toLowerCase().includes(query)
        );
      });
    };

    const getSolicitud = async () => {
      console.log(centro);
      try {
        const res = await fetch("http://localhost:3000/chat/getSolicitudes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cuentaEstu: cuenta,
          }),
        });
        const data = await res.json();
        console.log(data);

        solicitudes.value = data.solicitudes;
      } catch (error) {
        console.log(error);
      }
    };

    const getContactos = async () => {
      console.log(centro);
      try {
        const res = await fetch("http://localhost:3000/chat/getContactos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cuentaEstu: cuenta,
          }),
        });
        const data = await res.json();
        console.log(data);
        contactos.value = data.contactos;

        solicitudes.value = data.solicitudes;
      } catch (error) {
        console.log(error);
      }
    };

    //ABRIR CHATS

    const chats = ref([])

    const obtenerChats = async () => {
      console.log(centro);
      try {
        const res = await fetch("http://localhost:3000/chat/getChats", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cuentaEstu: cuenta,
          }),
        });
        const data = await res.json();
        console.log(data);
        chats.value = data.chats

        // if(data.message=='Solicitud enviada'){

        // }
      } catch (error) {
        console.log(error);
      }
    };

    const recibe=ref()

    const salas=ref({})
    const verSala=ref({})
    const selectedChat = (chat,name,us1,us2) => {
      console.log(chat);
      activeChat.value = true;
      sender.value = name;
      activeGroupChat.value = false;
      recibe.value=chat

      salas.value={
        sala:us1+"-"+us2
      }

      verSala.value={
        usuario:us1,
        usuario1:us2,
      }

      console.log(salas.value)
      console.log(verSala.value)
      joinSala(salas.value)

      verificacionSala(verSala)


    };

    
    const usuariosGrupos = ref([]);
    const obtenerEstuGrupos = async (grupoID) => {
      console.log(centro);
      try {
        const res = await fetch("http://localhost:3000/chat/getMiembrosGrupo", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            grupoId: grupoID,
          }),
        });
        const data = await res.json();
        console.log(data);
        usuariosGrupos.value = data.perfilesGrupo;
      } catch (error) {
        console.log(error);
      }
    };

    const activeGroupChat = ref(false);
    const selectGroup = (group, name) => {
      activeGroupChat.value = true;
      console.log(group);
      activeChat.value = false;
      obtenerEstuGrupos(group);
      chatName.value = name;
    };

    //SOLICITUDES

    const aceptar = async (sender, receive, id) => {
      console.log(centro);
      try {
        const res = await fetch("http://localhost:3000/chat/aceptarSolicitud", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idSolicitud: id,
            respuesta: "Aceptada",
            idUsuario: sender,
            idUsuario2: receive,
          }),
        });
        const data = await res.json();
        console.log(data.message);
        getSolicitud();

        // if(data.message=='Solicitud enviada'){

        // }
      } catch (error) {
        console.log(error);
      }
    };

    const aceptarSoli = (sender, receive, id) => {
      console.log("Has aceptado a la solicitud " + id);
      aceptar(sender, receive, id);
    };

    const rechazar = async (sender, receive, id) => {
      console.log(centro);
      try {
        const res = await fetch(
          "http://localhost:3000/chat/rechazarSolicitud",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              idSolicitud: id,
              respuesta: "Rechazada",
              idUsuario: sender,
              idUsuario2: receive,
            }),
          }
        );
        const data = await res.json();
        console.log(data.message);
        getSolicitud();

        // if(data.message=='Solicitud enviada'){

        // }
      } catch (error) {
        console.log(error);
      }
    };

    const rechazarSoli = (sender, receive, id) => {
      console.log("Has rechazado a la solicutd " + id);
      rechazar(sender, receive, id);
    };

    const solicitudEnviada = (id, index) => {
      console.log("Haz enviado una solicitud a " + id);
      usuarios.value[index].solicitudEnviada = true;
      enviarSolicitud(id);
      obtenerEstudiantes();
      filterContactos();
    };

    //GRUPOS
    const crearGrupo = async (name, usuarios) => {
      console.log(centro);
      try {
        const res = await fetch("http://localhost:3000/chat/createGrupo", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            usuariosGrupo: usuarios,
            nombresGrupo: name,
          }),
        });
        const data = await res.json();
        console.log(data.message);

        getGrupos();

        // if(data.message=='Solicitud enviada'){

        // }
      } catch (error) {
        console.log(error);
      }
    };

    const limpiarFormulario = () => {
      nombreGrupo.value = "";
      usuariosSeleccionados.value = [];
    };

    const myUser = ref();
    const submit = () => {
      myUser.value = cuenta;
      console.log("Nombre del grupo:", nombreGrupo.value);
      console.log("Usuarios seleccionados:", usuariosSeleccionados.value);
      console.log("Usuarios seleccionados1:", myUser);
      console.log("Usuarios seleccionados2:", myUser.value);
      usuariosSeleccionados.value.push(myUser.value);

      console.log("Usuarios seleccionados5:", usuariosSeleccionados.value);
      crearGrupo(nombreGrupo, usuariosSeleccionados);

      limpiarFormulario();
    };

    const grupos = ref([]);
    const getGrupos = async () => {
      console.log(centro);
      try {
        const res = await fetch("http://localhost:3000/chat/getGrupos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            usuario: cuenta,
          }),
        });
        const data = await res.json();
        console.log(data);
        grupos.value = data.grupos;

        // if(data.message=='Solicitud enviada'){

        // }
      } catch (error) {
        console.log(error);
      }
    };

    onMounted(() => {
      obtenerEstudiantes();
      usuarios.value.forEach((usuario) => {
        usuario.solicitudEnviada = false;
      });

      getSolicitud();
      getContactos();
      getGrupos();
      obtenerChats();
      actualizar(cuenta);
      // connect()
    });

    return {
      nombreGrupo,
      usuariosSeleccionados,
      activeChat,
      activeGroupChat,
      sender,
      submit,
      aceptarSoli,
      rechazarSoli,
      solicitudEnviada,
      selectedChat,
      selectGroup,
      usuarios,
      filteredContactos,
      filteredContactos2,
      searchQuery,
      searchQuery2,
      filterContactos,
      filterContactos2,
      solicitudes,
      contactos,
      grupos,
      eliminarContacto,
      nuevoChat,
      usuariosGrupos,
      chatName,
      chats,
      recibe,
      salas,
      // btnEnviar,
      // btnEnviado,
    };
  },
  data() {
    return {
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
      dialogCrearGrupo: false,
      dialogAgregarEstudiante: false,
      dialogContactos: false,

      
      selectedTab: "chats",

      selectedTab: "grupos",

      selectedTab: "solicitud",

      selectedPop: null,
    };
  },
  computed: {},
  methods: {
    selectTab(tab) {
      this.selectedTab = tab;
    },
    selectPop(pop) {
      this.selectedPop = pop;
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Rubik:wght@300;800&display=swap");

.dialog-bottom-transition-enter-active,
.dialog-bottom-transition-leave-active {
  transition: transform 0.2s ease-in-out;
}

h3 {
  color: white;
}

.prime2 {
  font-family: "Rubik", sans-serif;
  font-weight: 300;
}

.prime {
  background-color: #77181e;

  color: white;
}

.titles {
  font-family: "Rubik", sans-serif;
  font-size: 1.5rem;
  font-weight: 800;
}

.iconoscenter {
  display: flex;
  justify-content: center;
}

.menuLat {
  background-color: #77181e;
  color: aliceblue;
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
  font-size: 2.4rem;
  margin-top: 80px;
}

.logo {
  background-image: url("../assets/pumaEstudiante.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 60px;
  width: 60px;
  margin-left: 5px;
  margin-bottom: 20px;
}

.logo_center {
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center !important;
  margin-left: 16px;
}

/* Second Bar */
.secondBar {
  width: 310px !important;
  background-color: #a92727;
}

.btn {
  color: white;
  border-color: white;
  font-size: 10px;
  font-family: "Rubik", sans-serif;
  border-color: white;
  font-weight: 800;
}

.btnSel {
  background-color: white;
  color: black;
  font-family: "Rubik", sans-serif !important;
  font-size: 10px;
  border-color: white;
  font-weight: 800;
}

.cat {
  padding: 5px;
  margin: 0px;
}

.colsc {
  padding: 5px;
  display: flex;
  justify-content: center;
}

.myChats .myGroups {
  height: 100%;
  padding-left: 10px;
  padding-right: 10px;
  overflow: auto;
}

/* My Chats */
.chats {
  height: 60px;
  margin-top: 10px;
}

.rows {
  margin: 0px;
  flex-wrap: nowrap;
}

.names,
.check {
  display: flex;
  align-items: center;
}

.names {
  font-size: 20px;
  margin-left: 10px;
  font-family: "Rubik", sans-serif;
}

.groups {
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 1.1rem;
}

.create {
  display: flex;
  flex-direction: row;
}

.title {
  margin-left: 10px;
  font-family: "Rubik", sans-serif !important;
  font-weight: 800;
  color: white;
}

.more {
  color: white;
}

.new {
  margin-top: 20px;
  margin-bottom: 20px;
}

.request {
  height: 90px;
  margin-top: 10px;
  font-family: "Rubik", sans-serif;
  font-weight: 800;
}

.btnA {
  background-color: #282832;
  color: aliceblue;
  font-size: 8px;
  font-family: "Rubik", sans-serif;
  font-weight: 800;

  margin-top: -5px;
  margin-bottom: 5px;
}

.btnA2 {
  background-color: #282832;
  color: aliceblue;
  font-size: 8px;
  font-family: "Rubik", sans-serif;
  font-weight: 800;
  margin-left: -40px;
}

.btnR {
  background-color: #fbd411;
  font-size: 8px;
  font-family: "Rubik", sans-serif;
  font-weight: 800;
}

.soliciBTN {
  display: flex;
  flex-direction: column;
}

.nombres {
  display: flex;
  font-size: 14px;
  margin-left: -30px;
  text-align: center;
}

.PopPup {
  background-color: #282832;
  border-radius: 20px !important;
}

.textoPop {
  color: white;
  font-family: "Rubik";
  font-size: 20px !important;
  text-align: center !important;
}

/* Crear Grupo */

.form {
  padding: 60px;
  text-align: center;
}

.plus {
  font-size: 9rem;
  color: #77181e;
  margin-top: 110px;
}

.contactos {
  padding: 60px;
  text-align: center;
}

.myCont {
  height: 430px;
  overflow-x: hidden;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #a92727;
}

.myCont::-webkit-scrollbar {
  width: 12px;
}

.myCont::-webkit-scrollbar-thumb {
  background-color: #a92727;
  border-radius: 6px;
}

.conta {
  height: 60px;
  margin-top: 10px;
  width: 500px;
  background-color: #dacccc;
}

.account {
  margin-left: 10px;
}

.chatbox {
  margin-left: 410px;
  margin-top: 48px;
  height: 92vh;
}

.groupChat {
  margin-left: 410px;
  margin-top: 48px;
  height: 92vh;
}

.grate {
  display: flex;
  justify-content: space-evenly;
}

.btnC {}
</style>
