// import Vue from 'vue'
// import Vuex from 'vuex'
import blog from '@/store/modules/blog.js';
import user from '@/store/modules/user.js';
import getters from "@/store/getters.js";
import actions from "@/store/actions.js";
// Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
    user,
    blog
  },
  actions,
  getters
})
