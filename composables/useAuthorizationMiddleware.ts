export const useAuthorizationMiddleware = () => {
  const { isLoggedIn } = useAuth();

  watch(isLoggedIn, (newIsLoggedIn) => {
    if (!newIsLoggedIn) {
      navigateTo("/login");
    }
  });
};
