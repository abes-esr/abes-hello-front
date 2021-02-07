<template>
  <RegisterForm @registerAction="registerAction"/>
</template>

<script lang="ts">

import { Component, Vue } from "vue-property-decorator";
import LoginForm from "@/components/authentification-components/LoginForm.vue";
import { Action, Getter, State } from "vuex-class";
import { UserState, User } from "@/store/user/types";
import RegisterForm from "@/components/authentification-components/RegisterForm.vue";

const namespace = "user";

@Component({
  components: {
    RegisterForm,
  }
})
export default class Register extends Vue {

  @State('user') userState: UserState | undefined ;
  @Action('doRegister', { namespace }) doRegister: any;
  @Getter('getUserName', { namespace }) userName: string | undefined;
  @Getter('getSecretToken', { namespace }) secretToken: string | undefined;
  @Getter('getIsLogged', { namespace }) getIsLogged: boolean | undefined;

  async registerAction(user: any) {
    await this.doRegister(user);
    console.log(this.userState);
  }
}
</script>

