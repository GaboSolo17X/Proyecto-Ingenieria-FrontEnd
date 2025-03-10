import { createRouter, createWebHashHistory } from 'vue-router'


const jefeRoutes = [
  {
    path: '/principalJefe',
    name: 'principalJefe',
    component: () => import(/* webpackChunkName: "about" */ '../views/principalJefe.vue'),
  
  },
  {
    path: '/asignaturas',
    name: 'asignaturas',
    component: () => import(/* webpackChunkName: "about" */ '../views/asignaturas.vue'),
  
  },
  {
    path: '/crearSeccion:asignatura&:uv',
    name: 'crearSeccion',
    component: () => import(/* webpackChunkName: "about" */ '../views/crearSeccion.vue'),
    props: (route) => ({ asignatura: route.params.asignatura, uv: route.params.uv }),
  
  },
  {
    path: '/listarSeccion',
    name: 'listarSeccion',
    component: () => import(/* webpackChunkName: "about" */ '../views/listarSeccion.vue'),
  
  },
  {
    path: '/infraestructura',
    name: 'infraestructura',
    component: () => import(/* webpackChunkName: "about" */ '../views/infraestructura.vue'),
  
  },
  {
    path: '/enEspera',
    name: 'enEspera',
    component: () => import(/* webpackChunkName: "about" */ '../views/listasEspera.vue'),
  
  },
  {
    path: '/enEspera/:codigo&:nombre&:enEspera&:idSeccion',
    name: 'detalleEspera',
    component: () => import(/* webpackChunkName: "about" */ '../views/detalleEspera.vue'),
    props: true,
  
  },
  {
    path: '/ventanaDocente',
    name: 'ventanaDocente',
    component: () => import(/* webpackChunkName: "about" */ '../views/ventanaDocente.vue'),
  },
  {
    path: '/generalEvaluaciones',
    name: 'generalEvaluaciones',
    component: () => import(/* webpackChunkName: "about" */ '../views/generalEvaluaciones.vue'),
  
  },
  {
    path: '/generalEvaluaciones/:numeroEmpleado&:idseccion&:idasignatura',
    name: 'verEvaluaciones',
    component: () => import(/* webpackChunkName: "about" */ '../views/verEvaluaciones.vue'),
    props: true,
  
  },
  {
    path: '/calificaciones',
    name: 'calificaciones',
    component: () => import(/* webpackChunkName: "about" */ '../views/calificaciones.vue'),
  
  },
  {
    path: '/calificaciones/:nombre&:clase&:asignatura&:seccion&:idseccion',
    name: 'verCalificaciones',
    component: () => import(/* webpackChunkName: "about" */ '../views/verCalificaciones.vue'),
    props: true,
  
  },
  {
    path: '/reinicioClave',
    name: 'reinicioClave',
    component: () => import(/* webpackChunkName: "about" */ '../views/reinicio.vue'),
  
  },
  {
    path: '/parteEstudiante',
    name: 'parteEstudiante',
    component: () => import(/* webpackChunkName: "about" */ '../views/ventanaEstudiante.vue'),
  
  },
  {
    path: '/historialJefe',
    name: 'historialJefe',
    component: () => import(/* webpackChunkName: "about" */ '../views/historial.vue'),
  
  },
  {
    path: '/historialJefe/:id&:nombre&:indice',
    name: 'detalleHistorial',
    component: () => import(/* webpackChunkName: "about" */ '../views/detalleHistorial.vue'),
    props: true,
  
  },
  {
    path: '/matriculados',
    name: 'matriculados',
    component: () => import(/* webpackChunkName: "about" */ '../views/matriculados.vue'),
  },
  {
    path: '/detalleEvaluacion/:idEvaluacion',
    name: 'detalleEvaluacion',
    component: () => import(/* webpackChunkName: "about" */ '../views/detalleEvaluacion.vue'),
  
  },
  {
    path: '/estadistica',
    name: 'estadistica',
    component: () => import(/* webpackChunkName: "about" */ '../views/estadistica.vue'),
  
  },
  {
    path: '/matricula',
    name: 'matricula',
    component: () => import(/* webpackChunkName: "about" */ '../views/matricula.vue'),
  
  },
  {
    path: '/espera',
    name: 'espera',
    component: () => import(/* webpackChunkName: "about" */ '../views/espera.vue'),
  
  },
  
  
  
]

const jefeRouter = createRouter({
  history: createWebHashHistory(),
  routes: jefeRoutes
})

export default jefeRouter
