import { createRouter, createWebHashHistory } from 'vue-router'


const docenteRoutes = [
  {
    path: '/docenteClases',
    name: 'docenteClases',
    component: () => import(/* webpackChunkName: "about" */ '../../../components/Docente/views/docenteClases.vue'),
  
  },
  {
    path: '/clasesImpartidas',
    name: 'clasesImpartidas',
    component: () => import(/* webpackChunkName: "about" */ '../../../components/Docente/views/clasesImpartidas.vue'),
  
  },
  {
    path: '/subirNotas',
    name: 'subirNotas',
    component: () => import(/* webpackChunkName: "about" */ '../../../components/Docente/views/subirNotas.vue'),
  
  },
  {
    path: '/reiniciarClave/:numeroEmpleadoDocente',
    name: 'reiniciarClave',
    component: () => import(/* webpackChunkName: "about" */ '../../../components/Docente/views/reiniciarClave.vue'),
  
  },
   {
    path: '/docenteClases/:title&:idSeccion&:nombre',
    name: 'clase',
    component: () => import(/* webpackChunkName: "about" */ '../../../components/Docente/views/infoClase.vue'),
  
  }
  
]

const docenteRouter = createRouter({
  history: createWebHashHistory(),
  routes: docenteRoutes
})

export default docenteRouter
