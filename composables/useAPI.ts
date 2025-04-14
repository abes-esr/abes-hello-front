import {type AxiosInstance} from "axios";

export function useAPI<T>(
  url: string,
) {
  const client = useNuxtApp().$clientAxiosApi as AxiosInstance;

  const get = async () => {
    return await client.get(url);
  }

  return {
    get,
  }
}
