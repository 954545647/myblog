<template>
  <div class="topbar-wrapper">
    <div class="left" @click="showMenu">
      <i class="iconfont icon-menu"></i>
    </div>
    <div class="content">
      <i class="iconfont icon-index"></i>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menu: null //菜单组件
    };
  },
  methods: {
    showMenu() {
      this.menu = this.$createMenuBar({
        $props: {
          list: ["首页", "菜单"]
        }
      });
      this.menu.show();
    }
  },
  beforeDestroy() {
    if (this.menu) {
      this.menu.remove();
    }
  }
};
</script>


<style lang="scss">
@import "@/assets/styles/global.scss";
.topbar-wrapper {
  width: 100%;
  height: px2rem(50);
  box-sizing: border-box;
  color: white;
  background: #f05050;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
  .left {
    width: 20%;
    float: left;
    height: 100%;
    .iconfont {
      font-size: px2rem(20);
    }
  }
  .content {
    height: 100%;
    width: 80%;
    text-align: center;
    .iconfont {
      font-size: px2rem(20);
    }
  }
}
</style>