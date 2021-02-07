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
        <h1 class="mt-10">Inscription</h1>
      </v-col>
    </v-row>

    <v-row class="text-center">
      <v-col cols="12">
        <v-form
          class="col-4 offset-4 mt-15"
          ref="regForm"
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
          >
            Valider
          </v-btn>

          <v-btn color="error" class="mr-4" @click="reset">
            Reset Form
          </v-btn>
        </v-form>
      </v-col>
    </v-row>


  </v-container>

</template>

<script lang="ts">

import { Component, Emit, Vue } from "vue-property-decorator";


@Component
export default class RegisterForm extends Vue {

  name = "";
  passWord = "";
  value =true;
  valid = true;
  nameRules = [
    (v: any) => !!v || 'Name is required',
    (v: any) => (v && v.length <= 10) || 'Name must be less than 10 characters',
  ];
  passwordRules = [
    (v: any) => !!v || 'Password is required',
    (v: any) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%&])(?=.{8,})/.test(v) || 'Password must be valid'
  ];

  validate(): void{
    if((this.$refs.regForm as Vue & { validate: () => boolean }).validate()) {
      this.doRegister();
      this.reset();
    }
  }

  reset(): void {
    (this.$refs.regForm as Vue & { reset: () => boolean }).reset()
  }

  @Emit("registerAction")
  doRegister() {
    return { userName: this.name, passWord: this.passWord };
  }

}

</script>
