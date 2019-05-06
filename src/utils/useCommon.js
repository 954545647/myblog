import CreateAPI from "vue-create-api";
import Vue from "vue";
Vue.use(CreateAPI);

import Toast from "@/components/Common/toast.vue";
import List from "@/components/Common/list.vue";
import MenuBar from "@/components/Blog/menuBar.vue";
// 第一个参数是组件的名称
Vue.createAPI(Toast, true);
Vue.createAPI(List, true);
Vue.createAPI(MenuBar,true);

// 使用
// this.$createToast({
//   // <!--$props对象是组件需要的属性-->
//     $props: {
//       text: "Hello",
//     }
//   }).show();
