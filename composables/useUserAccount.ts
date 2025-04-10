import {useClientApi} from "~/composables/useClientApi";

export const useUserAccount = () => {

    const client = useClientApi();
    const { token } = useAuth();

    const getAccessToCommandsList = async () => {
        const configTest = {
            headers: { Authorization: "Bearer " + token.value },
        };
        return await client.get("/secured", configTest);
    }

    const getCommandsListFromApi = async () => {
        const configTest = {
            headers: { Authorization: "Bearer " + token.value },
        };
        return await client.get("/secured/commande", configTest);
    }
    return {
        getAccessToCommandsList,
        getCommandsListFromApi,
    }
}
