// Vue
import { createApp } from "vue"

// Router
import router from './router/router'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from "vuetify"
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Components
import App from './App.vue'
// import Axios from 'axios'
import { createPinia } from "pinia";

// TODO continuer à intégrer Pinia dans les fichiers du dossier 'store'

const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
  components,
  directives,
})

const pinia = createPinia();

// Vue.config.productionTip = false;
// Vue.prototype.$http = Axios;

createApp(App).use(vuetify).use(pinia).use(router).mount('#app')
