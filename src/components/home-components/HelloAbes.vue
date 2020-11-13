<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
          :src="require('@/assets/picture/logo_abes.jpg')"
          class="my-3"
          contain
          height="100"
        />
      </v-col>
    </v-row>

    <v-row class="text-center">
      <v-col cols="12">
        <h3 class="mb-5">La réponse de serveur API</h3>
        <v-divider class="mx-4"></v-divider>
      </v-col>
    </v-row>
    
    <v-row class="text-center">
      <v-col cols="12">
        <h4 class="mt-10" v-if="loading">Loading data ...</h4>
        <h4 class="mt-10" v-else><code>{{resApi}}</code></h4>
      </v-col>
    </v-row>
    
  </v-container>
</template>

<script>

  export default {
    name: 'HelloAbes',

    data: () => ({

      publicApi: 'http://localhost:8081',
      resApi:'',
      loading: true,

    }),
    created: function() {
      this.$http.get(this.publicApi)
      .then(res => {
        setTimeout(() => {
          this.resApi = res.data;
          this.loading = false;
        }, 2000)
        
      })
      .catch(error => {
        this.resApi = error;
        this.loading = false;
      })
    
    }
  }
</script>
