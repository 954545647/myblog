<template>
  <div class="user-wrapper">
    <!-- <top-bar></top-bar> -->
    <menu-bar-small></menu-bar-small>
    <menu-bar-big></menu-bar-big>
    <div class="user-center">
      <!-- 上传图片更改头像 -->
      <div class="img-wrapper">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i class="iconfont icon-yonghu"></i>
        </el-upload>
        <div class="user-info">
          <span class="username">rex</span>
          <span class="desc">好好学习天天向上</span>
        </div>
      </div>
      <!-- 用户名,修改密码 -->
      <div class="setting">
        <!-- 管理模块 -->
        <header>个人中心</header>
        <section class="manage-wrapper">
          <section class="manage">
            <ul class="list">
              <li>
                <i class="iconfont icon-xiugai"></i>
                <span>修改资料</span>
              </li>
              <li>
                <i class="iconfont icon-wenzhang1"></i>
                <span>个人文章</span>
              </li>
              <li>
                <i class="iconfont icon-aixin"></i>
                <span>个人收藏</span>
              </li>
              <li>
                <i class="iconfont icon-xiangce"></i>
                <span>个人相册</span>
              </li>
              <li>
                <i class="iconfont icon-tongzhi"></i>
                <span>系统通知</span>
              </li>
              <li @click="logout">
                <i class="iconfont icon-web-icon-"></i>
                <span>退出登录</span>
              </li>
            </ul>
          </section>
        </section>
      </div>
      <!-- 底部导航 -->
      <footer class="footer-bar">
        <ul class="list">
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
          <li @click="goPerson">
            <i class="iconfont icon-yonghu"></i>
            <span>个人中心</span>
          </li>
        </ul>
      </footer>
    </div>
  </div>
</template>

<script>
import TopBar from "@/components/Blog/topBar.vue";
import MenuBarSmall from "@/components/Blog/menuBar.vue";
import MenuBarBig from "@/components/Blog/menuBar1.vue";
export default {
  data() {
    return {
      imageUrl: ""
    };
  },
  components: {
    TopBar,
    MenuBarSmall,
    MenuBarBig
  },
  methods: {
    // 退出登录
    logout() {
      // 先去后台清除Session
      this.$axios
        .get(`${process.env.VUE_APP_BASE_URL}/user/logout`)
        .then(res => {
          if (res.data.status === 200) {
            this.$router.push("/login");
          }
        });
    },
    // 用户个人中心
    goPerson() {
      this.$router.push("/user");
    },
    // 去写博客
    goToWrite() {
      this.$router.push("/write");
    },
    // 去博客列表
    goToBlog() {
      this.$router.push("/blog");
    },
    // 去听歌
    goToMusic() {
      this.$router.push("/music");
    },
    handleAvatarSuccess() {},
    beforeAvatarUpload() {}
  }
};
</script>

<style lang="scss">
@import "@/assets/styles/global.scss";
@media screen and (min-width: 100px) {
  .menu-bar-samll {
    top: px2rem(50);
  }
  .user-wrapper {
    width: 100%;
    height: 100%;
    .user-center {
      position: relative;
      font-size: 16px;
      display: flex;
      flex-direction: column;
      height: 100%;
      width: 100%;
      box-sizing: border-box;
      background-color: #f9f9f9;
      .img-wrapper {
        height: 30%;
        flex: 0 0 30%;
        background: linear-gradient(to right, #0c60f1, #108ff7, #17c6ff);
        display: flex;
        max-height: 180px;
        .avatar-uploader {
          // flex-grow: 默认为0 是指有剩余空间不放大
          // flex-shrink: 默认为1,会缩小,设置为0 则空间不足不缩小
          // flex-basic: 分配多余空间之前,项目占据主轴空间大小,默认值为auto,项目本身的大小
          // flex: 默认 0 1 auto
          // flex: none (0 0 auto) / auto (1 1 auto)
          // flex: 0 0 33%; // 不放大,不缩小,占据主轴30%;
          @include center;
          padding: 0 10px;
          box-sizing: border-box;
          width: 30%;
          .el-upload {
            @include center;
            border-radius: 50%;
            background-color: #fff;
            // flex: 1,1,0
            // flex-basic: 0 表示根据内容撑开宽度,如果width设置为0,则完全不线束
            // flex-basic: auto 设置了width则根据width,没有的话就根据内容
            flex: 1 1 0%;
            height: 50%;
            .icon-yonghu {
              font-size: 20px;
            }
          }
        }
        .user-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          padding: 0 20px;
          box-sizing: border-box;
          span {
            color: white;
            margin-bottom: 10px;
          }
          .desc {
            font-size: 14px;
          }
        }
      }
      .setting {
        height: 100%;
        display: flex;
        flex-direction: column;
        header {
          font-size: px2rem(16);
          font-weight: bold;
          height: 10%;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          padding: 0 0 0 20px;
        }
        .manage-wrapper {
          flex: 1;
          height: 100%;
          background-color: #fff;
          overflow: hidden;
          .manage {
            overflow: hidden;
            .list {
              width: 100%;
              display: flex;
              flex-wrap: wrap;
              li {
                display: flex;
                flex-direction: column;
                justify-content: center;
                width: calc(100% / 3);
                height: px2rem(100);
                flex: 1 1 px2rem(100);
                .iconfont {
                  font-size: px2rem(26);
                }
                span {
                  margin-top: px2rem(10);
                  font-size: px2rem(14);
                }
              }
            }
          }
        }
      }
      .footer-bar {
        flex: 0 0 px2rem(50);
        margin-top: 15px;
        height: px2rem(50);
        background-color: #fff;
        max-height: 50px;
        position: relative;
        left: 0;
        bottom: 0;
        .list {
          height: 100%;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          li {
            flex: 1; // 1 1 0%
            display: flex;
            flex-direction: column;
            .iconfont {
              font-size: 16px;
            }
            span {
              font-size: 12px;
            }
          }
        }
      }
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

@media screen and (min-width: 500px) {
  .menu-bar-samll {
    top: 50px;
  }
}
</style>

