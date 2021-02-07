<template>
  <div>
    <v-row class="text-center">
      <v-col cols="12">
        <h3 class="mb-5">La réponse de serveur API</h3>
        <v-divider class="mx-4"></v-divider>
      </v-col>
    </v-row>

    <v-row class="text-center">
      <v-col cols="12">
        <slot></slot>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">

import { Component, Vue } from "vue-property-decorator";

@Component
export default class BaseApiResponse extends Vue {}
</script>