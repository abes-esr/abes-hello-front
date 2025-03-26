<template>
  <nav>
    <v-app-bar app color="primary" dark>
      <img class="ml-2" alt="logo Abes" src="@/assets/picture/abeslogo130.svg" height="60">
      <v-toolbar-title class="display-1 Bold text" @click="router.push('/')" style="cursor:pointer">
        Hello-Abes
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <div v-for="link in links" :key="link.text">
        <v-btn :to="link.route" text>
          <span class="mr-2">{{ link.namePage }}</span>
        </v-btn>
      </div>

      <v-btn @click="logout" text>
        <span class="mr-2">Se déconnecter</span>
      </v-btn>

    </v-app-bar>
  </nav>
</template>

<script setup>
import { computed } from 'vue';
  import { useRouter } from "vue-router";
  import { userAuth } from "@/store/userAuth";

  const router = useRouter();

  const links = [
      {'namePage': 'Api-Public','route': '/'},
      {'namePage': 'Api-Privé','route': '/secure'},
      {'namePage': 'Tableau de bord','route': '/dashboard'},
    ]

  const auth = computed(() => {
    return userAuth().authenticated;
  })
  const user = computed(() => {
    return userAuth().user;
  })
  const isLoggedIn = computed(() => {
    return userAuth().isLogged;
  })
  const resApi = computed(() => {
    return userAuth().resApi;
  })

  // TODO tester le logOutAction
  userAuth().logOutAction()

  function logout() {
    userAuth().logOutAction('SET_LOGOUT');
    router.push('/');
  }


  // TODO contrôler le code ci-dessous et si ok alors supprimer le code mort

// import {mapActions, mapGetters} from "vuex";

// export default {
//   name: 'NavBar',
//   data:() => ({
//     links: [
//       {'namePage': 'Api-Public','route': '/'},
//       {'namePage': 'Api-Privé','route': '/secure'},
//       {'namePage': 'Tableau de bord','route': '/dashboard'},
//     ]
//   }),
//   computed: {
//     ...mapGetters({
//       auth: 'auth/authenticated',
//       user: 'auth/user',
//       isLoggedIn: 'auth/isLogged',
//       resApi: 'auth/resApi',
//     }),
//   },
//   methods: {
//     ...mapActions({
//       logoutAction: 'auth/logOutAction',
//     }),
//     logout() {
//       this.logoutAction();
//       this.$router.push({ name: 'Home' });
//     }
//   }
// }
</script>