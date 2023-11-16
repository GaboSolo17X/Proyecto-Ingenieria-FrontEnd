import { createRouter, createWebHashHistory } from 'vue-router'


const estudianteRoutes = [
  {
    path: "/principalEstudiantes",
    name: "principalEstudiantes",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../../../components/Estudiantes/views/principalEstudiantes.vue"
      ),
  },
  {
    path: "/matriculaEstudiantes",
    name: "matriculaEstudiantes",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../../../components/Estudiantes/views/matriculaEstudiantes.vue"
      ),
  },
  {
    path: "/solicitudesEstudiantes",
    name: "solicitudesEstudiantes",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../../../components/Estudiantes/views/solicitudesEstudiantes.vue"
      ),
  },
  {
    path: "/solicitudCarreraEstudiantes",
    name: "solicitudCarreraEstudiantes",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../../../components/Estudiantes/views/solicitudCarreraEstudiantes.vue"
      ),
  },
  {
    path: "/solicitudCentroEstudiantes",
    name: "solicitudCentroEstudiantes",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../../../components/Estudiantes/views/solicitudCentroEstudiantes.vue"
      ),
  },
  {
    path: "/solicitudCancelacionEstudiantes",
    name: "solicitudCancelacionEstudiantes",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../../../components/Estudiantes/views/solicitudCancelacionEstudiantes.vue"
      ),
  },
  {
    path: "/solicitudReposicionEstudiantes",
    name: "solicitudReposicionEstudiantes",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../../../components/Estudiantes/views/solicitudReposicionEstudiantes.vue"
      ),
  },
  {
    path: "/reinicioClaveEstudiantes",
    name: "reinicioClaveEstudiantes",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../../../components/Estudiantes/views/reinicioContrasenia.vue"
      ),
  },
  {
    path: "/certificadoEstudiantes",
    name: "certificadoEstudiantes",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../../../components/Estudiantes/views/certificadoEstudiantes.vue"
      ),
  },
  {
    path: "/calificacionesEstudiantes",
    name: "calificacionesEstudiantes",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../../../components/Estudiantes/views/calificacionesEstudiantes.vue"
      ),
  },
  {
    path: "/notasPeriodoEstudiantes",
    name: "notasPeriodoEstudiantes",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../../../components/Estudiantes/views/notasPeriodoEstudiantes.vue"
      ),
  },
  {
    path: "/perfilEstudiante",
    name: "perfilEstudiante",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../../../components/Estudiantes/views/perfilEstudiante.vue"
      ),
  },
  {
    path: "/consultarHorario",
    name: "consultarHorario",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../../../components/Estudiantes/views/consultarHorario.vue"
      ),
  },
  {
    path: "/consultarEspera",
    name: "consultarEspera",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../../../components/Estudiantes/views/consultarEspera.vue"
      ),
  },
  {
    path: "/consultarCanceladas",
    name: "consultarCanceladas",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../../../components/Estudiantes/views/consultarCanceladas.vue"
      ),
  },
];

const estudianteRouter = createRouter({
  history: createWebHashHistory(),
  routes: estudianteRoutes
})

export default estudianteRouter
