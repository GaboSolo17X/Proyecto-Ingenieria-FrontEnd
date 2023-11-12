import { createRouter, createWebHashHistory } from 'vue-router'
import admisionRouter from "../components/Admisiones/routes/admin-router";
import adminRouter from "../components/Administrador/routes/administrador-router";
import docenteRouter from "../components/Docente/routes/docente-router";
import estudianteRouter from "../components/Estudiantes/routes/estudiantes-router"


const routes = [
  {
    path: '/',
    name: 'Registro-UNAH',
    component: () => import(/* webpackChunkName: "about" */ '../components/landingPage/landingPage.vue')
  },
  {
    path: '/estudiantes',
    name: 'estudiantes',
    component: () => import(/* webpackChunkName: "about" */ '../views/LandingViews/Estudiantes.vue')
  },
  {
    path: '/docentes',
    name: 'docentes',
    component: () => import(/* webpackChunkName: "about" */ '../views/LandingViews/Docentes.vue'),
   
  },
  {
    path: '/coordinador',
    name: 'coordinador',
    component: () => import(/* webpackChunkName: "about" */ '../views/LandingViews/Coordinador.vue')
  },
  {
    path: '/administrador',
    name: 'administrador',
    component: () => import(/* webpackChunkName: "about" */ '../components/Administrador/views/adminDocentes')
  },
  {
    path: '/jefe',
    name: 'jefe',
    component: () => import(/* webpackChunkName: "about" */ '../views/LandingViews/Jefe.vue')
  },

  {
    path:'/login-estudiantes',
    name: 'login-estudiantes',
    component: () => import(/* webpackChunkName: "counter" */ '../components/Logins/loginEstudiante.vue'),
    meta:{title:'Coordinador'}

  },

  {
    path: '/login-docentes',
    name: 'login-docentes',
    component: () => import(/* webpackChunkName: "about" */ '../components/Logins/loginTrabajador.vue'),
    meta:{title:'Docente'},
    children:[
      {
        path:'/login-coordinador',
        name: 'login-coordinador',
        component: () => import(/* webpackChunkName: "counter" */ '../components/Logins/loginTrabajador.vue'),
        meta:{title:'Coordinador'}

      },
      {
        path:'/login-administrador',
        name: 'login-administrador',
        component: () => import(/* webpackChunkName: "counter" */ '../components/Logins/loginTrabajador.vue'),
        meta:{title:'coordinador'}

      },
      {
        path:'/login-jefeDep',
        name: 'login-jefeDep',
        component: () => import(/* webpackChunkName: "counter" */ '../components/Logins/loginTrabajador.vue'),
        meta:{title:'Coordinador'}

      },
      
    ]
  },
  ...admisionRouter.options.routes,
  ...adminRouter.options.routes,
  ...docenteRouter.options.routes,
  ...estudianteRouter.options.routes

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})




export default router