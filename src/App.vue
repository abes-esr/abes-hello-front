<template>
  <v-app>

    <NavBarLogged v-if="isLoggedIn" />
    <NavBar v-else />

    <v-main class="my-10">
      <router-view/>
    </v-main>

  </v-app>
</template>

<script>

import NavBar from "@/components/NavBar";
import NavBarLogged from "@/components/NavBarLogged";
import {mapGetters} from "vuex";

export default {
  name: 'App',

  components: {
    NavBar,
    NavBarLogged,
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
