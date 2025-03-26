import { defineStore } from "pinia";
import axios from "axios";

export const userAuth = defineStore('userAuth', {
    state: () => ({
        token: null,
        user: null,
        resApi: null,
        isLoggedIn: false,
        errorApi: false,
    }),
    getters: {
        authenticated(state) {
            return state.token
        },
        user(state) {
            return state.user
        },
        isLogged(state) {
            return state.isLoggedIn
        },
        resApi(state) {
            return state.resApi
        },
        errorApi(state) {
            return state.errorApi
        },
    },
    mutations: {
        SET_TOKEN(state, token) {
            state.token = token.accessToken;
            state.user = token.userName;
            state.resApi = token;
            state.isLoggedIn = true;

        },
        SET_ERROR(state, msg) {
            state.token = null;
            state.user = null;
            state.resApi = msg;
            state.isLoggedIn = false;
            state.errorApi = true;
        },
        SET_LOGOUT(state) {
            state.token = null;
            state.user = null;
            state.isLoggedIn = false;
            state.errorApi = false;
        }
    },
    actions: {
        async loginAction( { dispatch , state},auth) {
            state.errorApi = false;
            let res = await axios.post(import.meta.env.VITE_APP_ROOT_API + '/login', auth)
                .then(res => dispatch('successLogin', res.data))
                .catch(error => dispatch('errorLogin', error));

        },
        async successLogin( { commit }, token) {
            commit('SET_TOKEN', token);
        },
        async errorLogin( { commit }, msg) {
            commit('SET_ERROR', msg);
        },
        async logOutAction( { commit }) {
            commit('SET_LOGOUT');
        },
    }
})

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