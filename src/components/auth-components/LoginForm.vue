<template>
    <v-container>

      <v-row class="text-center">
        <v-col cols="12">
          <h1 class="mb-4">Se connecter</h1>
          <v-divider class="mx-4"></v-divider>
          <v-alert
              class="my-5"
              v-model="isAlertErrorVisible"
              border="start"
              close-label="Close Alert"
              color="red"
              title="Erreur"
              variant="outlined"
              closable
          >
            {{ errorApiMessage }}
          </v-alert>
        </v-col>
      </v-row>

      <v-row class="text-center mt-8">
        <v-col class="d-flex justify-center" cols="12">
          <v-form
              class="col-8"
              ref="loginForm"
              v-model="valid"
              lazy-validation
          >
            <v-text-field
                label="Nom utilisateur"
                v-model="name"
                :counter="10"
                :rules="nameRules"
                required
                width="400"
            ></v-text-field>

            <v-text-field
                class="mt-4"
                label="Mot de pass"
                v-model="passWord"
                :min="8"
                :type="isPasswordIconVisible ? 'password' : 'text'"
                :rules="passwordRules"
                :append-inner-icon="isPasswordIconVisible ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append-inner="() => changePasswordIcon()"
                counter
                required
                width="400"
            ></v-text-field>

            <v-btn
                class="mr-4 mt-4"
                :disabled="!valid"
                color="success"
                @click="validate"
                :loading="loading"
            >
              Valider
            </v-btn>

            <v-btn
                class="ml-4 mt-4"
                color="error"
                @click="reset"
            >
              Reset Form
            </v-btn>
          </v-form>
<!--          // TODO réactiver le recaptcha -->
<!--          <recaptcha ref="recaptcha" @verify="submit"></recaptcha>-->
        </v-col>
      </v-row>

<!--      // TODO vérifier la pertinence de garder cet affichage-->
<!--      <div v-if="responseFromApi !== null && !loading">-->
<!--        <v-row class="text-center">-->
<!--          <v-col cols="12">-->
<!--            <h3 class="mb-5">La réponse de serveur API</h3>-->
<!--            <v-divider class="mx-4"></v-divider>-->
<!--          </v-col>-->
<!--        </v-row>-->
<!--        <v-row class="text-center">-->
<!--          <v-col class="d-flex justify-center" cols="12">-->
<!--            <v-sheet class="responseFromServer" max-width="500">-->
<!--              {{ responseFromApi }}-->
<!--            </v-sheet>-->
<!--          </v-col>-->
<!--        </v-row>-->
<!--      </div>-->

    </v-container>

</template>

<script setup>

import { computed, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { userAuth } from '@/store/userAuth'
import helloAbesBackService from "@/service/HelloAbesBackService";
// TODO réactiver le recaptcha
// import Recaptcha from '@/components/utils/Recaptcha'

const router = useRouter();

const loginForm = ref(null)
const name = ref("");
const passWord = ref("");
const loading = ref(false);
const isPasswordIconVisible = ref(true);
const valid = ref(false);
const isAlertErrorVisible = ref(false);
const nameRules = [
  v => !!v || 'Name is required',
  v => (v && v.length <= 10) || 'Name must be less than 10 characters',
];
const passwordRules = [
  v => !!v || 'Password is required',
  v => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&+=]).{8,}/.test(v) || 'Password must be valid',
];

// TODO harmoniser les regex d'invalidité des mot de passe entre le front et le back
// ancienne regex du mot de passe sur le front => (?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})

const user = computed(() => {
  return userAuth().getUser;
});

const token = computed(() => {
  return userAuth().getToken;
})

const responseFromApi = computed(() => {
  return userAuth().getResponseFromApi;
})

const isLoggedIn = computed(() => {
  return userAuth().getIsLogged;
});

const errorApiMessage = computed(() => {
  return userAuth().getErrorApiMessage;
});

// Permet de vérifier si le formulaire est correct afin d'activer le bouton de validation
watch(() => {
  loginForm.value?.validate().then(({valide: isValid}) => {
    if (isValid != null) {
      valid.value = true;
    } else {
      valid.value = false;
    }
  })
})

function changePasswordIcon() {
  isPasswordIconVisible.value = !isPasswordIconVisible.value;
}

function submit (response) {
  console.log(response)
}

function validate () {
  if(valid.value === true) {
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

async function doLogin() {
  loading.value = true;
  try {
    let auth = {userName: name.value, passWord: passWord.value};
    const response = await helloAbesBackService.login(auth)
    isAlertErrorVisible.value = false;
  } catch (error) {
    isAlertErrorVisible.value = true;
    loading.value = false;
  } finally {
    loading.value = false;
  }
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