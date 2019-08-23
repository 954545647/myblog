<template>
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
</template>


<script>
export default {
  methods: {
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
    }
  }
};
</script>


<style lang="scss">
@import "@/assets/styles/home.scss";
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
</style>
