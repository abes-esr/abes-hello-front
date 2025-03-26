<template>
  <nav>
    <v-app-bar class="py-2" app color="primary" dark>
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

    </v-app-bar>
  </nav>
</template>

<script setup>
  import {useRouter} from "vue-router";

  const router = useRouter();

  const links = [
    {'namePage': 'Api-Public', 'route': '/'},
    {'namePage': 'Api-Privé', 'route': '/secure'},
    {'namePage': 'Se connecter', 'route': '/login'},
    {'namePage': 'S\'inscrire', 'route': '/register'},
  ]

  // TODO tester le code ci-dessus et si ok alors supprimer le code ci-dessous

  // export default {
  //   name: 'NavBar',
  //   data: () => ({
  //     links: [
  //       {'namePage': 'Api-Public', 'route': '/'},
  //       {'namePage': 'Api-Privé', 'route': '/secure'},
  //       {'namePage': 'Se connecter', 'route': '/login'},
  //       {'namePage': 'S\'inscrire', 'route': '/register'},
  //     ]
  //   }),
  // }

</script>