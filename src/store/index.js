import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import authToken from './authtoken'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth,
    authToken,
  }
})
