<template>
  <ul class="container">
    <div class="wrap" style="left:-200px" ref="wrap">
      <li>5</li>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
      <li>5</li>
      <li>1</li>
    </div>
    <span class="left" @click="prev" v-show="currentIndex!=0">《</span>
    <span class="right" @click="next">》</span>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      currentIndex: 0
    };
  },
  methods: {
    prev() {
      this.currentIndex -= 1;
      this.$refs.wrap.style.left = (parseInt(this.$refs.wrap.style.left) + 200) + "px";
    },
    next() {
      this.currentIndex += 1;
      this.$refs.wrap.style.left = (parseInt(this.$refs.wrap.style.left) - 200) + "px";
    }
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