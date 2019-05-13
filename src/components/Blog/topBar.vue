<template>
  <div class="topbar-wrapper">
    <div class="left" @click="showMenu">
      <i class="iconfont icon-menu"></i>
    </div>
    <div class="content">
      <i class="iconfont icon-index"></i>
    </div>
    <div class="search-bar">
      <div class="input-wrapper">
        <div class="input-group">
          <input type="text" placeholder="输入关键词搜索...">
          <div class="sousuo-wrapper">
            <i class="iconfont icon-sousuo"></i>
          </div>
        </div>
      </div>
      <div class="music-bar">
        <img src alt>
      </div>
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
@media screen and (min-width: 10px) {
  #app .topbar-wrapper {
    width: 100%;
    height: px2rem(50);
    box-sizing: border-box;
    color: white;
    background: #f05050;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1000;
    .left {
      width: 20%;
      float: left;
      height: 100%;
      @include center;
      position: absolute;
      .iconfont {
        font-size: px2rem(20);
      }
    }
    .content {
      height: 100%;
      width: 100%;
      text-align: center;
      @include center;
      .iconfont {
        font-size: px2rem(20);
      }
    }
    .search-bar {
      display: none;
    }
  }
}

// 大于500小于765:
// 隐藏左右两侧栏目,头部导航栏宽度为200,隐藏搜索栏
@media screen and (min-width: 501px) {
  #app .topbar-wrapper {
    height: 50px;
    width: 100%;
    display: block;
    .left {
      @include center;
      line-height: 50px;
      .iconfont {
        font-size: px2rem(20);
      }
    }
    .content {
      @include center;
    }
  }
}

// 大于765小于996px:
// 显示左侧作者信息,右侧文章目录隐藏,显示头部搜索
@media screen and (min-width: 765px) {
  #app .topbar-wrapper {
    display: flex;
    .left {
      display: none;
    }
    .content {
      flex: 0 0 200px;
      line-height: center;
      width: 200px;
    }
    .search-bar {
      flex: 1;
      width: 100%;
      background-color: #f9f9f9;
      display: flex;
      padding: 10px 30px;
      box-sizing: border-box;
      .input-wrapper {
        width: 190px;
        height: 100%;
        .input-group {
          height: 100%;
          border-radius: 500px;
          color: #58666e;
          background-color: #edf1f2;
          position: relative;
          left: 0;
          top: 0;
          width: 100%;
          box-sizing: border-box;
          // padding-right: 10px;
          input {
            float: left;
            border: none;
            background-color: #edf1f2;
            font-size: 12px;
            text-indent: 15px;
            height: 100%;
            border-radius: 500px 0 0 500px;
            box-sizing: border-box;
            &:focus {
              outline: 0 !important;
              background-color: #fff;
            }
          }
          .sousuo-wrapper {
            font-size: 18px;
            height: 100%;
            line-height: 30px;
          }
        }
      }
      .music-bar {
        flex: 0 0 50%;
      }
    }
  }
}
</style>