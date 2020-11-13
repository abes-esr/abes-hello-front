import axios from 'axios'

export default {
    namespaced: true,
    state: {
        token: null,
        user: null,
        resApi: null,
        isLoggedIn: false,
    },
    getters: {
        authenticated(state) {
            return state.token;
        },
        user(state){
            return state.user;
        },
        isLogged(state){
            return state.isLoggedIn;
        },
        resApi(state){
            return state.resApi;
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
        },
        SET_LOGOUT(state) {
            state.token = null;
            state.user = null;
            state.isLoggedIn = false;
        }
    },
    actions: {
        async loginAction( { dispatch },auth) {
            let res = await axios.post("http://localhost:8081/login", auth)
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
    },
    module: {

    }
}