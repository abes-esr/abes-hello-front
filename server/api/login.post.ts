import axios, { AxiosError } from "axios";
import { setCookie } from "h3";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const config = useRuntimeConfig();
    const apiUrl = config.apiUrl;

    console.log(body, apiUrl);

    const response = await axios.post(`${apiUrl}/login`, body);
    const { accessToken, userName } = response.data;

    console.log(accessToken, userName);

    setCookie(event, "auth_token", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 jours
    });

    return { userName, accessToken };
  } catch (error: any) {
    if (error instanceof AxiosError) {
      throw createError({
        statusCode: error.response?.status ?? 500,
        statusMessage: error.response?.data?.message ?? error.message,
      });
    }
    throw createError({
      statusCode: 500,
      statusMessage: error.message,
    });
  }
});
