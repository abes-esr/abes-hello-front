<template>
    <ClientOnly>
        <Header />
        <RegisterPage />
    </ClientOnly>
</template>
<script setup lang="ts">import Header from "~/components/layouts/Header.vue";

import RegisterPage from "~/components/pages/RegisterPage.vue";
</script>