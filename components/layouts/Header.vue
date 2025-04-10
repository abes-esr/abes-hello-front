<template>
  <NavBarLogged v-if="user" />
  <NavBar v-else />
</template>

<script setup lang="ts">

import NavBar from "~~/components/layouts/header/NavBar.vue";
import NavBarLogged from "~~/components/layouts/header/NavBarLogged.vue";

const { user } = useAuth();

</script>

<style scoped></style>