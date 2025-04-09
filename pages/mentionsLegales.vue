<template>
  <ClientOnly>
    <Header />
    <MentionsLegalesPage />
  </ClientOnly>
</template>

<script setup lang="ts">
import Header from "~/components/layouts/Header.vue";

import MentionsLegalesPage from "~/components/pages/MentionsLegalesPage.vue";
</script>

<style scoped></style>