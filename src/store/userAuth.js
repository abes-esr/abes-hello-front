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
        getisRequestSuccess: (state) => state.isRequestSuccess,
        getResponseFromApi: (state) => state.responseFromApi,
    },
    actions: {
        setLoginData(user, token) {
            this.authenticated = true;
            this.user = user;
            this.token = token;
            this.isRequestSuccess = true;
            sessionStorage.setItem('user', JSON.stringify(this.user));
            sessionStorage.setItem('token', this.token);
        },
        logout() {
            this.authenticated = false;
            this.user = null;
            this.token = null;
            sessionStorage.setItem('user', JSON.stringify(this.user));
            sessionStorage.setItem('token', this.token);
        },
        setResponseFromApi(response) {
            this.responseFromApi = response;
        },
        setUser(user, token){
            this.user = user;
            this.token = token;
        },
        setError(errorMessage) {
            this.errorApi = true;
            this.errorApiMessage = errorMessage;
        },
    }
});

// TODO vérifier le code ci-dessus et si ok alors supprimer le code mort ci-dessous

// export default {
//     namespaced: true,
//     state: {
//         token: null,
//         user: null,
//         resApi: null,
//         isLoggedIn: false,
//         errorApi: false,
//     },
//     getters: {
//         authenticated(state) {
//             return state.token;
//         },
//         user(state){
//             return state.user;
//         },
//         isLogged(state){
//             return state.isLoggedIn;
//         },
//         resApi(state){
//             return state.resApi;
//         },
//         errorApi(state) {
//             return state.errorApi;
//         }
//     },
//     mutations: {
//         SET_TOKEN(state, token) {
//             state.token = token.accessToken;
//             state.user = token.userName;
//             state.resApi = token;
//             state.isLoggedIn = true;
//
//         },
//         SET_ERROR(state, msg) {
//             state.token = null;
//             state.user = null;
//             state.resApi = msg;
//             state.isLoggedIn = false;
//             state.errorApi = true;
//         },
//         SET_LOGOUT(state) {
//             state.token = null;
//             state.user = null;
//             state.isLoggedIn = false;
//             state.errorApi = false;
//         }
//     },
//     actions: {
//         async loginAction( { dispatch , state},auth) {
//             state.errorApi = false;
//             let res = await axios.post(process.env.VUE_APP_ROOT_API + '/login', auth)
//                 .then(res => dispatch('successLogin', res.data))
//                 .catch(error => dispatch('errorLogin', error));
//
//         },
//         async successLogin( { commit }, token) {
//             commit('SET_TOKEN', token);
//         },
//         async errorLogin( { commit }, msg) {
//             commit('SET_ERROR', msg);
//         },
//         async logOutAction( { commit }) {
//             commit('SET_LOGOUT');
//         },
//     },
//     module: {
//
//     }
// }