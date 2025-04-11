export default defineNuxtRouteMiddleware(async () => {
  const { isLoggedIn, fetchUser } = useAuth();

  // Vérification côté serveur à l'initialisation
  onMounted(async () => {
    console.log("user verify");
    try {
      await fetchUser();
    } catch {
      console.log("user serveur not loggedIn");
      navigateTo("/login");
    }
  });

  // Vérification côté client au changement
  watch(isLoggedIn, (newValue) => {
    console.log("user-only", !newValue);
    if (!newValue) {
      navigateTo("/login");
    }
  });
});
