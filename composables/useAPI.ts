import type { AxiosInstance } from "axios";

export function useAPI(url: string) {
  const client = useNuxtApp().$clientAxiosApi as AxiosInstance;

  const get = async () => {
    return await client.get(url);
  };

  return {
    get,
  };
}
