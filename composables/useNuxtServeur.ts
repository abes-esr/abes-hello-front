import type { AxiosInstance } from "axios";

export function useNuxtServeur(url: string) {
  const client = useNuxtApp().$clientAxiosNuxtServeur as AxiosInstance;

  const get = async () => {
    return await client.get(url);
  };

  const post = async (payload: Record<string, string>) => {
    return await client.post(url, payload);
  };

  return {
    get,
    post,
  };
}
