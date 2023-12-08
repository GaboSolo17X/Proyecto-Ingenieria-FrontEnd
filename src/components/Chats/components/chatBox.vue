<template>
  <div>
    <v-row class="name">
      <v-icon>fa-solid fa-comments</v-icon>
      <span class="user"> {{name}}</span>
    </v-row>
    <v-row class="chat">
      <v-col cols="12" class="chats">
        <v-card class="sender">
          <v-row class="men">
            <span>Hola Gabriel te saludo queria consultar algo</span>
          </v-row>
          <v-row class="hour">
            <span>10:08 pm</span>
          </v-row>
        </v-card>

        <v-card class="receive">
          <v-row class="men">
            <span>Hola que tal?</span>
          </v-row>
          <v-row class="hour">
            <span>10:08 pm</span>
          </v-row>
        </v-card>

        <v-card class="sender">
          <v-row class="men">
            <span>Hola Gabriel te saludo queria consultar algo</span>
          </v-row>
          <v-row class="hour">
            <span>10:08 pm</span>
          </v-row>
        </v-card>

        <v-card class="receive">
          <v-row class="men">
            <span>Hola que tal?</span>
          </v-row>
          <v-row class="hour">
            <span>10:08 pm</span>
          </v-row>
        </v-card>

        <v-card class="receive">
          <v-row class="men">
            <span>Si me parece tu idea bastante cool </span>
          </v-row>
          <v-row class="hour">
            <span>10:08 pm</span>
          </v-row>
        </v-card>

        <v-card class="receive">
          <v-row class="men">
            <span>Hola que tal?</span>
          </v-row>
          <v-row class="hour">
            <span>10:08 pm</span>
          </v-row>
        </v-card>
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
        <!-- <textarea v-model="newMessage" placeholder="Escribe un mensaje" class="messa"></textarea> -->
        <textarea
          v-model="newMessage"
          placeholder="Escribe un mensaje"
          class="messa"
          v-show="activeChat"
        ></textarea>
        <!-- <v-file-input
          clearable
          placeholder="Subir Archivo"
          variant="outlined"
          rounded="xl"
          v-show="activeFile"
        ></v-file-input> -->
        <div class="messa" v-show="activeFile">
          <input
            type="file"
            id="fileInput"
            ref="fileInput"
            class="hidden"
            @change="handleFileInputChange"
          />
        </div>
      </v-col>
      <!-- <v-textarea append-inner-icon="fa-solid fa-play" class="mx-2" placeholder="Enviar Mensaje" rows="1"></v-textarea> -->
      <v-col cols="2" class="side2"> 
        <v-btn class="send" icon @click="enviarMensaje">
          <v-icon>fa-solid fa-paper-plane</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { socket, connectSocket, sendMessage, privado } from "../socket/socket";
import { ref, onMounted } from "vue";


export default {
    props:{
        name:String,
        recibe:String,
    },
  setup(props) {
    const activeFile = ref(false);
    const activeChat = ref(true);

    


    // const connect = ()=>  {
    //   console.log('MIERDA')
    //   socket.connect();
    // }


    const BTNarchivo = () => {
      activeChat.value = false;
      activeFile.value = true;
    };

    const BTNchat = () => {
      activeChat.value = true;
      activeFile.value = false;
    };

    const selectedFileName = ref(null);

    const handleFileInputChange = () => {
      // Acciones cuando se selecciona un archivo
      const fileInput = document.getElementById("fileInput");
      const fileName = fileInput.files.length > 0 ? fileInput.files[0].name : null;

      selectedFileName.value = fileName;
      console.log(`Archivo seleccionado: ${fileName}`);
    };

    const newMessage = ref(""); 


    const datos = ref({})

    const enviarMensaje = () => {
      if (activeChat.value) {
        console.log("Mensaje enviado:", newMessage.value);
   
        // socket.emit("mensaje",newMessage.value)

        datos.value = {
          destinatario: props.recibe,
          mensaje: newMessage.value
        }

        console.log(datos.value)
        // sendMessage(newMessage.value)
        privado(datos.value)

        // newMensaje(newMessage)
      } else if (activeFile.value) {
        const fileInput = document.getElementById("fileInput");
        const selectedFile = fileInput.files[0];
        console.log("Archivo seleccionado:", selectedFile);

        datos.value = {
          destinatario: props.recibe,
          mensaje: selectedFile
        }

        
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
  background-color: #36363e;
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

.sender {
  width: 250px;
  background-color: #cccccc;
  margin-bottom: 10px;
  padding: 5px;
}

.receive {
  width: 250px;
  background-color: #fcaeae;
  margin-top: 10px;
  margin-left: 620px;
  padding: 5px;
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

</style>