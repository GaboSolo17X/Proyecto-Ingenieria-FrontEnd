import { createRouter, createWebHashHistory } from 'vue-router'


const administradorRoutes = [
  {
    path: '/adminDocentes',
    name: 'adminDocentes',
    component: () => import(/* webpackChunkName: "about" */ '../../../components/Administrador/views/adminDocentes.vue'),
  
  },
  {
    path: '/adminCSV',
    name: 'adminCSV',
    component: () => import(/* webpackChunkName: "about" */ '../../../components/Administrador/views/adminCSV.vue'),
  
  },
  {
    path: '/adminCSVestudents',
    name: 'adminCSVestudents',
    component: () => import(/* webpackChunkName: "about" */ '../../../components/Administrador/views/adminCSVestudents.vue'),
  
  },
  {
    path: '/adminExcepcionales',
    name: 'adminExcepcionales',
    component: () => import(/* webpackChunkName: "about" */ '../../../components/Administrador/views/adminExcepcionales.vue'),
  
  },
  {
    path: '/adminMatricula',
    name: 'adminMatricula',
    component: () => import(/* webpackChunkName: "about" */ '../../../components/Administrador/views/adminMatricula.vue'),
  
  },
  {
    path: '/adminPlanificacion',
    name: 'adminPlanificacion',
    component: () => import(/* webpackChunkName: "about" */ '../../../components/Administrador/views/adminPlanificacion.vue'),
  
  },
  {
    path: '/adminCalificaciones',
    name: 'adminCalificaciones',
    component: () => import(/* webpackChunkName: "about" */ '../../../components/Administrador/views/adminCalificaciones.vue'),
  
  },
  {
    path: '/adminAspirantes',
    name: 'adminAspirantes',
    component: () => import(/* webpackChunkName: "about" */ '../../../components/Administrador/views/adminAspirantes.vue'),
  
  },
  {
    path: '/adminEstudiantes',
    name: 'adminEstudiantes',
    component: () => import(/* webpackChunkName: "about" */ '../../../components/Administrador/views/adminEstudiantes.vue'),
  
  }
  

  
  
]

const administradorRouter = createRouter({
  history: createWebHashHistory(),
  routes: administradorRoutes
})

export default administradorRouter
