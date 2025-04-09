import decodeJwtToken from "~/utils/decodeJwtToken";

export default defineEventHandler((event) => {
  const token = getCookie(event, "auth_token");

  if (!token) {
    throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
  }

  const decodedToken = decodeJwtToken(token);

  return { userName: decodedToken.sub };
});
