<template>
  <v-footer style="bottom: 0; left: 0; width: 100%; height: auto; max-height: 60px" class="mt-auto py-0" color="primary">
    <div class="d-flex flex-wrap justify-space-between align-center mt-0 mb-0" style="width: 100%">
      <div class="d-flex flex-wrap justify-start align-center text-body-2">
        <a class="ma-2 text-white text-decoration-none" href="https://abes.fr">{{ currentYear }} - ABES</a>
      </div>
      <div class="d-flex flex-wrap justify-end align-center text-body-2">
        <a class="ma-2 text-white text-decoration-none" href="/donnees">Données personnelles</a>
        <a class="ma-2 text-white text-decoration-none" href="https://abes.fr/pages-cgu/conditions-generales-utilisation-sites-abes.html">Conditions générales d'utilisation (CGU)</a>
        <a class="ma-2 text-white text-decoration-none" href="/mentions">Mentions légales</a>
        <a class="ma-2 text-white text-decoration-none" href="https://abes.fr/pages-accessibilite/item.sudoc.html">Accessibilité Numérique</a>
      </div>
    </div>
  </v-footer>
</template>

<script setup>
import {computed} from "vue";

const currentYear = computed(() => new Date().getFullYear())

</script>