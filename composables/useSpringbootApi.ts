import type { AxiosInstance } from "axios";

export function useSpringbootApi() {
  const client = useNuxtApp().$springbootApi as AxiosInstance;

  return client;
}
