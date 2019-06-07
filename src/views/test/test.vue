<template>
  <div ref="wrapper" class="list-wrapper" style="position: relative; z-index:1; overflow: hidden">
    <div class="scroll-content">
      <!-- 内容 -->
      <div ref="listWrapper">
        <slot>
          <ul class="list-content">
            <li
              @click="clickItem($event,item)"
              class="list-item"
              v-for="(item,index) in data"
              :key="index"
            >{{item}}</li>
          </ul>
        </slot>
      </div>
      <!-- 上拉加载 -->
      <slot name="pullup" :pullUpLoad="pullUpLoad" :isPullUpLoad="isPullUpLoad">
        <div class="pullup-wrapper" v-if="pullUpLoad">
          <div class="before-trigger" v-if="!isPullUpLoad">
            <span>{{pullUpTxt}}</span>
          </div>
          <div class="after-trigger" v-else>
            <loading></loading>
          </div>
        </div>
      </slot>
    </div>
    <!-- 下拉刷新 -->
    <slot
      name="pulldown"
      :pullDownRefresh="pullDownRefresh"
      :pullDownStyle="pullDownStyle"
      :beforePullDown="beforePullDown"
      :isPullingDown="isPullingDown"
      :bubbleY="bubbleY"
    >
      <div ref="pulldown" class="pulldown-wrapper" :style="pullDownStyle" v-if="pullDownRefresh">
        <div class="before-trigger" v-if="beforePullDown">
          <bubble :y="bubbleY"></bubble>
        </div>
        <div class="after-trigger" v-else>
          <div v-if="isPullingDown" class="loading">
            <loading></loading>
          </div>
          <div v-else>
            <span>{{refreshTxt}}</span>
          </div>
        </div>
      </div>
    </slot>
  </div>
</template>

<script>
function getRect(el) {
  if (el instanceof window.SVGElement) {
    let rect = el.getBoundingClientRect();
    return {
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height
    };
  } else {
    return {
      top: el.offsetTop,
      left: el.offsetLeft,
      width: el.offsetWidth,
      height: el.offsetHeight
    };
  }
}
export default {
  name: COMPONENT_NAME,
  props: {
    data: {
      type: Array,
      default: function() {
        return [];
      }
    },
    probeType: {
      type: Number,
      default: 1
    },
    click: {
      type: Boolean,
      default: true
    },
    listenScroll: {
      type: Boolean,
      default: false
    },
    listenBeforeScroll: {
      type: Boolean,
      default: false
    },
    listenScrollEnd: {
      type: Boolean,
      default: false
    },
    direction: {
      type: String,
      default: DIRECTION_V
    },
    scrollBar: {
      type: null,
      default: {
        fade: false,
        interactive: false // 1.8.0 新增
      }
    },
    showScrollBar: {
      type: Boolean,
      default: false
    },
    pullDownRefresh: {
      type: null,
      default: false
    },
    pullUpLoad: {
      type: null,
      default: false
    },
    startY: {
      type: Number,
      default: 0
    },
    refreshDelay: {
      type: Number,
      default: 20
    },
    freeScroll: {
      type: Boolean,
      default: true
    },
    mouseWheel: {
      type: Boolean,
      default: false
    },
    bounce: {
      default: true
    },
    zoom: {
      default: false
    }
  },
  data() {
    return {
      beforePullDown: true,
      isRebounding: false,
      isPullingDown: false,
      isPullUpLoad: false,
      pullUpDirty: true,
      pullDownStyle: "",
      bubbleY: 0
    };
  },
  computed: {
    pullUpTxt() {
      const moreTxt = "上拉加载更多";
      const noMoreTxt = "没有更多数据了";
      return this.pullUpDirty ? moreTxt : noMoreTxt;
    },
    refreshTxt() {
      return this.pullDownRefresh && this.pullDownRefresh.txt;
    }
  },
  created() {
    this.pullDownInitTop = -50;
  },
  mounted() {
    setTimeout(() => {
      this.initScroll();
    }, 20);
  },
  destroyed() {
    this.$refs.scroll && this.$refs.scroll.destroy();
  },
  methods: {
    // 初始化bscroll实例
    initScroll() {
      if (!this.$refs.wrapper) {
        return;
      }
      if (this.$refs.listWrapper && (this.pullDownRefresh || this.pullUpLoad)) {
        this.$refs.listWrapper.style.minHeight = `${getRect(this.$refs.wrapper)
          .height + 1}px`;
      }
      let options = {
        probeType: this.probeType, //1
        click: this.click, //true
        tap: true, //true
        scrollY: this.freeScroll || this.direction === DIRECTION_V, //true
        scrollX: this.freeScroll || this.direction === DIRECTION_H, //true
        scrollbar: this.showScrollBar && this.scrollBar, //false
        pullDownRefresh: this.pullDownRefresh, //false
        pullUpLoad: this.pullUpLoad, //true
        startY: this.startY, //0
        freeScroll: this.freeScroll, //true
        mouseWheel: this.mouseWheel, //false
        bounce: this.bounce, //true
        zoom: this.zoom //false
      };
      // 初始化better-scroll 传入一个DOM元素
      this.scroll = new BScroll(this.$refs.wrapper, options);
      if (this.listenScroll) {
        this.scroll.on("scroll", pos => {
          this.$emit("scroll", pos);
        });
      }
      if (this.listenScrollEnd) {
        this.scroll.on("scrollEnd", pos => {
          this.$emit("scroll-end", pos);
        });
      }
      if (this.listenBeforeScroll) {
        this.scroll.on("beforeScrollStart", () => {
          this.$emit("beforeScrollStart");
        });
        this.scroll.on("scrollStart", () => {
          this.$emit("scroll-start");
        });
      }
      if (this.pullDownRefresh) {
        this._initPullDownRefresh();
      }
      if (this.pullUpLoad) {
        this._initPullUpLoad();
      }
    },
    disable() {
      this.scroll && this.scroll.disable();
    },
    enable() {
      this.scroll && this.scroll.enable();
    },
    refresh() {
      this.scroll && this.scroll.refresh();
    },
    scrollTo() {
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments);
    },
    scrollToElement() {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments);
    },
    clickItem(e, item) {
      console.log(e);
      this.$emit("click", item);
    },
    destroy() {
      this.scroll.destroy();
    },
    // 强制刷新scroll
    forceUpdate(dirty) {
      if (this.pullDownRefresh && this.isPullingDown) {
        this.isPullingDown = false;
        this._reboundPullDown().then(() => {
          this._afterPullDown();
        });
      } else if (this.pullUpLoad && this.isPullUpLoad) {
        this.isPullUpLoad = false;
        this.scroll.finishPullUp();
        this.pullUpDirty = dirty;
        this.refresh();
      } else {
        this.refresh();
      }
    },
    _initPullDownRefresh() {
      this.scroll.on("pullingDown", () => {
        this.beforePullDown = false;
        this.isPullingDown = true;
        this.$emit("pullingDown");
      });
      this.scroll.on("scroll", pos => {
        if (!this.pullDownRefresh) {
          return;
        }
        if (this.beforePullDown) {
          this.bubbleY = Math.max(0, pos.y + this.pullDownInitTop);
          this.pullDownStyle = `top:${Math.min(
            pos.y + this.pullDownInitTop,
            10
          )}px`;
        } else {
          this.bubbleY = 0;
        }
        if (this.isRebounding) {
          this.pullDownStyle = `top:${10 -
            (this.pullDownRefresh.stop - pos.y)}px`;
        }
      });
    },
    _initPullUpLoad() {
      this.scroll.on("pullingUp", () => {
        this.isPullUpLoad = true;
        this.$emit("pullingUp");
      });
    },
    _reboundPullDown() {
      const { stopTime = 600 } = this.pullDownRefresh;
      return new Promise(resolve => {
        setTimeout(() => {
          this.isRebounding = true;
          this.scroll.finishPullDown();
          resolve();
        }, stopTime);
      });
    },
    _afterPullDown() {
      setTimeout(() => {
        this.pullDownStyle = `top:${this.pullDownInitTop}px`;
        this.beforePullDown = true;
        this.isRebounding = false;
        this.refresh();
      }, this.scroll.options.bounceTime);
    }
  },
  watch: {
    data() {
      setTimeout(() => {
        this.forceUpdate(true);
      }, this.refreshDelay);
    }
  },
  components: {
    Loading,
    Bubble
  }
};
</script>


<style lang="scss">
@import "@/assets/styles/global.scss";
.container {
  width: 800px;
  height: 200px;
  border: 1px solid #ccc;
  position: relative;
  margin: 0 auto;
  overflow: hidden;
  .wrap {
    width: 1400px;
    height: 200px;
    position: absolute;
    left: 0;
    top: 0;
  }
}
.wrap li {
  box-sizing: border-box;
  width: 200px;
  height: 200px;
  float: left;
}
.container span {
  font-size: 20px;
}
.container .left {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translate(0, -50%);
}
.container .right {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translate(0, -50%);
}
li:nth-child(1) {
  background-color: red;
}
li:nth-child(2) {
  background-color: skyblue;
}
li:nth-child(3) {
  background-color: paleturquoise;
}
li:nth-child(4) {
  background-color: pink;
}
li:nth-child(5) {
  background-color: green;
}
</style>