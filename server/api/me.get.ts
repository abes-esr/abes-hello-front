import axios from "axios";
import decodeJwtToken from "~/utils/decodeJwtToken";

export default defineEventHandler(async (event) => {
  const token = getCookie(event, "auth_token");
  const config = useRuntimeConfig();
  const apiUrl = config.apiUrl;

  if (!token) {
    throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
  }

  try {
    await axios.get(`${apiUrl}/secured`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch {
    throw createError({ statusCode: 401, statusMessage: "Token Expired" });
  }

  const decodedToken = decodeJwtToken(token);

  return { userName: decodedToken.sub };
});
