// import VueRouter from 'vue-router'
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
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "Login" */ '../views/LoginPage')
    component: () => import("@/views/LoginPage.vue")
    // component: LoginPage
  },
  {
    path: '/register',
    name: 'RegisterPage',
    // component: () => import(/* webpackChunkName: "Register" */ '../views/RegisterPage'),
    component: () => import("@/views/RegisterPage.vue"),
    // component: RegisterPage
  },
  {
    path: '/secure',
    name: 'SecureApiPage',
    // component: () => import(/* webpackChunkName: "Secure" */ '../views/SecureApiPage'),
    component: () => import("@/views/SecureApiPage.vue"),
    // component: SecureApiPage,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/dashboard',
    name: 'DashBoard',
    // component: () => import(/* webpackChunkName: "Secure" */ '../views/DashBoard'),
    component: () => import("@/views/DashBoard.vue"),
    // component: DashBoard,
    meta: {
      requiresAuth: true,
    }
  }
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  let isLoggedIn = userAuth().isLogged;
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

// TODO supprimer ce code mort

// const router =   createRouter({
//   // history: createMemoryHistory(import.meta.env.BASE_URL),
//   mode: 'history',
//   history: createWebHistory(import.meta.env.BASE_URL),
//   routes: [
// {
//   path: '/',
//   name: 'Home',
//   component: Home
// },
// {
//   path: '/login',
//   name: 'LoginPage',
//   // route level code-splitting
//   // this generates a separate chunk (about.[hash].js) for this route
//   // which is lazy-loaded when the route is visited.
//   // component: () => import(/* webpackChunkName: "Login" */ '../views/LoginPage')
//   component: () => import("@/views/LoginPage.vue")
//   // component: LoginPage
// },
// {
//   path: '/register',
//   name: 'RegisterPage',
//   // component: () => import(/* webpackChunkName: "Register" */ '../views/RegisterPage'),
//   component: () => import("@/views/RegisterPage.vue"),
//   // component: RegisterPage
// },
// {
//   path: '/secure',
//   name: 'SecureApiPage',
//   // component: () => import(/* webpackChunkName: "Secure" */ '../views/SecureApiPage'),
//   component: () => import("@/views/SecureApiPage.vue"),
//   // component: SecureApiPage,
//   meta: {
//     requiresAuth: true,
//   }
// },
// {
//   path: '/dashboard',
//   name: 'DashBoard',
//   // component: () => import(/* webpackChunkName: "Secure" */ '../views/DashBoard'),
//   component: () => import("@/views/DashBoard.vue"),
//   // component: DashBoard,
//   meta: {
//     requiresAuth: true,
//   }
// }
//   ]

// });
// const router = new VueRouter({
//   routes

// })
// const router = createRouter({
//   history: createMemoryHistory(),
//   routes,

// })
