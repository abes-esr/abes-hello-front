<template>
  <nav>
    <v-app-bar app color="primary" dark>
      <img class="ml-2" alt="logo Abes" src="/pictures/abesLogo130.svg" height="60">


      <v-toolbar-title class="display-1 Bold text">
        <NuxtLink to="/">
          <!-- // todo Vérifier la mise en page du titre (voir pour une mise en place d'un ficheir global CSS)-->
          Hello-Abes
        </NuxtLink>
      </v-toolbar-title>


      <v-spacer />

      <div v-for="link in links" :key="link.text">
        <NuxtLink v-if="link.enabled" :to=link.route class="mr-4">
          <v-btn text>
            <span class="mr-2">{{ link.namePage }}</span>
          </v-btn>
        </NuxtLink>
      </div>

      <v-btn v-if="user" text class="mr-4" @click="callLogout">
        <span class="mr-2">Se déconnecter</span>
      </v-btn>

    </v-app-bar>
  </nav>
</template>

<script setup>

import { useAuth } from "~~/composables/useAuth";

const { logout, user } = useAuth();
const links = computed(() => [
  { 'namePage': 'Api-Public', 'route': '/', enabled: true },
  { 'namePage': 'Api-Privé', 'route': '/account', enabled: true },
  { 'namePage': 'Se connecter', 'route': '/login', enabled: !user.value },
  { 'namePage': 'S\'inscrire', 'route': '/register', enabled: !user.value },
  { 'namePage': 'Tableau de bord', 'route': '/orders', enabled: !!user.value },
])

async function callLogout() {
  await logout();
}

</script>