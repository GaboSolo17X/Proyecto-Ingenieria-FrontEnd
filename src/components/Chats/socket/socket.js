import { reactive } from "vue";
import { io } from "socket.io-client";

// import bus from '../socket/bus.js';

export const state = reactive({
  connected: false,
  fooEvents: [],
  barEvents: []
});

// "undefined" means the URL will be computed from the `window.location` object
const URL = "http://localhost:3000";
 
export const socket = io(URL);

socket.on("connect", () => {
  state.connected = true;
  console.log('Ejecutado')
});

socket.on("disconnect", () => {
  state.connected = false;
});

socket.on("foo", (...args) => {
  state.fooEvents.push(args);
});

socket.on("bar", (...args) => {
  state.barEvents.push(args);
});

socket.on("mensaje", (msg) => {
  // state.barEvents.push(args);
});

socket.on("privado", (msg) => {
  console.log("hay mensaje")
  console.log(msg)
  
});

socket.on("joinSala", (msg) => {
  console.log(msg)
});

socket.on("confirmacion", (msg) => {
  console.log(msg) 
}
)

socket.on("usuariosEnSala", (msg) => {
  console.log(msg)
});

socket.on("coneccion", (msg) => {
  console.log(msg)
});

// socket.on("VerificacionSala", (msg) => {
//   console.log(msg)
//   console.log('Mensaje desde el servidor:', msg)

//   // bus.emit('mensajeDesdeServidor', msg);
  
// });


// let miVariableLet = "Hola desde archivo1!";
// export function modificarVariable(valor) {
//   return valor
// }
 
//  export { miVariableLet };

let verificacion = null;

socket.on("VerificacionSala", (msg) => {
  console.log(msg)
  verificacion = msg;
});


socket.on("VerificacionGrupo", (msg) => {
  console.log(msg)
});

//0.grupoDestino 1.mensaje 2.numeroCuenta }
socket.on("mensajeGrupo", (msg) => {
  console.log("hay mensaje grupal")
  console.log(msg)
});

socket.on("archivo", (msg) => {
  console.log(msg)
});



export function connectSocket() {
  socket.emit('connect')
}

export function sendMessage(msg) {
  socket.emit("mensaje", msg);
}

export function disconnectSocket() {
  socket.emit('disconnect')
}

export function sendFoo() {
  socket.emit("foo");
}

export function sendBar() {
  socket.emit("bar");
}

export function actualizar(numeroCuenta) {
  socket.emit("actualizacion",numeroCuenta);
}

//0.sala 1.mensaje 2.numeroCuenta
export function privado(data) {
  socket.emit("privado",data);
}

//0.sala <idusuario>-<idusuario2> 1.numeroCuenta
export function joinSala(sala) {
  socket.emit("joinSala",sala);
}

//0.usuario 
export function verificacionSala(cuentas) {
  socket.emit("VerificacionSala",cuentas);
}

export function archivo(){
  socket.emit("archivo",true);
}


//para grupos

//0.cuentas
export function joinGrupo(arrayUsuarios) {
  socket.emit("joinGrupo",arrayUsuarios);
}
//{0.cuentas 1.usuario1}
export function VerificacionGrupo(cuentas) {
  socket.emit("VerificacionGrupo",cuentas);
}

//{ grupoDestino, mensaje, numeroCuenta }
export function mensajeGrupo(data) {
  socket.emit("mensajeGrupo",data);
}

export function verLinea(sala) {
  socket.emit("verLinea");
}




// socket.on("mensaje", (...msg) => {
//   io.emit(msg)
//   // state.barEvents.push(args);
// });