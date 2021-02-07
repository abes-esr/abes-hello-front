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
    <v-btn
      @click="logout"
      text
    >
      <span class="mr-2">Se déconnecter</span>
    </v-btn>
  </v-app-bar>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action, Getter } from "vuex-class";

const namespace = "user";
@Component
export default class NavbarLoged extends Vue {
  @Action('doLogout', { namespace }) doLogout : any;

  logo = "Hello-Abes";
  links= [
    {'namePage': 'Api-Public','route': '/'},
    {'namePage': 'Api-Privé','route': '/secure'},
    {'namePage': 'Tableau de bord','route': '/dashboard'},
  ];

  logout() {
    this.doLogout();
    this.$router.push({ name: 'Home' });
  }
}
</script>

