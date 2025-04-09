<template>
  <v-container>

    <v-row class="text-center">
      <v-col cols="12">
        <h1 class="mb-4">La réponse de serveur API</h1>
        <v-divider class="mx-4" />
      </v-col>
    </v-row>

    <!-- <v-row class="text-center mt-8">
      <v-col class="d-flex justify-center" cols="12">
        <h4 v-if="loading">Loading data ...</h4>
        <v-sheet v-else class="responseFromServer" max-width="500">
          {{ resApi }}
        </v-sheet>
      </v-col>
    </v-row> -->

  </v-container>
</template>

<script setup>

// import { ref } from "vue";

// const resApi = ref('');
// const loading = ref(true);

// // onMounted(() => {
// //   HelloAbesBackService.apiTestConnexion().then(response => {
// //     resApi.value = response.data.response;
// //     loading.value = false;
// //   })
// // })

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
