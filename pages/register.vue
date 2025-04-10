<template>
    <RegisterPage />
</template>

<script setup lang="ts">
import RegisterPage from "~~/components/pages/RegisterPage.vue";

definePageMeta({
  middleware: [
      'guest-only',
  ]
})
</script>