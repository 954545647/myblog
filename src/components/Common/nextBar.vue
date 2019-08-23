<template>
  <div class="next-bar-wrapper">
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="作者姓名" prop="username">
        <el-input v-model="ruleForm.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="博客标题" prop="title">
        <el-input v-model="ruleForm.title" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="文章简述" prop="desc">
        <el-input type="textarea" v-model="ruleForm.desc" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="博客标签" prop="mark">
        <el-tag
          v-for="tag in dynamicTags"
          :key="tag"
          type="info"
          closable
          :disable-transitions="false"
          @close="handleClose(tag)"
        >{{tag}}</el-tag>
        <el-input
          class="input-new-tag"
          v-if="inputVisible"
          v-model="inputValue"
          ref="saveTagInput"
          size="small"
          @keyup.enter.native="handleInputConfirm"
          @blur="handleInputConfirm"
        ></el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 新标签</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交博客</el-button>
      </el-form-item>
    </el-form>
    <i class="iconfont icon-guanbi" @click="closeForm"></i>
  </div>
</template>


<script>
var validateName = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请输入作者名称"));
  }
  callback();
};
var validateTitle = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请输入文章标题"));
  }
  callback();
};
var validateDesc = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请输入文章简述"));
  }
  callback();
};
import { blogMixin } from "@/utils/mixin.js";
import { Message } from "element-ui";
export default {
  mixins: [blogMixin],
  data() {
    return {
      ruleForm: {
        username: "",
        title: "",
        desc: ""
      },
      rules: {
        username: [{ validator: validateName, trigger: "blur" }],
        title: [{ validator: validateTitle, trigger: "blur" }],
        desc: [{ validator: validateDesc, trigger: "blur" }]
      },
      dynamicTags: ["原创", "Vue"],
      inputVisible: false,
      inputValue: ""
    };
  },
  methods: {
    // 关闭表单
    closeForm() {
      this.setNextBar(false);
    },
    // 提交表单,将数据保存到数据中
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios
            .post(`${process.env.VUE_APP_BASE_URL}/blog/saveBlog`, {
              state: 1,
              title: this.ruleForm.title,
              desc: this.ruleForm.desc,
              username: this.ruleForm.username,
              keyword: this.dynamicTags,
              value: this.blogValue,
              render: this.blogRender
            })
            .then(res => {
              if (res.data.status === 200) {
                Message.success({
                  message: "博客上传成功",
                  center: true,
                  customClass: "myToast", //自定义类名
                  duration: 2000
                });
                this.$router.push('/blog')
              }
            });
          // 将下一步弹窗关闭并且清空编辑区的内容
          this.setNextBar(false);
          this.setBlogValue('');
          this.setBlogRender('');
        } else {
          return false;
        }
      });
    },
    // 删除标签
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },
    // 显示新标签
    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    // 输入完新标签的blur事件
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    }
  }
};
</script>


<style lang="scss">
@import "@/assets/styles/home.scss";
@media screen and (min-width: 100px) {
  .next-bar-wrapper {
    position: fixed;
    z-index: 1800;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    // width: 500px;
    border: 1px solid $black;
    padding: 30px 30px 0px 0px;
    box-sizing: border-box;
    @include center;
    background-color: white;
    border-radius: 15px;
    color: white;
    max-width: 300px;
    .demo-ruleForm {
      color: white;
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex-wrap: nowrap;
      // 每一项
      .el-form-item {
        // lebel框
        .el-form-item__label {
          font-size: 14px;
        }
        // 文章简述
        &:nth-child(3) {
          margin-bottom: 5px;
          .el-form-item__content {
            .el-textarea {
              .el-textarea__inner {
                font-size: 12px;
              }
            }
          }
        }
        // 博客标签
        &:nth-child(4) {
          display: flex;
          flex-direction: column;
          margin-bottom: 10px;
          .el-form-item__label {
            font-size: 14px;
            text-align: center;
            width: 100% !important;
            padding: 0;
            padding-left: 30px;
            padding-top: 10px;
            box-sizing: border-box;
            height: 40px;
            line-height: 30px;
          }
          .el-form-item__content {
            width: 100%;
            padding-left: 30px;
            box-sizing: border-box;
            @include center;
            margin-left: 0 !important;
            flex-wrap: wrap;
            .el-tag {
              margin: 5px 5px;
            }
            .input-new-tag {
              input {
                width: 80%;
              }
            }
          }
        }
        // 提交按钮
        &:last-child {
          .el-form-item__content {
            margin-left: 0 !important;
            padding-left: 30px;
          }
        }
      }
    }
    .icon-guanbi {
      position: absolute;
      right: -1px;
      top: 0;
      color: $black;
      font-size: 27px;
      z-index: 1500;
    }
  }
}

@media screen and (min-width: 500px) {
  .next-bar-wrapper {
    min-width: 400px;
    .demo-ruleForm {
      .el-form-item {
        // 文章简述
        &:nth-child(3) {
          .el-form-item__content {
            .el-textarea {
              .el-textarea__inner {
                font-size: 14px;
              }
            }
          }
        }
      }
    }
  }
}

// @media screen and (min-width: 996px) {
//   .next-bar-wrapper {
//     min-width: 450px;
//   }
// }

@media screen and (min-width: 1200px) {
  .next-bar-wrapper {
    min-width: 500px;
  }
}
</style>
