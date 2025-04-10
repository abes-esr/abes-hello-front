export default defineNuxtRouteMiddleware(async () => {
  const { isLoggedIn, fetchUser } = useAuth();

  // Vérification côté serveur à l'initialisation
  onMounted(async () => {
    try {
      await fetchUser();
    } catch {
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
