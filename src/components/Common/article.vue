<template>
  <div class="article-wrapper">
    <mavon-editor
      v-model="file"
      :ishljs="true"
      :toolbars="toolbars"
      :subfield="false"
      @imgAdd="$imgAdd"
      @imgDel="$imgDel"
      @save="save"
      ref="md"
      style="{z-index:10}"
    />
  </div>
</template>


<script>
import { blogMixin } from "@/utils/mixin.js";
import axios from "axios";
export default {
  mixins: [blogMixin],
  data() {
    return {
      file: "",
      toolbars: {
        bold: true, // 粗体
        italic: false, // 斜体
        header: true, // 标题
        underline: false, // 下划线
        strikethrough: false, // 中划线
        mark: false, // 标记
        superscript: false, // 上角标
        subscript: false, // 下角标
        quote: false, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: true, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: true, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        subfield: true, // 单双栏模式
        preview: true // 预览
      }
    };
  },
  watch: {},
  methods: {
    // ctrl+s 和点击保存触发
    // value是我们输入的原字符串,render是解析出来的html代码
    save(value, render) {
      console.log(value);
      console.log(render);
    },
    // 绑定@imgAdd event
    $imgAdd(pos, $file) {
      // 第一步.将图片上传到服务器.
      var formData = new FormData();
      formData.append("file", $file);
      console.log(`${process.env.VUE_APP_BASE_URL}/blog/upload`)
      this.$axios({
        url: `${process.env.VUE_APP_BASE_URL}/blog/upload`,
        method: "post",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" }
      }).then(url => {
        // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
        /**
         * $vm 指为mavonEditor实例，可以通过如下两种方式获取
         * 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
         * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
         */
        console.log(url)
        this.$refs.md.$img2Url(pos, url.data.url);
      });
    },
    $imgDel(pos) {
      console.log(pos);
    }
  },
  mounted() {
  },
  beforeDestroy() {
  }
};
</script>


<style lang="scss">
@import "@/assets/styles/global.scss";
@media screen and (min-width: 100px){
  .article-wrapper {
    width: 100%;
    background-color: #fff;
    padding: px2rem(20) px2rem(30);
    box-sizing: border-box;
    overflow: hidden;
    margin-top: px2rem(50);
    display: flex;
    flex-direction: row;
    height: 100%;
    justify-content: center;
    .markdown-body {
      top: px2rem(20);
      z-index: 100;
      height: 70%;
      box-sizing: border-box;
      // 控制条
      .v-note-op {
        // 左侧控制条
        width: 100%;
        display: flex;
        .v-left-item {
          position: relative;
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          align-content: flex-start;
          height: 100%;
          width: 70%;
          flex: 0 0 70%;
          padding-left: 0;
          border-right: 1px solid #eee;
          .op-icon {
            flex: 0 0 20%;
            box-sizing: border-box;
          }
          .op-icon-divider {
            display: none;
          }
          &:after {
            background: #eeeeee;
            // content: "";
            height: 80%;
            position: absolute;
            top: 50%;
            right: 0;
            width: 1px;
            transform: translate(0, -50%);
            margin-right: px2rem(1);
          }
        }
        // 右侧控制条
        .v-right-item {
          width: 30%;
          flex: 0 0 30%;
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          align-content: flex-end;
          height: 100%;
          padding-right: 0;
          .op-icon {
            flex: 0 0 33.3%;
            box-sizing: border-box;
          }
          .op-icon-divider {
            display: none;
          }
        }
      }
    }
    .fullscreen{
      width: 100%!important;
      height: 100%!important;
    }
  }
}

@media screen and (min-width: 1000px) {
  .article-wrapper {
    padding: px2rem(20) 0;
    .markdown-body {
      // 控制条
      width: 80%;
      height: 80%;
    }
  }
}
</style>
