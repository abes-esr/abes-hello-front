<template>
    <ClientOnly>
        <Header />
        <HomePage />
    </ClientOnly>
</template>

<script setup>import Header from "~/components/layouts/Header.vue";

import HomePage from "~/components/pages/HomePage.vue";
</script>