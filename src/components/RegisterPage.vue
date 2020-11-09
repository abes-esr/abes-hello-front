<template>

<div>
  <div >
  <div class="row justify-content-md-center">
    <div class="col-sm-4">
      <form class="form-signin text-center" v-on:submit.prevent="register">

        <img class="mb-4" v-bind:src="`${imgPath}abes_logo.png`" alt="" width="72" height="72">
        <hr>
        <h1 class="h3 mb-3 font-weight-normal">Register</h1>
        <input v-model="userName" type="text" id="username" class="form-control mb-3" placeholder="Utilisateur" required autofocus>
        <input v-model="passWord" type="password" id="password" class="form-control mb-5" placeholder="Mot de pass" required>       
        <button class="btn btn-lg btn-primary btn-block" type="submit">Sign up</button>
          
      </form>
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
    }
  },
  methods: {
    register: function(){
      console.log(this.userName);
      console.log(this.passWord);
    }
  }
}
</script>
