<template>

  <v-container fluid>

    <div>
      <v-row class="text-center">
        <v-col cols="12">
          <v-img
              src="src/assets/picture/abeslogo130.svg"
              class="my-3"
              contain
              height="100"
          />
          <v-divider class="mx-4"></v-divider>
          <h1 class="mt-10">Bienvenue à l'Abes : {{ user }}</h1>
        </v-col>
      </v-row>
    </div>

    <v-row class="text-center" >
      <v-col cols="12">
        <h3 class="mb-5">La réponse de serveur API</h3>
        <v-divider class="mx-4"></v-divider>
      </v-col>
    </v-row>

    <v-row class="text-center">
      <v-col class="d-flex justify-center" cols="12">
        <v-sheet class="responseFromServer" max-width="500">
          {{ resApi }}
        </v-sheet>
      </v-col>
    </v-row>

  </v-container>

</template>

<script setup>

import { userAuth } from '@/store/userAuth'
import {computed} from "vue";

const auth = computed(() => {
  return userAuth().authenticated();
});

const user = computed(() => {
  return userAuth().user;
});

const isLoggedIn = computed(() => {
  return userAuth().isLogged();
});

const resApi = computed(() => {
  return userAuth().resApi;
})

// TODO tester le code ci-dessus et si ok supprimer le code mort ci-dessous

// export default {
//   name: 'UserHome',
//   data: () => ({
//     //
//   }),
//   computed: {
//     ...mapGetters({
//       auth: 'auth/authenticated',
//       user: 'auth/user',
//       isLoggedIn: 'auth/isLogged',
//       resApi: 'auth/resApi',
//     })
//   },
//   methods: {
//     //
//     },
// }
</script>

<style scoped>

.responseFromServer {
  padding-top: 6px;
  padding-bottom: 6px;
  padding-left: 16px;
  padding-right: 16px;
  background-color: #dfdfdf !important;
  color: black !important;
  font-family: "Courier New", sans-serif !important;
  font-size: 0.9em !important;
  font-weight: 600 !important;
}
</style>