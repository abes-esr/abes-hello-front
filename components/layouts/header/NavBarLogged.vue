<template>
  <nav>
    <v-app-bar class="py-2" app color="primary" dark>
      <img class="ml-2" alt="logo Abes" src="/public/pictures/abeslogo130.svg" height="60">
      <v-toolbar-title class="display-1 Bold text" @click="router.push('/')" style="cursor:pointer">
        Hello-Abes
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <div v-for="link in links" :key="link.text">
        <v-btn :to="link.route" text>
          <span class="mr-2">{{ link.namePage }}</span>
        </v-btn>
      </div>

      <v-btn @click="logout" text class="mr-4">
        <span class="mr-2">Se déconnecter</span>
      </v-btn>

    </v-app-bar>
  </nav>
</template>

<script setup>
  import { useRouter } from "vue-router";
  import { userAuth } from "~/stores/userAuth";

  const router = useRouter();

  const links = [
      {'namePage': 'Api-Public','route': '/'},
      {'namePage': 'Api-Privé','route': '/account'},
      {'namePage': 'Tableau de bord','route': '/orders'},
    ]

  function logout() {
    userAuth().logout();
    router.push('/');
  }
</script>