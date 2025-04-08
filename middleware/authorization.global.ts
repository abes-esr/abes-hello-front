import { userAuth } from "~/composables/userAuth";

export default defineNuxtRouteMiddleware((to, from) => {
    let isLoggedIn = userAuth().getIsLogged;
    if(to.matched.some(record => record.meta.requiresAuth)) {
        if (!isLoggedIn) {
            navigateTo('/login');
        }
    }
})