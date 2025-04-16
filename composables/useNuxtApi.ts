import type { AxiosInstance } from "axios";

export function useNuxtApi() {
  const client = useNuxtApp().$clientAxiosNuxtServeur as AxiosInstance;

  return client;
}
