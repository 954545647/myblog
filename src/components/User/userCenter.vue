<template>
  <div class="userCenter">
    <span>尚未开发~</span>
  </div>
</template>

<script>
export default {};
</script>


<style lang="scss">
@import "@/assets/styles/home.scss";
@media screen and (min-width: 100px) {
  .userCenter {
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%, 0);
    z-index: 100;
    display: none;
    span {
      display: flex;
      justify-content: center;
      font-size: 20px;
    }
  }
}

@media screen and (min-width: 501px) {
  .userCenter {
    display: block;
  }
}
</style>