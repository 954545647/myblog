<template>
  <div class="blog-catalog">
    <ul class="blog-catalog-lists">
      <li class="title">文章目录</li>
      <li v-for="(item,index) in catalogsNames" :key="index" class="blog-item">
        <a :href="catalogsIds[index]" @click="goDown">{{item}}</a>
      </li>
    </ul>
  </div>
</template>


<script>
export default {
  name: "blogCatalog",
  props: {
    catalogsNames: {
      type: Array,
      default: () => []
    },
    catalogsIds: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    goDown() {
      setTimeout(() => {
        window.scrollBy(0, -50);
      }, 0);
    },
    goToCatalog() {}
  }
};
</script>


<style lang="scss">
.blog-catalog {
  width: 200px;
  position: fixed;
  right: 0;
  top: 50px;
  background-color: #fff;
  padding: 0 10px;
  box-sizing: border-box;
  .blog-catalog-lists {
    .title {
      height: 50px;
      line-height: 50px;
      font-size: 14px;
    }
    .blog-item {
      border: 1px solid #dddddd;
      height: 50px;
      line-height: 50px;
      overflow: hidden;
      padding: 0 10px;
      box-sizing: border-box;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      color: rgb(88, 102, 110);
      font-size: 12px;
      a {
        text-decoration: none;
      }
    }
  }
}
</style>