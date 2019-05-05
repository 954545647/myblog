<template>
  <div class="article-wrapper">
    <div id="control"></div>
    <p style="padding-bottom:20px"></p>
    <div id="editor">
      <p>
        欢迎使用
        <b>wangEditor</b> 富文本编辑器
      </p>
    </div>
  </div>
</template>


<script>
import E from "wangeditor";
export default {
  data() {
    return {
      editorContent: ""
    };
  },
  mounted() {
    var editor = new E("#control", "#editor");
    // editor.customConfig.onchange = html => {
    //   this.formArticle.content = html;
    // };
    editor.customConfig.menus = [
      // 菜单配置
      "head", // 标题
      "bold", // 粗体
      "fontSize", // 字号
      "fontName", // 字体
      "underline", // 下划线
      "foreColor", // 文字颜色
      "list", // 列表
      "justify", // 对齐方式
      "emoticon", // 表情
      "image", // 插入图片
      "table", // 表格
      "code", // 插入代码
      "undo", // 撤销
      "redo" // 重复
    ];
    editor.create();
  }
};
</script>


<style lang="scss">
@import "@/assets/styles/global.scss";
.article-wrapper {
  width: 100%;
  background-color: #fff;
  padding: px2rem(20) px2rem(50);
  box-sizing: border-box;
  overflow: hidden;
  .w-e-toolbar {
    width: 100%;
    display: -webkit-box; // 不正规属性
    -webkit-box-orient: vertical; //从上到下排列
    -webkit-line-clamp: 2; // 显示两列
    white-space: normal; //正常换行
    text-overflow: ellipsis;
    word-break: break-all; // 强制换行
    overflow: hidden;
    .w-e-menu {
      display: inline-block;
      font-size: px2rem(20);
      padding: px2rem(5) px2rem(5);
      z-index: 100 !important;
    }
  }
  .w-e-text-container {
    overflow: hidden;
    width: 100%;
    // height: 100%;
    z-index: 100 !important;
    .w-e-text {
      z-index: 100;
      border: 1px solid #ccc;
      font-size: px2rem(16);
      overflow: hidden;
    }
  }
}
</style>
