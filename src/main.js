import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import store from './store';
import vuetify from './plugins/vuetify';

const app = createApp(App);

// Définition globale d'Axios
app.config.globalProperties.$http = axios;

app
  .use(router)
  .use(store)
  .use(vuetify)
  .mount('#app');
