import { createRouter, createWebHashHistory } from 'vue-router'


const adminRoutes = [
  {
    path: '/admision',
    name: 'admision',
    component: () => import(/* webpackChunkName: "about" */ '../../../components/Admisiones/views/admisiones.vue'),
  
  },
  {
    path: '/formulario',
    name: 'formulario',
    component: () => import(/* webpackChunkName: "about" */ '../../../components/Admisiones/views/admFormu.vue')
  },
  
]

const adminRouter = createRouter({
  history: createWebHashHistory(),
  routes: adminRoutes
})

export default adminRouter
