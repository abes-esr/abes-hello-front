<template>
    <div class="register">
        <RegisterForm />
    </div>
    
</template>

<script>

import RegisterForm from '@/components/auth-components/RegisterForm';
export default {
    name: 'RegisterPage',
    components: {
      RegisterForm,
    }
}

</script>