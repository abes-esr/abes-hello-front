<template>
    <RegisterPage />
</template>

<script setup lang="ts">
import RegisterPage from "~~/components/pages/RegisterPage.vue";

// Suppression des messages d'erreur éventuels en arrivant sur la page
import { useAuth } from "~~/composables/useAuth";
const { errorApiMessage, errorApi } = useAuth();
errorApi.value = false;
errorApiMessage.value = null;

definePageMeta({
  middleware: [
      'guest-only',
  ]
})
</script>