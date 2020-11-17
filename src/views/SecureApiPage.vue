<template>
  <div class="secure-page">
    <secure-api />
  </div>
</template>

<script>

import SecureApi from '@/components/user-components/SecureApi';

export default {
  name: 'SecureApiPage',
  components: {
    SecureApi,
  }
}

</script>