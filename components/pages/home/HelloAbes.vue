<template>
  <v-container fluid>

    <div>
      <v-row class="text-center">
        <v-col cols="12">
          <h1 class="mt-10 mb-4">Bienvenue à l'Abes.</h1>
          <p v-if="!token" class="warningMessage">Vous n'êtes pas loggé !</p>
        </v-col>
      </v-row>
    </div>

    <v-row class="text-center mt-10">
      <v-col cols="12">
        <v-divider class="mx-4" />
        <h3 class="mt-5">Réponse publique du serveur (abes-hello-back) : </h3>
      </v-col>
    </v-row>

    <v-row v-if="!data" class="text-center mt-8">
      <v-col class="d-flex justify-center" cols="12">
        <h4>Loading data ...</h4>
      </v-col>
    </v-row>

    <v-row v-else class="text-center">
      <v-col class="d-flex justify-center" cols="12">
        <v-sheet class="responseFromServer" max-width="500">
          {{ data?.response }}
        </v-sheet>
      </v-col>
    </v-row>

  </v-container>
</template>

<script setup>
import { useSpringbootApi } from '~/composables/useSpringbootApi';
import { showError } from "#imports";
const { token } = useAuth();

const client = useSpringbootApi();

// Cette structure d'appel permet d'éviter un plantage du front à son démarrage dans le cas où le back n'est pas démarré.
const { data } = await useAsyncData('data', async () => {
  try {
    const response = await client.get("");
    return response.data
  } catch (e) {
    showError('Erreur : le serveur n\'est pas disponible')
    throw new Error('Impossible de se connecter à API')
  }
})

</script>
