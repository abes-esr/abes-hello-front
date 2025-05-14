<template>
  <v-sheet class="d-flex" color="primary" height="80" elevation="4">
    <v-sheet class="ml-4 mt-2 pt-2" color="primary">
      <img alt="logo Abes" src="/pictures/abesLogo130.svg" height="60">
    </v-sheet>
    <v-sheet class="ma-2 pa-2 align-self-center" color="primary">
      <v-toolbar-title class="display-1 Bold text">Hello-Abes</v-toolbar-title>
    </v-sheet>
  </v-sheet>

  <div v-if="loading" class="text-center mt-10">
    <v-progress-circular :size="70" :width="7" color="blue" indeterminate />
  </div>

  <v-row class="text-center mt-8 mb-10">
    <v-col class="d-flex justify-center" cols="12">
      <v-sheet  max-width="500">
        <h2>{{ error?.statusCode }}</h2>
        <h3>{{ error?.message }}</h3>
        <v-btn class="mt-4" @click="handleError">Retenter</v-btn>
      </v-sheet>
    </v-col>
  </v-row>

  <v-footer class="footer mt-auto py-2" color="primary">
    <FooterContent />
  </v-footer>
</template>

<script setup lang="ts">
import FooterContent from "~/components/layouts/footer/FooterContent.vue";

defineProps({
  error: Object,
})

const loading = ref(false);

const handleError = () => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 1000)
  setTimeout(() => {
    clearError({redirect: '/'})
  }, 1500);
}
</script>
