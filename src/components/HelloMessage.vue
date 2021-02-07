<template>
  <v-container>
    <base-logo />

    <base-api-response>
      <h4 class="mt-10" v-if="loading">Loading data ...</h4>
      <h4 class="mt-10" v-else> <code>{{resApi}}</code> </h4>
    </base-api-response>

  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { AxiosRequest } from "@/axios/AxiosRequest";


@Component({
  components: {

  }
})
export default class Home extends Vue {
  public resApi: any;
  public loading = true;


  async mounted(): Promise<void> {
    this.resApi = await AxiosRequest.getPublicMessage().then(res => { return res.data} )
                                                        .catch(err => {  return "Can not connect to server: " + err.message});
    if(this.resApi !== null) {
      this.loading = false;
      console.log(this.resApi);
    }
  }
}
</script>
