<template>

    <ClientOnly>
        <Header />
        <UserAccountPage />
    </ClientOnly>
</template>
<script setup lang="ts">
import Header from "~/components/layouts/Header.vue";
import UserAccountPage from "~/components/pages/UserAccountPage.vue";

definePageMeta({
    middleware: ['auth'],
});
</script>