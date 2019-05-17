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
    // 登录
    {
      path: '/login',
      name: 'login',
      component: ()=> import('./views/login/login.vue')
    },
    // 注册
    {
      path: '/register',
      name: 'register',
      component: ()=> import('./views/login/register.vue')
    },
    // 
    {
      path: '/music',
      name: 'music',
      component: ()=> import('./views/music/index.vue'),
      meta:{
        requireAuth:true  //需要登录
      }
    },
    {
      path:'/blog',
      name:'blog',
      component:()=> import('./views/blog/index.vue'),
      meta:{
        requireAuth:true  //需要登录
      }
    },
    {
      path:'/write',
      name:'write',
      component:()=>import('@/components/Blog/writeArticle.vue'),
      meta:{
        requireAuth:true  //需要登录
      }
    },
    {
      path:'/detail/:id',
      name:'detail',
      component:()=>import('@/components/Blog/blogDetail.vue')
    }
  ]
})



