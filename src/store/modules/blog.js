const blog = {
  state: {
    blogpageWidth: 0, //博客页面的宽度
    preLoadImages:[], //预加载的图片对象  
    canshowNextBar:false, //能否展示下一步弹窗,
    blogValue:'', //博客的markdown格式字符串
    blogRender:'',  //博客编译后html字符串
  },
  mutations: {
    // 设置博客页面的宽度
    setBlogPageWidth(state, newWidth) {
      state.blogpageWidth = newWidth;
    },
    setPreLoadImages(state,newImages){
      state.preLoadImages = newImages;
    },
    setNextBar(state,newValue){
      state.canshowNextBar = newValue;
    },
    setBlogValue(state,newValue){
      state.blogValue = newValue;
    },
    setBlogRender(state,newRender){
      state.blogRender = newRender;
    }
  }
};
export default blog;
