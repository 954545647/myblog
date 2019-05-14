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
  }
}

export default actions;