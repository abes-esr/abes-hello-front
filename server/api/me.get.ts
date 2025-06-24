import decodeJwtToken from "~/utils/decodeJwtToken";

export default defineEventHandler(async (event) => {
  const token = getCookie(event, "auth_token");
  const now = Math.floor(Date.now() / 1000); // en secondes

  if (!token) {
    throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
  }

  const decodedToken = decodeJwtToken(token);

  if (decodedToken.exp < now) {
    throw createError({ statusCode: 401, statusMessage: "Token Expired" });
  }

  return {
    user: { userName: decodedToken.sub },
    timeout: 20,
    accessToken: token,
  };
});
