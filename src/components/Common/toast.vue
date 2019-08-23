<template>
  <transition name="longFade">
    <div class="toast-wrapper" v-show="ifShowToast">
      <div class="text-wrapper">
        <span v-show="ifShowToast" class="toast-text">{{title}}</span>
      </div>
    </div>
  </transition>
</template>


<script>
export default {
  name: "Toast",
  data() {
    return {
      ifShowToast: false
    };
  },
  props: {
    title: {
      type: String,
      default: ""
    }
  },
  methods: {
    show() {
      clearTimeout(this.timer);
      this.ifShowToast = true;
      this.timer = setTimeout(() => {
        this.ifShowToast = false;
      }, 1500);
    },
    hide() {
      this.visiable = false;
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/styles/home.scss";
.toast-wrapper {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  .text-wrapper {
    background-color: #edf2fc;
    position: absolute;
    left: 50%;
    top: 0;
    width: 60%;
    height: px2rem(30);
    transform: translate(-50%, px2rem(20));
    border-radius: px2rem(10);
    text-align: center;
    .toast-text {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      color: #9c93a6;
      font-size: px2rem(16);
      line-height: px2rem(30);
    }
  }
}
</style>