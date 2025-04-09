<template>
    <ClientOnly>
        <Header />
        <LoginPage />
    </ClientOnly>
</template>

<script setup lang="ts">import Header from "~/components/layouts/Header.vue";

import LoginPage from "~/components/pages/LoginPage.vue";
</script>