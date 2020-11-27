<template>

  <v-container fluid>

    <div>
      <v-row class="text-center">
        <v-col cols="12">
          <v-img
              :src="require('@/assets/picture/logo_abes.jpg')"
              class="my-3"
              contain
              height="100"
          />
          <v-divider class="mx-4"></v-divider>
          <h1 class="mt-10">Bienvenue à l'Abes : {{user}}</h1>
        </v-col>
      </v-row>

      <v-row class="text-center">
        <v-col
          md="6"
          offset-md="3">
          <v-data-table
            :headers="tabHeader"
            :items="produits"
            :items-per-page="5"
            class="elevation-1"
          ></v-data-table>
        </v-col>
      </v-row>

    </div>

    <div v-if="!loading">
      <v-row class="text-center" >
        <v-col
            md="6"
            offset-md="3">
          <v-divider class="mx-4"></v-divider>
          <h1>La réponse de serveur API</h1>
          <h4 class="mt-10">
            <v-card
                elevation="2"
                class="pa-3"
            ><code>{{ resApi }}</code>
            </v-card>
          </h4>
        </v-col>
      </v-row>
    </div>

  </v-container>

</template>

<script>

import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'SecureApi',
  data: () => ({
    urlApi: 'http://localhost:8081/secured',
    resApi: '',
    loading: true,
    tabHeader:[
      {
        text: 'Produit',
        align: 'start',
        sortable: false,
        value: 'name',
      },
      { 
        text: 'Prix',
        value: 'prix'
      },
    ]

  }),
  computed: {
    ...mapGetters({
      isLoggedIn: 'auth/isLogged',
      token: 'authToken/authenticated',
      user: 'auth/user',
    })
  },
  created () {
    this.checkTokenAction(this.urlApi);
    setTimeout(async () => {
      let config = {
        headers: {
          Authorization: 'Bearer '+this.token,
        },
      }
      await this.$http.get(this.urlApi,config)
        .then(res => {
              this.resApi = res.data;
              this.loading = false;
          }
        )
        .catch(error => {
          this.resApi = error;
          this.$router.push({ name: 'LoginPage' });
          this.loading = false;
        })
    }, 2000);
  },
  methods: {

    ...mapActions({
      checkTokenAction: 'authToken/sendHeaderToken',
    }),

  },
}
</script>