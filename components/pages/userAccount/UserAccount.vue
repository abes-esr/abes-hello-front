<template>

  <v-container fluid>

    <div>
      <v-row class="text-center">
        <v-col cols="12">
          <h1 class="mt-10 mb-4">Bienvenue à l'Abes.</h1>
          <p class="successMessage">Vous êtes loggé en temps que : {{ user?.userName }}</p>
        </v-col>
      </v-row>
    </div>

    <div v-if="!resApi" class="text-center mt-10">
      <v-progress-circular :size="70" :width="7" color="blue" indeterminate />
    </div>

    <div v-else>
      <v-row class="text-center mt-10">
        <v-col cols="12">
          <v-divider class="mx-4" />
          <h3 class="mt-5">Réponse privée du serveur (abes-hello-back) : </h3>
        </v-col>
      </v-row>

      <v-row class="text-center">
        <v-col class="d-flex justify-center" cols="12">
          <v-sheet class="responseFromServer" max-width="500">
            {{ resApi?.response }}
          </v-sheet>
        </v-col>
      </v-row>
    </div>

  </v-container>

</template>

<script setup>

const { user } = useAuth();
const client = useSpringbootApi()
const { data: resApi } = await client.get('/secured');

</script>
