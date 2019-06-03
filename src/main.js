import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import {
  Button,
  Form,
  Input,
  FormItem,
  Upload,
  Tag,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Tabs,
  TabPane
} from "element-ui";
import mavonEditor from "mavon-editor"; //markdown编辑器
import "mavon-editor/dist/css/index.css";
Vue.use(Button);
Vue.use(Form);
Vue.use(Input);
Vue.use(FormItem);
Vue.use(mavonEditor);
Vue.use(Upload);
Vue.use(Tag);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Tabs);
Vue.use(TabPane);
import "element-ui/lib/theme-chalk/index.css";
import "@/assets/styles/global.scss";
import "@/assets/styles/fonts/iconfont.css";
import "@/utils/useCommon.js";

import axios from "axios"; //引入axios
axios.defaults.withCredentials = true; //允许携带cookie
Vue.prototype.$axios = axios;

Vue.prototype.router = router;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

// to是即将要进入的路由 from是当前导航正要离开的路由
// next:Function 一定要调用这个方法来 resolve 这个钩子
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    // 判断该路由是否需要登录权限
    axios.get(`${process.env.VUE_APP_BASE_URL}/ifLogin`).then(res => {
      if (res.data.status === 200) {
        next();
      } else {
        next({
          path: "/login"
          // query: { redirect: to.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
        });
      }
    });
  } else {
    next();
  }
});
