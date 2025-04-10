<template>
    <LoginPage />
</template>

<script setup lang="ts">
import LoginPage from "~~/components/pages/LoginPage.vue";

definePageMeta({
  middleware: [
      'guest-only',
  ]
})
</script>