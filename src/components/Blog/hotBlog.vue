<template>
  <div class="hot-blog">
    <ul class="blog-list">
      <li v-for="(item,index) in blogTitles" :key="index" class="blog-item">
        <i class="iconfont icon-Apple"></i>
        {{item}}
      </li>
    </ul>
  </div>
</template>


<script>
export default {
  name: "HotBlog",
  data() {
    return {
    };
  },
  props:{
    blogTitles:{
      type:Array,
      default:()=>[]
    }
  },
  mounted() {
  }
};
</script>


<style lang="scss">
.hot-blog{
    .blog-list{
      .blog-item{
        height: 50px;
        line-height: 50px;
        .iconfont{
          color: #FF7D7D;
        }
      }
    }
}
</style>