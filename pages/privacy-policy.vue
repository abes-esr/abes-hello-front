<template>
    <PrivacyPolicyPage />
</template>

<script setup lang="ts">
import PrivacyPolicyPage from "~~/components/pages/PrivacyPolicyPage.vue";

// Suppression des messages d'erreur éventuels en arrivant sur la page
import { useAuth } from "~~/composables/useAuth";
const { errorApiMessage, errorApi } = useAuth();
errorApi.value = false;
errorApiMessage.value = null;
</script>
