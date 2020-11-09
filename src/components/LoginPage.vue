<template>

<div >
  <div class="row justify-content-md-center">
    <div class="col-sm-4">
      <form class="form-signin text-center">

        <img class="mb-4" v-bind:src="`${imgPath}abes_logo.png`" alt="" width="72" height="72">
        <hr>
        <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
        
        <input type="email" id="inputEmail" class="form-control mb-3" placeholder="Email address" required autofocus>
        
        <input type="password" id="inputPassword" class="form-control mb-5" placeholder="Password" required>       
        <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
          
      </form>
    </div>
  </div>
</div>


</template>

<script>

export default {
  name: 'LoginPage',
  data() {
    return {
      imgPath: `./static/picture/`
    }
  }
}
</script>
