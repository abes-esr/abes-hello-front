import { GetterTree } from "vuex";
import { UserState } from "@/store/user/types";
import { RootState } from "@/store/types";

export const getters: GetterTree<UserState, RootState> = {

  getUserName(state): string {
    const { user } = state;
    return (user && user.userName) || '';
  },

  getIsLogged(state): boolean {
    return (state && state.isLogged) || false;
  },

  getSecretToken(state): string {
    const { user } = state;
    return (user && user.accessToken) || '';

  }
}