<template>
  <div id="app">
    <!-- 先离开后进,默认一起 -->
    <transition name="el-zoom-in-center" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>
export default {};
function changeFontSize() {
  let html = document.querySelector("html");
  let fontSize =
    (document.documentElement.clientWidth || document.body.clientWidth) / 10;
  fontSize = fontSize > 50 ? 50 : fontSize;
  html.style.fontSize = fontSize + "px";
}
// DOMContentLoaded是DOM加载完毕,但是图片等资源还没有加载完毕
// window.addEventListener("DOMContentLoaded", () => {
changeFontSize();
// });
</script>

<style lang="scss">
@import "@/assets/styles/global.scss";
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
  // position: relative;
  // left: 0;
  // top: 0;
  // overflow: hidden;
}
</style>
