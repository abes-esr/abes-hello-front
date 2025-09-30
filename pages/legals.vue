<template>
    <LegalsPage />
</template>

<script setup lang="ts">
import LegalsPage from "~~/components/pages/LegalsPage.vue";

// Suppression des messages d'erreur éventuels en arrivant sur la page
import { useAuth } from "~~/composables/useAuth";
const { errorApiMessage, errorApi } = useAuth();
errorApi.value = false;
errorApiMessage.value = null;
</script>
