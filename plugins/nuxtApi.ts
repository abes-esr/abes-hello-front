import axios from "axios";

export default defineNuxtPlugin((nuxtApp) => {
  axios.defaults.url = 'api/v1';
  const client = axios.create();

  client.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
        if (error.response) {
          const statusCode = error.response.status;
          if (statusCode === 401 || statusCode === 403) {
            // Redirige l'utilisateur s'il n'est pas connecté où s'il n'a pas les droits
            await nuxtApp.runWithContext(() => navigateTo("/login"));
          } else if (statusCode.toString().startsWith("5")) {
            // Cas où le serveur n'est pas disponible
            showError("Erreur serveur : la requête n'a pas pu aboutir.");
            // throw new Error("Erreur serveur : la requête n'a pas pu aboutir.");
          } else if (error.response.data.debugMessage) {
            // Cas où l'api renvoi un message d'erreur personnalisé
            showError(error.response.data.debugMessage);
          } else {
            showError("Une erreur interne est survenue.");
          }
        } else if (error.request) {
          showError("Erreur : le serveur n'est pas disponible");
        } else {
          showError("Une erreur interne est survenue.");
        }
    }
  );

  // Expose to useNuxtApp().$nuxtApi
  return {
    provide: {
      nuxtApi: client,
    },
  };
});
