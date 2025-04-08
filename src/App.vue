<template>
  <v-app>
    <NavBarLogged v-if="isLoggedIn"/>
    <NavBar v-else/>
    <v-main class="my-10">
      <RouterView/>
    </v-main>
    <Footer style="flex-basis: 0;"/>
  </v-app>
</template>

<script setup>
import { ref, watch} from 'vue'
import { userAuth } from '~/composables/userAuth'

import { RouterView } from "vue-router";
import NavBar from "~/components/layouts/header/NavBar.vue";
import NavBarLogged from "~/components/NavBarLogged";
import Footer from "~/components/layouts/Footer.vue";

const isLoggedIn = ref(false);

watch(() => {
  isLoggedIn.value = userAuth().getIsLogged;
})

</script>
