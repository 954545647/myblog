import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { Button, Form,Input,FormItem,Upload,Tag } from 'element-ui';
import mavonEditor from 'mavon-editor'; //markdown编辑器
import 'mavon-editor/dist/css/index.css';
Vue.use(Button)
Vue.use(Form)
Vue.use(Input)
Vue.use(FormItem)
Vue.use(mavonEditor)
Vue.use(Upload)
Vue.use(Tag)
import "element-ui/lib/theme-chalk/index.css";
import "@/assets/styles/global.scss";
import "@/assets/styles/fonts/iconfont.css";
import "@/utils/useCommon.js";


import axios from "axios"; //引入axios

Vue.prototype.$axios = axios;

Vue.prototype.router = router;
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
