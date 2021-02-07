<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <NavBar />
    </v-app-bar>

    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import NavBar from "@/components/navigation-components/NavBar.vue";
import Component from "vue-class-component";

@Component({
  components: {
    NavBar,

  }
})
export default class App extends Vue {}
</script>
