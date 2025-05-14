<template>
    <UserAccountPage />
</template>

<script setup lang="ts">
import UserAccountPage from "~~/components/pages/UserAccountPage.vue";

// Suppression des messages d'erreur éventuels en arrivant sur la page
import { useAuth } from "~~/composables/useAuth";
const { errorApiMessage, errorApi } = useAuth();
errorApi.value = false;
errorApiMessage.value = null;

definePageMeta({
    middleware: ['user-only'],
});
</script>