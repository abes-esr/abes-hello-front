<template>
  <ClientOnly>
    <Header />
    <OrdersPage />
  </ClientOnly>
</template>

<script setup lang="ts">import Header from "~/components/layouts/Header.vue";


import OrdersPage from "~/components/pages/OrdersPage.vue";
definePageMeta({
  middleware: ['auth'],
});
</script>

<style scoped></style>