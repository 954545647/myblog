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
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <!-- 输入邮箱 -->
          <el-form-item prop="email" class="email-wrapper">
            <div class="iconfont-wrapper-one">
              <span class="iconfont icon-yonghu"></span>
            </div>
            <el-input
              v-model="ruleForm.email"
              class="email"
              placeholder="请输入邮箱"
              @blur="startSend()"
              ref="email"
            ></el-input>
          </el-form-item>
          <!-- 输入验证码 -->
          <el-form-item label prop="code" class="code-wrapper">
            <div class="iconfont-wrapper">
              <span class="iconfont icon-scode"></span>
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
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>
          <!-- 注册按钮 -->
          <el-form-item class="register-check-wrapper">
            <el-button type="primary" @click="submitForm('ruleForm')" class="register-check">注册</el-button>
          </el-form-item>
          <!-- 警告信息,邮箱倒计时 -->
          <transition name="fade">
            <div class="warning-wrapper" v-show="warningText">
              <span class="warning-text" ref="warningText">{{warningText}}</span>
            </div>
          </transition>
        </el-form>
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
    <div class="bar">
      <i
        class="iconfont icon-shouye_huaban_huaban"
        @click="toHome"
        :class="{active: activeName == 'blog'}"
      ></i>
      <i class="iconfont icon-MusicAcc" @click="toMusic" :class="{active: activeName == 'music'}"></i>
      <i class="iconfont icon-yonghu" @click="toRegister" :class="{active: activeName == 'register'}"></i>
    </div>
  </div>
</template>


<script>
import { Message } from "element-ui";
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
      var PassReg = /^.{5,100}$/;
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
      timer: null, //时间定时器
      emailAdress: "", //用来判断失去焦点后用户输入的邮箱是否改变
      warningText: "", //警告信息
      remainTime: 90, //邮箱可重新获取剩余时间
      CanSend: false,
      activeName: "register",
      ruleForm: {
        email: "",
        code: "",
        pass: ""
      },
      rules: {
        email: [
          // 可以配置多条规则
          // 第一条规则是不为空,输出
          { validator: validateEmail, trigger: "change" }
        ],
        code: [{ validator: validateCode, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }]
      }
    };
  },
  computed: {
    currentRouter() {
      this.activeName = this.$route.name;
    }
  },
  methods: {
    // 去博客首页
    toHome() {
      this.activeName = "blog";
      this.$router.push('/blog');
    },
    toMusic() {
      this.activeName = "music";
      this.$router.push('/music');
    },
    toRegister() {
      this.activeName = "register";
      this.$router.push('/login');
    },
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
          // 如果检验都合格的话,就带着验证码去后端检验
          this.$axios
            .post(`${process.env.VUE_APP_BASE_URL}/user/register`, {
              email: this.ruleForm.email,
              code: this.ruleForm.code,
              pass: this.ruleForm.pass
            })
            .then(res => {
              // 如果注册成功就跳转到登录页面
              if (res.status === 200 && res.data.code === 0) {
                Message.success({
                  message: res.data.result,
                  duration: 1000
                });
                setTimeout(() => {
                  // 清除定时器
                  if (this.timer) {
                    clearInterval(this.timer);
                  }
                  // 跳转登录页面
                  this.$router.push({
                    path: "/login"
                  });
                }, 1000);
                return;
              } else {
                Message.error({
                  message: res.data.result,
                  duration: 2000
                });
              }
            });
        } else {
          return false;
        }
      });
    },
    // 发送邮件
    sendEmail(email) {
      if (this.timer) {
        clearInterval(this.timer);
        this.remainTime = 90;
      }
      this.emailAdress = email;
      this.$axios({
        method: "post",
        url: `${process.env.VUE_APP_BASE_URL}/user/sendEmail`,
        data: {
          email: email
        }
      }).then(res => {
        // 因为用的是qq邮箱发送过去,所以腾讯会自动检测qq.com结尾邮箱的真实性
        if (res.data.code === 0 && res.status === 200) {
          Message.success({
            message: "验证码已发送,请注意查收",
            duration: 2000
          });
          this.timer = setInterval(() => {
            this.remainTime--;
            this.warningText = `验证码已发送${this.remainTime}秒后可重新获取`;
            if (this.remainTime === 0) {
              this.remainTime = 90;
              this.CanSend = true;
              clearInterval(this.timer);
              return;
            }
          }, 1000);
        } else {
          Message.error({
            message: "邮箱不存在",
            duration: 2000
          });
        }
      });
    },
    // 失去焦点之后如果邮箱没有变化就开始发送邮件
    startSend() {
      this.$refs.ruleForm.validateField("email", email => {
        // 这个只有获取过验证码才会触发
        if (
          !email &&
          (this.CanSend || this.emailAdress !== this.ruleForm.email)
        ) {
          this.sendEmail(this.ruleForm.email);
          this.CanSend = false;
          console.log("发送邮件咯");
        }
      });
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
      width: 70%;
      display: flex;
      margin: px2rem(15) 0 px2rem(10) 0;
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
      height: px2rem(255);
      width: 100%;
      flex-direction: column;
      box-sizing: border-box;
      @include center;
      position: relative;
      // margin-bottom: px2rem(5);
      margin-top: px2rem(5);
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
        box-sizing: border-box;
        @include center;
        flex-direction: column;
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
            .iconfont-wrapper-one {
              position: absolute;
              flex: 0 0 px2rem(25);
              width: px2rem(25);
              text-align: center;
              height: 100%;
              display: flex;
              align-items: center;
              padding-left: px2rem(2);
              z-index: 1;
              .icon-yonghu {
                font-size: px2rem(16);
                color: #464646;
                justify-content: flex-start;
              }
            }
            .iconfont-wrapper-two {
              position: absolute;
              flex: 0 0 px2rem(25);
              width: px2rem(25);
              text-align: center;
              height: 100%;
              display: flex;
              align-items: center;
              padding-right: px2rem(3);
              z-index: 1;
              right: 0;
              .icon-fasongyanzhengma {
                font-size: px2rem(24);
                justify-content: flex-end;
                display: flex;
              }
            }
            .email {
              @include placeholder;
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
              text-align: center;
              height: 100%;
              display: flex;
              align-items: center;
              padding-left: px2rem(3);
              z-index: 1;
              .iconfont {
                font-size: px2rem(14);
                color: #464646;
              }
            }
            .code {
              @include placeholder;
              .el-input__inner {
                padding: 0 px2rem(20);
              }
            }
          }
        }
        .pass-wrapper {
          margin-bottom: px2rem(20);
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
              @include placeholder;
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
          margin-bottom: px2rem(5);
          .el-form-item__content {
            width: 100%;
            margin-left: 0 !important;
            line-height: px2rem(30);
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
        // 倒计时信息
        .warning-wrapper {
          position: relative;
          left: 0;
          top: px2rem(-1);
          flex: 0 0 px2rem(25);
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          .warning-text {
            font-size: px2rem(14);
            width: 100%;
            color: #b6b6c8;
          }
        }
      }
    }
    // 合作伙伴分界线
    .cooperation-wrapper {
      position: relative;
      flex: 0 0 px2rem(10);
      width: 80%;
      display: flex;
      justify-content: space-between;
      box-sizing: border-box;
      height: 100%;
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
  .bar {
    position: absolute;
    left: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    width: 50px;
    .iconfont {
      height: 50px;
      font-size: 22px;
      @include center;
    }
    .icon-yonghu {
      font-size: 24px;
    }
    .active {
      color: $blue;
      font-weight: 700;
    }
  }
}
.el-message {
  width: 60%;
  box-sizing: border-box;
  min-width: 0;
  max-height: px2rem(50);
  .el-message__icon {
    font-size: 16px;
  }
  .el-message__content {
    font-size: 14px;
  }
}
</style>