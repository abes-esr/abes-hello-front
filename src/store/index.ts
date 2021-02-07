import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";
import { RootState } from "@/store/types";
import { user } from "@/store/user"
Vue.use(Vuex);

const store: StoreOptions<RootState> = {
  state: {
    helloMessage: "Hello Abes"
  },
  modules: {
    user
  }
};

export default new Vuex.Store<RootState>(store);
