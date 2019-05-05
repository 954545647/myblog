<template>
  <transition name="menu">
    <div class="menu-wrapper" v-if="canshow">
      <div class="menu">
        <!-- 作者信息 -->
        <div class="auth">
          <div class="author-cover">
            <img src="@/assets/author.jpg" alt>
          </div>
          <strong class="name">Rex</strong>
          <span class="brief">不想切图的切图仔</span>
        </div>
        <!-- 导航栏菜单 -->
        <div class="navigation">
          <ul class="list">
            <li class="list-title">导航</li>
            <li>
              <i class="iconfont icon-shouye"></i>
              <span>首页</span>
            </li>
            <li>
              <i class="iconfont icon-wenzhang1"></i>
              <span>博客</span>
            </li>
            <li>
              <i class="iconfont icon-erji"></i>
              <span>听歌</span>
            </li>
            <li>
              <i class="iconfont icon-shuben"></i>
              <span>看书</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="mask" @click="hide"></div>
    </div>
  </transition>
</template>


<script>
export default {
  name: "MenuBar",
  data() {
    return {
      canshow: false
    };
  },
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    show() {
      this.canshow = !this.canshow;
    },
    hide() {
      this.canshow = false;
    }
  }
};
</script>


<style lang="scss">
@import "@/assets/styles/global.scss";
.menu-wrapper {
  position: fixed;
  left: 0;
  top: px2rem(50);
  width: 100%;
  height: 100%;
  display: flex;
  .menu {
    width: 75%;
    height: 100%;
    flex: 0 0 75%;
    background-color: #3a3f51;
    .auth {
      width: 100%;
      height: 35%;
      display: flex;
      @include center;
      box-sizing: border-box;
      flex-direction: column;
      .author-cover {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        padding: 0 0 px2rem(15) 0;
        img {
          border-radius: 50%;
          width: px2rem(120);
          height: px2rem(120);
        }
      }
      .name {
        color: rgb(234, 235, 237);
        font-size: px2rem(16);
        margin-bottom: px2rem(10);
      }
      .brief {
        color: rgb(139, 142, 153);
        font-size: px2rem(14);
      }
    }
    .navigation {
      flex: 0 0 60%;
      padding: px2rem(10) px2rem(10) 0 px2rem(10);
      .list {
        list-style: none;
        color: rgb(180, 182, 189);
        font-size: px2rem(16);
        .list-title {
          font-size: px2rem(14);
        }
        li {
          height: px2rem(40);
          line-height: px2rem(40);
          box-sizing: border-box;
          .iconfont {
            font-size: px2rem(16);
            padding: 0 px2rem(20) 0 px2rem(10);
          }
          .icon-shouye {
            font-size: px2rem(22);
            vertical-align: -2px;
            padding: 0 px2rem(14) 0 px2rem(8);
          }
        }
      }
    }
  }
  .mask {
    background-color: transparent;
    width: 25%;
    flex: 0 0 25%;
  }
}
</style>