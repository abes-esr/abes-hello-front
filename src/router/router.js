import { createRouter, createMemoryHistory } from 'vue-router'
import { userAuth } from '@/store/userAuth'
import Home from '@/views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: () => import("@/views/LoginPage.vue")
  },
  {
    path: '/register',
    name: 'RegisterPage',
    component: () => import("@/views/RegisterPage.vue"),
  },
  {
    path: '/secure',
    name: 'SecureApiPage',
    component: () => import("@/views/SecureApiPage.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: '/dashboard',
    name: 'DashBoard',
    component: () => import("@/views/DashBoard.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: '/donneesPersonnelles',
    name: 'DonneesPersonnelles',
    component: () => import('@/views/informations/DonneesPersonnelles.vue')
  },
  {
    path: '/mentionsLegales',
    name: 'MentionsLegales',
    component: () => import('@/views/informations/MentionsLegales.vue')
  }
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  let isLoggedIn = userAuth().getIsLogged;
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
