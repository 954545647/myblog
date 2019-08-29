<template>
  <transition name="menu">
    <div class="menu-bar-samll" v-if="canshow">
      <div class="menu">
        <!-- 作者信息 -->
        <div class="auth">
          <div class="author-cover">
            <img class="author-cover-img" src={useImg} alt>
          </div>
          <strong class="name">{{username}}</strong>
        </div>
        <!-- 导航栏菜单 -->
        <div class="navigation">
          <ul class="list">
            <li v-for="(item,index) in routes" :key="index" @click="jump(index)">
              <i class="iconfont" :class="item.icon"></i>
              <span>{{item.alias}}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="mask" @click="hide"></div>
    </div>
  </transition>
</template>


<script>
// import { userMixin } from "@/utils/mixin.js";
import useImg from './../../assets/author.jpg'
export default {
  name: "MenuBar",
  // mixins: [userMixin],
  data() {
    return {
      routes: [],
      username: "",
      canshow: false,
      width: 0
    };
  },

  watch: {},
  methods: {
    jump(index) {
      this.canshow = false;
      let routerName = this.routes[index].name;
      this.$router.push(`/${routerName}`);
    },
    show() {
      this.canshow = !this.canshow;
    },
    hide() {
      this.canshow = false;
    }
  },
  mounted() {
    this.$axios.get(`${process.env.VUE_APP_BASE_URL}/ifLogin`).then(res => {
      this.$axios
        .post(`${process.env.VUE_APP_BASE_URL}/user/checkRule`, {
          email: res.data.sessionId
        })
        .then(res => {
          this.routes = res.data.routes;
          this.username = res.data.username;
        });
    });
  }
};
</script>


<style lang="scss">
@import "@/assets/styles/home.scss";
.menu-bar-samll {
  position: fixed;
  z-index: 1000;
  left: 0;
  top: px2rem(50);
  bottom: 0;
  width: 100%;
  height: 100%;
  display: flex;
  .menu {
    z-index: 1500;
    width: 75%;
    height: 100%;
    flex: 0 0 75%;
    background-color: #3a3f51;
    .auth {
      width: 100%;
      height: 35%;
      display: flex;
      @include center;
      box-sizing: border-box;
      flex-direction: column;
      .author-cover {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        padding: 0 0 px2rem(20) 0;
        .author-cover-img {
          border-radius: 50%;
          width: px2rem(120);
          height: px2rem(120);
          &:hover {
            transform: rotate(360deg);
            transition: 0.4s all ease-in-out;
          }
        }
      }
      .name {
        color: rgb(234, 235, 237);
        font-size: px2rem(18);
        margin-bottom: px2rem(10);
      }
    }
    .navigation {
      flex: 0 0 60%;
      padding: px2rem(10) px2rem(10) 0 px2rem(10);
      .list {
        list-style: none;
        color: rgb(180, 182, 189);
        font-size: px2rem(16);
        .list-title {
          font-size: px2rem(14);
        }
        li {
          height: px2rem(40);
          line-height: px2rem(40);
          box-sizing: border-box;
          .iconfont {
            font-size: px2rem(16);
            padding: 0 px2rem(20) 0 px2rem(10);
          }
          .icon-shouye {
            font-size: px2rem(22);
            vertical-align: -2px;
            padding: 0 px2rem(14) 0 px2rem(8);
          }
        }
      }
    }
  }
  .mask {
    background-color: transparent;
    width: 25%;
    flex: 0 0 25%;
  }
}
@media screen and (min-width: 375px) {
  .menu-bar-samll {
    top: 50px;
  }
}
</style>