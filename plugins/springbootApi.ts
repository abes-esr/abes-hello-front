import axios from "axios";

export default defineNuxtPlugin((nuxtApp) => {
    const { token, errorApi, errorApiMessage, errorApiMessageSecondLine } = useAuth();
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
                    errorApiMessage.value = "La ressource à laquelle vous avez tenté d'accéder ne peut être atteinte."
                    errorApiMessageSecondLine.value = "Merci de vous logger sur cette page. Si vous n'avez pas de compte, vous pouvez en créer un en passant par la page S'INSCRIRE."
                } else if (statusCode.toString().startsWith("5")) {
                    // Cas où le serveur n'est pas disponible
                    showError("Erreur serveur : la requête n'a pas pu aboutir.");
                } else if(error.response.data.debugMessage) {
                    // Cas où l'api renvoi un message d'erreur personnalisé
                    showError(error.response.data.debugMessage);
                } else {
                    showError("Une erreur interne est survenue.");
                }
            } else if (error.request) {

                showError("Erreur : le serveur n'est pas disponible")
            } else {
                showError("Une erreur interne est survenue.");
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
