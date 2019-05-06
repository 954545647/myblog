<template>
  <div class="detail-wrapper" @click="goBack">
    <top-bar></top-bar>
    <menu-bar-big class="menu-bar-big"></menu-bar-big>
    <my-article></my-article>
  </div>
</template>

<script>
import MyArticle from "@/components/Common/article.vue";
import TopBar from "@/components/Blog/topBar.vue";
import scroll from "@/components/Common/scroll.vue";
import MenuBarBig from "@/components/Blog/menuBar1.vue";
export default {
  components: {
    MyArticle,
    scroll,
    TopBar,
    MenuBarBig
  },
  methods: {
    goBack() {}
  }
};
</script>


<style lang="scss">
@import "@/assets/styles/global.scss";
.detail-wrapper {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
}
</style>
