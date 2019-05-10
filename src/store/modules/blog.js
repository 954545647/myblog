const blog = {
  state: {
    blogpageWidth: 0 //博客页面的宽度
  },
  mutations: {
    // 设置博客页面的宽度
    setBlogPageWidth(state, newWidth) {
      state.blogpageWidth = newWidth;
    }
  }
};
export default blog;
