<template>

<div>
  <div>

    <div class="row justify-content-md-center">
      <div class="col-sm-4">
        <form class="form-signin text-center" v-on:submit.prevent="register">

          <img class="mb-4" v-bind:src="`${imgPath}abes_logo.png`" alt="" width="72" height="72">
          <hr>
          <h1 class="h3 mb-3 font-weight-normal">Inscrire</h1>
          <input v-model="userName" type="text" id="username" class="form-control mb-3" placeholder="Utilisateur" required autofocus>
          <input v-model="passWord" type="password" id="password" class="form-control mb-5" placeholder="Mot de pass" required>
          <button class="btn btn-lg btn-primary btn-block" type="submit">Envoyer</button>

        </form>
      </div>
    </div>

  </div>

  <div>

    <div class="row mt-5 justify-content-md-center" v-if="success">

      <div class="col-sm-6">
        <hr />
        <h3>La réponse de seveur API en format JSon</h3>
        <code v-if="errorApi == ''">{{response}}</code>
        <pre v-else>{{errorApi}}</pre>
      </div>
    </div>

  </div>


</div>


</template>

<script>

export default {
  name: 'RegisterPage',

  data() {
    return {
      imgPath: `./static/picture/`,
      userName:'',
      passWord:'',
      urlApi: 'http://localhost:8081/register',
      userName:'',
      passWord:'',
      errorApi:'',
      response:'',
      success:false
    }
  },
  methods: {
    register: function(){
      fetch(this.urlApi, {
        method: 'Post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "userName": this.userName,
          "passWord": this.passWord
        }),
      })
      .then(res => {
        return res.ok ? res.json() : new Promise((resolve, reject) => reject('Can not connect to API'));
      })
      .then(user => {
        this.response=user;
        this.success=true;
      })
      .catch(error => {
        this.errorApi = `Error message: ${error.message}`;
        this.success=true;
      })
    }
  }
}
</script>
