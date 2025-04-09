export const useAuthorizationMiddleware = () => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn.value) {
    navigateTo("/login");
  }

  // TODO : Auth par nuxt coté serveur
  // TODO : Pb d'affichage côté client

  // watch(isLoggedIn, (newIsLoggedIn) => {
  //   if (!newIsLoggedIn) {
  //     navigateTo("/login");
  //   }
  // });
};
