// export default defineNuxtRouteMiddleware((to) => {
//   const { isLoggedIn } = useAuth();
//   if (to.matched.some((record) => record.meta.requiresAuth)) {
//     if (!isLoggedIn) {
//       navigateTo("/login");
//     }
//   }
// });
