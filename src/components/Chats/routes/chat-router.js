import { createRouter, createWebHashHistory } from 'vue-router'


const chatRoutes = [
  {
    path: '/principalChats',
    name: 'Chats',
    component: () => import(/* webpackChunkName: "about" */ '../../../components/Chats/views/chatPrin.vue'),
  
  },
  
]

const chatRouter = createRouter({
  history: createWebHashHistory(),
  routes: chatRoutes
})

export default chatRouter
