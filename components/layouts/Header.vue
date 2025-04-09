<template>
  <NavBarLogged v-if="isLoggedIn2" />
  <NavBar v-else />
</template>

<script setup lang="ts">

import NavBar from "~/components/layouts/header/NavBar.vue";
import NavBarLogged from "~/components/layouts/header/NavBarLogged.vue";

const { isLoggedIn, user, token } = useAuth();

const isLoggedIn2 = computed(() => !!user.value);

watchEffect(() => {
  console.log('header', isLoggedIn.value, user.value, token.value, isLoggedIn2.value)
})

watch(isLoggedIn, (newValue) => {
  console.log('Header isLoggedIn changed:', newValue, isLoggedIn2.value);
});

watch(user, (newValue) => {
  console.log('Header user changed:', newValue, isLoggedIn2.value);
});

</script>

<style scoped></style>