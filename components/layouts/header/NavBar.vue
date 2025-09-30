<template>
  <nav>
    <v-app-bar app color="primary" dark class="py-2">
      <NuxtLink to="/" class="d-flex align-center">
        <img class="mx-4" alt="logo Abes" src="/pictures/abesLogo130.svg" height="60">
        <v-toolbar-title class="display-1 Bold text">
          Hello-Abes
        </v-toolbar-title>
      </NuxtLink>


      <v-spacer />

      <div v-for="link in links" :key="link.text">
        <NuxtLink v-if="link.enabled" :to=link.route class="mr-4">
          <v-btn :text="link.namePage" />
        </NuxtLink>
      </div>

      <v-btn v-if="user" text="Se déconnecter" class="mr-4" @click="logout" />

    </v-app-bar>
  </nav>
</template>

<script setup>

import { useAuth } from "~~/composables/useAuth";

const { logout, user } = useAuth();
const links = computed(() => [
  { 'namePage': 'Accueil', 'route': '/', enabled: true },
  { 'namePage': 'Mon compte', 'route': '/account', enabled: true },
  { 'namePage': 'Se connecter', 'route': '/login', enabled: !user.value },
  { 'namePage': 'S\'inscrire', 'route': '/register', enabled: !user.value },
  { 'namePage': 'Mes commandes', 'route': '/orders', enabled: !!user.value },
])

</script>