<template>
  <v-app-bar app color="primary" dark>
    <v-toolbar-title
      @click="$router.push('/')"
      class="display-1 Bold text"
      style="cursor:pointer"
    >{{ logo }}
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <div v-for="link in links" :key="link.text">
      <v-btn
        :to="link.route"
        text
      >
        <span class="mr-2">{{ link.namePage }}</span>
      </v-btn>
    </div>
  </v-app-bar>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class NavbarVisitor extends Vue {
  logo = "Hello-Abes";
  links= [
    {'namePage': 'Api-Public', 'route': '/'},
    {'namePage': 'Api-Privé', 'route': '/secure'},
    {'namePage': 'Se connecter', 'route': '/login'},
    {'namePage': 'S\'inscrire', 'route': '/register'},
  ]
}
</script>
