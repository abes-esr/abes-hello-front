<template>
  <OrdersPage />
</template>

<script setup lang="ts">
import OrdersPage from "~~/components/pages/OrdersPage.vue";

// Suppression des messages d'erreur éventuels en arrivant sur la page
import { useAuth } from "~~/composables/useAuth";
const { errorApiMessage, errorApi } = useAuth();
errorApi.value = false;
errorApiMessage.value = null;

definePageMeta({
  middleware: ['user-only'],
});

</script>
