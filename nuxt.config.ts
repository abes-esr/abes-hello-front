// https://nuxt.com/docs/api/configuration/nuxt-config
import {process} from "std-env";
import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  // Gestion des log
  logLevel: 'info',
  $test: { logLevel: 'info'},
  $development: { logLevel: 'verbose' },
  $production: { logLevel: 'info' },
  $env: {
    staging: { logLevel: 'info' },
  },

  // Voir la différence entre les variables placées ici
  // et celles placées dans le runtimeConfig du nuxt.config.ts :
  // https://nuxt.com/docs/getting-started/configuration#runtimeconfig-vs-appconfig
  runtimeConfig: {
    bddLogin: process.env.TEST_BDD_LOGIN, // placer ici des variables sensibles (elles ne seront pas exposées au client). Exemple avec une valeur récupérée dans le .env
    public: { // placer ici les variables communes du projet, elles seront exposées au client
      apiURL: process.env.TEST_API_URL, // exemple avec une valeur récupérée dans le .env. Elle est utilisée dans le index.vue
    }
  },

  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/icon',
    '@nuxt/fonts',
    '@nuxt/test-utils',
    '@nuxt/ui',
    'vuetify-nuxt-module',
  ],
})