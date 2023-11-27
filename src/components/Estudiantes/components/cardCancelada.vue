<template>
  <div class="form">
    <v-sheet class="pa-12 mb-12" rounded style="background-color: #282832">
      <v-card class="mx-auto mt-10 rounded-lg bg-color" min-width="810">
        <v-form class="pa-9 pt-2">
          <p>Listado de asignaturas canceladas</p>
          <v-table fixed-header class="">
            <thead>
              <tr>
                <th class="textoTabla">CODIGO</th>
                <th class="textoTabla">ASIGNATURA</th>
                <th class="textoTabla">PERIODO</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="clase in clases" :key="clase.idMatriculaCancelada">
                <td class="textoCuerpo">{{ clase.codigoAsignatura }}</td>
                <td class="textoCuerpo">{{ clase.nombreClase }}</td>
                <td class="textoCuerpo">{{ clase.periodo }}</td>
              </tr>
            </tbody>
          </v-table>
        </v-form>
      </v-card>
    </v-sheet>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
export default {
  setup() {
    const clases = ref([]);
    const estudiante = ref();
    // const per =ref();
    const estudianteEs = async () => {
      estudiante.value = JSON.parse(localStorage.getItem("Estudiante"));
    };
    // const clases = [
    //   {
    //     codigo: 'IS802',
    //     asignatura: 'Ingenieria del software',
    //     periodo: '27 de Octubre 2023',
    //   }
    // ]

    const getCanceladas = async () => {
      try {
        const res = await fetch(
          "http://localhost:3000/estudiante/clasesCanceladas",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              numeroCuenta: estudiante.value.numeroCuenta,
            }),
          }
        );
        const data = await res.json();
        clases.value=data.clases;

        // periodo();
        console.log(clases);
      } catch (error) {
        console.error("Error al cargar las clases canceladas", error);
      }
    };

    // const periodo =()=>{
    //   if (clases.value.periodo==="I") {
    //     per.value= "Primero";
    //   } else {
    //     if (clases.value.periodo==="II") {
    //       per.value= "Segundo";
    //     }else{
    //       per.value= "Tercero";
    //     }
    //   }
    // }

    onMounted(() => {
      estudianteEs();
      getCanceladas();
    });
    return {
      clases,
      // per,
    };
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Rubik:wght@300;500&display=swap");

.checkboxs {
  background-color: rgb(246, 246, 246);
}
.subrayadoNo {
  text-decoration: none;
  color: aliceblue;
}
p {
  color: white;
  margin-bottom: 5px;
}
.encabezadoSolicitud {
  background-color: #a92727;
  /* border-top-left-radius: 24px;
        border-top-right-radius: 24px; */
  padding: 10px 15px;
  padding-top: 35px;
}
.bg-color {
  background-color: #77181e;
  color: white;
}
</style>
