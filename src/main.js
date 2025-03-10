import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import  routeradmis from "./components/Admisiones/routes/admin-router.js";
import store from './store'

//fontawesome icons
import '@fortawesome/fontawesome-free/css/all.css'
import { aliases, fa } from 'vuetify/iconsets/fa'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// const vuetify = createVuetify({
//   components,
//   directives,
// })


const vuetify = new createVuetify({
  components,
  directives,
  theme: {
    themes: {
      light: {
        primary: '#3f51b5',
        secondary: '#b0bec5',
        accent: '#8c9eff',
        error: '#E8EAF6',
      },
    },
  },
})
//fontawesome
export default createVuetify({
  icons: {
    defaultSet: 'fa',
    aliases,
    sets: {
      fa,
    },
  },

})


createApp(App).use(store).use(router).use(vuetify).mount('#app')
