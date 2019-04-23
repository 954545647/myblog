<template>
  <div class="register">
    <div class="register-wrapper">
      <!-- 登录注册按钮 -->
      <div class="register-btn-wrapper">
        <div class="login-btn" @click="goToLogin()">
          <span>登录</span>
        </div>
        <div class="register-btn">
          <span>注册</span>
        </div>
      </div>
      <!-- 帐号密码 -->
      <div class="form-wrapper">
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <!-- 输入邮箱 -->
          <el-form-item label=" " prop="email" class="email-wrapper">
            <div class="iconfont-wrapper">
              <span class="iconfont icon-yonghu"></span>
            </div>
            <el-input v-model="ruleForm.email" class="email" placeholder="输入邮箱"></el-input>
          </el-form-item>
          <!-- 输入验证码 -->
          <el-form-item label prop="code" class="code-wrapper">
            <div class="iconfont-wrapper">
              <span class="iconfont icon-mima-copy"></span>
            </div>
            <el-input v-model.number="ruleForm.code" class="code" placeholder="点击获取验证码"></el-input>
          </el-form-item>
          <!-- 输入密码 -->
          <el-form-item prop="pass" class="pass-wrapper">
            <div class="iconfont-wrapper">
              <span class="iconfont icon-mima-copy"></span>
            </div>
            <el-input
              v-model="ruleForm.pass"
              class="pass"
              autocomplete="off"
              type="password"
              placeholder="输入密码"
            ></el-input>
          </el-form-item>
          <!-- 注册按钮 -->
          <el-form-item class="register-check-wrapper">
            <el-button type="primary" @click="submitForm('ruleForm')" class="register-check">注册</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- 登录注册按钮 -->
      <!-- <div class="register-check-wrapper"> -->
      <!-- <div class="register-check">注册</div> -->
      <!-- <div class="register-check"></div> -->
      <!-- </div> -->
      <!-- 使用合作帐号分界线 -->
      <div class="cooperation-wrapper">
        <span class="dashed-left"></span>
        <div class="cooperation">
          <span class="cooperation-text">使用合作伙伴登录</span>
        </div>
        <span class="dashed-right"></span>
      </div>
      <!-- 使用合作帐号 -->
      <div class="cooperation-btn-wrapper">
        <div class="btn-wrapper">
          <div class="youxiang">
            <span class="iconfont icon-youxiang1"></span>
          </div>
          <div class="youke">
            <span class="iconfont icon-youke"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    var validateEmail = (rule, value, callback) => {
      const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
      // var mailReg = /^.{3,10}$/;
      if (value === "") {
        return callback(new Error("请输入邮箱"));
      }
      setTimeout(() => {
        if (mailReg.test(value)) {
          callback();
        } else {
          callback(new Error("请输入正确的邮箱格式"));
        }
      }, 100);
    };
    var validateCode = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入验证码"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      // var PassReg1 = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,30}$/;
      // var PassReg2 = /^[a-zA-Z0-9]{6,10}$/;
      var PassReg = /^.{1,100}$/;
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (PassReg.test(value)) {
          callback();
        } else {
          callback(new Error("请输入至少6位任意字符"));
        }
      }
    };

    return {
      username: "",
      password: "",
      ruleForm: {
        email: "",
        code: "",
        pass: ""
      },
      rules: {
        email: [{ validator: validateEmail, trigger: ["blur", "change"] }],
        code: [{ validator: validateCode, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: ["blur", "change"] }]
      }
    };
  },
  methods: {
    // 跳转到注册页面
    goToLogin() {
      this.router.push({
        path: "/login"
      });
    },
    // 点击注册按钮
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.ruleForm)
          this.sendEmail(this.ruleForm.email)
        } else {
          return false;
        }
      });
    },
    // 发送邮件
    sendEmail(email){
      console.log(`${process.env.VUE_APP_BASE_URL}`)
      this.$axios.post(`${process.env.VUE_APP_BASE_URL}/user/register`,{
        email
      })
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/styles/global.scss";
.register {
  width: 100%;
  height: 100%;
  position: relative;
  @include center;
  .register-wrapper {
    width: 80%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 px2rem(5) rgba($color: #000000, $alpha: 0.2);
    @include center;
    .register-btn-wrapper {
      @include center;
      height: px2rem(40);
      flex: 0 0 px2rem(40);
      width: 80%;
      display: flex;
      margin: px2rem(15) 0;
      box-sizing: border-box;
      text-align: center;
      font-size: px2rem(16);
      color: white;
      .login-btn {
        flex: 1;
        height: 100%;
        line-height: px2rem(40);
        color: #2bafff;
      }
      .register-btn {
        flex: 1;
        background: #2bafff;
        height: 100%;
        line-height: px2rem(40);
      }
    }
    .form-wrapper {
      height: px2rem(250);
      width: 100%;
      flex-direction: column;
      box-sizing: border-box;
      @include center;
      position: relative;
      .demo-ruleForm {
        flex: 0 0 px2rem(200);
        height: 100%;
        width: 100%;
        position: absolute;
        left: 0;
        top: 0;
        font-size: px2rem(14);
        flex-direction: column;
        display: flex;
        justify-content: center;
        align-items: center;
        .email-wrapper {
          // flex: 0 0 px2rem(50);
          // height: px2rem(50);
          margin-bottom: px2rem(20);
          position: relative;
          margin-left: -30px;
          width: 60%;
          .el-form-item__content {
            width: calc(100% + 30px);
            margin: 0 !important;
            .iconfont-wrapper {
              position: absolute;
              flex: 0 0 px2rem(25);
              width: px2rem(25);
              border-radius: 5px 0 0 5px;
              text-align: center;
              height: 100%;
              display: flex;
              align-items: center;
              padding-left: px2rem(2);
              z-index: 1;
              .iconfont {
                font-size: px2rem(16);
                color: #464646;
              }
            }
            .email {
              .el-input__inner {
                padding: 0 px2rem(20);
              }
              .el-form-item.is-success .el-input__inner {
                border-color: #31bbee;
              }
            }
          }
        }
        .code-wrapper {
          margin-bottom: px2rem(20);
          // flex: 0 0 px2rem(50);
          // height: px2rem(50);
          position: relative;
          margin-left: -30px;
          width: 60%;
          .el-form-item__content {
            width: calc(100% + 30px);
            margin: 0 !important;
            .iconfont-wrapper {
              position: absolute;
              flex: 0 0 px2rem(25);
              width: px2rem(25);
              border-radius: 5px 0 0 5px;
              text-align: center;
              height: 100%;
              display: flex;
              align-items: center;
              padding-left: px2rem(2);
              z-index: 1;
              .iconfont {
                font-size: px2rem(16);
                color: #464646;
              }
            }
            .code {
              .el-input__inner {
                padding: 0 px2rem(20);
              }
            }
          }
        }
        .pass-wrapper {
          // flex: 0 0 px2rem(50);
          // height: px2rem(50);
          margin-bottom: px2rem(15);
          position: relative;
          box-sizing: border-box;
          width: 60%;
          margin-left: -30px;
          .el-form-item__content {
            margin: 0 !important;
            width: calc(100% + 30px);
            height: 100%;
            .iconfont-wrapper {
              position: absolute;
              flex: 0 0 px2rem(25);
              width: px2rem(25);
              border-radius: 5px 0 0 5px;
              text-align: center;
              display: flex;
              align-items: center;
              padding-left: px2rem(2);
              z-index: 1;
              .iconfont {
                font-size: px2rem(16);
                color: #464646;
              }
            }
            .pass {
              .el-input__inner {
                padding: 0 px2rem(20);
              }
            }
          }
        }
        .register-check-wrapper {
          flex: 0 0 px2rem(40);
          height: px2rem(40);
          width: 65%;
          margin-bottom: 0;
          .el-form-item__content {
            width: 100%;
            margin-left: 0 !important;
            .register-check {
              width: 100%;
              height: px2rem(35);
              border-radius: px2rem(15);
              background: #31bbee;
              text-align: center;
              color: white;
              font-size: px2rem(14);
              line-height: px2rem(35);
              box-sizing: border-box;
              padding: 0 px2rem(20);
            }
          }
        }
      }
    }

    // .register-text-wrapper {
    //   height: px2rem(150);
    //   flex: 0 0 px2rem(150);
    //   width: 100%;
    //   flex-direction: column;
    //   box-sizing: border-box;
    //   @include center;
    //   .register-username {
    //     position: relative;
    //     flex: 0 0 px2rem(50);
    //     height: px2rem(50);
    //     width: 80%;
    //     box-sizing: border-box;
    //     display: flex;
    //     padding-bottom: px2rem(10);
    //     .el-input {
    //       flex: 1;
    //       font-size: px2rem(14);
    //       & .el-input__inner {
    //         height: 100%;
    //         border-radius: 0 5px 5px 0;
    //         padding: 0 20px;
    //       }
    //     }
    //     .iconfont-wrapper {
    //       position: absolute;
    //       flex: 0 0 px2rem(25);
    //       width: px2rem(25);
    //       text-align: center;
    //       display: flex;
    //       align-items: center;
    //       line-height: 100%;
    //       padding-left: px2rem(2);
    //       .iconfont {
    //         font-size: px2rem(16);
    //         color: #464646;
    //       }
    //     }
    //   }
    //   .register-password {
    //     position: relative;
    //     flex: 0 0 px2rem(50);
    //     height: px2rem(50);
    //     width: 80%;
    //     box-sizing: border-box;
    //     display: flex;
    //     padding-bottom: px2rem(10);
    //     .el-input {
    //       flex: 1;
    //       font-size: px2rem(14);
    //       & .el-input__inner {
    //         height: 100%;
    //         border-radius: 0 5px 5px 0;
    //         padding: 0 20px;
    //       }
    //     }
    //     .iconfont-wrapper {
    //       position: absolute;
    //       flex: 0 0 px2rem(25);
    //       width: px2rem(25);
    //       border-radius: 5px 0 0 5px;
    //       text-align: center;
    //       display: flex;
    //       align-items: center;
    //       line-height: 100%;
    //       padding-left: px2rem(2);
    //       .iconfont {
    //         font-size: px2rem(16);
    //         color: #464646;
    //       }
    //     }
    //   }
    //   .register-check {
    //     position: relative;
    //     flex: 0 0 px2rem(50);
    //     height: px2rem(50);
    //     width: 80%;
    //     box-sizing: border-box;
    //     display: flex;
    //     padding-bottom: px2rem(10);
    //     .el-input {
    //       flex: 1;
    //       font-size: px2rem(14);
    //       & .el-input__inner {
    //         height: 100%;
    //         border-radius: 0 5px 5px 0;
    //         padding: 0 20px;
    //       }
    //     }
    //     .iconfont-wrapper {
    //       position: absolute;
    //       flex: 0 0 px2rem(25);
    //       width: px2rem(25);
    //       border-radius: 5px 0 0 5px;
    //       text-align: center;
    //       display: flex;
    //       align-items: center;
    //       line-height: 100%;
    //       padding-left: px2rem(2);
    //       .iconfont {
    //         font-size: px2rem(16);
    //         color: #464646;
    //       }
    //     }
    //   }
    // }
    .cooperation-wrapper {
      position: relative;
      flex: 0 0 px2rem(10);
      width: 80%;
      display: flex;
      justify-content: space-between;
      box-sizing: border-box;
      .dashed-left {
        flex: 0 0 25%;
        border-bottom: px2rem(1) dashed #ccc;
      }
      .cooperation {
        position: absolute;
        left: 50%;
        top: px2rem(-16);
        transform: translate(-50%, 0);
        .cooperation-text {
          flex: 1;
          font-size: px2rem(14);
          color: #ccc;
        }
      }
      .dashed-right {
        flex: 0 0 25%;
        border-bottom: px2rem(1) dashed #ccc;
      }
    }
    .cooperation-btn-wrapper {
      margin-top: px2rem(15);
      margin-bottom: px2rem(20);
      width: 80%;
      flex: 0 0 px2rem(40);
      display: flex;
      position: relative;
      .btn-wrapper {
        position: absolute;
        width: 100%;
        height: 100%;
        .youke {
          position: absolute;
          right: 20%;
          top: 0;
          border-radius: 50%;
          width: px2rem(40);
          height: px2rem(40);
          background: #3fb137;
          @include center;
          color: #ccc;
          .icon-youke {
            color: #fff;
            font-size: px2rem(38);
          }
        }
        .youxiang {
          position: absolute;
          left: 20%;
          top: 0%;
          width: px2rem(40);
          height: px2rem(40);
          border-radius: 50%;
          background: #e14968;
          @include center;
          &:hover:after {
            color: red;
          }
          .icon-youxiang1 {
            font-size: px2rem(40);
            color: #fff;
            &:hover:after {
              color: red;
            }
          }
        }
      }
    }
  }
}
</style>