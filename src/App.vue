<template>
  <v-app>
    <NavBarLogged v-if="isLoggedIn" />
    <NavBar v-else />
    <v-main class="my-10">
      <RouterView/>
    </v-main>

<!--    // TODO finaliser l'ajustement des tailles des composants principaux (NavBarLogged, NavBar, Footer)-->
    <Footer style="flex-basis: 0;" />
<!--    // TODO implémenter la barre de cookies correct -->
  </v-app>
</template>

<script setup>
// TODO passer tous les composants en composition API
import { computed } from 'vue'
import { userAuth } from '@/store/userAuth'

import { RouterView } from "vue-router";
import NavBar from "@/components/NavBar";
import NavBarLogged from "@/components/NavBarLogged";
import Footer from "@/views/Footer.vue";

const isLoggedIn = computed(() => {
  return userAuth().isLoggedIn
})

// TODO tester l'intégralité du workflow et si ok alors supprimer le code mort ci-dessous
//
//
// export default {
//   name: 'App',
//
//   components: {
//     NavBar,
//     NavBarLogged,
//     CookieBar,
//   },
//   data: () => ({
//     //
//   }),
//   computed: {
//     ...mapGetters({
//       isLoggedIn: 'auth/isLogged',
//     }),
//   },
// };
</script>
