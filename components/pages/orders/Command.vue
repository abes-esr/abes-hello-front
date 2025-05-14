<template>

  <div v-for="commande in props.listCommande" :key="commande.id">
    <v-row>
      <v-col class="mt-12" md="6" offset-md="3">
        <v-sheet class="elevation-1">
          <div class="text-blue-darken-3 text-center mb-0">
            <h3>Commande - {{ commande.id }}</h3>
            <h3>Fournisseur - {{ commande.fournisseur.name }}</h3>
          </div>
        </v-sheet>
        <v-data-table
            :props.headers="tabHeader"
            :items="commande.products"
            item-key="id"
            :items-per-page="5"
            class="elevation-1" />
        <v-sheet class="elevation-1">
          <div class="text-blue-darken-3 d-flex justify-end py-2 px-4">
            <span>Totals :</span>
            <span class="ml-1">{{ sumField(commande.products, 'price') }}</span>
          </div>
        </v-sheet>
      </v-col>
    </v-row>
  </div>

</template>

<script setup>

const props = defineProps({tabHeader: Array, listCommande: Array})

function sumField(commandeList, key) {
  return commandeList.reduce((a, b) => a + (b[key] || 0), 0)
}

</script>
