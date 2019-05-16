import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { Button, Form, Input, FormItem, Upload, Tag } from "element-ui";
import mavonEditor from "mavon-editor"; //markdown编辑器
import "mavon-editor/dist/css/index.css";
Vue.use(Button);
Vue.use(Form);
Vue.use(Input);
Vue.use(FormItem);
Vue.use(mavonEditor);
Vue.use(Upload);
Vue.use(Tag);
import "element-ui/lib/theme-chalk/index.css";
import "@/assets/styles/global.scss";
import "@/assets/styles/fonts/iconfont.css";
import "@/utils/useCommon.js";

import axios from "axios"; //引入axios
// axios.defaults.crossDomain = true;
axios.defaults.withCredentials = true;
Vue.prototype.$axios = axios;
Vue.prototype.router = router;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

// http request 拦截器
axios.interceptors.request.use(
  config => {
    if (localStorage.token) { //判断token是否存在
      config.headers.Authorization = localStorage.token;  //将token设置成请求头
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);


// http response 拦截器
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    console.log(error)
    return Promise.reject(error);
  }
);
export default axios;


// http response 拦截器
// axios.interceptors.response.use(
//   response => {
//     return response;
//   },
//   error => {
//     if (error.response) {
//       switch (error.response.status) {
//         case 401:
//           // 返回 401 清除token信息并跳转到登录页面
//           // store.commit(types.LOGOUT);
//           router.replace({
//             path: "login",
//             query: { redirect: router.currentRoute.fullPath }
//           });
//       }
//     }
//     return Promise.reject(error.response.data); // 返回接口返回的错误信息
//   }
// );

// to是即将要进入的路由 from是当前导航正要离开的路由
// next:Function 一定要调用这个方法来 resolve 这个钩子
router.beforeEach((to, from, next) => {
  // store.state.user.token 或者 store.getters.token;
  // store.state.user.token = sessionStorage.getItem("token"); //获取本地存储的token
  store.state.user.token = window.localStorage.getItem("token"); //获取本地存储的token
  if (to.meta.requireAuth) {
    // 判断该路由是否需要登录权限
    if (store.state.user.token && store.state.user.token.length) {
      // 通过vuex state获取当前的token是否存
      next();
    } else {
      next({
        path: "/login",
        query: { redirect: to.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
      });
    }
  } else {
    next();
  }
});
