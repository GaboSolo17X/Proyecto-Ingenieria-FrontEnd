import { reactive } from "vue";
import { io } from "socket.io-client";

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
  console.log(msg)
  // state.barEvents.push(args);
});

socket.on("privado", (msg) => {
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

//0.destinatario 1.mensaje
export function privado(data) {
  socket.emit("privado",data);
}

export function joinSala(sala) {
  socket.emit("joinSala",sala);
}



// socket.on("mensaje", (...msg) => {
//   io.emit(msg)
//   // state.barEvents.push(args);
// });