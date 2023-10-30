<template>
  <body>
    <header id="encabezado">
    </header>
    <main>
      <nav class="menu">
      <router-link to="/"><div class="enlace">Estudiantes</div>
      </router-link> |
      <router-link to="/docentes"><div class="enlace">Docentes</div></router-link>|
      <router-link to="/coordinador"><div class="enlace">Coordinador</div></router-link>|
      <router-link to="/administrador"><div class="enlace">Administrador</div></router-link>|
      <router-link to="/jefe"><div class="enlace">Jefe de departamento</div></router-link>
      </nav>
      <router-view/>

      <v-carousel hide-delimiters next-icon="fa-solid fa-chevron-right" prev-icon="fa-solid fa-chevron-left" >
        <v-carousel-item
          src="../src/assets/c1.jpeg"
          cover
        ></v-carousel-item>
      
        <v-carousel-item
          src="../src/assets/c2.jpg"
          cover
        ></v-carousel-item>
      
        <v-carousel-item
          src="../src/assets/c3.jpg"
          cover
        ></v-carousel-item>
        <v-carousel-item
          src="../src/assets/c4.jpg"
          cover
        ></v-carousel-item>
      </v-carousel>

    </main>
    <footer id="pie">
    </footer>
  </body>
</template>

<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@300&display=swap');

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
    background-color: #052767; 
    width: 100%;
    height: 100vh;
}


.enlace{
  padding: 30px 80px;
  border: 2px solid #FBD411;
  font-family: 'Rubik', sans-serif;
}
.menu{
  background-color: #052767;
  display: flex;
  /*font-family: ; meter el tipo de letra rubik*/
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: center;
	align-items: stretch;
	align-content: space-between;
}

#encabezado{
  background-image: url('../src/assets/header_landing.png');
  background-size: cover; /* Escala la imagen para cubrir todo el footer */
  background-position: center; /* Centra la imagen */
  background-repeat: no-repeat; /* Evita la repetición de la imagen */
  padding: 90px; /* Espacio alrededor del contenido en el footer */
}
#pie{
    background-image: url('../src/assets/footer_landing.png');
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
  color: #FBD411;
}

nav a.router-link-exact-active {
  color: #FFFFFF;
}
</style>
