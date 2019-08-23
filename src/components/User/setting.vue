<template>
  <!-- 用户名,修改密码 -->
  <div class="setting">
    <!-- 管理模块 -->
    <header>个人中心</header>
    <section class="manage-wrapper">
      <section class="manage">
        <ul class="list">
          <li>
            <i class="iconfont icon-yonghu"></i>
            <span @click="goToPerson">个人中心</span>
          </li>
          <li>
            <i class="iconfont icon-xiugai"></i>
            <span @click="goToModify">修改资料</span>
          </li>
          <li>
            <i class="iconfont icon-wenzhang1"></i>
            <span @click="goToBlog">个人文章</span>
          </li>
          <!-- <li>
            <i class="iconfont icon-aixin"></i>
            <span>个人收藏</span>
          </li>
          <li>
            <i class="iconfont icon-xiangce"></i>
            <span>个人相册</span>
          </li> -->
          <!-- <li>
            <i class="iconfont icon-tongzhi"></i>
            <span>系统通知</span>
          </li> -->
          <li @click="logout">
            <i class="iconfont icon-web-icon-"></i>
            <span>退出登录</span>
          </li>
        </ul>
      </section>
    </section>
  </div>
</template>


<script>
import {userMixin} from '@/utils/mixin.js';
export default {
  mixins:[userMixin],
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
    // 修改资料
    goToModify(){
      // this.$router.push('/modify')
      this.changeView('Modify')
      console.log(this.currentView);
    },
    // 用户个人中心
    goToPerson(){
      this.changeView('UserCenter')
      //  this.$router.push('/user');
      console.log(this.currentView);
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
  }
};
</script>


<style lang="scss">
@import "@/assets/styles/home.scss";
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
</style>