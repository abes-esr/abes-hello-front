<template>
  <v-container fluid>
    <div>
      <v-row class="text-center">
        <v-col cols="12">
          <v-img
              :src="require('@/assets/picture/logo_abes.jpg')"
              class="my-3"
              contain
              height="100"
          />
          <v-divider class="mx-4"></v-divider>
          <h1 class="mt-10">Bienvenue à l'Abes : {{ user }}</h1>
        </v-col>
      </v-row>
    </div>

    <div v-for="commande in listCommande" :key="commande.id">
      <v-row>
        <v-col
          md="6"
          offset-md="3">
          <div class="text-center">
            <h3>Commande - {{ commande.id }}</h3>
            <h3>Fournisseur - {{ commande.fournisseur.name }}</h3>
          </div>
          <v-data-table
            :headers="tabHeader"
            :items="commande.products"
            item-key="id"
            :items-per-page="5"
            class="elevation-1"
          >
            <!-- Slot pour afficher les éléments de la table -->
            <template v-slot:item="{ item }">
              <tr>
                <td>{{ item.name }}</td>
                <td>{{ item.price }}</td>
              </tr>
            </template>

            <!-- Slot pour afficher la ligne de totals à la fin du tableau -->
            <template v-slot:body.append>
              <tr class="pink--text">
                <th class="title">Totals</th>
                <th class="title">{{ sumField(commande.products, 'price') }}</th>
              </tr>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </div>

    <div v-if="!loading">
      <v-row class="text-center">
        <v-col
            md="6"
            offset-md="3">
          <v-divider class="mx-4"></v-divider>
          <h1>La réponse de serveur API</h1>
          <h4 class="mt-10">
            <v-card
                elevation="2"
                class="pa-3"
            ><code>{{ resApi }}</code>
            </v-card>
          </h4>
        </v-col>
      </v-row>
    </div>

  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'SecureApi',
  data: () => ({
    urlApi: process.env.VUE_APP_ROOT_API + '/secured',
    urlCommande: process.env.VUE_APP_ROOT_API + '/secured/commande',
    resApi: '',
    loading: true,
    tabHeader: [
      {
        text: 'Produit',
        align: 'left',
        sortable: false,
        value: 'name',
      },
      { 
        text: 'Prix',
        value: 'price',
      },
    ],
    listCommande: [],
  }),
  computed: {
    ...mapGetters({
      isLoggedIn: 'auth/isLogged',
      token: 'authToken/authenticated',
      user: 'auth/user',
    }),
  },
  created() {
    this.checkTokenAction(this.urlApi);

    setTimeout(async () => {
      if (this.token !== null) {
        let config = {
          headers: {
            Authorization: 'Bearer ' + this.token,
          },
        };

        let apiReq = await this.$http.get(this.urlApi, config);
        let commandReq = await this.$http.get(this.urlCommande, config);
        await this.$http.all([apiReq, commandReq])
          .then(this.$http.spread((first_response, second_response) => {
            this.loading = false;
            this.resApi = first_response.data;
            this.listCommande = second_response.data;     
          }))
          .catch(error => {
            this.resApi = error;
            this.$router.push({ name: 'LoginPage' });
            this.loading = false;
          });
      }
    }, 2000);
  },
  methods: {
    ...mapActions({
      checkTokenAction: 'authToken/sendHeaderToken',
    }),

    sumField(commandeList, key) {
      // Calcul de la somme des données selon la clé donnée
      return commandeList.reduce((a, b) => a + (b[key] || 0), 0);
    },
  },
}
</script>

<style scoped>
/* Ajoutez votre style spécifique ici */
</style>
