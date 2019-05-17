<template>
  <div class="user-wrapper">
    <top-bar></top-bar>
    <menu-bar-small></menu-bar-small>
    <menu-bar-big></menu-bar-big>
    <div class="user-center">
      用户中心,待开发~
    </div>
  </div>
</template>

<script>
import TopBar from "@/components/Blog/topBar.vue";
import MenuBarSmall from "@/components/Blog/menuBar.vue";
import MenuBarBig from "@/components/Blog/menuBar1.vue";
export default {
  components: {
    TopBar,
    MenuBarSmall,
    MenuBarBig
  },
};
</script>

<style lang="scss">
@import "@/assets/styles/global.scss";
@media screen and (min-width: 100px) {
  .menu-bar-samll {
    top: px2rem(50);
  }
  .user-wrapper {
    .user-center{
      padding-top: px2rem(60);
      font-size: 16px;
    }
    .menu-bar-big {
      display: none;
      .menu {
        width: 100%;
        flex: 0 0 100%;
      }
    }
  }
}
</style>