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
import MenuBarBig from "@/components/Blog/menuBar1.vue";
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
    MenuBarBig
  },
  props: {
    content: {
      type: String,
      default: ""
    }
  },
  beforeDestroy() {},
  mounted() {
    this.value = this.$route.params.HtmlContent;
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
    padding-top: px2rem(50);
    font-size: 16px;
    box-sizing: border-box;
    .menu-bar-big {
      display: none;
      .menu {
        width: 100%;
        flex: 0 0 100%;
      }
    }
    .blod-detail {
      .v-note-wrapper {
        padding: px2rem(30) px2rem(20);
        box-sizing: border-box;
        z-index: 10;
        min-height: 400px;
      }
    }
  }
}

@media screen and (min-width: 501px) {
  .detail-wrapper {
    padding-top: 50px;
  }
  .menu-bar-samll {
    top: 50px;
  }
}

@media screen and (min-width: 765px) {
  .detail-wrapper {
    .menu-bar-big {
      width: 200px;
      display: block;
    }
  }
}
</style>
