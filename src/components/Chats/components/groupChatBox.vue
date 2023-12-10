<template>
  <div class="todo">
    <v-container class="container">
      <v-row class="name">
        <v-icon>fa-solid fa-comments</v-icon>
        <span class="user"> {{ name }}</span>
      </v-row>
      <v-row class="chat">
        <v-col cols="12" class="chats" @click="act">

          <div v-for="(mensaje, index) in mensajesChat" :key="index">
            <v-card
              v-if="mensaje.sender == true && mensaje.tipo != 'imagen' && mensaje.tipo != 'pdf' && mensaje.tipo != 'docx' && mensaje.tipo != 'xlsx' && mensaje.tipo != 'txt' && mensaje.tipo != 'pptx' && mensaje.tipo != 'mp4'"
              class="sender">
              <div class="message">
                <span class="nombreSender">{{ mensaje.nombreEstudiante }}</span>
                <span>{{ mensaje.mensaje }}</span>
              </div>
            </v-card>

            <v-card
              v-if="mensaje.reciver == true && mensaje.tipo != 'imagen' && mensaje.tipo != 'pdf' && mensaje.tipo != 'docx' && mensaje.tipo != 'xlsx' && mensaje.tipo != 'txt' && mensaje.tipo != 'pptx' && mensaje.tipo != 'mp4'"
              class="receive">
              <div class="message">
                <span class="nombreSender">{{ mensaje.nombreEstudiante }}</span>
                <span>{{ mensaje.mensaje }}</span>
              </div>
            </v-card>

            <v-card v-if="mensaje.tipo == 'imagen' && mensaje.reciver == true" class="receive">
              <div class="message">
                <span class="nombreSender">{{ mensaje.nombreEstudiante }}</span>
                <v-img :src="'http://localhost:3000/' + mensaje.mensaje"></v-img>
              </div>
            </v-card>


            <v-card v-if="mensaje.tipo == 'imagen' && mensaje.sender == true" class="sender">
              <div class="message">
                <span class="nombreSender">{{ mensaje.nombreEstudiante }}</span>
                <v-img :src="'http://localhost:3000/' + mensaje.mensaje"></v-img>
              </div>
            </v-card>

            <!-- PDF -->
            <v-card v-if="mensaje.tipo == 'pdf' && mensaje.reciver == true" class="receive">
              <div class="message">
                <span class="nombreSender">{{ mensaje.nombreEstudiante }}</span>
                <div class="spaceR" @click="descargar(mensaje.mensaje, mensaje.nombre, mensaje.tipo)">
                  <v-icon>fa-solid fa-file-pdf</v-icon>
                  <span>{{ mensaje.nombre }}</span>
                </div>
              </div>
            </v-card>

            <v-card v-if="mensaje.tipo == 'pdf' && mensaje.sender == true" class="sender">
              <div class="message">
                <span class="nombreSender">{{ mensaje.nombreEstudiante }}</span>
                <div class="space" @click="descargar(mensaje.mensaje, mensaje.nombre, mensaje.tipo)">
                  <v-icon>fa-solid fa-file-pdf</v-icon>
                  <span>{{ mensaje.nombre }}</span>
                </div>
              </div>
            </v-card>

            <!-- EXCEL -->
            <v-card v-if="mensaje.tipo == 'xlsx' && mensaje.reciver == true" class="receive">
              <div class="message">
                <span class="nombreSender">{{ mensaje.nombreEstudiante }}</span>
                <div class="spaceR" @click="descargar(mensaje.mensaje, mensaje.nombre, mensaje.tipo)">
                  <v-icon>fa-solid fa-file-excel</v-icon>
                  <span>{{ mensaje.nombre }}</span>
                </div>
              </div>
            </v-card>

            <v-card v-if="mensaje.tipo == 'xlsx' && mensaje.sender == true" class="sender">
              <div class="message">
                <span class="nombreSender">{{ mensaje.nombreEstudiante }}</span>
                <div class="space" @click="descargar(mensaje.mensaje, mensaje.nombre, mensaje.tipo)">
                  <v-icon>fa-solid fa-file-excel</v-icon>
                  <span>{{ mensaje.nombre }}</span>
                </div>
              </div>
            </v-card>


            <!-- WORD -->
            <v-card v-if="mensaje.tipo == 'docx' && mensaje.reciver == true" class="receive">
              <div class="message">
                <span class="nombreSender">{{ mensaje.nombreEstudiante }}</span>
                <div class="spaceR" @click="descargar(mensaje.mensaje, mensaje.nombre, mensaje.tipo)">
                  <v-icon>fa-solid fa-file-word</v-icon>
                  <span>{{ mensaje.nombre }}</span>
                </div>
              </div>
            </v-card>


            <v-card v-if="mensaje.tipo == 'docx' && mensaje.sender == true" class="sender">
              <div class="message">
                <span class="nombreSender">{{ mensaje.nombreEstudiante }}</span>
                <div class="space" @click="descargar(mensaje.mensaje, mensaje.nombre, mensaje.tipo)">
                  <v-icon>fa-solid fa-file-word</v-icon>
                  <span>{{ mensaje.nombre }}</span>
                </div>
              </div>
            </v-card>

            <!-- VIDEO -->
            <v-card v-if="mensaje.tipo == 'mp4' && mensaje.reciver == true" class="receive">
              <div class="message">
                <span class="nombreSender">{{ mensaje.nombreEstudiante }}</span>
                <div class="spaceR" @click="descargar(mensaje.mensaje, mensaje.nombre, mensaje.tipo)">
                  <v-icon>fa-solid fa-file-video</v-icon>
                  <span>{{ mensaje.nombre }}</span>
                </div>
              </div>
            </v-card>



            <v-card v-if="mensaje.tipo == 'mp4' && mensaje.sender == true" class="sender">
              <div class="message">
                <span class="nombreSender">{{ mensaje.nombreEstudiante }}</span>
                <div class="space" @click="descargar(mensaje.mensaje, mensaje.nombre, mensaje.tipo)">
                  <v-icon>fa-solid fa-file-video</v-icon>
                  <span>{{ mensaje.nombre }}</span>
                </div>
              </div>
            </v-card>

            <!-- TXT -->
            <v-card v-if="mensaje.tipo == 'txt' && mensaje.reciver == true" class="receive">
              <div class="message">
                <span class="nombreSender">{{ mensaje.nombreEstudiante }}</span>
                <div class="spaceR" @click="descargar(mensaje.mensaje, mensaje.nombre, mensaje.tipo)">
                  <v-icon>fa-solid fa-file-lines</v-icon>
                  <span>{{ mensaje.nombre }}</span>
                </div>
              </div>
            </v-card>


            <v-card v-if="mensaje.tipo == 'txt' && mensaje.sender == true" class="sender">
              <div class="message">
                <span class="nombreSender">{{ mensaje.nombreEstudiante }}</span>
                <div class="space" @click="descargar(mensaje.mensaje, mensaje.nombre, mensaje.tipo)">
                  <v-icon>fa-solid fa-file-lines</v-icon>
                  <span>{{ mensaje.nombre }}</span>
                </div>
              </div>
            </v-card>



            <!-- POWERPOINT -->
            <v-card v-if="mensaje.tipo == 'pptx' && mensaje.reciver == true" class="receive">
              <div class="message">
                <span class="nombreSender">{{ mensaje.nombreEstudiante }}</span>
                <div class="spaceR" @click="descargar(mensaje.mensaje, mensaje.nombre, mensaje.tipo)">
                  <v-icon>fa-solid fa-file-powerpoint</v-icon>
                  <span>{{ mensaje.nombre }}</span>
                </div>
              </div>
            </v-card>


            <v-card v-if="mensaje.tipo == 'pptx' && mensaje.sender == true" class="sender">
              <div class="message">
                <span class="nombreSender">{{ mensaje.nombreEstudiante }}</span>
                <div class="space" @click="descargar(mensaje.mensaje, mensaje.nombre, mensaje.tipo)">
                  <v-icon>fa-solid fa-file-powerpoint</v-icon>
                  <span>{{ mensaje.nombre }}</span>
                </div>
              </div>
            </v-card>



          </div>


        </v-col>
      </v-row>
      <v-row class="newMess">
        <v-col cols="1" class="side2">
          <v-btn class="archivo" icon v-show="activeChat" @click="BTNarchivo()">
            <v-icon>fa-solid fa-paperclip</v-icon>
          </v-btn>
          <v-btn class="archivo" icon v-show="activeFile" @click="BTNchat()">
            <v-icon>fa-solid fa-comment</v-icon>
          </v-btn>
        </v-col>

        <v-col cols="9" class="side">
          <textarea v-model="newMessage" placeholder="Escribe un mensaje" class="messa" v-show="activeChat"
            @keydown.enter.prevent="enviarMensaje"></textarea>

          <div class="messa" v-show="activeFile">
            <input type="file" id="fileInput2" ref="fileInput2" class="hidden" @change="handleFileInputChange"
              accept=".png, .jpg, .jpeg, .gif, .svg, .pdf, .xlsx, .docx, .txt, .mp4, .pptx" />
          </div>
        </v-col>
        <v-col cols="2" class="side2">
          <v-btn class="send" icon @click="enviarMensaje">
            <v-icon>fa-solid fa-paper-plane</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>

    <v-card class="integrantes">
      <h3>Integrantes</h3>
      <hr>

      <div class="nombreInt">
        <div v-for="(integrante, index) in users" :key="index">
          <v-card class="request">
            <v-row class="rows">
              <v-col cols="1" class="img">
                <v-avatar size="22">
                  <v-img :src="'http://localhost:3000/' + integrante.foto" alt="John"></v-img>
                  <!-- <v-img :src="'http://localhost:3000/' + integrante.foto" alt="John"></v-img> -->

                </v-avatar>
              </v-col>
              <v-col class="nombres">
                {{ integrante.nombre }}
              </v-col>
            </v-row>
          </v-card>
        </div>

      </div>

      <v-btn block class="enlace" @click="salirGrupo"> Salir del Grupo </v-btn>


    </v-card>
  </div>
</template>

<script>
import { ref, onMounted, onUpdated } from "vue";
import { socket, mensajeGrupo, archivo } from "../socket/socket";


export default {
  props: {
    name: String,
    users: Array,
    salaEs: String,
    log: String,
    id: Number,
  },
  setup(props) {


    const activeFile = ref(false);
    const activeChat = ref(true);

    const mensajesChat = ref([]);



    const integrantes = ref([])

    integrantes.value = props.users
    console.log(integrantes.value)

    const act = () => {
      mensajesGrupo();
    }

    const form = ref({

      idchat: '',
      numeroCuenta: '',
      archivo: '',
      //  certificado: null,
    });



    

    const salirGrupo = async () => {
      console.log(props.id)

      try {
        const res = await fetch("http://localhost:3000/chat/salirGrupo", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idchat: props.id,
            numeroCuenta: props.log,

          }),
        });
        const data = await res.json();
        console.log(data.message);
        window.location.reload();
    
      } catch (error) {
        console.log(error);
      }
    };

    const subirArchivos = async (archivo) => {

      try {
        const formData = new FormData();
        formData.append('idchat', props.id);
        formData.append('numeroCuenta', props.log);
        formData.append('archivo', archivo);
        const res = await fetch("http://localhost:3000/chat/envioArchivosGrupo", {
          method: "POST",
          body: formData
        });
        const data = await res.json();
        console.log(data.message);



      } catch (error) {
        console.log(error);
      }
    };

    const descargar = async (recurso, nombre, tipo) => {
      console.log(recurso);
      console.log(nombre);
      console.log(tipo);
      try {
        let ruta =
          //"public/solicitudes/1700271462922-cancelacion-plan de estudios organigrama.pdf";
          recurso;
        const urlDescarga = `http://localhost:3000/descargar/${encodeURIComponent(ruta)}`;
        // const urlDescarga = `http://localhost:3000/`+ruta;

        // const urlDescarga = `http://localhost:3000/descargar/${encodeURIComponent(
        //   ruta
        // )}`;
        fetch(urlDescarga, {
          method: "GET",
        })
          .then((response) => response.blob())
          .then((blob) => {
            // Crear un enlace temporal para iniciar la descarga
            const enlaceDescarga = document.createElement("a");
            enlaceDescarga.href = URL.createObjectURL(blob);


            // if (tipo == 'pdf') {
            //   enlaceDescarga.download = nombre ;
            //   enlaceDescarga.click();
            // } 

            switch (tipo) {
              case 'pdf':
                enlaceDescarga.download = nombre;
                enlaceDescarga.click();
                break;
              case 'docx':
                enlaceDescarga.download = nombre;
                enlaceDescarga.click();
                break;
              case 'txt':
                enlaceDescarga.download = nombre;
                enlaceDescarga.click();
                break;
              case 'mp4':
                enlaceDescarga.download = nombre;
                enlaceDescarga.click();
                break;
              case 'pptx':
                enlaceDescarga.download = nombre;
                enlaceDescarga.click();
                break;
              case 'xlsx':
                enlaceDescarga.download = nombre;
                enlaceDescarga.click();
                break;
              default:
                "nada";
            }
          })


      } catch (error) {
        console.error("Error:", error);
      }
    }

    const mensajesGrupo = async () => {
      console.log(props.id)

      try {
        const res = await fetch("http://localhost:3000/chat/getMensajesGrupo", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idchat: props.id,
            numeroCuenta: props.log,

          }),
        });
        const data = await res.json();
        console.log(data);
        mensajesChat.value = data.mensajes



      } catch (error) {
        console.log(error);
      }
    };

    onUpdated(() => {
      // text content should be the same as current `count.value`
      console.log('SI entre chat Grupal')
      mensajesGrupo();


    });




    const BTNarchivo = () => {
      activeChat.value = false;
      activeFile.value = true;
    };

    const BTNchat = () => {
      activeChat.value = true;
      activeFile.value = false;
    };


    //ENVIAR MENSAJES
    const selectedFileName = ref(null);

    const handleFileInputChange = () => {
      // Acciones cuando se selecciona un archivo
      const fileInput = document.getElementById("fileInput2");
      const fileName = fileInput.files.length > 0 ? fileInput.files[0].name : null;

      selectedFileName.value = fileName;
      console.log(`Archivo seleccionado: ${fileName}`);
    };

    const newMessage = ref("");


    const datos = ref({})
    const mensajeConfirma = ref('');



    const enviarMensaje = async () => {
      if (activeChat.value && newMessage.value.trim() !== "") {
        console.log("Mensaje enviado:", newMessage.value);

        // socket.emit("mensaje",newMessage.value)

        datos.value = {
          grupoDestino: props.salaEs,
          mensaje: newMessage.value,
          numeroCuenta: props.log,
        }

        console.log(datos.value)


        // sendMessage(newMessage.value)
        mensajeGrupo(datos.value)

        mensajesChat.value.push({
          sender: true, // or reciver: true, depending on the case
          reciver: false,
          mensaje: newMessage.value,
        });

        // console.log(mensajesChat.value)

        // // Call mensajes function asynchronously without waiting for it to complete


        // await mensajesGrupo();
        // // console.log( mensajesChat.value)


        socket.on("confirmacion", async (msg) => {
          console.log("Confirmacion para actualizar chats " + msg)

          if (msg) {
            console.log('Aqui entro')
            setTimeout(async () => {
              await mensajesGrupo();
            }, 1000);

          }
        }
        )
        // newMensaje(newMessage)
      } else if (activeFile.value && selectedFileName.value) {
        const fileInput = document.getElementById("fileInput2");
        const selectedFile = fileInput.files[0];
        console.log("Archivo seleccionado:", selectedFile);



        // datos.value = {
        //   destinatario: props.salaEs,
        //   mensaje: selectedFile
        // }


        subirArchivos(selectedFile)
        archivo()

        fileInput.value = "";

        socket.on("archivo", (msg) => {
          console.log(msg)

          if (msg) {
            setTimeout(async () => {
              await mensajesGrupo();
            }, 1000);

          }
        });


      }

      if (fileInput.value) {
        fileInput.value = "";
      }
      newMessage.value = "";
    };




    return {
      activeFile,
      activeChat,
      selectedFileName,
      handleFileInputChange,
      BTNarchivo,
      BTNchat,
      enviarMensaje,
      newMessage,
      integrantes,
      mensajesChat,
      descargar,
      act,
      salirGrupo
    };
  },
};
</script>

<style scoped>
.v-row {
  margin: 0;
}

.name {
  background-color: #21212b;
  height: 40px;
  display: flex;
  justify-content: center;
  padding: 8px;
  color: white;
}

.chat {
  background-color: white;
  height: 77vh;
  overflow-y: scroll;
}

.chat::-webkit-scrollbar {
  width: 12px;
}

.chat::-webkit-scrollbar-thumb {
  background-color: #fbd411;
  border-radius: 6px;
}

.chats {
  padding: 60px;
  display: flex;
  flex-direction: column;
}

.newMess {
  background-color: #282832;
  height: 9.2vh;
}

.messa {
  background-color: white;
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 20px;
  resize: vertical;
  height: 45px;
  margin-top: -5px;
  overflow: hidden;
}

.archivo {
  width: 35px;
  height: 35px;
}

.send {
  width: 35px;
  height: 35px;
}

.side {
  height: 0px;
}

.side2 {
  display: flex;
  justify-content: center;
}

.user {
  margin-left: 30px;
}

.receive {
  width: 250px;
  background-color: #aeaeae;
  margin-bottom: 10px;
  padding: 5px;
  margin-top: 10px;

}

.spaceR {
  background-color: rgb(221, 221, 221);
  display: flex;
  flex-direction: row;
}

.sender {
  width: 250px;
  background-color: #f88b8b;
  margin-top: 10px;
  margin-left: 420px;
  padding: 5px;

}

.space {
  background-color: #f2bcbc;
  display: flex;
  flex-direction: row;
}

.hour {
  display: flex;
  justify-content: right;
  font-size: 12px;
}

.side :deep(.v-input__details) {
  min-height: 0px;
  padding-top: 0px;
  grid-area: unset;
}

/* .custom-file-input {
  position: relative;
}*/

.hidden {
  width: 100%;
}

/* Oculta el input original */

.container {
  padding: 0px;
  width: 4500px;
  margin-right: 0px;
  margin-left: 0px;
}

.todo {
  display: flex;
  flex-direction: row;
}

.integrantes {
  color: white;
  background-color: #282832;
  width: 100%;
  border-radius: 0px;
  height: 92.5vh;
  text-align: center;
}

.nombreInt {
  height: 500px;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: scroll;

}



.nombreInt::-webkit-scrollbar {
  width: 5px;
}

.nombreInt::-webkit-scrollbar-thumb {
  background-color: #201e1e;
  border-radius: 6px;
}


.request {
  height: 40px;
  margin-top: 10px;
  font-family: "Rubik", sans-serif;
  color: white;
  font-size: 11px;
  background-color: transparent;
  width: 100%;
}

.img {
  display: flex;
  flex-direction: column;

  justify-content: center;
  padding: 5px;
}

.nombres {
  display: flex;
  margin-left: 10px;
}

.enlace {
  background-color: crimson;
  color: white;
  font-size: 10px;
  margin-top: 10px;
  font-weight: bold;
}

.message {
  display: flex;
  flex-direction: column;
}

.nombreSender {
  font-size: 12px;
  color: dimgray;
  font-weight: 800;
}

@media only screen and (max-width: 741px) {

  .receive {
    width: 230px;
    background-color: #aeaeae;
    margin-bottom: 10px;
    padding: 5px;
    margin-top: 10px;
  }

  .sender {
    width: 250px;
    background-color: #f88b8b;
    margin-top: 10px;
    margin-left: 120px;
    padding: 5px;
  }

  .chats {
    padding: 40px;
    display: flex;
    flex-direction: column;
  }


}
</style>