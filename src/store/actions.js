const actions = {
  setBlogPageWidth({commit},newWidth){
    return commit('setBlogPageWidth',newWidth);
  },
  setPreLoadImages({commit},newImages){
    return commit('setPreLoadImages',newImages);
  }
}

export default actions;