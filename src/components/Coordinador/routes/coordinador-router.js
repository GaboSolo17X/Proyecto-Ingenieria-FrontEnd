import { createRouter, createWebHashHistory } from 'vue-router'


const coordinadorRoutes = [
  {
    path: '/principalCoordinador',
    name: 'principalCoordinador',
    component: () => import(/* webpackChunkName: "about" */ '../views/principalCoordinador.vue'),
  
  },
  {
    path: '/ventanaEstudiantes',
    name: 'ventanaEstudiantes',
    component: () => import(/* webpackChunkName: "about" */ '../views/ventanaEstudiantes.vue'),
  
  },
  {
    path: '/Historial',
    name: 'Historial',
    component: () => import(/* webpackChunkName: "about" */ '../views/historial.vue'),
  
  },
  {
    path: '/Historial/:id&:nombre&:indice',
    name: 'detalleEstudiante',
    component: () => import(/* webpackChunkName: "about" */ '../views/detalleEstudiante.vue'),
    props: true,
  
  },
  {
    path: '/Solicitudes',
    name: 'Solicitudes',
    component: () => import(/* webpackChunkName: "about" */ '../views/solicitudes.vue'),
  
  },
  
  
]

const coordinadorRouter = createRouter({
  history: createWebHashHistory(),
  routes: coordinadorRoutes
})

export default coordinadorRouter
//detalleEstudiante