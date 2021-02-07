import { ActionTree } from "vuex";
import { User, UserState } from "@/store/user/types";
import { RootState } from "@/store/types";
import { AxiosRequest } from "@/axios/AxiosRequest";

export const actions: ActionTree<UserState, RootState> = {

  async doLogin({ commit }, user): Promise<void> {
    await AxiosRequest.doLogin(user).then(res => {
      if(res.status === 200) {
        const payload: User = res.data;
        commit('setUserLoaded', payload)
      } else {
        commit('setUserError', res.data)
      }
    })
      .catch(err => commit('setUserError', err.message) )
  },

  doLogout({ commit }): void {
    commit("setUserLogout");
  },

  async doRegister({ commit }, user): Promise<void> {
    await AxiosRequest.doRegister(user).then(res => {
      if(res.status === 200) {
        const payload: User = res.data;
        commit('setUserLoaded', payload)
      } else {
        commit('setUserError', res.data)
      }
    })
      .catch(err => commit('setUserError', err.message) )
  }
}