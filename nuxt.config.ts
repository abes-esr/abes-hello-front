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
    // placer ici les variables secrètes du projet, elles ne seront disponibles uniquement côté serveur
    // Dans les fichiers .env et docker-compose.yml, la variable doit avoir le préfixe NUXT_ (exemple ici : NUXT_API_URL). Ecrire le suffixe de la variable ici en camel case
    // apiURL: ''
    public: {
      // placer ici les variables communes du projet, elles seront exposées au client
      apiURL: '', // Dans les fichiers .env et docker-compose.yml, la variable doit avoir le préfixe NUXT_PUBLIC_ (exemple ici : NUXT_PUBLIC_API_URL). Ecrire le suffixe de la variable ici en camel case
    },
  },

  modules: [
    "@nuxt/icon",
    "@nuxt/fonts",
    "@nuxt/ui",
    "vuetify-nuxt-module",
  ],
});
