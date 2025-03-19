<template>

    <v-container fluid>

      <v-row class="text-center">
        <v-col cols="12">
          <v-img
              :src="require('@/assets/picture/logo_abes.jpg')"
              class="my-3"
              contain
              height="100"
          />
          <v-divider class="mx-4"></v-divider>
          <h1 class="mt-10">Se connecter</h1>
        </v-col>
      </v-row>

      <v-row class="text-center" justify="center">
        <v-col cols="4" >
          <v-form
              class="mt-15"
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
                label="Mot de passe"
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
          <recaptcha ref="recaptcha" @verify="submit"></recaptcha>
        </v-col>
      </v-row>

      <div v-if="errorApi && !loading">

        <v-row class="text-center" >
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

import {mapActions} from 'vuex'
import {mapGetters} from 'vuex'
import Recaptcha from '@/components/utils/Recaptcha'

export default {
    name: 'LoginForm',
    data: () => ({

        name:'',
        passWord: "",
        loading: false,
        value: true,
        valid: true,
        nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters',
        ],
        passwordRules: [
            v => !!v || 'Password is required',
            v => /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(v) || 'Password must be valid',
        ]

    }),
    components: {
      Recaptcha
    },
    computed: {
      ...mapGetters({
        auth: 'auth/authenticated',
        user: 'auth/user',
        isLoggedIn: 'auth/isLogged',
        resApi: 'auth/resApi',
        errorApi: 'auth/errorApi',
      })
    },
    methods: {
        ...mapActions({
          loginAction: 'auth/loginAction',
        }),
        submit (response) {
          console.log(response)
        },
          validate () {

            if(this.$refs.loginForm.validate()) {
              this.$refs.recaptcha.execute();
              this.doLogin();
            }
          },
          reset () {
              this.$refs.loginForm.reset();
          },
          doLogin() {
            this.loading=true;
            let auth = {userName: this.name, passWord: this.passWord};
            this.loginAction(auth);
            this.loading = true;
            setTimeout(() => {
                this.loading=false;
                if(this.isLoggedIn) {
                  this.$router.push({ name: 'DashBoard' });
                }
              }, 2000);
          },
      }
}
</script>