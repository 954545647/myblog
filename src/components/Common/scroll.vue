<template>
  <div class="scroll-wrapper" ref="scrollWrapper" @scroll="handleScroll">
    <slot></slot>
  </div>
</template>

<script>
import { realPx } from "@/utils/utils.js";
export default {
  name: "Scroll",
  props: {
    // 向上滚动的距离
    top: {
      type: Number,
      default: 0
    },
    bottom: {
      type: Number,
      default: 0
    },
    initPosition: {
      type: Object,
      default: () => {
        return {
          x: 0,
          y: 0
        };
      }
    }
  },
  methods: {
    handleScroll(e) {
      let offsetY =
        e.target.scrollTop || window.pageYOffset || document.body.scrollTop;
      this.$emit("onScroll", offsetY);
    },
    scrollTo(x, y) {
      this.$refs.scrollWrapper.scrollTo(x, y);
    },
    refresh() {
      if (this.$refs.scrollWrapper) {
        // 由于我们使用这个滚动组件的时候通过父子组件传值,只能传一个数值,比如50
        // 但是为了响应式,我们真正需要传递的是 px2rem(50),所以需要把这个值转换为 rem
        // 在 375屏幕下就刚好是传递进来的50 ,如果是小屏(320)的话 就变成 320/375 * 50 = 42.66
        this.$refs.scrollWrapper.style.height =
          window.innerHeight - realPx(this.top) - realPx(this.bottom) + "px";
        this.$refs.scrollWrapper.addEventListener("scroll", this.handleScroll);
      }
    }
  },
  mounted() {
    this.refresh();
    // this.$nextTick(() => {
    //   setTimeout(() => {
    //     this.scrollTo(realPx(this.initPosition.x), realPx(this.initPosition.y));
    //   }, 1);
    // });
  }
};
</script>


<style lang="scss">
@import "@/assets/styles/home.scss";
.scroll-wrapper {
  position: relative;
  width: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  // 针对移动端的卡顿问题
  -webkit-overflow-scrolling: touch;
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>