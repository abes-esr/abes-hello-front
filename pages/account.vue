<template>
    <UserAccountPage />
</template>

<script setup lang="ts">
import UserAccountPage from "~~/components/pages/UserAccountPage.vue";

definePageMeta({
    middleware: ['user-only'],
});
</script>