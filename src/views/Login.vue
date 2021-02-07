<template>
  <LoginForm @loginAction="loginAction"/>
</template>

<script lang="ts">

import { Component, Vue } from "vue-property-decorator";
import LoginForm from "@/components/authentification-components/LoginForm.vue";
import { Action, Getter, State } from "vuex-class";
import { UserState } from "@/store/user/types";

const namespace = "user";

@Component({
  components: {
    LoginForm
  }
})
export default class Login extends Vue {

  @State('user') userState: UserState | undefined ;
  @Action('doLogin', { namespace }) doLogin: any;
  @Getter('getUserName', { namespace }) userName: string | undefined;
  @Getter('getSecretToken', { namespace }) secretToken: string | undefined;
  @Getter('getIsLogged', { namespace }) getIsLogged: boolean | undefined;

  async loginAction(user: any) {
    await this.doLogin(user);
    if(this.getIsLogged) {
      await this.$router.push({ name: 'DashBoard' });
    }
  }
}
</script>

