<template>
   <body>
    <header id="encabezado">
    </header>
    <main>
      <nav class="menu">
      <router-link to="/login-estudiantes"><div class="enlace">Estudiantes</div>
      </router-link> 
      <router-link to="/login-docentes"><div class="enlace">Docentes</div></router-link>
      <router-link to="/login-coordinador" ><div class="enlace">Coordinador</div></router-link>
      <router-link to="/login-administrador"><div class="enlace">Administrador</div></router-link>
      <router-link to="/login-jefeDep"><div class="enlace">Jefe de departamento</div></router-link>
      </nav>
      <router-view/>

      <v-carousel hide-delimiters next-icon="fa-solid fa-chevron-right" prev-icon="fa-solid fa-chevron-left" class="borde" >
        <v-carousel-item
          src="../../assets/c1.jpeg"
          cover
        ></v-carousel-item>
      
        <v-carousel-item
          src="../../assets/c2.jpg"
          cover
        ></v-carousel-item>
      
        <v-carousel-item
          src="../../assets/c3.jpg"
          cover
        ></v-carousel-item>
        <v-carousel-item
          src="../../assets/c4.jpg"
          cover
        ></v-carousel-item>
      </v-carousel>
    </main>
    <footer id="pie">
    </footer>
  </body>
</template>

<script>

export default {
    setup() {
   
  }
}
</script>

<style scoped>
 @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@300&display=swap');

 .borde{
  margin-bottom: 5px;
 }
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
    display: flex;
    flex-direction: column;
    margin: 0px;
    min-height: 100vh;
    background-color: #A92727; 
    width: 100%;
    height: 100vh;
}


.enlace{
  padding: 30px 80px;
  border: 2px solid #FFFFFF;
  font-family: 'Rubik', sans-serif;
}
.menu{
  background-color: #A92727;
  display: flex;
  /*font-family: ; meter el tipo de letra rubik*/
	flex-direction: row;
    justify-content: space-between
}

#encabezado{
  background-image: url('../../assets/header_landing.png');
  background-size: cover; /* Escala la imagen para cubrir todo el footer */
  background-position: center; /* Centra la imagen */
  background-repeat: no-repeat; /* Evita la repetición de la imagen */
  padding: 90px; /* Espacio alrededor del contenido en el footer */
}
#pie{
    background-image: url('../../assets/footer_landing.png');
    background-size: cover; /* Escala la imagen para cubrir todo el footer */
    background-position: center; /* Centra la imagen */
    background-repeat: no-repeat; /* Evita la repetición de la imagen */
    padding: 90px; /* Espacio alrededor del contenido en el footer */
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: flex-end;
    align-items: stretch;
    align-content: center;
}

nav a {
  font-weight: bold;
  color: #FFFFFF;
}

nav a.router-link-exact-active {
  color: #FFFFFF;
}
</style>