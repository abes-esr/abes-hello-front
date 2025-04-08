<template>
  <v-app>

    <Header />
    <v-main>
      <NuxtPage></NuxtPage>
    </v-main>
    <Footer />
  </v-app>
</template>

<script setup lang="ts">

import Header from "~/components/structure/Header.vue";
import Footer from "~/components/structure/Footer.vue";
</script>

<style scoped>

</style>