<template>
  <OrdersPage />
</template>

<script setup lang="ts">

import OrdersPage from "~/components/pages/OrdersPage.vue";

useAuthorizationMiddleware();
</script>

<style scoped></style>