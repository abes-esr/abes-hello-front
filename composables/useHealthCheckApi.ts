import {useClientApi} from "~/composables/useClientApi";

export const useHealthCheckApi = () => {

    const client = useClientApi()

    const apiTestConnexion = async () => {
        return await client.get("/");
    }

    return {
        apiTestConnexion,
    }
}

