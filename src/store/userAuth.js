import { defineStore } from "pinia";

export const userAuth = defineStore('userAuth', {
    state: () => ({
        user: JSON.parse(sessionStorage.getItem('user')),
        token: sessionStorage.getItem('token'),
        authenticated: !!sessionStorage.getItem('token'),
        errorApi: false,
        errorApiMessage: null,
        isRequestSuccess: false,
        responseFromApi: null,
        isLoggedIn: false,
    }),
    getters: {
        getUser: (state) => state.user,
        getToken: (state) => state.token,
        getIsAuthenticated: (state) => state.authenticated,
        getErrorApi: (state) => state.errorApi,
        getErrorApiMessage: (state) => state.errorApiMessage,
        getIsLogged: (state) => state.isLoggedIn,
        getIsRequestSuccess: (state) => state.isRequestSuccess,
        getResponseFromApi: (state) => state.responseFromApi,
    },
    actions: {
        setLoginData(user, token) {
            this.authenticated = true;
            this.user = user;
            this.token = token;
            this.isRequestSuccess = true;
            this.isLoggedIn = true;
            sessionStorage.setItem('user', JSON.stringify(this.user));
            sessionStorage.setItem('token', this.token);
        },
        logout() {
            this.authenticated = false;
            this.user = null;
            this.token = null;
            this.isLoggedIn = false;
            sessionStorage.setItem('user', JSON.stringify(this.user));
            sessionStorage.setItem('token', this.token);
        },
        setResponseFromApi(response) {
            this.responseFromApi = response;
        },
        setRequestSuccess(stateRequestSuccess) {
            this.isRequestSuccess = stateRequestSuccess;
        },
        setError(errorMessage) {
            this.errorApi = true;
            this.errorApiMessage = errorMessage;
        },
    }
});