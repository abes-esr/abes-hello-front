<template>
  <v-app>

    <NavBarLogged v-if="isLoggedIn" />
    <NavBar v-else />
    <v-main class="my-10">
      <router-view/>
    </v-main>

    <CookieBar />
  </v-app>
</template>

<script>

import NavBar from "@/components/NavBar";
import NavBarLogged from "@/components/NavBarLogged";
import {mapGetters} from "vuex";
import CookieBar from "@/components/utils/CookieBar"


export default {
  name: 'App',

  components: {
    NavBar,
    NavBarLogged,
    CookieBar,
  },
  data: () => ({
    //
  }),
  computed: {
    ...mapGetters({
      isLoggedIn: 'auth/isLogged',
    }),
  },
};
</script>
