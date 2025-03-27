<template>
  <v-container>

    <v-row class="text-center">
      <v-col cols="12">
        <h1 class="mb-4">S'inscrire</h1>
        <v-divider class="mx-4"></v-divider>
      </v-col>
    </v-row>

    <v-row class="text-center mt-8">
      <v-col class="d-flex justify-center" cols="12">
        <v-form
          class="col-8"
          ref="registerForm"
          v-model="valid"
          lazy-validation
        >
          <v-text-field
            label="Nom utilisateur"
            v-model="name"
            :counter="10"
            :rules=nameRules
            required
            width="400"
          ></v-text-field>

          <v-text-field
            label="Mot de passe"
            v-model="passWord"
            :min="8"
            :type="isPasswordIconVisible ? 'password' : 'text'"
            :rules=passwordRules
            :append-inner-icon="isPasswordIconVisible ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append-inner="() => changePasswordIcon()"
            counter
            required
            width="400"
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

          <v-btn class="mr-4" color="error" @click="reset">
            Reset Form
          </v-btn>
        </v-form>
      </v-col>
    </v-row>

      <v-row class="text-center" v-if="sendForm">
        <v-col cols="12">
          <h3 class="mb-5">La réponse de serveur API</h3>
          <v-divider class="mx-4"></v-divider>
        </v-col>
      </v-row>

      <v-row class="text-center" v-if="sendForm">
        <v-col class="d-flex justify-center" cols="12">
          <h4 v-if="loading">Loading data ...</h4>
          <v-sheet v-else class="responseFromServer" max-width="500">
            {{ resApi.data }}
          </v-sheet>
        </v-col>
      </v-row>

    </v-container>

</template>

<script setup>
import {ref, watch} from "vue";
import HelloAbesBackService from "@/service/HelloAbesBackService";

const registerForm = ref(null);
const name = ref("");
const passWord = ref("");
const loading = ref(false);
const isPasswordIconVisible = ref(true);
const valid = ref(false)
const sendForm = ref(false);
const nameRules = [
  v => !!v || 'Name is required',
  v => (v && v.length <= 10) || 'Name must be less than 10 characters'
];
const passwordRules = [
  v => !!v || 'Password is required',
  v => /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(v) || 'Password must be valid',
];

// Permet de vérifier si le formulaire est correct afin d'activer le bouton de validation
watch(() => {
  registerForm.value?.validate().then(({valide: isValid}) => {
    if (isValid != null) {
      valid.value = true;
    }
  })
})

function changePasswordIcon() {
  isPasswordIconVisible.value = !isPasswordIconVisible.value;
}

function validate () {
  sendForm.value = true;
  sendApi();
}

function reset () {
  name.value = '';
  passWord.value = '';
  valid.value = false;
}

function sendApi() {
  let auth = {userName: name.value, passWord: passWord.value};
  HelloAbesBackService.sendApi(auth);
  loading.value = false;
}

// TODO tester le code ci-dessus et si ok supprimer le code mort ci-dessous

// export default {
//     name: 'RegisterForm',
//     data: () => ({
//
//       urlApi: import.meta.env.VITE_APP_ROOT_API + '/register',
//       resApi:'',
//       loading: false,
//       sendForm: false,
//       name:'',
//       passWord: "",
//       value: true,
//       valid: true,
//       nameRules: [
//       v => !!v || 'Name is required',
//       v => (v && v.length <= 10) || 'Name must be less than 10 characters',
//       ],
//       passwordRules: [
//           v => !!v || 'Password is required',
//           v => /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(v) || 'Password must be valid',
//       ]
//
//     }),
//     methods: {
//
//         validate () {
//           if(this.$refs.form.validate()) {
//             this.sendForm=true;
//             this.sendApi();
//           };
//         },
//         reset () {
//           this.$refs.form.reset();
//         },
//         async sendApi() {
//           this.loading = true;
//           let auth = {userName: this.name, passWord: this.passWord};
//           setTimeout(async () => {
//             this.resApi = await this.$http.post(this.urlApi, auth);
//             this.loading=false;
//           }, 2000);
//         }
//
//     },
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