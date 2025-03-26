<template>

    <v-container fluid>

      <v-row class="text-center">
        <v-col cols="12">
          <v-img
              src="src/assets/picture/abeslogo130.svg"
              class="my-3"
              contain
              height="100"
          />
          <v-divider class="mx-4"></v-divider>
          <h1 class="mt-10">Se connecter</h1>
        </v-col>
      </v-row>

      <v-row class="text-center">
        <v-col cols="12">
          <v-form
              class="col-4 offset-4 mt-15"
              ref="loginForm"
              v-model="valid"
              lazy-validation
          >
            <v-text-field
                v-model="name"
                :counter="10"
                :rules="nameRules"
                label="Nom utilisateur"
                required
            ></v-text-field>

            <v-text-field
                label="Mot de pass"
                v-model="passWord"
                :min="8"
                :type="value ? 'password' : 'text'"
                :rules="passwordRules"
                :append-icon="value ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="() => (value = !value)"
                counter
                required
            ></v-text-field>
            <v-btn
                :disabled="!valid"
                color="success"
                class="mr-4"
                @click="validate"
                :loading="loading"
            >
              Valider
            </v-btn>

            <v-btn
                color="error"
                class="mr-4"
                @click="reset"
            >
              Reset Form
            </v-btn>
          </v-form>
<!--          // TODO réactiver le recaptcha -->
<!--          <recaptcha ref="recaptcha" @verify="submit"></recaptcha>-->
        </v-col>
      </v-row>

      <div v-if="errorApi && !loading">

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

<script setup>

import {computed, ref, watch} from "vue";
import {useRouter} from "vue-router";
import { userAuth } from '@/store/userAuth'
// TODO réactiver le recaptcha
// import Recaptcha from '@/components/utils/Recaptcha'

const router = useRouter();

const loginForm = ref(null)
const name = ref("");
const passWord = ref("");
const loading = ref(false);
const value = true;
const valid = ref(false);
const nameRules = [
  v => !!v || 'Name is required',
  v => (v && v.length <= 10) || 'Name must be less than 10 characters',
];
const passwordRules = [
  v => !!v || 'Password is required',
  v => /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(v) || 'Password must be valid',
];

// Permet de vérifier si le formulaire est correct afin d'activer le bouton de validation
watch(() => {
  loginForm.value?.validate().then(({valide: isValid}) => {
    if (isValid != null) {
      valid.value = true;
    }
  })
})

const user = computed(() => {
  return userAuth().user;
});

const isLoggedIn = computed(() => {
  return userAuth().isLoggedIn;
});

const resApi = computed(() => {
  return userAuth().resApi;
})

const errorApi = computed(() => {
  return userAuth().errorApi;
});


function submit (response) {
  console.log(response)
}

function validate () {
  if(valid === true) {
    // TODO réactiver le recaptcha
    // recaptcha.execute();
    doLogin();
  }
}

function reset () {
  name.value = "";
  passWord.value = "";
  valid.value = false;
}

function doLogin() {
  loading.value = true;
  let auth = {userName: name.value, passWord: passWord.value};
  // TODO tester le loginAction
  userAuth().loginAction(auth)
  loading.value = true;
  setTimeout(() => {
      loading.value = false;
      if(isLoggedIn) {
        router.push('/dashboard');
      }
    }, 2000);
}

// TODO tester le code ci-dessus et si ok supprimer le code mort ci-dessous

// export default {
//     name: 'LoginForm',
//     data: () => ({
//
//         name:'',
//         passWord: "",
//         loading: false,
//         value: true,
//         valid: true,
//         nameRules: [
//         v => !!v || 'Name is required',
//         v => (v && v.length <= 10) || 'Name must be less than 10 characters',
//         ],
//         passwordRules: [
//             v => !!v || 'Password is required',
//             v => /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(v) || 'Password must be valid',
//         ]
//
//     }),
//     components: {
//       Recaptcha
//     },
//     computed: {
//       ...mapGetters({
//         auth: 'auth/authenticated',
//         user: 'auth/user',
//         isLoggedIn: 'auth/isLogged',
//         resApi: 'auth/resApi',
//         errorApi: 'auth/errorApi',
//       })
//     },
//     methods: {
//         ...mapActions({
//           loginAction: 'auth/loginAction',
//         }),
//         submit (response) {
//           console.log(response)
//         },
//           validate () {
//
//             if(this.$refs.loginForm.validate()) {
//               this.$refs.recaptcha.execute();
//               this.doLogin();
//             }
//           },
//           reset () {
//               this.$refs.loginForm.reset();
//           },
//           doLogin() {
//             this.loading=true;
//             let auth = {userName: this.name, passWord: this.passWord};
//             this.loginAction(auth);
//             this.loading = true;
//             setTimeout(() => {
//                 this.loading=false;
//                 if(this.isLoggedIn) {
//                   this.$router.push({ name: 'DashBoard' });
//                 }
//               }, 2000);
//           },
//       }
// }
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