<template>
    <HomePage />
</template>

<script setup>
import HomePage from "~~/components/pages/HomePage.vue";

// Suppression des messages d'erreur éventuels en arrivant sur la page
import { useAuth } from "~~/composables/useAuth";
const { errorApiMessage, errorApi } = useAuth();
errorApi.value = false;
errorApiMessage.value = null;

definePageMeta({
    title: "Bienvenue à l'ABES"
})
</script>