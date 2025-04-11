export default defineNuxtRouteMiddleware(async () => {
  const { isLoggedIn, fetchUser } = useAuth();

  // Vérification côté serveur à l'initialisation
  onMounted(async () => {
    console.log("guest verify");
    try {
      await fetchUser();
      navigateTo("/account");
    } catch {
      console.log("guest serveur not loggedIn");
      return;
    }
  });

  // Vérification côté client au changement
  watch(isLoggedIn, (newValue) => {
    console.log("guest-only", newValue);
    if (newValue) {
      navigateTo("/account");
    }
  });
});
