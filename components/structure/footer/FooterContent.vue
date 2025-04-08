<template>
    <div class="d-flex flex-wrap justify-space-between align-center mt-0 mb-0" style="width: 100%">
      <div class="d-flex flex-wrap justify-start align-center text-body-2">
        <img class="ml-2" alt="logo Abes" src="/pictures/logo-mesr.svg" height="60">
        <a class="ma-2 text-white text-decoration-none" href="https://abes.fr">{{ currentYear }} - ABES</a>
      </div>
      <div class="d-flex flex-wrap justify-end align-center text-body-2">
        <v-btn
            v-for="btnLinkData in btnsLinksDatas"
            :key:="btnLinkData"
            :text="btnLinkData.text"
            @click="goToDestinationPage(btnLinkData.goToExternalSite, btnLinkData.link)"
            v-tooltip:top="btnLinkData.tooltip"
            elevation="0"
            variant="text"
            size="x-small"
        ></v-btn>
      </div>
    </div>
</template>

<script setup lang="ts">
import {computed} from "vue";

const currentYear = computed(() => new Date().getFullYear())
const btnsLinksDatas = [
  {
    text: 'Donnees Personnelles',
    link: 'donneesPersonnelles',
    tooltip: 'lien qui amène à la page traitant des données personnelles',
    goToExternalSite: false,
  },
  {
    text: 'Conditions générales d\'utilisation (CGU)',
    link: 'https://abes.fr/pages-cgu/conditions-generales-utilisation-sites-abes.html',
    tooltip: 'Lien externe qui amène sur la page des conditions générales d\'utilisations du site',
    goToExternalSite: true,
  },
  {
    text: 'Mentions légales',
    link: 'mentionsLegales',
    tooltip: 'Lien qui amène à la page traitant des mentions légales',
    goToExternalSite: false,
  },
  {
    text: 'Accessibilité Numérique',
    link: 'https://abes.fr/pages-accessibilite/item.sudoc.html',
    tooltip: 'Lien externe qui amène sur la page de l\'accessibilité numérique du site',
    goToExternalSite: true,
  }
]

function goToDestinationPage(isExternalLink:boolean, link:string) {
  if(isExternalLink) {
    window.open(link);
  } else navigateTo(link)
}

</script>