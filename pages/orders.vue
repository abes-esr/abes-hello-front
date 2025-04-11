<template>
  <OrdersPage />
</template>

<script setup lang="ts">
import OrdersPage from "~~/components/pages/OrdersPage.vue";

definePageMeta({
  middleware: ['user-only'],
});

</script>
