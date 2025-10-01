<template>
  <NuxtLayout :testProps="propsFromParent">
    <NuxtPage />
  </NuxtLayout>
</template>
<script setup lang="ts">
import { ref } from "vue";

// Un props à titre d'exemple pour montrer qu'il est également possible de manipuler les composants primaires de Nuxt
const propsFromParent = ref("(Nouvelle version en Nuxt)")
</script>