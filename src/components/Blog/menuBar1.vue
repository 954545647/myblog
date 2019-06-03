<template>
  <div class="menu-bar-big">
    <div class="menu">
      <!-- 作者信息 -->
      <div class="auth">
        <div class="author-cover">
          <img class="author-cover-img" src="./../../assets/author.jpg" alt>
        </div>
        <strong class="name">Rex</strong>
        <span class="brief">不想切图的切图仔</span>
      </div>
      <!-- 导航栏菜单 -->
      <div class="navigation">
        <el-menu default-active="2" class="el-menu-vertical-demo">
          <el-menu-item index="1" @click="goToBlog">
            <i class="iconfont icon-wenzhang1"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-menu-item index="2" @click="goToWrite">
            <i class="iconfont icon-shuben"></i>
            <span slot="title">写博客</span>
          </el-menu-item>
          <el-menu-item index="3" @click="goToMusic">
            <i class="iconfont icon-erji"></i>
            <span slot="title">听歌</span>
          </el-menu-item>
          <el-menu-item index="4" @click="goToPerson">
            <i class="iconfont icon-yonghu"></i>
            <span slot="title">个人中心</span>
          </el-menu-item>
          <!-- <el-submenu index="4" @click="goToPerson">
            <template slot="title">
              <i class="iconfont icon-shuben"></i>
              <span>个人中心</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1" @click="goToPerson">
                <i class="iconfont icon-xiugai"></i>
                修改资料
              </el-menu-item>
              <el-menu-item index="1-2">
                <i class="iconfont icon-xiugai"></i>
                修改资料
              </el-menu-item>
              <el-menu-item index="1-3">
                <i class="iconfont icon-web-icon-"></i>
                退出登录
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>-->
        </el-menu>
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
    goToPerson() {
      this.$router.push("/user");
    },
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
      .el-menu {
        border-right: none;
        background-color: $black;
        .el-menu-item {
          display: flex;
          @include center;
          &:hover {
            background-color: #2e3344;
          }
          &:focus {
            background-color: #2e3344;
          }
          i {
            flex: 0 0 40%;
          }
          span {
            display: flex;
            flex: 1;
            justify-content: flex-start;
            color: rgb(180, 182, 189);
          }
        }
        .el-menu-item.is-active i {
          color: rgb(180, 182, 189);
        }
        // 有子菜单的
        // .el-submenu {
        //   display: flex;
        //   flex-direction: column;
        //   .el-submenu__title {
        //     display: flex;
        //     flex: 1;
        //     i {
        //       flex: 0 0 40%;
        //     }
        //     &:hover {
        //       background-color: #2e3344;
        //     }
        //   }
        //   // 下拉菜单
        //   .el-menu--inline {
        //     .el-menu-item-group {
        //       ul {
        //         width: 100%;
        //         .el-menu-item {
        //           min-width: 0;
        //           width: 100%;
        //           color: rgb(180, 182, 189);
        //         }
        //       }
        //     }
        //   }
        //   span {
        //     color: rgb(180, 182, 189);
        //   }
        // }
      }
    }
  }
}
</style>