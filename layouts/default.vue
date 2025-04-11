<template>
  <v-app>
    <Header />
    <v-main class="mt-16">
      <div v-if="loading" style="position: absolute; width: 100vw; height: 100vh; top: 0; left: 0; z-index: 100;"
        class="d-flex align-center justify-center">
        <v-sheet :elevation="24" :height="200" :width="200" color="white" rounded
          class="d-flex align-center justify-center mr-4">
          <v-row class="text-center">
            <v-col cols="12">
              <p>Chargement en cours</p>
              <p class="mb-6">Veuillez patienter</p>
              <v-progress-circular :size="70" :width="7" color="blue" indeterminate />
            </v-col>
          </v-row>
        </v-sheet>
      </div>
      <slot />
    </v-main>
    <Footer />
  </v-app>
</template>

<script setup lang="ts">
import Footer from "~~/components/layouts/Footer.vue";
import Header from "~~/components/layouts/Header.vue";
import '~/assets/css/global.css'

const nuxtApp = useNuxtApp();
const loading = ref(false);
nuxtApp.hook("page:start", () => {
  console.log('page started')
  loading.value = true;
});
nuxtApp.hook("page:finish", () => {
  console.log('page finished')
  loading.value = false;
});

</script>