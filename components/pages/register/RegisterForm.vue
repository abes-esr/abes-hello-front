<template>
  <v-container>

    <v-row class="text-center">
      <v-col cols="12">
        <h1 class="mb-4">S'inscrire</h1>
        <v-divider class="mx-4" />
        <v-alert v-model="isAlertErrorVisible" class="my-5" border="start" close-label="Close Alert" color="red"
          title="Erreur" variant="outlined" closable>
          {{ errorApiMessage }}
        </v-alert>
      </v-col>
    </v-row>

    <v-row class="text-center mt-8">
      <v-col class="d-flex justify-center" cols="12">
        <v-form ref="registerForm" v-model="valid" class="col-8" lazy-validation>
          <v-text-field v-model="name" label="Nom utilisateur" :counter="10" :rules=nameRules required width="400" />

          <v-text-field v-model="passWord" class="mt-4" label="Mot de passe" :min="8"
            :type="isPasswordIconVisible ? 'password' : 'text'" :rules=passwordRules
            :append-inner-icon="isPasswordIconVisible ? 'mdi-eye' : 'mdi-eye-off'" counter required width="400"
            @click:append-inner="() => changePasswordIcon()" />

          <v-btn class="mr-4 mt-4" :disabled="!valid" color="success" :loading="loading" @click="validate">
            Valider
          </v-btn>

          <v-btn class="ml-4 mt-4" color="error" @click="reset">
            Reset Form
          </v-btn>
        </v-form>
      </v-col>
    </v-row>

  </v-container>

</template>

<script setup>
import { ref, watch } from "vue";

const registerForm = ref(null);
const name = ref("");
const passWord = ref("");
const loading = ref(false);
const isPasswordIconVisible = ref(true);
const valid = ref(false)
const isAlertErrorVisible = ref(false);
const nameRules = [
  v => !!v || 'Name is required',
  v => (v && v.length <= 10) || 'Name must be less than 10 characters'
];
const passwordRules = [
  v => !!v || 'Password is required',
  v => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&+=]).{8,}/.test(v) || 'Password must be valid',
];

// TODO harmoniser les regex d'invalidité des mot de passe entre le front et le back. La regex ci-dessous est l'ancienne du front et semble plus large
// ancienne regex du mot de passe sur le front => v => /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(v) || 'Password must be valid',

const { isLoggedIn, errorApiMessage, register } = useAuth()

// Permet de vérifier si le formulaire est correct afin d'activer le bouton de validation
watch(() => {
  registerForm.value?.validate().then(({ valide: isValid }) => {
    valid.value = isValid != null;
  })
})

function changePasswordIcon() {
  isPasswordIconVisible.value = !isPasswordIconVisible.value;
}

function validate() {
  if (valid.value === true) {
    callRegister();
  }
}

function reset() {
  isAlertErrorVisible.value = false;
  res();
}

function res() {
  name.value = '';
  passWord.value = '';
  valid.value = false;
}

async function callRegister() {
  loading.value = true;
  try {
    const auth = { userName: name.value, passWord: passWord.value };
    await register(auth);
    isAlertErrorVisible.value = false;
    navigateTo('/login');
  } catch {
    isAlertErrorVisible.value = true;
  } finally {
    loading.value = false;
    res();
  }
}

</script>

<style></style>