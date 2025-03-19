import { createStore } from 'vuex'
import auth from './auth'
import authToken from './authtoken'

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    authToken,
  }
})
