import type { AxiosInstance } from "axios";

export function useNuxtApi() {
  const client = useNuxtApp().$nuxtApi as AxiosInstance;

  return client;
}
