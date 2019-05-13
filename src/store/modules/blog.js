const blog = {
  state: {
    blogpageWidth: 0, //博客页面的宽度
    preLoadImages:[], //预加载的图片对象  
  },
  mutations: {
    // 设置博客页面的宽度
    setBlogPageWidth(state, newWidth) {
      state.blogpageWidth = newWidth;
    },
    setPreLoadImages(state,newImages){
      state.preLoadImages = newImages;
    }
  }
};
export default blog;
