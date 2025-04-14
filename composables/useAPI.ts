import type { UseFetchOptions } from "nuxt/app";
import axios from "axios";

export function useAPI<T>(
  url: string,
  // url: string | (() => string),
  options?: UseFetchOptions<T>
) {
  const { $api } = useNuxtApp();

  return async () => {
    await axios.get(url);
  }

  // return useFetch(url, {
  //   ...options,
  //   $fetch: $api,
  // });
}
