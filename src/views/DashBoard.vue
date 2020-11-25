<template>
    <div class="dashboard">
        <UserHome />
    </div>
    
</template>

<script>

import UserHome from '@/components/user-components/UserHome';
export default {
    name: 'DashBoard',
    components: {
        UserHome
    }
}

</script>