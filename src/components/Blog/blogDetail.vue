<template>
  <div class="detail-wrapper">
    <top-bar ref="topbar"></top-bar>
    <menu-bar-small></menu-bar-small>
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
  </div>
</template>


<script>
import MenuBarSmall from "@/components/Blog/menuBar.vue";
import { mavonEditor } from "mavon-editor";
export default {
  data() {
    return {
      value: ""
    };
  },
  components: {
    mavonEditor,
    TopBar: () => import("@/components/Blog/topBar.vue"),
    MenuBarSmall,
    MenuBarBig: () => import("@/components/Blog/menuBar1.vue")
  },
  props: {
    content: {
      type: String,
      default: ""
    }
  },
  beforeDestroy() {
  },
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
      });
  }
};
</script>


<style lang="scss">
@import "@/assets/styles/global.scss";
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
    .right-aside {
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

@media screen and (min-width: 500px) {
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
    .right-aside {
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
      .v-note-wrapper {
        min-width: 720px;
      }
    }
    .right-aside {
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
        min-width: 900px;
      }
      .markdown-body {
        min-width: 800px;
      }
    }
  }
}

// 最大屏的时候
@media screen and (min-width: 1200px) {
  .detail-wrapper {
    .blod-detail {
      .markdown-body {
        min-width: 1000px;
      }
    }
  }
}
</style>
