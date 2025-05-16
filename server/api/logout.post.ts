// server/api/logout.post.ts
export default defineEventHandler(async (event) => {
  deleteCookie(event, "auth_token");
  return { success: true };
});
