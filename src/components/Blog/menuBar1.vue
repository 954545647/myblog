<template>
  <div class="menu-bar-big">
    <div class="menu">
      <!-- 作者信息 -->
      <div class="auth">
        <div class="author-cover">
          <img class="author-cover-img" src="@/assets/author.jpg" alt>
        </div>
        <strong class="name">Rex</strong>
        <span class="brief">不想切图的切图仔</span>
      </div>
      <!-- 导航栏菜单 -->
      <div class="navigation">
        <ul class="list">
          <li class="list-title">导航</li>
          <li @click="goToBlog">
            <i class="iconfont icon-wenzhang1"></i>
            <span>文章</span>
          </li>
          <li @click="goToMusic">
            <i class="iconfont icon-erji"></i>
            <span>听歌</span>
          </li>
          <li @click="goToWrite">
            <i class="iconfont icon-shuben"></i>
            <span>写博客</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "MenuBar",
  data() {
    return {
      canshow: false,
      width: 0
    };
  },
  methods: {
    // 去写博客
    goToWrite() {
      this.canshow = false;
      setTimeout(() => {
        this.$router.push("/write");
      }, 0);
    },
    // 去博客列表
    goToBlog() {
      this.canshow = false;
      setTimeout(() => {
        this.$router.push("/blog");
      }, 0);
    },
    // 去听歌
    goToMusic() {
      this.canshow = false;
      setTimeout(() => {
        this.$router.push("/music");
      }, 0);
    }
  }
};
</script>


<style lang="scss">
@import "@/assets/styles/global.scss";
.menu-bar-big {
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  display: flex;
  .menu {
    z-index: 1500;
    width: 75%;
    height: 100%;
    flex: 0 0 75%;
    background-color: #3a3f51;
    padding-top: 50px;
    .auth {
      width: 100%;
      height: 40%;
      display: flex;
      @include center;
      box-sizing: border-box;
      flex-direction: column;
      border-bottom: 1px solid #2e3344;
      .author-cover {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        padding: 0 0 15px 0;
        .author-cover-img {
          border-radius: 50%;
          width: px2rem(120);
          height: px2rem(120);
          &:hover {
            transform: rotate(360deg);
            transition: 0.4s all ease-in-out;
          }
        }
      }
      .name {
        color: rgb(234, 235, 237);
        font-size: 16px;
        margin-bottom: 10px;
      }
      .brief {
        color: rgb(139, 142, 153);
        font-size: 14px;
      }
    }
    .navigation {
      flex: 0 0 60%;
      padding: 10px 10px 0 10px;
      .list {
        list-style: none;
        color: rgb(180, 182, 189);
        font-size: 16px;
        .list-title {
          font-size: 14px;
        }
        li {
          display: flex;
          justify-content: flex-start;
          height: 40px;
          line-height: 40px;
          .iconfont {
            font-size: 16px;
            padding: 0 20px 0 10px;
          }
          .icon-shouye {
            font-size: 22px;
            vertical-align: -2px;
            padding: 0 14px 0 8px;
          }
        }
      }
    }
  }
}
</style>