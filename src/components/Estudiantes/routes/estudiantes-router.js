import { createRouter, createWebHashHistory } from 'vue-router'


const estudianteRoutes = [
  {
    path: '/principalEstudiantes',
    name: 'principalEstudiantes',
    component: () => import(/* webpackChunkName: "about" */ '../../../components/Estudiantes/views/principalEstudiantes.vue'),
  
  },
  {
    path: '/matriculaEstudiantes',
    name: 'matriculaEstudiantes',
    component: () => import(/* webpackChunkName: "about" */ '../../../components/Estudiantes/views/matriculaEstudiantes.vue'),
  
  },
  {
    path: '/solicitudesEstudiantes',
    name: 'solicitudesEstudiantes',
    component: () => import(/* webpackChunkName: "about" */ '../../../components/Estudiantes/views/solicitudesEstudiantes.vue'),
  
  },
  {
    path: '/solicitudCarreraEstudiantes',
    name: 'solicitudCarreraEstudiantes',
    component: () => import(/* webpackChunkName: "about" */ '../../../components/Estudiantes/views/solicitudCarreraEstudiantes.vue'),
  
  },
  {
    path: '/solicitudCentroEstudiantes',
    name: 'solicitudCentroEstudiantes',
    component: () => import(/* webpackChunkName: "about" */ '../../../components/Estudiantes/views/solicitudCentroEstudiantes.vue'),
  
  },
  {
    path: '/solicitudCancelacionEstudiantes',
    name: 'solicitudCancelacionEstudiantes',
    component: () => import(/* webpackChunkName: "about" */ '../../../components/Estudiantes/views/solicitudCancelacionEstudiantes.vue'),
  
  },
  {
    path: '/solicitudReposicionEstudiantes',
    name: 'solicitudReposicionEstudiantes',
    component: () => import(/* webpackChunkName: "about" */ '../../../components/Estudiantes/views/solicitudReposicionEstudiantes.vue'),
    
  },
  {
    path: '/reinicioClaveEstudiantes',
    name: 'reinicioClaveEstudiantes',
    component: () => import(/* webpackChunkName: "about" */ '../../../components/Estudiantes/views/reinicioContrasenia.vue'),
    
  },
  
]

const estudianteRouter = createRouter({
  history: createWebHashHistory(),
  routes: estudianteRoutes
})

export default estudianteRouter
