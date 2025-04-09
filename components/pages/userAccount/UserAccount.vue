<template>

  <v-container fluid>

    <div>
      <v-row class="text-center">
        <v-col cols="12">
          <h1 class="mt-10 mb-4">Bienvenue à l'Abes : {{ user }}</h1>
          <v-img src="/pictures/abeslogo130.svg" class="my-3" contain height="200" />
        </v-col>
      </v-row>
    </div>

    <div v-if="loading" class="text-center mt-10">
      <v-progress-circular v-if="loading" :size="70" :width="7" color="blue" indeterminate />
    </div>

    <div v-if="!loading">
      <v-row class="text-center">
        <v-col cols="12">
          <h3 class="mb-5">La réponse de serveur API</h3>
          <v-divider class="mx-4" />
        </v-col>
      </v-row>

      <!-- <v-row class="text-center">
        <v-col class="d-flex justify-center" cols="12">
          <v-sheet class="responseFromServer" max-width="500">
            {{ resApi }}
          </v-sheet>
        </v-col>
      </v-row> -->
    </div>

  </v-container>

</template>

<script setup>

// import { computed, ref } from "vue";
// // import { userAuth } from "~/stores/userAuth";
// // import helloAbesBackService from "~/composables/HelloAbesBackService";

// const resApi = ref('');
// const loading = ref(true);
// const user = computed(() => {
//   return userAuth().getUser;
// })

// // onMounted(() => {
// //   getCommandsList();
// // })

// // function getCommandsList() {
// //   setTimeout(async () => {
// //     if (userAuth().getToken !== null) {
// //       try {
// //         const apiReq = await helloAbesBackService.getAccessToCommandsList();
// //         loading.value = false;
// //         resApi.value = apiReq.data.response;
// //       } catch {
// //         resApi.value = "error";
// //         await useRouter().push('/login');
// //         loading.value = false;
// //       }
// //     }
// //   }, 2000);
// // }

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