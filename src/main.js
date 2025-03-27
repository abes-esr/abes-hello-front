// Vue
import { createApp } from "vue"

// Router
import router from './router/router'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from "vuetify"
import '@mdi/font/css/materialdesignicons.css'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Components
import App from './App.vue'
import { createPinia } from "pinia";

const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi',
  },
  components,
  directives,
})

const pinia = createPinia();

createApp(App).use(vuetify).use(pinia).use(router).mount('#app')
