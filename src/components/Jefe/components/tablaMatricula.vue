<template>
  <v-card class="text-center tarjeta">
    <v-card-title
      >¡Ya estan matriculados todos los estudiantes del periodo! <br />
      Descargue la lista de los estudiantes matriculados.</v-card-title
    >
    <v-card-actions>
      <v-btn @click="download()">
        <v-icon right>
          <i class="fa:fas fa-solid fa-file-pdf"></i>
        </v-icon>
        Descargar
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  methods: {
    download(tipoArchivo) {
      const jefe = window.localStorage.getItem("JefeDep");
      const jsonJefe = JSON.parse(jefe);
      const { numeroEmpleadoDocente } = jsonJefe;
      fetch(
        "http://localhost:3000/jefeDepartamento/listadoEstudiantesMatriculado",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ numeroEmpleadoDocente }),
        }
      )
        .then((response) => response.blob())
        .then((blob) => {
          let url = window.URL.createObjectURL(blob);
          let a = document.createElement("a");
          a.href = url;
          a.download = "listadoEstudiantesMatriculados.pdf";
          a.click();
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
<style scoped>
.tarjeta {
  background-color: #282832;
  color: white;
  font-family: "Rubik";
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  align-content: center;
  height: 20rem;
}

.v-btn {
  background-color: #a92727;
  color: white;
  height: 45px;
  margin-top: 3rem;
}
</style>
