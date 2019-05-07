<template>
  <div class="article-wrapper">
     <mavon-editor v-model="value" :ishljs = "true"/>
  </div>
</template>


<script>
  export default {
    data() {
      return {
        value:''
      }
    },
  }
</script>


<style lang="scss">
@import "@/assets/styles/global.scss";
.article-wrapper {
  width: 100%;
  background-color: #fff;
  padding: px2rem(20) px2rem(50);
  box-sizing: border-box;
  overflow: hidden;
  margin-top: px2rem(50);
  @include center;
  .markdown-body{
    min-height: 400px;
    // 控制条
    .v-note-op{
      // 左侧控制条
      .v-left-item{
      }
      // 右侧控制条
      .v-right-item{

      }
    }
  }
}
</style>
