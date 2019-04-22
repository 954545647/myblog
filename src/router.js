import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/myblog/login'
    },
    {
      path: '/myblog/login',
      name: 'login',
      component: ()=> import('./views/login/login.vue')
    },
    {
      path: '/myblog/register',
      name: 'register',
      component: ()=> import('./views/login/register.vue')
    },
  ]
})
