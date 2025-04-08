export default defineAppConfig({
    title: 'TestNuxt',

    // Voir la différence entre les variables placées ici
    // et celles placées dans le runtimeConfig du nuxt.config.ts :
    // https://nuxt.com/docs/getting-started/configuration#runtimeconfig-vs-appconfig
    // exemple de variable accessible au projet. Elle est utilisée dans le index.vue
    exempleVariable: 'exempleVariable',

    // Gestion des thèmes visuels
    theme: {
        dark: true,
        colors: {
            primary: '#2196F3'
        }
    }
})