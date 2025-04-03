<template>

  <v-container fluid>

    <v-row class="text-center">
      <v-col class="d-flex justify-center" cols="12">
        <v-sheet class="responseFromServer" max-width="500">
          {{ user }}
        </v-sheet>
      </v-col>
    </v-row>

    <v-row class="text-center">
      <v-col class="d-flex justify-center" cols="12">
        <h2 class="mb-4">Voici votre récapitulatif des commandes</h2>
      </v-col>
      <v-divider class="mx-4 mb-4"></v-divider>
    </v-row>

    <div v-if="loading" class="text-center mt-10">
      <v-progress-circular v-if="loading"
                           :size="70"
                           :width="7"
                           color="blue"
                           indeterminate
      ></v-progress-circular>
    </div>
    <div v-for="commande in listCommande" :key="commande.id">
      <v-row>
        <v-col md="6" offset-md="3">
          <div class="text-center mb-4">
            <h3>Commande - {{ commande.id }}</h3>
            <h3>Fournisseur - {{ commande.fournisseur.name }}</h3>
          </div>

          <v-data-table
            :headers="tabHeader"
            :items="commande.products"
            item-key="id"
            :items-per-page="5"
            class="elevation-1"
          >
          </v-data-table>
          <v-table class="elevation-1">
            <tbody>
            <tr class="text-pink d-flex justify-space-between">
              <td class="title ml-1 mt-4 mb-0">Totals</td>
              <td class="text-pink mr-1 mt-4 mb-0">{{ sumField(commande.products, 'price')}}</td>
            </tr>
            </tbody>
          </v-table>
        </v-col>
      </v-row>
    </div>

  </v-container>

</template>

<script setup>

import { userAuth } from '@/store/userAuth'
import {computed, onMounted, ref} from "vue";
import helloAbesBackService from "@/service/HelloAbesBackService";
import {useRouter} from "vue-router";

const resApi = ref('');
const loading = ref(true);
const listCommande = ref([]);
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

const user = computed(() => {
  return userAuth().getUser;
});

onMounted(() => {
  getCommandsList();
})

function sumField(commandeList,key) {
  return commandeList.reduce((a, b) => a + (b[key] || 0), 0)
}

function getCommandsList() {
  setTimeout( async() => {
    if(userAuth().getToken !== null ) {

      let apiReq = await helloAbesBackService.getAccessToCommandsList();
      let apiCommand = await helloAbesBackService.getCommandsListFromApi();

      Promise.all([apiReq, apiCommand])
          .then((response) => {
            loading.value = false;
            resApi.value = response[0].data.response;
            listCommande.value = response[1];
          })
          .catch(error => {
            resApi.value = error;
            useRouter().push('/login');
            loading.value = false;
          })
    }
  }, 2000);
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