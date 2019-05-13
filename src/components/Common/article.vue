<template>
  <div class="article-wrapper">
    <mavon-editor
      class="mavon-wrapper"
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
    <div class="next-wrapper" @click="click">
      <div class="next">下一步</div>
    </div>
  </div>
</template>


<script>
import { blogMixin } from "@/utils/mixin.js";
import { Message } from "element-ui";
import axios from "axios";
import { setTimeout, clearTimeout } from "timers";

// debounce函数
function debounce(fn, delay) {
  let timer = null;
  return function() {
    if (timer) {
      clearTimeout(timer);
      timer = setTimeout(fn, delay);
    } else {
      timer = setTimeout(fn, delay);
    }
  };
}
export default {
  mixins: [blogMixin],
  data() {
    return {
      file: "",
      delayTime: 3000,  //防抖的延迟时间
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
      },
      imgList: []
    };
  },
  watch: {},
  methods: {
    // 点击下一步,弹出输入框,填入标题,作者,关键词标签
    click(e) {},
    // ctrl+s 和点击保存触发
    // value是我们输入的原字符串,render是解析出来的html代码
    // 为避免用户多次点击保存,进行防抖(2秒内只会执行一次)
    save(value, render) {
      // 发起请求,把数据传到后端并保存到数据库
      let that = this;
      function saveBlog() {
        that.$axios
          .post(`${process.env.VUE_APP_BASE_URL}/blog/saveBlog`, {
            state: 0,
            value,
            render
          })
          .then(res => {
            let message =
              res.data.status === 200 ? "成功保存草稿" : "草稿保存失败";
            if (res.data.status === 200) {
              Message.success({
                message: message,
                center: true,
                customClass: "myToast", //自定义类名
                duration: 2000
              });
            }
          });
      }
      if (this.timer) {
        // 如果进入这个分支,代表当前正在进行一个分支,并且又触发了同一事件
        // 先取消当前计时,再重新计时
        clearTimeout(this.timer);
        this.timer = setTimeout(saveBlog,this.delayTime);
      } else {
        this.timer = setTimeout(saveBlog,this.delayTime);
      }
    },
    // 绑定@imgAdd event
    $imgAdd(pos, $file) {
      // 第一步.将图片上传到服务器.
      var formData = new FormData();
      formData.append("file", $file);
      console.log(`${process.env.VUE_APP_BASE_URL}/blog/upload`);
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
        this.$refs.md.$img2Url(pos, url.data.url);
      });
    },
    $imgDel(pos) {
      console.log(pos);
    }
  },
  mounted() {},
  beforeDestroy() {}
};
</script>


<style lang="scss">
@import "@/assets/styles/global.scss";
// 针对小屏手机让编辑区域变小
@media screen and (min-width: 100px) and (min-height: 100px) {
  .article-wrapper {
    width: 100%;
    background-color: #fff;
    padding: 0 px2rem(30) 0 px2rem(30);
    box-sizing: border-box;
    overflow: hidden;
    margin-top: px2rem(50);
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    .mavon-wrapper {
      // margin: px2rem(30) 0 px2rem(20) 0;
      margin: px2rem(30) 0 px2rem(0) 0;
      margin-left: auto;
      margin-right: auto;
      z-index: 100;
      height: 100%;
      min-height: 350px;
      min-width: 0;
      // 编辑模块
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
          .fa-mavon-header {
            @include center;
            flex-direction: column;
            .op-header {
              width: 100%;
              left: 0 !important;
            }
          }
          .fa-mavon-picture-o {
            @include center;
            flex-direction: column;
            .popup-dropdown {
              min-width: 0;
              width: 100%;
              left: 0 !important;
            }
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
    // 下一步模块
    .next-wrapper {
      width: 100%;
      height: 40px;
      @include center;
      margin-left: auto;
      margin-right: auto;
      // background-color: $blue;
      background-color: $black;
      color: white;
      box-shadow: 0 0px 5px rgba(0, 0, 0, 0.457), 0 0px 3px rgba(0, 0, 0, 0.227);
      .next {
        font-size: 16px;
      }
    }
    .fullscreen {
      width: 100% !important;
      height: 100% !important;
    }
  }
  .myToast {
    max-width: 300px;
    min-width: 0;
    width: 80%;
    position: absolute;
    @include center;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    box-sizing: border-box;
    height: 50px;
    .el-message__icon {
      display: none;
    }
  }
}

// 针对i6这种竖屏比较大的手机编辑区域变大
@media screen and (min-width: 100px) and (min-height: 600px) {
  .article-wrapper {
    .mavon-wrapper {
      box-sizing: border-box;
      min-height: 480px;
    }
  }
}

// 头部导航栏变成固定高度50px
@media screen and (min-width: 500px) {
  .article-wrapper {
    margin-top: 50px;
  }
  .myToast {
    max-width: 480px;
  }
}

@media screen and (min-width: 500px) and (min-height: 600px) {
  .article-wrapper {
    margin-top: 50px;
    .mavon-wrapper {
      min-height: 520px;
    }
  }
}
@media screen and (min-width: 1000px) {
  .article-wrapper {
    .mavon-wrapper {
      // 控制条
      width: 80%;
    }
    .next-wrapper {
      width: 80%;
      height: px2rem(30);
    }
  }
}
</style>
