import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: ()=> import('./views/login/login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: ()=> import('./views/login/register.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: ()=> import('./views/home/index.vue')
    },
  ]
})
