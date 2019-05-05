<template>
  <div class="index-wrapper">
    <top-bar></top-bar>
    <blog-list></blog-list>
  </div>
</template>

<script>
import TopBar from "@/components/Blog/topBar.vue";
import BlogList from "@/components/Blog/blogList.vue";
export default {
  components: {
    TopBar,
    BlogList
  }
};
</script>


<style lang="scss">
.index-wrapper {
  width: 100%;
  height: 100%;
  background-color: #f0f3f4;
  overflow: hidden;
}
</style>


