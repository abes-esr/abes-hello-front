<template>
  <v-container>

    <v-row class="text-center">
      <v-col cols="12">
        <h1 class="mb-4">La réponse de serveur API</h1>
        <v-divider class="mx-4" />
      </v-col>
    </v-row>

    <v-row v-if="!data" class="text-center mt-8">
      <v-col class="d-flex justify-center" cols="12">
        <h4>Loading data ...</h4>
      </v-col>
    </v-row>

    <v-row v-else class="text-center mt-8">
      <v-col class="d-flex justify-center" cols="12">
        <v-sheet class="responseFromServer" max-width="500">
          {{ data }}
        </v-sheet>
      </v-col>
    </v-row>

  </v-container>
</template>

<script setup>
const { data } = await useAPI("/").get();
</script>
