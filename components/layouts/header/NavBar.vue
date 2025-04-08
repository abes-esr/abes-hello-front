<template>
  <nav>
    <v-app-bar class="py-2" app color="primary" dark>
      <img class="ml-2" alt="logo Abes" src="/pictures/abeslogo130.svg" height="60">


        <v-toolbar-title class="display-1 Bold text">
          <NuxtLink to="/">
<!--            // todo Vérifier la mise en page du titre (voir pour une mise en place d'un ficheir global CSS)-->
            Hello-Abes
          </NuxtLink>
        </v-toolbar-title>


      <v-spacer></v-spacer>

      <div v-for="link in links" :key="link.text" class="mr-4">
        <NuxtLink :to=link.route>
<!--          // TODO refaire l'affichage des boutons -->
          <v-btn text>
            <span class="mr-2">{{ link.namePage }}</span>
          </v-btn>
        </NuxtLink>
      </div>

    </v-app-bar>
  </nav>
</template>

<script setup>

  const links = [
    {'namePage': 'Api-Public', 'route': '/'},
    {'namePage': 'Api-Privé', 'route': '/secure'},
    {'namePage': 'Se connecter', 'route': '/login'},
    {'namePage': 'S\'inscrire', 'route': '/register'},
  ]

</script>