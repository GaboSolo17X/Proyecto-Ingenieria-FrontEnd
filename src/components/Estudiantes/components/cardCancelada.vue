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
              <tr v-for="clase in clases" :key="clase.codigo">
                <td class="textoCuerpo">{{ clase.codigo }}</td>
                <td class="textoCuerpo">{{ clase.asignatura }}</td>
                <td class="textoCuerpo">{{ clase.fecha }}</td>
              </tr>
            </tbody>
          </v-table>
        </v-form>
      </v-card>
    </v-sheet>
  </div>
</template>

<script>
  export default {
    setup() {
      const clases = [
        {
          codigo: 'IS802',
          asignatura: 'Ingenieria del software',
          fecha: '27 de Octubre 2023',
        },
        {
          codigo: 'IS511',
          asignatura: 'Bases de datos I',
          fecha: '27 de Octubre 2023',
        },
        {
          codigo: 'IS501',
          asignatura: 'Redes de datos I',
          fecha: '27 de Octubre 2023',
        },
      ]
      return {
        clases,
      }
    },
  }
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@300;500&display=swap');

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