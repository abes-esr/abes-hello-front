<template>
  <!-- affichage d'un props à titre d'exemple pour montrer qu'il est également possible de manipuler les composants primaires de Nuxt -->
  <v-sheet class="titleNavbarProp px-2" color="primary">{{ props.testProps }}</v-sheet>
  <v-app>
    <Header />
    <v-main class="mt-16">

      <div v-if="loading" class="loadingPopup d-flex align-center justify-center">
        <v-sheet
          :elevation="24" :height="200" :width="200" color="white" rounded
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

      <div class="d-flex justify-center mb-6">
        <v-alert v-model="errorApi" class="my-5 mx-20" border="start" close-label="Close Alert" color="red" max-width="800"
                 title="Erreur" variant="outlined" closable>
          <p>{{ errorApiMessage }}</p>
          <p>{{ errorApiMessageSecondLine }}</p>
        </v-alert>
      </div>

      <slot />
      <!-- contenu du composant parent -->
    </v-main>
    <Footer />
  </v-app>
</template>

<script setup lang="ts">
import '~/assets/css/global.css';
import Footer from "~~/components/layouts/Footer.vue";
import Header from "~~/components/layouts/Header.vue";

import { useAuth } from "~~/composables/useAuth";

const { errorApi, errorApiMessage, errorApiMessageSecondLine } = useAuth()

const props = defineProps({testProps: String})

const nuxtApp = useNuxtApp();
const loading = ref(false);
nuxtApp.hook("page:start", () => {
  loading.value = true;
});
nuxtApp.hook("page:finish", () => {
  loading.value = false;
}); 

</script>