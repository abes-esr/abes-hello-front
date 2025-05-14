<template>

  <v-container fluid>
    <v-row class="text-center">
      <v-col class="d-flex justify-center" cols="12">
        <v-sheet class="responseFromServer" max-width="500">
          {{ user?.userName }}
        </v-sheet>
      </v-col>
    </v-row>

    <v-row class="text-center">
      <v-col class="d-flex justify-center" cols="12">
        <h2 class="mb-4">Récapitulatif des commandes</h2>
      </v-col>
      <v-divider class="mx-4 mb-4" />
    </v-row>

    <Command :tabHeader="tabHeader" :listCommande="listCommande"/>

  </v-container>

</template>

<script setup>

import { ref, computed } from "vue";
import Command from "~/components/pages/orders/Command.vue";
const { user } = useAuth();
const client = useSpringbootApi()
const { data: listCommande } = await client.get('/secured/commande');

const tabHeader = ref([
  {
    title: 'Produit',
    value: 'name',
    sortable: false,
  },
  {
    title: 'Prix',
    value: 'price',
  }
])

</script>
