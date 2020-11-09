import Vue from 'vue'
import Router from 'vue-router'
import HelloAbes from '@/components/HelloAbes'
import SecureApi from '@/components/SecureApi'
import LoginPage from '@/components/LoginPage'
import RegisterPage from '@/components/RegisterPage'

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
    },
    {
      path: '/login',
      name: 'LoginPage',
      component: LoginPage
    },
    {
      path: '/register',
      name: 'RegisterPage',
      component: RegisterPage
    }
  ]
})
