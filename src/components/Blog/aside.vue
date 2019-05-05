<template>
  <div class="aside-wrapper">
    <div class="aside">1111</div>
  </div>
</template>


<script>
export default {
  
}
</script>


<style lang="scss">
@import "@/assets/styles/global.scss";
.aside-wrapper{
  position: fixed;
  right: 0;
  top: px2rem(50);
  width: 200px;
  height: 100%;
  bottom: 0;
  background-color: red;
  .aside{
    width: 100%;
    height: 100%;
    font-size: 100px;
  }
}
</style>
