import axios from "axios";

export default defineNuxtPlugin((nuxtApp) => {
    const { token, errorApi, errorApiMessage } = useAuth();
    const config = useRuntimeConfig();

    const client = axios.create({
        baseURL: config.public.apiURL, // cf nuxt.config.ts
    });

    // Ajout de l'intercepteur
    client.interceptors.request.use(
        (config) => {
            if (token.value) {
                // Si le token existe alors on l'envoie au serveur
                config.headers.Authorization = `Bearer ${token.value}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    client.interceptors.response.use(
        (response) => {
            return response;
        },
        async (error) => {
            if(error.response) {
                const statusCode = error.response.status;
                if (statusCode === 401 || statusCode === 403) {
                    // Redirige l'utilisateur s'il n'est pas connecté où s'il n'a pas les droits
                    await nuxtApp.runWithContext(() => navigateTo("/login"));
                    errorApi.value = true;
                    errorApiMessage.value = "Vous devez être loggé pour accéder à cette ressource."
                } else if (statusCode.toString().startsWith("5")) {
                    // Cas où le serveur n'est pas disponible
                    throw new Error("Une erreur interne est survenue.");
                } else if(error.response.data.debugMessage) {
                    // Cas où l'api renvoi un message d'erreur personnalisé
                    throw new Error(error.response.data.debugMessage);
                } else {
                    throw new Error("Une erreur interne est survenue.");
                }
            } else if (error.request) {
                throw new Error("Erreur lors de la requête : " + error)
            } else {
                throw new Error("Une erreur interne est survenue.");
            }
        }
    )

    // Expose to useNuxtApp().$springbootApi
    return {
        provide: {
            springbootApi: client,
        },
    };
});
