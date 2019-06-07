<template>
  <div class="modify">
    <span>敬请期待~</span>
  </div>
</template>

<script>
export default {};
</script>


<style lang="scss">
@media screen and (min-width: 100px) {
  .modify {
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%, 0);
    display: none;
    span {
      font-size: 20px;
    }
  }
}

@media screen and (min-width: 501px) {
  .modify {
    display: block;
  }
}
</style>