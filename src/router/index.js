import { createRouter, createWebHashHistory } from 'vue-router'
import admisionRouter from "../components/Admisiones/routes/admin-router";
import adminRouter from "../components/Administrador/routes/administrador-router";


const routes = [
  {
    path: '/admision',
    name: 'admision',
    component: () => import(/* webpackChunkName: "about" */ '../components/Admisiones/views/admisiones.vue'),
    // children:[
    //   {
    //     path:'/formulario',
    //     name: 'formulario',
    //     component: () => import(/* webpackChunkName: "counter" */ '../components/Admisiones/components/formulario.vue'),

    //   },
    // ]
  },
  // {
  //       path:'/formulario',
  //       name: 'formulario',
  //       component: () => import(/* webpackChunkName: "counter" */ '../components/Admisiones/components/formulario.vue'),

  //     },
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
    component: () => import(/* webpackChunkName: "about" */ '../views/LandingViews/Administrador.vue')
  },
  {
    path: '/jefe',
    name: 'jefe',
    component: () => import(/* webpackChunkName: "about" */ '../views/LandingViews/Jefe.vue')
  },
 {
      path:'/estudiantes',
     name: 'estudiantes',
     component: () => import(/* webpackChunkName: "counter" */ '../components/Logins/loginEstudiante.vue'),
     meta:{title:'Estudiante'}

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
  ...adminRouter.options.routes

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
