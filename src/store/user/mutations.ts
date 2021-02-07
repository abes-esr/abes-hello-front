import { MutationTree } from "vuex";
import { User, UserState } from "@/store/user/types";

export const mutations: MutationTree<UserState> = {

  setUserLoaded(state, payload: User){
    state.error = false;
    state.user = payload;
    state.isLogged = true;
  },

  setUserError(state, payload: string){
    state.user = undefined;
    state.isLogged = false;
    state.error = true;
    state.errorMessage = payload;
  },

  setUserLogout(state){
    state.user = undefined;
    state.isLogged = false;
  }

}