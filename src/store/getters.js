const getters = {
  blogpageWidth: state => state.blog.blogpageWidth,
  preLoadImages: state => state.blog.preLoadImages,
  canshowNextBar: state=> state.blog.canshowNextBar,
  blogValue: state=> state.blog.blogValue,
  blogRender: state=> state.blog.blogRender,
  token:state=>state.user.token,
};

// 不使用 getters:
// this.$store.state.blog.token 

// 使用 getters:
// this.$store.getters.token

// 使用mapGetters(将 store 中的 getter 映射到局部计算属性):
// this.token

// this.$store.state.user.token
// this.$store.getters.token
export default getters;
