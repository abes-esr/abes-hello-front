<template>
  <div class="home">
    <HelloAbes />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloAbes from '@/components/home-components/HelloAbes'

export default {
  name: 'Home',
  components: {
    HelloAbes
  }
}
</script>
