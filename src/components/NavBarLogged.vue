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

      <v-btn @click="logout" text class="mr-4">
        <span class="mr-2">Se déconnecter</span>
      </v-btn>

    </v-app-bar>
  </nav>
</template>

<script setup>
  import { useRouter } from "vue-router";
  import { userAuth } from "@/store/userAuth";

  const router = useRouter();

  const links = [
      {'namePage': 'Api-Public','route': '/'},
      {'namePage': 'Api-Privé','route': '/secure'},
      {'namePage': 'Tableau de bord','route': '/dashboard'},
    ]

  function logout() {
    userAuth().logout();
    router.push('/');
  }
</script>