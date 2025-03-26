import { defineStore } from "pinia";
import axios from "axios";

export const userAuthToken = defineStore('userAuthToken', {
    state: () => ({
        validToken: null,
    }),
    getters: {
        authenticated(state) {
            return state.validToken
        },
    },
    actions: {
        async sendHeaderToken({commit, rootState, state}, urlApi) {
            let config = {
                headers: {
                    'Authorization': 'Bearer ' + rootState.auth.token,
                },
            }
            await axios.get(urlApi,config).then(res => {
                state.validToken = rootState.auth.token;
            })
                .catch(error => {
                    rootState.auth.isLoggedIn= false;
                    rootState.auth.token = null;
                    rootState.auth.user = null;
                });
        },
    }
})

// TODO vérifier le code ci-dessus et si ok alors supprimer le code mort ci-dessous

// import axios from 'axios'
//
// export default {
//     namespaced: true,
//     state: {
//         validToken:null,
//     },
//     getters: {
//         authenticated(state) {
//             return state.validToken;
//         },
//     },
//     actions: {
//         async sendHeaderToken({commit, rootState, state}, urlApi) {
//             let config = {
//                 headers: {
//                     'Authorization': 'Bearer ' + rootState.auth.token,
//                 },
//             }
//             await axios.get(urlApi,config).then(res => {
//                 state.validToken = rootState.auth.token;
//             })
//                 .catch(error => {
//                     rootState.auth.isLoggedIn= false;
//                     rootState.auth.token = null;
//                     rootState.auth.user = null;
//                 });
//         },
//
//     }
//
// }