export default defineNuxtPlugin((nuxtApp) => {
  const { token } = useAuth();
  const config = useRuntimeConfig();

  const api = $fetch.create({
    baseURL: config.public.apiURL, // cf nuxt.config.ts
    onRequest({ options }) {
      if (token.value) {
        // Si le token existe alors on l'envoie au serveur
        options.headers.set("Authorization", `Bearer ${token.value}`);
      }
    },
    async onResponseError({ response }) {
      if (response.status === 401 || response.status === 403) {
        // Redirige l'utilisateur si il n'est pas connecté où si il n'a pas les droits
        await nuxtApp.runWithContext(() => navigateTo("/login"));
      } else if (response.status.toString().startsWith("5")) {
        // Cas où le serveur n'est pas disponible
        throw new Error("Une erreur interne est survenue.");
      } else {
        try {
          const data = await response.json();
          if (data.debugMessage) {
            throw new Error(data.debugMessage);
          }
          throw new Error("Une erreur interne est survenue.");
        } catch {
          // Cas quand le serveur renvoie une réponse qui n'est pas du JSON
          throw new Error("Une erreur interne est survenue.");
        }
      }
    },
  });

  // Expose to useNuxtApp().$api
  return {
    provide: {
      api,
    },
  };
});
