<template>
  <div class="user-center">
    <my-header :username="name"></my-header>
    <my-setting></my-setting>
    <my-footer></my-footer>
    <keep-alive>
      <component :is="currentView"></component>
    </keep-alive>
  </div>
</template>

<script>
import myHeader from "@/components/User/header.vue";
import mySetting from "@/components/User/setting.vue";
import myFooter from "@/components/User/footer.vue";
import Modify from "@/components/User/modify.vue";
import UserCenter from "@/components/User/userCenter.vue";
import { userMixin } from "@/utils/mixin.js";
export default {
  mixins: [userMixin],
  data() {
    return {
      name:''
    };
  },
  watch: {
    currentView: function() {
      console.log(this.currentView);
    }
  },
  components: {
    myHeader,
    mySetting,
    myFooter,
    UserCenter,
    Modify
  },
  mounted() {
    this.$axios.get(`${process.env.VUE_APP_BASE_URL}/ifLogin`).then(res => {
      this.$axios
        .post(`${process.env.VUE_APP_BASE_URL}/user/checkRule`, {
          email: res.data.sessionId
        })
        .then(res => {
          this.name = res.data.username;
        });
    });
  }
};
</script>

<style lang="scss">
@import "@/assets/styles/home.scss";
@media screen and (min-width: 100px) {
  .user-center {
    position: relative;
    font-size: 16px;
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    background-color: #f9f9f9;
    .header-img-wrapper {
      width: 100%;
    }
  }
}
@media screen and (min-width: 500px) {
  .user-center {
    flex-direction: column;
    .header-img-wrapper {
      width: 20%;
      display: flex;
      flex-direction: column;
      height: 50%;
      flex: 0 0 50%;
      max-height: 40%;
      background: #fff;
      .avatar-uploader {
        @include center;
        width: 100%;
        height: 60%;
        .el-upload {
          @include center;
          border-radius: 50%;
          border: 1px solid black;
          background-color: #fff;
          flex: 0 0 100px;
          height: 100px;
          width: 100px;
          .icon-yonghu {
            font-size: 20px;
          }
        }
      }
      .user-info {
        @include center;
        justify-content: flex-start;
        span {
          color: #6e797e;
          margin-bottom: 20px;
        }
        .desc {
          color: #6e797e;
          font-size: 14px;
        }
      }
    }
    .setting {
      width: 20%;
      display: flex;
      flex-direction: row;
      header {
        display: none;
      }
      .manage-wrapper {
        .manage {
          .list {
            li {
              display: flex;
              flex-direction: column;
              justify-content: center;
              width: 50%;
              height: 100px;
              flex: 0 0 50%;
              @include center;
              .iconfont {
                font-size: 24px;
              }
              .icon-xiugai {
                font-size: 30px;
              }
              .icon-web-icon- {
                font-size: 30px;
              }
              span {
                margin-top: px2rem(10);
                font-size: px2rem(14);
              }
            }
          }
        }
      }
    }
    .footer-bar {
      display: none;
    }
  }
}
</style>

