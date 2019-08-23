<template>
  <transition name="fade">
    <div class="list-wrapper" v-if="canshow">
      <div class="list-mask" @click="hide" ></div>
      <div class="list" ref="listWrapper">
        <div v-for="(item,index) in listdata" :key="index" @click="changeMusic(index,item)">
          <div class="item">{{item}}</div>
        </div>
      </div>
    </div>
  </transition>
</template>


<script>
export default {
  name: "List",
  props: {
    listdata: {
      type: Array,
      default: () => []
    },
    backgroundImg: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      canshow: false
    };
  },
  methods: {
    changeMusic(index,name){
      this.$emit('change',index)
    },
    hide() {
      this.canshow = false;
    },
    show() {
      this.canshow = true;
    }
  },
  mounted() {}
};
</script>


<style lang="scss">
@import "@/assets/styles/home.scss";
.list-wrapper {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  background: transparent;
  height: 100%;
  .list-mask {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1;
  }
  .list {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    z-index: 2;
    background-size: cover;
    color: white;
    padding: 0 px2rem(30);
    box-sizing: border-box;
    background: rgba(20,17,15,.8);
    .item {
      flex: 0 0 px2rem(40);
      height: px2rem(40);
      line-height: px2rem(40);
      font-size: px2rem(16);
    }
  }
}
</style>