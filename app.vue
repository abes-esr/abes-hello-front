<template>
  <v-app>
    <Header />

    <v-main>
      <NuxtPage />
    </v-main>

    <Footer />
  </v-app>
</template>

<script setup lang="ts">
import Header from "~/components/layouts/Header.vue";

import Footer from "~/components/layouts/Footer.vue";
</script>