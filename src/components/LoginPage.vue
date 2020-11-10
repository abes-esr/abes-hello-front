<template>

<div >
  <div class="row justify-content-md-center">
    <div class="col-sm-4">
      <form class="form-signin text-center">

        <img class="mb-4" v-bind:src="`${imgPath}abes_logo.png`" alt="" width="72" height="72">
        <hr>
        <h1 class="h3 mb-3 font-weight-normal">Connecter</h1>
        
        <input type="text" id="username" class="form-control mb-3" placeholder="Utilisateur" required autofocus>
        
        <input type="password" id="password" class="form-control mb-5" placeholder="Mot de pass" required>       
        <button class="btn btn-lg btn-primary btn-block" type="submit">Envoyer</button>
          
      </form>
    </div>
  </div>
</div>


</template>

<script>

export default {
  name: 'LoginPage',
  userName:'',
  passWord:'',
  data() {
    return {
      imgPath: `./static/picture/`
    }
  },
  methods: {

  }
}
</script>
