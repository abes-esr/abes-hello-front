import { Module } from "vuex";
import { RootState } from "@/store/types";
import { UserState } from "@/store/user/types";
import { getters} from "@/store/user/getters";
import { mutations} from "@/store/user/mutations";
import { actions } from "@/store/user/actions";

const namespaced = true;

const state: UserState = {
  user: undefined,
  error: false,
  errorMessage: "",
  isLogged: false,

}

export const user: Module<UserState, RootState> = {
  namespaced,
  state,
  getters,
  mutations,
  actions
}