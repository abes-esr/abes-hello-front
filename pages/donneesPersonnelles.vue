<template>
  <ClientOnly>
    <Header />
    <DonneesPersonnellesPage />
  </ClientOnly>
</template>

<script setup lang="ts">
import Header from "~/components/layouts/Header.vue";

import DonneesPersonnellesPage from "~/components/pages/DonneesPersonnellesPage.vue";
</script>

<style scoped></style>