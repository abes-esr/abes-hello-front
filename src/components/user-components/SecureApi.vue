<template>

  <v-container fluid>

    <div>
      <v-row class="text-center">
        <v-col cols="12">
          <v-img
              src="src/assets/picture/abeslogo130.svg"
              class="my-3"
              contain
              height="100"
          />
          <v-divider class="mx-4"></v-divider>
          <h1 class="mt-10">Bienvenue à l'Abes : {{user}}</h1>
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
          <v-sheet v-slot:item="{ item }">
              <tr>
                <td>{{item.name}}</td>
                <td>{{item.price}}</td>
              </tr>
          </v-sheet>
          <v-sheet slot="body.append">
              <tr class="pink--text">
                  <th class="title">Totals</th>
                  <th class="title">{{ sumField(commande.products,'price') }}</th>
              </tr>
          </v-sheet>
          </v-data-table>
          
        </v-col>
      </v-row>
    </div>  

    <div v-if="!loading">
      <v-row class="text-center" >
        <v-col cols="12">
          <h3 class="mb-5">La réponse de serveur API</h3>
          <v-divider class="mx-4"></v-divider>
        </v-col>
      </v-row>

      <v-row class="text-center">
        <v-col class="d-flex justify-center" cols="12">
          <v-sheet class="responseFromServer" max-width="500">
            {{ resApi }}
          </v-sheet>
        </v-col>
      </v-row>
    </div>

  </v-container>

</template>

<script>

// TODO convertir en composition api

// import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'SecureApi',
  data: () => ({
    urlApi: import.meta.env.VITE_APP_ROOT_API + '/secured',
    urlCommande: import.meta.env.VITE_APP_ROOT_API + '/secured/commande',
    resApi: '',
    loading: true,
    tabHeader:[
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
  created () {
    this.checkTokenAction(this.urlApi);


    setTimeout( async() => {

      if(this.token !== null ) {
          let config = {
          headers: {
            Authorization: 'Bearer '+this.token,
          },
        };

        let apiReq = await this.$http.get(this.urlApi,config);
        let commandReq = await this.$http.get(this.urlCommande,config)
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
          })
      }
    }, 2000);

    
  },

  methods: {

    ...mapActions({
      checkTokenAction: 'authToken/sendHeaderToken',
    }),
    
    sumField(commandeList,key) {
        // sum data in give key (property)
        return commandeList.reduce((a, b) => a + (b[key] || 0), 0)
        
    }
  },
}
</script>

<style scoped>

.responseFromServer {
  padding-top: 6px;
  padding-bottom: 6px;
  padding-left: 16px;
  padding-right: 16px;
  background-color: #dfdfdf !important;
  color: black !important;
  font-family: "Courier New", sans-serif !important;
  font-size: 0.9em !important;
  font-weight: 600 !important;
}
</style>