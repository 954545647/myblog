<template>
  <div class="login">
    <transition name="el-zoom-in-bottom">
      <div class="login-wrapper">
        <!-- 登录注册按钮 -->
        <div class="login-btn-wrapper">
          <div class="login-btn">
            <span>登录</span>
          </div>
          <div class="register-btn" @click="goToRegister()">
            <span>注册</span>
          </div>
        </div>
        <!-- 帐号密码 -->
        <div class="login-text-wrapper">
          <div class="form-wrapper">
            <el-form
              :model="ruleForm"
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
                <el-input v-model="ruleForm.email" class="username" placeholder="输入用户名" ref="email"></el-input>
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
              <!-- 警告信息,邮箱倒计时 -->
              <transition name="fade">
                <div class="warning-wrapper" v-show="warningText">
                  <span class="warning-text">{{warningText}}</span>
                </div>
              </transition>
            </el-form>
          </div>
        </div>
        <!-- 记住密码,忘记密码 -->
        <div class="remember-forget-wrapper">
          <div class="forget-wrapper">
            <label>
              <input name="forget" type="checkbox" value>忘记密码
            </label>
          </div>
        </div>
        <!-- 登录注册按钮 -->
        <div class="login-check-wrapper">
          <div class="login-check" @click="submitForm('ruleForm')">登录</div>
        </div>
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
    </transition>
  </div>
</template>


<script>
export default {
  data() {
    var validateEmail = (rule, value, callback) => {
      const mailReg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
      if (value === "") {
        callback(new Error("请输入邮箱"));
      }
      if (mailReg.test(value)) {
        callback();
      } else {
        callback(new Error("请输入正确的邮箱格式"));
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      warningText: "",  //警告信息
      ruleForm: {
        email: "",
        pass: ""
      },
      rules: {
        email: [
          {
            trigger: ["change", "blur"],
            validator: validateEmail
          }
        ],
        pass: [
          {
            trigger: ["change", "blur"],
            validator: validatePass
          }
        ]
      }
    };
  },
  methods: {
    // 跳转到注册页面
    goToRegister() {
      this.router.push("/register");
    },
    // 点击登录
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 如果校验通过就开始发起请求去后端对比用户名和邮箱
          this.$axios
            .post(`${process.env.VUE_APP_BASE_URL}/user/login`, {
              email: this.ruleForm.email,
              password: this.ruleForm.pass
            })
            .then(res => {
              if(res.data.code ===0 && res.status === 200){
                this.warningText = ''
                this.$router.push({
                  path:'/home'
                })
              }
              this.warningText = res.data.result;
            });
        } else {
          return false;
        }
      });
    }
  }
};
</script>


<style lang="scss">
@import "@/assets/styles/global.scss";
.login {
  width: 100%;
  height: 100%;
  position: relative;
  .login-wrapper {
    width: 80%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 px2rem(5) rgba($color: #000000, $alpha: 0.2);
    @include center;
    .login-btn-wrapper {
      height: px2rem(40);
      flex: 0 0 px2rem(40);
      width: 70%;
      display: flex;
      margin: px2rem(15) 0;
      box-sizing: border-box;
      text-align: center;
      font-size: px2rem(16);
      color: white;
      .login-btn {
        flex: 1;
        background: #2bafff;
        height: 100%;
        line-height: px2rem(40);
      }
      .register-btn {
        flex: 1;
        color: #2bafff;
        height: 100%;
        line-height: px2rem(40);
      }
    }
    .login-text-wrapper {
      height: px2rem(120);
      width: 100%;
      flex-direction: column;
      @include center;
      box-sizing: border-box;
      position: relative;
      margin-top: px2rem(10);
      .form-wrapper {
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;
        @include center;
        .demo-ruleForm {
          display: flex;
          flex-direction: column;
          height: 100%;
          @include center;
          width: 100%;
          .el-form-item {
            margin-bottom: 0;
          }
          .email-wrapper {
            display: flex;
            width: 70%;
            margin-bottom: px2rem(20);
            .el-form-item__content {
              width: 100%;
              margin-left: 0 !important;
              display: flex;
              position: relative;
              .iconfont-wrapper {
                position: absolute;
                left: 0;
                top: 0;
                z-index: 1;
                padding-left: px2rem(2);
              }
              .el-input {
                .el-input__inner {
                  padding: 0 px2rem(20);
                }
              }
            }
          }
          .pass-wrapper {
            display: flex;
            width: 70%;
            margin-bottom: px2rem(20);
            .el-form-item__content {
              width: 100%;
              margin-left: 0 !important;
              display: flex;
              position: relative;
              // padding-left: px2rem(5);
              .iconfont-wrapper {
                position: absolute;
                left: 0;
                top: 0;
                z-index: 1;
                padding-left: px2rem(2);
              }
              .el-input {
                .el-input__inner {
                  padding: 0 px2rem(20);
                }
              }
            }
          }
          .warning-wrapper {
            position: absolute;
            left: 0;
            bottom: px2rem(-10);
            height: px2rem(25);
            width: 100%;
            .warning-text {
              display: flex;
              align-items: center;
              justify-content: center;
              position: absolute;
              left: 0;
              top: 0;
              font-size: px2rem(14);
              width: 100%;
              height: 100%;
              color: #B6B6C8;
            }
          }
        }
      }
    }
    .remember-forget-wrapper {
      display: flex;
      // flex: 0 0 px2rem(35);
      font-size: px2rem(14);
      // height: px2rem(35);
      width: 70%;
      align-items: center;
      margin-bottom: px2rem(5);
      margin-top: px2rem(5);
      .remember-wrapper {
        display: flex;
        width: 50%;
        flex: 1;
        justify-content: flex-start;
      }
      .forget-wrapper {
        flex: 1;
        width: 50%;
        justify-content: flex-end;
        display: flex;
      }
    }
    .login-check-wrapper {
      flex: 0 0 px2rem(40);
      width: 65%;
      height: 100%;
      justify-content: center;
      display: flex;
      margin-top: px2rem(5);
      .login-check {
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