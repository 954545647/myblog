<template>
  <div class="aside-wrapper">
    <div class="aside">
      <ul class="aside-lists-wrapper">
        <li class="aside-component-lists">
          <i
            class="iconfont icon-remen"
            :class="{'isHotBlog': currentView == 'HotBlog'}"
            @click="currentView='HotBlog'"
          ></i>
          <i
            class="iconfont icon-fenxi"
            :class="{'isBlogInfo': currentView == 'BlogInfo'}"
            @click="currentView='BlogInfo'"
          ></i>
        </li>
      </ul>
      <keep-alive>
        <component
          :is="currentView"
          :blogTitles="blogTitles"
          :userInfo="userInfo"
          :blogInfo="blogInfo"
        ></component>
      </keep-alive>
    </div>
  </div>
</template>


<script>
import HotBlog from "@/components/Blog/hotBlog.vue";
import BlogInfo from "@/components/Blog/blogInfo.vue";
export default {
  data() {
    return {
      currentView: "HotBlog",
      blogTitles: [],
      userInfo: {},
      blogInfo: {}
    };
  },
  components: {
    BlogInfo,
    HotBlog
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  },
  mounted() {
    // 获取博客信息和用户信息
    this.$axios.get(`${process.env.VUE_APP_BASE_URL}/blog/info`).then(res => {
      this.blogTitles = res.data.blogInfo.blogTitles;
      this.userInfo = res.data.userInfo;
      this.blogInfo = res.data.blogInfo;
    });
  }
};
</script>


<style lang="scss">
@import "@/assets/styles/home.scss";
.aside-wrapper {
  position: fixed;
  right: 0;
  top: 50px;
  width: 200px;
  height: 100%;
  bottom: 0;
  background-color: #fff;
  .aside {
    width: 100%;
    height: 100%;
    font-size: 100px;
    font-size: 18px;
    flex-direction: column;
    align-items: center;
    .aside-lists-wrapper {
      height: 50px;
      margin-bottom: 20px;
      .aside-component-lists {
        height: 50px;
        display: flex;
        .isHotBlog {
          border-bottom: 1px solid #23b7e5;
        }
        .isBlogInfo {
          border-bottom: 1px solid #23b7e5;
        }
        i {
          flex: 1;
          @include center;
          font-size: 24px;
        }
      }
    }
  }
}
</style>
