import axios, { AxiosError } from "axios";

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);
        const config = useRuntimeConfig();
        const apiUrl = config.apiUrl;
        const response = await axios.post(`${apiUrl}/api/v1/register`, body);
        const { accessToken, userName } = response.data;
        return { userName, accessToken };

    } catch (error: unknown) {
        if (error instanceof AxiosError) {
            throw createError({
                statusCode: error.response?.status ?? 500,
                statusMessage: error.response?.data?.message ?? "register failed",
            });
        }
        throw createError({
            statusCode: 500,
            statusMessage: "register failed",
        });
    }
});
