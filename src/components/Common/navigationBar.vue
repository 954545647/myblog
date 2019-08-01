<template>
  <div class="nav-bar">
    <!-- <div class="changeModel" @click="changeModel" title="换肤功能还没做~">
      <i v-if="model" class="iconfont icon-taiyang"></i>
      <i v-else class="iconfont icon-yejianmoshi"></i>
    </div> -->
    <div class="toTop" @click="toTop">
      <i class="iconfont icon-fanhuidingbu"></i>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      model: true
    };
  },
  methods: {
    changeModel() {
      this.model = !this.model;
    },
    toTop() {
      window.scrollTo(0, 0);
    }
  }
};
</script>


<style lang="scss">
@import "@/assets/styles/global.scss";
@media screen and (min-width: 100px) {
  .nav-bar {
    position: fixed;
    right: px2rem(15);
    bottom: px2rem(15);
    width: 35px;
    height: 35px;
    @include center;
    flex-direction: column;
    .changeModel {
      @include center;
      flex: 1;
      width: 35px;
      height: 35px;
      background-color: #f0f3f4;
      margin-bottom: 5px;
      cursor: pointer;
      .iconfont {
        font-size: 20px;
      }
      .icon-taiyang{
        font-size: 22px;
      }
    }
    .toTop {
      @include center;
      flex: 1;
      width: 35px;
      height: 35px;
      background-color: #f0f3f4;
      cursor: pointer;
      .iconfont {
        font-size: 20px;
      }
    }
  }
}

@media screen and (min-width: 500px) {
  .nav-bar {
    right: 35px;
    bottom: 35px;
  }
}
</style>