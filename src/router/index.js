import Vue from 'vue'
import Router from 'vue-router'
import HelloAbes from '@/components/HelloAbes'
import SecureApi from '@/components/SecureApi'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloAbes',
      component: HelloAbes
    },
    {
      path: '/secured',
      name: 'SecureApi',
      component: SecureApi
    }
  ]
})
