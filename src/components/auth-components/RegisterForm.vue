<template>

    <v-container>
        <v-row class="text-center">
            <v-col cols="12">
                <v-img
                :src="require('@/assets/picture/logo_abes.jpg')"
                class="my-3"
                contain
                height="100"
                />
                <v-divider class="mx-4"></v-divider>
                <h1 class="mt-10">S'inscrire</h1>
            </v-col>


        </v-row>

        <v-row class="text-center">
            <v-col cols="12">
                <v-form
                class="col-4 offset-4 mt-15"
                ref="form"
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
            </v-col>
        </v-row>

        <v-row class="text-center" v-if="sendForm">
          <v-col cols="12">
            <v-divider class="mx-4"></v-divider>
            <h1>La réponse de serveur API</h1>
            <h4 class="mt-10" v-if="loading">Loading data ...</h4>
            <h4 class="mt-10" v-else><code>{{resApi.data}}</code></h4>
          </v-col>
        </v-row>
    </v-container>

</template>

<script>
export default {
    name: 'RegisterForm',
    data: () => ({

      urlApi: process.env.VUE_APP_ROOT_API + '/register',
      resApi:'',
      loading: false,
      sendForm: false,
      name:'',
      passWord: "",
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
    methods: {

        validate () {
          if(this.$refs.form.validate()) {
            this.sendForm=true;
            this.sendApi();
          };
        },
        reset () {
          this.$refs.form.reset();
        },
        async sendApi() {
          this.loading = true;
          let auth = {userName: this.name, passWord: this.passWord};
          setTimeout(async () => {
            this.resApi = await this.$http.post(this.urlApi, auth);
            this.loading=false;
          }, 2000);
        }

    },
}
</script>