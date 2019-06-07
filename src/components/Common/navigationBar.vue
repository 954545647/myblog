<template>
  <div class="nav-bar">
    <div class="changeModel"></div>
    <div class="toTop"></div>
  </div>
</template>


<script>
export default {};
</script>


<style lang="scss">
@import "@/assets/styles/global.scss";
@media screen and (min-width: 100px) {
  .nav-bar {
    position: fixed;
    right: px2rem(50);
    bottom: px2rem(50);
    width: px2rem(50);
    height: px2rem(100);
    .changeModel {
      position: absolute;
      left: 0;
      top: 0;
      width: px2rem(30);
      height: px2rem(30);
      background-color: red;
    }
    .toTop {
      position: absolute;
      left: 0;
      top: px2rem(30);
      width: px2rem(30);
      height: px2rem(30);
      background-color: blue;
    }
  }
}

@media screen and (min-width: 500px) {
  .nav-bar {
    position: fixed;
    right: 35px;
    bottom: 35px;
    width: 35px;
    height: 70px;
    .changeModel {
      position: absolute;
      left: 0;
      top: 0;
      width: 35px;
      height: 35px;
      background-color: red;
    }
    .toTop {
      position: absolute;
      left: 0;
      top: 35px;
      width: 35px;
      height: 35px;
      background-color: blue;
    }
  }
}
</style>