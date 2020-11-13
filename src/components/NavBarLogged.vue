<template>
  <nav>
    <v-app-bar
        app
        color="primary"
        dark
    >
      <v-toolbar-title
          @click="$router.push('/')"
          class="display-1 Bold text"
          style="cursor:pointer">Hello-Abes
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
  </nav>
</template>

<script>

import {mapActions, mapGetters} from "vuex";

export default {
  name: 'NavBar',
  data:() => ({
    links: [
      {'namePage': 'Api-Public','route': '/'},
      {'namePage': 'Api-Privé','route': '/secure'},
      {'namePage': 'Tableau de bord','route': '/dashboard'},
    ]
  }),
  computed: {
    ...mapGetters({
      auth: 'auth/authenticated',
      user: 'auth/user',
      isLoggedIn: 'auth/isLogged',
      resApi: 'auth/resApi',
    }),
  },
  methods: {
    ...mapActions({
      logoutAction: 'auth/logOutAction',
    }),
    logout() {
      this.logoutAction();
      this.$router.push({ name: 'Home' });
    }
  }
}
</script>