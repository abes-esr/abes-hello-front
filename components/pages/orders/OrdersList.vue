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
        <h2 class="mb-4">Voici votre récapitulatif des commandes</h2>
      </v-col>
      <v-divider class="mx-4 mb-4" />
    </v-row>

    <div v-if="!listCommande" class="text-center mt-10">
      <v-progress-circular :size="70" :width="7" color="blue" indeterminate />
    </div>
    <div v-for="commande in listCommande" :key="commande.id">
      <v-row>
        <v-col md="6" offset-md="3">
          <div class="text-center mb-4">
            <h3>Commande - {{ commande.id }}</h3>
            <h3>Fournisseur - {{ commande.fournisseur.name }}</h3>
          </div>

          <v-data-table
:headers="tabHeader" :items="commande.products" item-key="id" :items-per-page="5"
            class="elevation-1" />
          <v-table class="elevation-1">
            <tbody>
              <tr class="text-pink d-flex justify-space-between">
                <td class="title ml-1 mt-4 mb-0">Totals</td>
                <td class="text-pink mr-1 mt-4 mb-0">{{ sumField(commande.products, 'price') }}</td>
              </tr>
            </tbody>
          </v-table>
        </v-col>
      </v-row>
    </div>

  </v-container>

</template>

<script setup>

import { ref } from "vue";
const { user } = useAuth();
const { data: listCommande } = await useAPI('/secured/commande');

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

function sumField(commandeList, key) {
  return commandeList.reduce((a, b) => a + (b[key] || 0), 0)
}

</script>

<style scoped>
.responseFromServer {
  padding-top: 6px;
  padding-bottom: 6px;
  padding-left: 16px;
  padding-right: 16px;
  background-color: #dfdfdf !important;
  color: black !important;
  font-family: "Courier New", sans-serif !important;
  font-size: 0.9em !important;
  font-weight: 600 !important;
}
</style>