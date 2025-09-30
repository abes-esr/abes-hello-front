<template>
    <LoginPage />
</template>

<script setup lang="ts">
import LoginPage from "~~/components/pages/LoginPage.vue";

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