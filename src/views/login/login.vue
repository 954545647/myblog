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
        <div class="login-username">
          <el-input v-model="username" placeholder="邮箱" class="username"></el-input>
          <div class="iconfont-wrapper">
            <span class="iconfont icon-yonghu"></span>
          </div>
        </div>
        <div class="login-password">
          <el-input v-model="password" placeholder="密码"></el-input>
          <div class="iconfont-wrapper">
            <span class="iconfont icon-mima-copy"></span>
          </div>
        </div>
      </div>
      <!-- 记住密码,忘记密码 -->
      <div class="remember-forget-wrapper">
        <div class="remember-wrapper">
          <label>
            <input name="remember" type="checkbox" value>记住密码
          </label>
        </div>
        <div class="forget-wrapper">
          <label>
            <input name="forget" type="checkbox" value>忘记密码
          </label>
        </div>
      </div>
      <!-- 登录注册按钮 -->
      <div class="login-check-wrapper">
        <div class="login-check">登录</div>
        <!-- <div class="register-check"></div> -->
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
          <span :class="{'showText' : ifShowText}" v-if="ifShowText">你好</span>
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
    return {
      username: "",
      password: "",
      ifShowText: false
    };
  },
  methods: {
    goToRegister() {
      this.router.push("/register");
      // history.pushState({}, "", "/register");
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
      width: 80%;
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
      flex: 0 0 px2rem(100);
      height: px2rem(100);
      width: 100%;
      flex-direction: column;
      @include center;
      .login-username {
        position: relative;
        flex: 1;
        height: 50%;
        width: 80%;
        display: flex;
        margin-bottom: px2rem(10);
        .el-input {
          flex: 1;
          font-size: px2rem(14);
          & .el-input__inner {
            height: 100%;
            border-radius: 0 5px 5px 0;
            padding: 0 20px;
          }
        }
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
          .iconfont {
            font-size: px2rem(16);
            color: #464646;
          }
        }
      }
      .login-password {
        position: relative;
        flex: 1;
        height: 50%;
        width: 80%;
        display: flex;
        .el-input {
          flex: 1;
          font-size: px2rem(14);
          & .el-input__inner {
            height: 100%;
            border-radius: 0 5px 5px 0;
            padding: 0 20px;
          }
        }
        .iconfont-wrapper {
          position: absolute;
          flex: 0 0 px2rem(25);
          width: px2rem(25);
          text-align: center;
          height: 100%;
          display: flex;
          align-items: center;
          padding-left: px2rem(2);
          padding-bottom: px2rem(2);
          box-sizing: border-box;
          .iconfont {
            font-size: px2rem(16);
            color: #464646;
          }
        }
      }
    }
    .remember-forget-wrapper {
      display: flex;
      flex: 0 0 px2rem(40);
      font-size: px2rem(14);
      height: px2rem(40);
      width: 80%;
      align-items: center;
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
      width: 80%;
      height: 100%;
      justify-content: center;
      display: flex;
      // margin-top: px2rem(15);
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