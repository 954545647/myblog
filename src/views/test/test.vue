<template>
  <div class="content">
    <div class="title-wrap">我是红色的</div>
    <test2></test2>
  </div>
</template>

<script>
import test2 from "./test2.vue";
export default {
  components: {
    test2
  },
  mounted() {
    console.log(this.$style)
  },
};
</script>

<style lang="scss" module>
.content {
  .title-wrap {
    font-size: 20px;
    color: red;
  }
}
</style>


