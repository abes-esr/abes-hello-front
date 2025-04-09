import axios from "axios";

export default defineNuxtRouteMiddleware(async () => {
  try {
    await axios.get("/api/me");
    return true;
  } catch {
    return navigateTo("/login");
  }
});
