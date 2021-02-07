<template>
  <div class="home">
    <HelloMessage />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloMessage from "@/components/HelloMessage.vue"; // @ is an alias to /src

@Component({
  components: {
    HelloMessage
  }
})
export default class Home extends Vue {}
</script>
