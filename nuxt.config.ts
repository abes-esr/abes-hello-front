// https://nuxt.com/docs/api/configuration/nuxt-config
import { process } from "std-env";

export default defineNuxtConfig({
// Active les sources maps
  sourceMap: {
    server: true,
    client: true,
  },

  // Configuration Vite pour les DevTools
  vite: {
    build: {
      sourcemap: true,  // Génère les sources maps
    },
  },
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
    apiUrl: process.env.NUXT_API_URL!,
    public: {
      // placer ici les variables communes du projet, elles seront exposées au client
      apiURL: process.env.NUXT_API_URL!, // exemple avec une valeur récupérée dans le .env. Elle est utilisée dans le index.vue
    },
  },

  modules: [
    "@nuxt/icon",
    "@nuxt/fonts",
    "@nuxt/ui",
    "vuetify-nuxt-module",
  ],
});
