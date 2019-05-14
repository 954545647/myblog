<template>
  <div class="aside-wrapper">
    <div class="aside">
      <h1>标题</h1>
      <h2>目录</h2>
      <h3>内容</h3>
    </div>
  </div>
</template>


<script>
export default {};
</script>


<style lang="scss">
@import "@/assets/styles/global.scss";
.aside-wrapper {
  position: fixed;
  right: 0;
  top: 50px;
  width: 200px;
  height: 100%;
  bottom: 0;
  background-color: #fff;
  .aside {
    width: 100%;
    height: 100%;
    font-size: 100px;
    font-size: 18px;
    @include center;
    flex-direction: column;
  }
}
</style>
