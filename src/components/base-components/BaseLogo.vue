<template>
  <div>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
          :src="require('@/assets/picture/logo_abes.jpg')"
          class="my-3"
          contain
          height="100"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">

import { Component, Vue } from "vue-property-decorator";

@Component
export default class BaseLogo extends Vue {}
</script>