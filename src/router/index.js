import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'
import Home from '@/views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: () => import(/* webpackChunkName: "Login" */ '../views/LoginPage')
  },
  {
    path: '/register',
    name: 'RegisterPage',
    component: () => import(/* webpackChunkName: "Register" */ '../views/RegisterPage'),
  },
  {
    path: '/secure',
    name: 'SecureApiPage',
    component: () => import(/* webpackChunkName: "Secure" */ '../views/SecureApiPage'),
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/dashboard',
    name: 'DashBoard',
    component: () => import(/* webpackChunkName: "Secure" */ '../views/DashBoard'),
    meta: {
      requiresAuth: true,
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  let isLoggedIn = store.getters['auth/isLogged'];
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (!isLoggedIn) {
      next('/login');
    }
    else {
      next() ;
    }
  } else {
    next();
  }
})

export default router
