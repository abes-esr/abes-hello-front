<template>
  <div>
    <base-logo />
    <base-api-response>
      <h4 class="mt-10" v-if="loading">Loading data ...</h4>
      <h4 class="mt-10" v-else> <code>{{resApi}}</code> </h4>
    </base-api-response>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Getter, State } from "vuex-class";
import { UserState } from "@/store/user/types";
import { AxiosRequest } from '@/axios/AxiosRequest';

const namespace = "user"
@Component
export default class SecurePage extends Vue {

  resApi: any;
  loading = true;

  @State('user') userState: UserState | undefined ;
  @Getter('getSecretToken', { namespace }) secretToken: string | undefined;
  @Getter('getIsLogged', { namespace }) getIsLogged: boolean | undefined;

  async mounted(): Promise<void> {
    if(this.getIsLogged && this.secretToken !== ""){
      this.resApi = await AxiosRequest.getPrivateMessage(this.secretToken! + " 66")
                    .then(res => {
                      if(res.status == 200) {
                        return res.data;
                      }
                    })
                    .catch(err => {
                      return "Can not connect to server: " + err.message ;
                    });
    }

    if(this.resApi !== null) {
      this.loading = false;
    }
  }

}
</script>
