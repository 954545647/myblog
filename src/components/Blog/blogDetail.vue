<template>
  <div class="detail-wrapper">
    <top-bar ref="topbar"></top-bar>
    <!-- <menu-bar-small></menu-bar-small> -->
    <menu-bar-big></menu-bar-big>
    <div class="blod-detail">
      <mavon-editor
        v-model="value"
        :ishljs="true"
        :subfield="false"
        :toolbarsFlag="false"
        defaultOpen="preview"
        :editable="false"
        ref="blog"
        style="{z-index:10}"
      />
    </div>
    <blog-catalog :catalogsNames="catalogsNames" :catalogsIds="catalogsIds"></blog-catalog>
  </div>
</template>


<script>
import MenuBarSmall from "@/components/Blog/menuBar.vue";
import BlogCatalog from "@/components/Blog/blogCatalog.vue";
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
Vue.use(mavonEditor)
export default {
  data() {
    return {
      value: "",
      catalogsNames: [],
      catalogsIds:[]
    };
  },
  components: {
    mavonEditor,
    TopBar: () => import("@/components/Blog/topBar.vue"),
    MenuBarSmall,
    MenuBarBig: () => import("@/components/Blog/menuBar1.vue"),
    BlogCatalog
  },
  props: {
    content: {
      type: String,
      default: ""
    }
  },
  beforeDestroy() {},
  mounted() {
    let id = this.$route.params.id;
    this.$axios
      .get(`${process.env.VUE_APP_BASE_URL}/blog/getBlog`, {
        params: {
          id
        }
      })
      .then(res => {
        this.value = res.data.blog[0].HtmlContent;
        let catalogs = this.value.split("\n"); //把html代码变成数组
        // 进行正则匹配，找出标题文段（h1）
        let catalogsList = [];
        catalogs.forEach(item => {
          if (item.match(/<h.>/)) {
            catalogsList.push(item);
          }
        });
        let catalogsId = [];
        catalogsList.forEach(item => {
          // 所有标题集合
          catalogsId.push(item.split('id="')[1].split('>')[0].split('"')[0])
          this.catalogsNames.push(item.split("</a>")[1].split("</")[0]);
        });
        catalogsId.forEach((item)=>{
          this.catalogsIds.push('#' + item)
        })
      });
  }
};
</script>


<style lang="scss">
@import "@/assets/styles/home.scss";
@media screen and (min-width: 100px) {
  .menu-bar-samll {
    top: px2rem(50);
  }
  .detail-wrapper {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    font-size: 16px;
    box-sizing: border-box;
    .menu-bar-big {
      display: none;
      .menu {
        width: 100%;
        flex: 0 0 100%;
      }
    }
    .blog-catalog {
      display: none;
    }
    .blod-detail {
      padding-top: px2rem(50);
      .v-note-wrapper {
        padding: px2rem(30) px2rem(20);
        box-sizing: border-box;
        z-index: 10;
        min-height: 400px;
      }
    }
  }
}

@media screen and (min-width: 375px) {
  .menu-bar-samll {
    top: 50px;
  }
  .detail-wrapper {
    .blod-detail {
      padding-top: 50px;
    }
  }
}

// 左侧作者信息出现,
@media screen and (min-width: 765px) {
  .detail-wrapper {
    .menu-bar-big {
      width: 200px;
      display: block;
    }
    .blod-detail {
      padding-left: 200px;
      @include center;
      .v-note-wrapper {
        min-width: 520px;
      }
    }
    .blog-catalog {
      display: none;
    }
  }
}

// 左侧作者信息出现,
@media screen and (min-width: 900px) {
  .detail-wrapper {
    .blod-detail {
      .v-note-wrapper {
        min-width: 600px;
      }
    }
  }
}

// 右侧目录评论模块出现
@media screen and (min-width: 996px) {
  .detail-wrapper {
    .blod-detail {
      padding-right: 200px;
      .v-note-wrapper {
        min-width: 650px;
      }
    }
    .blog-catalog {
      display: block;
      height: 100%;
    }
  }
}

// 大屏的时候
@media screen and (min-width: 1100px) {
  .detail-wrapper {
    .blod-detail {
      .v-note-wrapper {
        min-width: 700px;
      }
      .markdown-body {
        min-width: 700px;
      }
    }
  }
}

// 最大屏的时候
@media screen and (min-width: 1200px) {
  .detail-wrapper {
    .blod-detail {
      .markdown-body {
        min-width: 800px;
      }
    }
  }
}
</style>
