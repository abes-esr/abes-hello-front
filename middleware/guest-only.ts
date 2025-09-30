export default defineNuxtRouteMiddleware(async () => {
  const { isLoggedIn, fetchUser } = useAuth();

  // Vérification côté serveur à l'initialisation
  onMounted(async () => {
    try {
      await fetchUser();
      navigateTo("/account");
    } catch {
      return;
    }
  });

  // Vérification côté client au changement
  watch(isLoggedIn, (newValue) => {
    if (newValue) {
      navigateTo("/account");
    }
  });
});
