const actions = {
  setBlogPageWidth({commit},newWidth){
    return commit('setBlogPageWidth',newWidth);
  },
  setPreLoadImages({commit},newImages){
    return commit('setPreLoadImages',newImages);
  },
  setNextBar({commit},newValue){
    return commit('setNextBar',newValue);
  },
  setBlogValue({commit},newValue){
    return commit('setBlogValue',newValue);
  },
  setBlogRender({commit},newRender){
    return commit('setBlogRender',newRender);
  },
  Login({commit},newToken){
    return commit('Login',newToken)
  },
  Logout({commit},newToken){
    return commit('Logout',newToken)
  },
  changeView({commit},newView){
    return commit('changeView',newView)
  },
  setUserName({commit},newView){
    return commit('setUserName',newView)
  }
}

export default actions;