<template>
  <div class="detail-wrapper">
    <top-bar></top-bar>
    <menu-bar-small></menu-bar-small>
    <menu-bar-big></menu-bar-big>
    <my-article class="my-article"></my-article>
  </div>
</template>

<script>
import MyArticle from "@/components/Common/article.vue";
import TopBar from "@/components/Blog/topBar.vue";
import MenuBarSmall from "@/components/Blog/menuBar.vue";
import MenuBarBig from "@/components/Blog/menuBar1.vue";
export default {
  components: {
    MyArticle,
    TopBar,
    MenuBarSmall,
    MenuBarBig
  },
  methods: {
  }
};
</script>


<style lang="scss">
@import "@/assets/styles/home.scss";
@media screen and (min-width: 100px) {
  .menu-bar-samll {
    top: px2rem(50);
  }
  .detail-wrapper {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    .menu-bar-big {
      display: none;
      .menu {
        width: 100%;
        flex: 0 0 100%;
      }
    }
  }
}
@media screen and (min-width: 501px) {
  .menu-bar-samll {
    top: 50px;
  }
}
@media screen and (min-width: 765px) {
  .detail-wrapper {
    .article-wrapper{
      padding: 0 0 0 200px;
    }
    box-sizing: border-box;
    .menu-bar-big {
      width: 200px;
      display: block;
    }
  }
}
</style>
