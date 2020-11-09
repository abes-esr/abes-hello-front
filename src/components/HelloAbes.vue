<template>

<div>
  <div v-if="errorApi === ''">
    <h3>Reponse avec Json format</h3>
    <hr>
    <api-public
    v-bind:msg="msg">
    </api-public>
  </div>
  <div v-else>
    <api-public
    v-bind:msg="errorApi">
    </api-public>
  </div>

</div>


</template>

<script>

import ApiPublic from './ApiPublic.vue';

export default {
  name: 'HelloAbes',
  components: {'api-public': ApiPublic},
  data () {
    return {
      urlApiPublic: 'https://test-abes-back.herokuapp.com/',
      errorApi: '',
      msg: ''
    }
  },
  created: function() {
    fetch(this.urlApiPublic)
      .then(res => {
        return res.ok ? res.json() : new Promise((resolve, reject) => reject('Can not connect to API'))
      })
      .then(res => {
        this.msg = res;
        console.log(res);
      })
      .catch(error => {
        this.errorApi = `Error message: ${error.message}`;
        console.log(this.errorApi)
      })
    }
}
</script>
