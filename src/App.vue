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
// TODO finaliser l'ajustement des tailles des composants principaux (NavBarLogged, NavBar, Footer)

import { ref, watch} from 'vue'
import { userAuth } from '@/store/userAuth'

import { RouterView } from "vue-router";
import NavBar from "@/components/NavBar";
import NavBarLogged from "@/components/NavBarLogged";
import Footer from "@/views/Footer.vue";

const isLoggedIn = ref(false);

watch(() => {
  isLoggedIn.value = userAuth().getIsLogged;
})

</script>
