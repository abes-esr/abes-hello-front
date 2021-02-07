<template>
  <div>

    <login-form @loginAction="loginAction" :buttonLoading="isLoading"/>

    <base-api-response v-if="errorApi">
      <h4 class="mt-10"> <code>{{ userState.errorMessage }}</code> </h4>
    </base-api-response>

  </div>
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

  isLoading = false;
  errorApi = false;

  @State('user') userState: UserState | undefined ;
  @Action('doLogin', { namespace }) doLogin: any;
  @Getter('getUserName', { namespace }) userName: string | undefined;
  @Getter('getSecretToken', { namespace }) secretToken: string | undefined;
  @Getter('getIsLogged', { namespace }) getIsLogged: boolean | undefined;

  async loginAction(user: any) {
    this.errorApi = false;
    this.isLoading = true;
    await this.doLogin(user);
    if(this.getIsLogged) {
      this.isLoading = false;
      await this.$router.push({ name: 'DashBoard' });
    }else {
      this.errorApi = true;
      this.isLoading = false;
    }
  }
}
</script>

