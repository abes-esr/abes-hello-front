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
    </div>

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

  </v-container>

</template>

<script>

import {mapGetters} from 'vuex'

export default {
  name: 'UserHome',
  data: () => ({
    //
  }),
  computed: {
    ...mapGetters({
      auth: 'auth/authenticated',
      user: 'auth/user',
      isLoggedIn: 'auth/isLogged',
      resApi: 'auth/resApi',
    })
  },
  methods: {
    //
    },
}
</script>