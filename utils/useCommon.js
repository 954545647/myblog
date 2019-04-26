import CreateAPI from 'vue-create-api';
import Vue from 'vue';
Vue.use(CreateAPI);

import Toast from '@/components/Common/toast.vue';

// 第一个参数是组件的名称
Vue.createAPI(Toast,true)

