<template>
  <div class="menu-bar-big">
    <div class="menu">
      <!-- 作者信息 -->
      <div class="auth">
        <div class="author-cover">
          <img class="author-cover-img" src="./../../assets/author.jpg" alt>
        </div>
        <strong class="name">{{username}}</strong>
      </div>
      <!-- 导航栏菜单 -->
      <div class="navigation">
        <el-menu default-active="2" class="el-menu-vertical-demo">
          <el-menu-item index="1" v-for="(item,index) in routes" :key="index" @click="jump(index)">
            <i class="iconfont" :class="item.icon"></i>
            <span slot="title">{{item.name}}</span>
          </el-menu-item>
        </el-menu>
      </div>
    </div>
    <div class="mask" @click="hide"></div>
  </div>
</template>


<script>
export default {
  name: "MenuBar",
  data() {
    return {
      canshow: false,
      width: 0,
      routes: [],
      username: ""
    };
  },
  methods: {
    hide() {
      this.canshow = false;
    },
    jump(index) {
      let routerName = this.routes[index].name;
      this.$router.push(`/${routerName}`);
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
          console.log("我执行了，大的");
        });
    });
  }
};
</script>


<style lang="scss">
@import "@/assets/styles/global.scss";
.menu-bar-big {
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
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
    padding-top: 50px;
    .auth {
      width: 100%;
      height: 40%;
      display: flex;
      @include center;
      box-sizing: border-box;
      flex-direction: column;
      border-bottom: 1px solid #2e3344;
      .author-cover {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        padding: 0 0 20px 0;
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
        font-size: 18px;
        margin-bottom: 10px;
      }
    }
    .navigation {
      flex: 0 0 60%;
      padding: 10px 10px 0 10px;
      .el-menu {
        border-right: none;
        background-color: $black;
        .el-menu-item {
          display: flex;
          @include center;
          &:hover {
            background-color: #2e3344;
          }
          &:focus {
            background-color: #2e3344;
          }
          i {
            flex: 0 0 40%;
          }
          span {
            display: flex;
            flex: 1;
            justify-content: flex-start;
            color: rgb(180, 182, 189);
          }
        }
        .el-menu-item.is-active i {
          color: rgb(180, 182, 189);
        }
      }
    }
  }
}
</style>