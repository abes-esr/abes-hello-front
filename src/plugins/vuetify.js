import { createVuetify } from 'vuetify';
import 'vuetify/styles'; // Styles nécessaires pour Vuetify 3
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light', // Thème par défaut
  },
});
