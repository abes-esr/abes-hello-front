// https://nuxt.com/docs/api/configuration/nuxt-config
import { process } from "std-env";

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },

  // Gestion des log
  logLevel: "info",
  $test: { logLevel: "info" },
  $development: { logLevel: "verbose" },
  $production: { logLevel: "info" },
  $env: {
    staging: { logLevel: "info" },
  },

  // Voir la différence entre les variables placées ici
  // et celles placées dans le runtimeConfig du nuxt.config.ts :
  // https://nuxt.com/docs/getting-started/configuration#runtimeconfig-vs-appconfig
  runtimeConfig: {
    apiUrl: process.env.VITE_APP_ROOT_API,
    public: {
      // placer ici les variables communes du projet, elles seront exposées au client
      apiURL: process.env.VITE_APP_ROOT_API, // exemple avec une valeur récupérée dans le .env. Elle est utilisée dans le index.vue
    },
  },

  modules: [
    "@nuxt/eslint",
    "@nuxt/icon",
    "@nuxt/fonts",
    "@nuxt/test-utils",
    "@nuxt/ui",
    "vuetify-nuxt-module",
  ],
});
