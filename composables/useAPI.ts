import type { UseFetchOptions } from "nuxt/app";

export const useAPI = async <T>(
  url: string | (() => string),
  options?: UseFetchOptions<T>
) => {
  const loading = useState("loading", () => false);
  const { token } = useAuth();
  const config = useRuntimeConfig();

  return {
    ...(await useFetch(url, {
      baseURL: config.public.apiURL,
      onRequest({ options }) {
        console.log("token", token.value);
        if (token.value) {
          options.headers.set("Authorization", "Bearer " + token.value);
        }
      },
      onResponse() {
        loading.value = false;
      },
      async onResponseError({ response }) {
        if (response.status === 401) {
          navigateTo("/login");
        } else if (response.status.toString().startsWith("5")) {
          throw new Error("Une erreur interne est survenue.");
        } else {
          try {
            const data = await response.json();
            if (data.debugMessage) {
              throw new Error(data.debugMessage);
            }
            throw new Error("Une erreur interne est survenue.");
          } catch {
            throw new Error("Une erreur interne est survenue.");
          }
        }
      },
      ...options,
    })),
    loading,
  };
};
