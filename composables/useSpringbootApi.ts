import type { AxiosInstance } from "axios";

export function useSpringbootApi() {
  const client = useNuxtApp().$clientAxiosApi as AxiosInstance;

  return client;
}
