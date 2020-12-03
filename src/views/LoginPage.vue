<template>
    <div class="login">
        <LoginForm />
    </div>
    
</template>

<script>

import LoginForm from '@/components/auth-components/LoginForm';

export default {
    name: 'LoginPage',
    components: {
      LoginForm,
    }
}

</script>