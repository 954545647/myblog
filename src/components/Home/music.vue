<template>
  <div class="music-wrapper">
    <div class="music-content">
      <!-- 图片 -->
      <div class="img-wrapper">
        <img :src="imgUrlList[musicIndex]" alt>
      </div>
      <!-- 歌词 -->
      <div class="lyric-wrapper">
        <ul class="item-wrapper" ref="lyricWrapper">
          <li
            v-for="(item,index) in currentlyric"
            :key="index"
            class="lyric-item"
            ref="lyricItem"
          >{{item}}</li>
        </ul>
      </div>
      <!-- <div class="loading" v-if="musicLoading">
        歌曲正在加载中
      </div>-->
      <!-- 进度条 -->
      <div class="progress-wrapper">
        <div class="prev-time">{{currentTime}}</div>
        <input
          type="range"
          class="progress"
          max="100"
          min="0"
          step="1"
          @change="progressChange($event.target.value)"
          @input="progressInput($event.target.value)"
          :value="progress"
          ref="progress"
        >
        <div class="total-time">{{totalTime}}</div>
      </div>

      <!-- 模式 上一首 暂停播放 下一首 歌曲列表-->
      <div class="control-wrapper">
        <!-- 音乐模式 -->
        <div class="model" @click="changeModel">
          <!-- 随机播放 -->
          <i class="iconfont icon-icon78" v-if="model"></i>
          <!-- 顺序播放 -->
          <i class="iconfont icon-shunxubofang" v-else></i>
        </div>
        <!-- 控制播放暂停 -->
        <div class="play-wrapper">
          <i class="iconfont icon-shangyishou" @click="prev"></i>
          <div class="icon-wrapper" @click="playMucic">
            <i class="iconfont icon-bofang" v-if="playStatus===0 || playStatus===2"></i>
            <i class="iconfont icon-zantingtingzhi" v-if="playStatus==1"></i>
          </div>
          <i class="iconfont icon-xiayishou1" @click="next"></i>
        </div>
        <!-- 音乐列表 -->
        <div class="nameList-wrapper" @click="showMusicList">
          <i class="iconfont icon-bofangqi_shouyegequliebiao_"></i>
        </div>
        <!-- 音乐播放器 -->
        <audio
          :src="musicUrlList[musicIndex]"
          controls="controls"
          ref="audio"
          class="audio"
          @timeupdate="timeupdate"
          @ended="ended"
          @canplay.once="canplay"
          preload='auto'
        ></audio>
      </div>
      <!-- 收藏 下载 分享 评论 -->
      <div class="handle-wrapper">
        <i class="iconfont icon-aixin"></i>
        <i class="iconfont icon-xiazai1"></i>
        <i class="iconfont icon-fenxiang1"></i>
        <i class="iconfont icon-pinglun2" @click="showComment"></i>
      </div>
    </div>

    <div class="music-background" ref="background" :style="{backgroundImage: `url(${imgCover})` }"></div>
    <!-- 音乐蒙版 -->
    <div class="music-mask"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      musicIndex: 0, //当前播放的音乐是第几个
      musicList: [], //音乐数据
      musicUrlList: [], //音乐mp3
      imgUrlList: [], //音乐封面
      lyricList: [], //音乐歌词
      lyricResult: [], //音乐歌词结果(后端已处理)
      musicName: [], // 歌单名字列表
      timeResult: [], // 音乐时间结果(后端已处理)
      playStatus: 0, //播放状态 0:未播放 1:正在播放 2:暂停中
      imgCover: [], // 当前音乐封面
      progress: 0, // 音乐播放进度
      currentTime: 0, //歌曲当前时间
      totalTime: 0, //歌曲总时长
      lyricIndex: -1, //高亮的歌词
      currentlyric: [], //当前歌曲的歌词
      currentMusicTime: [], //当前歌曲的时间
      index: 0, // 当前时间播放到第几个时间戳
      sonIndex: 0, //子组件点击改变音乐
      canshowLyric: false, //可以显示歌曲长度
      model: false, //false为顺序播放,true为随机播放(默认是单曲循环,因为播放结束不跳下一首)
      musicLoading: false //歌曲正在加载
    };
  },
  watch: {
    // 避免mounted还没获取到数据,此时值为undefined
    imgUrlList: function(val) {
      this.imgCover = this.imgUrlList[this.musicIndex]
        ? this.imgUrlList[this.musicIndex]
        : "";
    },
    // 监听当前时间的变化,然后去改变进度条
    currentTime: function(val) {
      this.progress =
        (this.$refs.audio.currentTime / this.$refs.audio.duration) * 100;
      this.updateProgress();
    }
  },
  methods: {
    // 查看评论
    showComment() {},
    // 下一首
    next() {
      this.restoreLyric();
      let length = this.musicName.length - 1;
      if (this.musicIndex == length) {
        this.musicIndex = 0;
      }
      this.musicIndex++;
      this.changeMusic();
    },
    // 上一首
    prev() {
      this.restoreLyric();
      let length = this.musicName.length - 1;
      if (this.musicIndex == 0) {
        this.musicIndex = length;
      }
      this.musicIndex--;
      this.changeMusic();
    },
    // 转换时间格式
    timeFormat(time) {
      let result = "";
      let min = Math.floor(time / 60); // 分钟
      let sec = Math.floor(time - min * 60); //秒数
      // padStart(len,type) 可以用来补齐
      result += min.toString().padStart(2, "0");
      result += ":";
      result += sec.toString().padStart(2, "0");
      return result;
    },
    // 歌曲加载完毕 就离开显示当前歌曲的总时长
    canplay() {
      let first = true;
      let vm = this;
      this.currentTime = this.timeFormat(this.$refs.audio.currentTime)
        ? this.timeFormat(this.$refs.audio.currentTime)
        : "00:00";
      this.totalTime = this.timeFormat(this.$refs.audio.duration);
      this.canshowLyric = true;
      // 针对移动端不会自动播放的问题
      // document.addEventListener("touchstart", function() {
      //   if (first) {
      //     vm.$nextTick(function() {
      //       if (this.currentTime) {
      //         this.currentTime = this.timeFormat(this.$refs.audio.currentTime)
      //           ? this.timeFormat(this.$refs.audio.currentTime)
      //           : "00:00";
      //         this.totalTime = this.timeFormat(this.$refs.audio.duration);
      //       }
      //     });
      //     first = false;
      //   }
      // });
    },
    // 切换播放模式
    changeModel() {
      this.model = !this.model;
    },
    // 切换歌曲
    changeMusic() {
      // if(this.currentTime===0){
      //   this.musicLoading = true
      // }else{
      //   this.musicLoading = false;
      // }
      this.progress = 0;
      this.updateProgress();
      this.currentlyric = this.lyricResult[this.musicIndex]; //当前播放歌的歌词
      this.currentMusicTime = this.timeResult[this.musicIndex]; //当前播放歌的时间
      this.totalTime = this.timeFormat(this.$refs.audio.duration);
      this.imgCover = this.imgUrlList[this.musicIndex];
      this.$refs.audio.currentTime = 0;
      this.ended();
    },
    // 把每句歌词的样式清空
    restoreLyric() {
      let item = this.$refs.lyricItem;
      for (var i = 0; i < item.length; i++) {
        item[i].style.color = "";
      }
    },
    // 显示歌曲全部列表,调用列表通用组件
    showMusicList() {
      let vm = this;
      let list = this.$createList({
        $props: {
          listdata: this.musicName
        }
      });
      list.show();
      list.$on("change", index => {
        this.musicIndex = index; //改变音乐
        this.changeMusic(); //切歌
        this.restoreLyric(); //重置歌词样式
        list.hide(); //隐藏列表
      });
    },
    // 拖动进度条后根据进度progress更新唱歌的进度
    playTime(percent) {
      // 根据百分比唱歌
      this.$refs.audio.currentTime = Math.floor(
        this.$refs.audio.duration * (percent / 100)
      );
      this.updateProgress();
    },
    // 进度条松手触发
    progressChange(val) {
      this.playStatus = 0;
      this.playMucic();
      // 1.根据当前进度计算出唱歌唱到哪
      this.progress = val;
      let now = Math.floor(this.$refs.audio.duration * (this.progress / 100));
      // 2.遍历歌曲时间戳,找到最近的索引并记录
      for (var i = 0; i < this.currentMusicTime.length; i++) {
        // 4.有个bug就是歌词和时间戳我们是过滤过的,最后一句歌词到结束之间的过渡是没有索引的
        // 直接跳到最后一句歌词
        if (now > this.currentMusicTime[this.currentMusicTime.length - 1]) {
          this.index = this.currentMusicTime.length;
          this.lyricIndex = this.index - 1;
          break;
        }
        if (this.currentMusicTime[i] > now) {
          this.index = i;
          // 3.更新歌词的索引,是歌曲时间戳-1
          this.lyricIndex = this.index - 1;
          break;
        }
      }
      // 4.重置歌词样式
      this.restoreLyric();
      this.playTime(this.progress);
      this.updateProgress();
    },
    // 进度条拖拽触发
    progressInput(val) {
      this.progress = val;
      this.updateProgress();
      this.playStatus = 0;
      this.playMucic();
      // 计算出拖拽的百分比
    },
    // 更新进度条
    updateProgress() {
      this.$refs.progress.style.cssText += `background-size: ${
        this.progress
      }% 100% !important`;
    },
    // 监听音频播放时间并更新进度条
    timeupdate() {
      let currentIndex = 0;
      // 这两个是格式化好的时间单位
      if (this.currentTime && this.totalTime && this.$refs.audio) {
        this.currentTime = this.timeFormat(this.$refs.audio.currentTime);
        let vm = this;
        // 这是移动端的坑,更换歌词需要监听事件
        this.$refs.audio.ondurationchange = function() {
          vm.totalTime = vm.timeFormat(vm.$refs.audio.duration);
          vm.currentTime = vm.timeFormat(vm.$refs.audio.currentTime);
          vm.progress = 0;
          vm.playStatus = 0;
          vm.$refs.lyricWrapper.style.marginTop = 0;
        };
        // 根据当前时间去更新歌词
        if (this.$refs.audio.currentTime >= this.currentMusicTime[this.index]) {
          this.lyricIndex++;
          this.index++; //这里采用索引而不是删歌词
          // this.currentMusicTime.shift();
        }
        // 让整个ul上移
        if (this.lyricIndex && this.$refs.lyricItem[this.lyricIndex]) {
          this.$refs.lyricItem[this.lyricIndex].style.color = "#61C5FA";
          this.$refs.lyricItem[this.lyricIndex - 1].style.color = "white";
        }
        // 根据歌词跳过的数目将整个ul上移
        if (this.lyricIndex <= 1) return;
        let height = this.lyricIndex * -30;
        this.$refs.lyricWrapper.style.marginTop = `${height}px`;
      }
    },
    // 音乐播放结束 重置音乐
    ended() {
      this.lyricIndex = -1; //高亮的歌词索引重置
      this.index = 0; //这是时间的索引重置
      this.$refs.audio.currentTime = 0; //当前播放时间归0
      this.progress = 0; //进度归0
      this.$refs.lyricWrapper.style = "0px!important"; //把上移的部分重置
      this.playStatus = 0; //状态变为未播放
      this.restoreLyric(); //重置歌词
    },
    // 点击播放按钮
    playMucic() {
      // 如果当前不是播放状态则播放
      if (this.playStatus === 0) {
        this.$refs.audio.play();
        this.playStatus = 1;
      } else if (this.playStatus === 1) {
        this.$refs.audio.pause();
        this.playStatus = 2;
      } else {
        this.$refs.audio.play();
        this.playStatus = 1;
      }
    }
  },
  mounted() {
    this.musicIndex = new Date().getDay(); //根据周几来播放歌曲
    this.updateProgress(); //更新初步样式 progress此时为0
    // 监听微信加载完毕
    document.addEventListener("WeixinJSBridgeReady", function() {});
    // 发起请求,获取music.json文件的数据
    let data = this.$axios
      .get(`${process.env.VUE_APP_MUSIC_URL}/home/music`)
      .then(res => {
        this.musicList = res.data.result.musicList; //音乐数据列表
        // 音乐MP3链接
        this.musicList.map((item, index) => {
          return this.musicUrlList.push(item.url);
        });
        // 音乐歌词
        this.musicList.map((item, index) => {
          // 歌词需要单独处理
          return this.lyricList.push(item.lyric);
        });
        // 发起请求,单独获取每首歌的歌词的真正数据
        this.$axios
          .get(`${process.env.VUE_APP_MUSIC_URL}/home/getLyric`, {
            params: {
              // 两种数组降维的方式
              // 1: [].concat(...this.lyricList)
              // 2: [].concat.apply([],this.lyricList)
              lyric: [].concat.apply([], this.lyricList)
            }
          })
          .then(res => {
            this.lyricResult = res.data.lyricResult; //所有歌的歌词集合
            this.timeResult = res.data.timesResult; //所有歌的时间戳的集合
            this.currentlyric = this.lyricResult[this.musicIndex]; //当前播放歌的歌词
            this.currentMusicTime = this.timeResult[this.musicIndex]; //当前播放歌的时间
          });
        // 音乐封面
        this.musicList.map((item, index) => {
          return this.imgUrlList.push(encodeURI(item.cover));
        });
        // 音乐列表名字
        this.musicList.map((item, index) => {
          return this.musicName.push(item.name);
        });
      });
  },
  beforeDestroy() {
  }
};
</script>


<style lang="scss">
@import "@/assets/styles/global.scss";
.music-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  @include center;
  color: #fff;
  .music-content {
    @include center;
    flex-direction: column;
    .img-wrapper {
      flex: 0 0 px2rem(260);
      width: px2rem(260);
      height: px2rem(260);
      border-radius: 50%;
      background-color: #272727;
      margin: 0 0 px2rem(15) 0;
      @include center;
      flex-direction: column;
      position: relative;
      img {
        width: px2rem(200);
        height: px2rem(200);
        border-radius: 50%;
      }
      .icon-wrapper {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: px2rem(50);
        height: px2rem(50);
        @include center;
        border: 1px solid #fff;
        border-radius: 50%;
        .iconfont {
          padding-left: px2rem(4);
          color: #fff;
          font-size: px2rem(30);
        }
      }
    }
    .lyric-wrapper {
      width: 100%;
      // height: px2rem(60);
      height: 90px;
      margin: 0 0 px2rem(15) 0;
      position: relative;
      left: 0;
      top: 0;
      overflow: hidden;
      box-sizing: border-box;
      .item-wrapper {
        text-align: center;
        height: 100%;
        margin-top: -0px;
        transition: all 0.1s linear;
        .lyric-item {
          padding: 5px 0;
          list-style: none;
          width: 100%;
          // height: px2rem(20);
          height: 20px;
          font-size: px2rem(14);
          color: #fff;
          // line-height: px2rem(20);
          line-height: 30px;
        }
        &:prev-position {
          margin-top: 0 !important;
        }
      }
    }
    // 进度条
    .progress-wrapper {
      display: flex;
      width: 100%;
      height: px2rem(40);
      @include center;
      .prev-time {
        flex: 0 0 px2re(50);
        width: px2rem(50);
        height: 100%;
        @include center;
        font-size: px2rem(14);
      }
      .total-time {
        flex: 0 0 px2re(50);
        width: px2rem(50);
        font-size: px2rem(14);
        height: 100%;
        @include center;
      }
      .progress {
        -webkit-appearance: none;
        height: px2rem(3);
        margin: auto;
        flex: 1;
        width: 100%;
        background: linear-gradient(#fff, #fff) no-repeat, #999 !important;
        &:focus {
          outline: none;
        }
        &::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: px2rem(15);
          height: px2rem(15);
          background: #fff;
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 0 px2rem(5) 0 rgba(0, 0, 0, 0.9);
        }
      }
    }

    .control-wrapper {
      position: relative;
      flex: 0 0 px2rem(60);
      width: 100%;
      height: px2rem(60);
      display: flex;
      width: 100%;
      @include center;
      .model {
        height: 100%;
        flex: 0 0 px2rem(50);
        width: px2rem(50);
        @include center;
        .iconfont {
          font-size: px2rem(20);
        }
      }
      .play-wrapper {
        width: 100%;
        @include center;
        .icon-shangyishou {
          font-size: px2rem(30);
          vertical-align: px2rem(-3);
        }
        .icon-wrapper {
          width: px2rem(50);
          height: px2rem(50);
          .iconfont {
            font-size: px2rem(28);
            height: 100%;
            width: 100%;
            @include center;
          }
        }
        .icon-xiayishou1 {
          font-size: px2rem(25);
        }
      }
      .nameList-wrapper {
        flex: 0 0 px2rem(50);
        width: px2rem(50);
        height: 100%;
        @include center;
        .iconfont {
          font-size: px2rem(26);
        }
      }
      .audio {
        position: absolute;
        left: 0;
        bottom: -500%;
      }
    }
    .handle-wrapper {
      flex: 0 0 px2rem(40);
      height: px2rem(40);
      width: 100%;
      @include center;
      .iconfont {
        font-size: px2rem(20);
        flex: 1;
      }
    }
  }
  .music-background {
    width: 100%;
    height: 100%;
    z-index: -2;
    position: absolute;
    left: 0;
    top: 0;
    filter: blur(10px);
    background: no-repeat center center;
    background-size: cover;
  }
  .music-mask {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    background: rgba(0, 0, 0, 0.35);
  }
}
</style>