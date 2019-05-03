import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios"; //引入axios
import { Button, Form,Input,FormItem } from 'element-ui';
Vue.use(Button)
Vue.use(Form)
Vue.use(Input)
Vue.use(FormItem)
import "element-ui/lib/theme-chalk/index.css";
import "@/assets/styles/global.scss";
import "@/assets/styles/fonts/iconfont.css";
import "./../utils/useCommon.js";

Vue.prototype.router = router;
Vue.prototype.$axios = axios;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
