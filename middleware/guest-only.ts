export default defineNuxtRouteMiddleware(async () => {
  const { isLoggedIn, fetchUser } = useAuth();

  // Vérification côté serveur à l'initialisation
  onMounted(async () => {
    try {
      await fetchUser();
      navigateTo("/login");
    } catch {
      return;
    }
  });

  // Vérification côté client au changement
  watch(isLoggedIn, (newValue) => {
    console.log("guest-only", newValue);
    if (!newValue) {
      navigateTo("/login");
    }
  });
});
