import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'estudiantes',
    component: () => import(/* webpackChunkName: "about" */ '../views/Estudiantes.vue')
  },
  {
    path: '/docentes',
    name: 'docentes',
    component: () => import(/* webpackChunkName: "about" */ '../views/Docentes.vue')
  },
  {
    path: '/coordinador',
    name: 'coordinador',
    component: () => import(/* webpackChunkName: "about" */ '../views/Coordinador.vue')
  },
  {
    path: '/administrador',
    name: 'administrador',
    component: () => import(/* webpackChunkName: "about" */ '../views/Administrador.vue')
  },
  {
    path: '/jefe',
    name: 'jefe',
    component: () => import(/* webpackChunkName: "about" */ '../views/Jefe.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
