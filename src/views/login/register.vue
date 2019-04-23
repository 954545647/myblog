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
          <el-form-item label prop="email" class="email-wrapper">
            <div class="iconfont-wrapper">
              <span class="iconfont icon-yonghu"></span>
            </div>
            <el-input v-model.number="ruleForm.email" class="email" placeholder="输入邮箱"></el-input>
          </el-form-item>
          <!-- 输入验证码 -->
          <el-form-item label prop="code" class="code-wrapper">
            <div class="iconfont-wrapper">
              <span class="iconfont icon-mima-copy"></span>
            </div>
            <el-input
              type="password"
              v-model="ruleForm.code"
              autocomplete="off"
              class="code"
              placeholder="点击获取验证码"
            ></el-input>
          </el-form-item>
          <!-- 输入密码 -->
          <el-form-item prop="pass" class="pass-wrapper">
            <div class="iconfont-wrapper">
              <span class="iconfont icon-mima-copy"></span>
            </div>
            <el-input
              v-model.number="ruleForm.pass"
              class="pass"
              autocomplete="off"
              type="password"
              placeholder="输入密码"
            ></el-input>
          </el-form-item>
          <!-- 注册按钮 -->
          <div class="register-check-wrapper">
            <div class="register-check">注册</div>
          </div>
        </el-form>
      </div>

      <!-- <div class="register-text-wrapper">
        <div class="register-username">
          <el-input v-model="username" placeholder="请输入邮箱" class="username"></el-input>
          <div class="iconfont-wrapper">
            <span class="iconfont icon-yonghu"></span>
          </div>
        </div>
        <div class="register-password">
          <el-input v-model="password" placeholder="点击获取验证码"></el-input>
          <div class="iconfont-wrapper">
            <span class="iconfont icon-mima-copy"></span>
          </div>
        </div>
        <div class="register-check">
          <div class="iconfont-wrapper">
            <span class="iconfont icon-mima-copy"></span>
          </div>
          <el-input v-model="password" placeholder="输入密码"></el-input>
        </div>
      </div>-->
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
      if (value === "") {
        callback(new Error(" "));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(" "));
      } else {
        if (this.ruleForm.pass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validateCode = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(" "));
      } else {
        if (this.ruleForm.pass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    return {
      username: "",
      password: "",
      ruleForm: {
        email: "",
        pass: "",
        checkPass: ""
      },
      rules: {
        email: [{ validator: validateEmail, trigger: "blur" }],
        code: [{ validator: validateCode, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }]
      }
    };
  },
  methods: {
    goToLogin() {
      this.router.push({
        path: "/login"
      });
    },
    submitForm() {}
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
      height: px2rem(200);
      flex: 0 0 px2rem(200);
      width: 100%;
      flex-direction: column;
      box-sizing: border-box;
      @include center;
      position: relative;
      .demo-ruleForm {
        flex: 0 0 px2rem(200);
        height: px2rem(200);
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
          flex: 0 0 px2rem(50);
          height: px2rem(50);
          margin-bottom: 0;
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
            }
          }
        }
        .code-wrapper {
          flex: 0 0 px2rem(50);
          height: px2rem(50);
          margin-bottom: 0;
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
          flex: 0 0 px2rem(50);
          height: px2rem(50);
          margin-bottom: 0;
          position: relative;
          box-sizing: border-box;
          width: 60%;
          margin-left: -30px;
          .el-form-item__content {
            margin: 0 !important;
            width: calc(100% + 30px);
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
          width: 70%;
          margin-top: px2rem(5);
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
    .register-check-wrapper {
      flex: 0 0 px2rem(40);
      width: 80%;
      height: 100%;
      justify-content: center;
      display: flex;
      .register-check {
        width: 100%;
        height: px2rem(35);
        border-radius: px2rem(15);
        background: #31bbee;
        text-align: center;
        color: white;
        font-size: px2rem(14);
        line-height: px2rem(35);
      }
    }
    .cooperation-wrapper {
      position: relative;
      flex: 0 0 px2rem(20);
      width: 80%;
      display: flex;
      justify-content: space-between;
      .dashed-left {
        flex: 0 0 25%;
        border-bottom: px2rem(1) dashed #ccc;
      }
      .cooperation {
        position: absolute;
        left: 50%;
        top: px2rem(-6);
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