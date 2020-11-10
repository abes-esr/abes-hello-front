<template>

<div>

  <div v-if="loading">

    <h3>Loading data from Back-End...... </h3>

  </div>
  <div v-else>
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

</div>


</template>

<script>

import ApiPublic from './ApiPublic.vue';

export default {
  name: 'HelloAbes',
  components: {'api-public': ApiPublic},
  data () {
    return {
      urlApiPublic: 'http://localhost:8081',
      errorApi: '',
      msg: '',
      loading: true
    }
  },
  created: function() {
    fetch(this.urlApiPublic)
      .then(res => {
        return res.ok ? res.json()  : new Promise((resolve, reject) => reject('Can not connect to API'))
      })
      .then(res => {
        setTimeout(() => {
          this.msg = res;
          this.loading = false;
        }, 2000);

      })
      .catch(error => {
        this.errorApi = `Error message: ${error.message}`;
        this.loading = false;
      });
    }
}
</script>
