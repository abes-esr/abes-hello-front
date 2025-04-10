import axios from "axios";

export const useClientApi = () => {
    const config = useRuntimeConfig();

    return axios.create({
        baseURL: config.public.apiURL,
        timeout: 2000,
    });
}

