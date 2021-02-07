<template>
  <v-container>
    <base-logo />

    <v-row class="text-center">
      <v-col cols="12">
        <h1 class="mt-10">Bienvenue à l'Abes : {{userName}}</h1>
      </v-col>
    </v-row>

    <base-api-response>
      <h4 class="mt-10"> <code>{{userState.user}}</code> </h4>
    </base-api-response>

  </v-container>

</template>

<script lang="ts">

import { Component, Vue } from "vue-property-decorator";
import { Action, Getter, State } from "vuex-class";
import { UserState } from "@/store/user/types";

const namespace = "user";

@Component
export default class DashBoard extends Vue {

  @State('user') userState: UserState | undefined ;
  @Getter('getUserName', { namespace }) userName: string | undefined;
  @Getter('getSecretToken', { namespace }) secretToken: string | undefined;
  @Getter('getIsLogged', { namespace }) getIsLogged: boolean | undefined;

}

</script>

