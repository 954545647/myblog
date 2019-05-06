<template>
  <div class="music-wrapper">
    <div class="music-content">
      <div class="content-bar">
        <!-- 图片 -->
        <div class="img-wrapper">
          <img :src="imgUrlList[musicIndex]" ref="musicCover">
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
      </div>

      <div class="control-bar">
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
            <i class="iconfont icon-shangxiashou-" @click="prev"></i>
            <div class="icon-wrapper" @click="playMucic">
              <i class="iconfont icon-normal" v-if="playStatus===0 || playStatus===2"></i>
              <i class="iconfont icon-zantingtingzhi" v-if="playStatus==1"></i>
            </div>
            <i class="iconfont icon-shangxiashou-1" @click="next"></i>
          </div>
          <!-- 音乐列表 -->
          <div class="nameList-wrapper" @click="showMusicList">
            <i class="iconfont icon-bofangqi_shouyegequliebiao_"></i>
          </div>
          <!-- 音乐播放器 -->
          <audio
            :src="musicUrlList[musicIndex]"
            ref="audio"
            class="audio"
            @timeupdate="timeupdate"
            @ended="ended"
            @canplay.once="canplay"
            preload="auto"
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
    </div>
    <!-- 背景图片 -->
    <div class="music-background" ref="background" :style="{backgroundImage: `url(${imgCover})` }"></div>
    <!-- 音乐蒙版 -->
    <div class="music-mask"></div>
    <div class="link-wrapper">
      <transition name="fade">
        <ul class="link-list" v-show="listShow">
          <li @click="goToBlog">
            <i class="iconfont icon-shouye"></i>
          </li>
          <li @click="goToMusic">
            <i class="iconfont icon-erji"></i>
          </li>
          <li @click="goToWrite">
            <i class="iconfont icon-xiezi"></i>
          </li>
        </ul>
      </transition>
      <div class="link-control" @click="showList">
        <i class="iconfont icon-zhiyin"></i>
      </div>
    </div>
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
      currentTime: null, //歌曲当前时间
      totalTime: null, //歌曲总时长
      lyricIndex: -1, //高亮的歌词
      currentlyric: [], //当前歌曲的歌词
      currentMusicTime: [], //当前歌曲的时间
      index: 0, // 当前时间播放到第几个时间戳
      sonIndex: 0, //子组件点击改变音乐
      canshowLyric: false, //可以显示歌曲长度
      model: false, //false为顺序播放,true为随机播放(默认是单曲循环,因为播放结束不跳下一首)
      musicLoading: false, //歌曲正在加载
      canAction: false, //图片可以旋转
      deg: 0, //图片旋转的角度
      listShow: false,
      list: null //音乐组件
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
    },
    // 监听播放状态:
    playStatus: function(val) {
      // if (val === 1) {
      //   // this.$refs.musicCover.className = "action";
      //   this.canAction = true;
      //   this.imgAction();
      // } else {
      //   this.canAction = false;
      //   this.imgAction();
      //   // this.$refs.musicCover.className = "";
      // }
    }
  },
  methods: {
    // 去写博客
    goToWrite() {
      this.$router.push("/write");
    },
    // 去博客列表
    goToBlog() {
      this.$router.push("/blog");
    },
    // 去听歌
    goToMusic() {
      this.$router.push("/home");
    },
    // 显示导航菜单
    showList() {
      this.listShow = !this.listShow;
    },
    // 查看评论
    showComment() {},
    // 选择动画
    imgAction() {
      if (this.canAction) {
        var timer = setInterval(() => {
          if (this.$refs.musicCover) {
            this.deg += 10;
            this.$refs.musicCover.style.transform = `rotate(${this.deg}deg)`;
          }
        }, 1000);
      } else {
        clearInterval(timer);
      }
    },
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
    },
    // 切换播放模式
    changeModel() {
      this.model = !this.model;
    },
    // 切换歌曲
    changeMusic() {
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
      if (item) {
        for (var i = 0; i < item.length; i++) {
          item[i].style.color = "";
        }
      }
    },
    // 显示歌曲全部列表,调用列表通用组件
    showMusicList() {
      let vm = this;
      this.list = this.$createList({
        $props: {
          listdata: this.musicName
        }
      });
      this.list.show();
      this.list.$on("change", index => {
        this.musicIndex = index; //改变音乐
        this.changeMusic(); //切歌
        this.restoreLyric(); //重置歌词样式
        this.list.hide(); //隐藏列表
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
        if (this.lyricIndex != -1) {
          this.$refs.lyricItem[this.lyricIndex].style.color = "#61C5FA";
          if (this.$refs.lyricItem[this.lyricIndex - 1]) {
            this.$refs.lyricItem[this.lyricIndex - 1].style.color = "white";
          }
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
    if (this.list) {
      this.list.remove();
    }
  }
};
</script>


<style lang="scss">
@import "@/assets/styles/global.scss";

// 屏幕大于1px小于500px的时候
@media screen and (min-width: 100px) {
  .music-wrapper {
    width: 100%;
    height: 100%;
    position: relative;
    @include center;
    color: #fff;
    flex-direction: column;
    .music-content {
      @include center;
      flex-direction: column;
      .content-bar {
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
            transition: all 1s linear;
            &.action {
              animation: Myrotate 60s infinite forwards;
              animation-fill-mode: forwards;
            }
          }
          @keyframes Myrotate {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
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
            transition: all 0.2s linear;
            .lyric-item {
              padding: 5px 0;
              list-style: none;
              width: 100%;
              // height: px2rem(20);
              height: 20px;
              // font-size: px2rem(14);
              font-size: px2rem(16);
              color: #fff;
              // line-height: px2rem(20);
              line-height: 30px;
            }
            &:prev-position {
              margin-top: 0 !important;
            }
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
          // 去除默认样式
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
        flex: 0 0 20%;
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
          height: 100%;
          @include center;
          .icon-shangxiashou- {
            font-size: px2rem(25);
          }
          .icon-wrapper {
            @include center;
            margin: 0 px2rem(10);
            .iconfont {
              font-size: px2rem(26);
              height: 100%;
              width: 100%;
            }
          }
          .icon-shangxiashou-1 {
            font-size: px2rem(25);
          }
        }
        .nameList-wrapper {
          flex: 0 0 px2rem(50);
          width: px2rem(50);
          height: 100%;
          @include center;
          .iconfont {
            font-size: px2rem(28);
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
      filter: blur(5px);
      background: no-repeat center center;
      background-size: cover;
      transition: all 0.5s linear;
    }
    .music-mask {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      background: rgba(0, 0, 0, 0.4);
    }
    .link-wrapper {
      position: absolute;
      right: 0;
      bottom: 0;
      .link-control {
        @include center;
        line-height: 1em;
        position: absolute;
        right: px2rem(10);
        bottom: px2rem(10);
        .iconfont {
          font-size: px2rem(18);
        }
      }
      .link-list {
        background: transparent;
        position: absolute;
        right: px2rem(10);
        bottom: px2rem(50);
        // font-size: px2rem(18);
        li {
          padding: px2rem(5) 0;
          font-size: px2rem(20);
          .icon-shouye {
            font-size: px2rem(22);
          }
        }
      }
    }
  }
}
// 屏幕大于501px的时候
@media screen and (min-width: 501px) {
  .music-wrapper {
    .music-content {
      width: 100%;
      height: 100%;
      display: flex;
      box-sizing: border-box;
      // 图片和歌词
      .content-bar {
        flex: 0 0 85%;
        height: 600px;
        width: 100%;
        display: flex;
        @include center;
        box-sizing: border-box;
        padding: 0 px2rem(50);
        flex-direction: row;
        .img-wrapper {
          flex: 0 0 50%;
          width: px2rem(150);
          height: px2rem(150);
          border-radius: 0%;
          background-color: transparent;
          img {
            border-radius: 0;
            width: px2rem(150);
            height: px2rem(150);
          }
        }
        .lyric-wrapper {
          flex: 1;
          font-size: px2rem(20);
          height: px2rem(160);
          .item-wrapper {
            .lyric-item {
              font-size: 16px;
            }
          }
        }
      }
      // 底部控制条
      .control-bar {
        flex: 1;
        width: 100%;
        display: flex;
        position: relative;
        padding: 0 20px;
        box-sizing: border-box;
        @include center;
        // 进度条
        .progress-wrapper {
          order: 2;
          flex: 1;
          margin: 0 px2rem(5);
          .prev-time {
            flex: 0 0 px2rem(35);
            width: px2rem(30);
            font-size: px2rem(12);
          }
          .progress {
            &::-webkit-slider-thumb {
              width: px2rem(12);
              height: px2rem(12);
            }
          }
          .total-time {
            flex: 0 0 px2rem(35);
            width: px2rem(30);
            font-size: px2rem(12);
          }
        }
        // 上下首歌
        .control-wrapper {
          order: 1;
          width: 25%;
          position: static;
          .play-wrapper {
            box-sizing: border-box;
            .iconfont {
              font-size: 22px;
            }
            .icon-wrapper {
              margin: 0 15px;
            }
          }
          // 切换模式
          .model {
            position: absolute;
            right: 10%;
            @include center;
            width: 0;
            height: 0;
            .iconfont {
              font-size: 18px;
            }
          }
          // 歌词列表
          .nameList-wrapper {
            width: 0;
            height: 0;
            position: absolute;
            right: 5%;
            @include center;
            .iconfont {
              font-size: 24px;
            }
          }
        }
        .handle-wrapper {
          order: 3;
          flex: 0 0 30%;
          width: 30%;
          justify-content: flex-start;
          padding-right: 10%;
          box-sizing: border-box;
          .iconfont {
            font-size: 18px;
          }
        }
      }
    }
  }
}

// 屏幕大于768px的时候
@media screen and (min-width: 850px) {
  .music-wrapper {
    .music-content {
      // 图片和歌词
      .content-bar {
        padding: 0 px2rem(100);
        .img-wrapper {
          width: px2rem(180);
          height: px2rem(180);
          img {
            width: px2rem(180);
            height: px2rem(180);
          }
        }
        .lyric-wrapper {
          height: px2rem(180);
        }
      }
      // 底部控制条
      .control-bar {
        padding: 0 30px;
        // 进度条
        .progress-wrapper {
          margin: 0 px2rem(10);
        }
      }
    }
  }
}

// 屏幕大于1000px的时候
@media screen and (min-width: 1075px) {
  .music-wrapper {
    .music-content {
      // 图片和歌词
      .content-bar {
        padding: 0 px2rem(140);
        .img-wrapper {
          img {
            width: px2rem(200);
            height: px2rem(200);
          }
        }
        .lyric-wrapper {
          height: px2rem(200);
        }
      }
      // 底部控制条
      .control-bar {
        .control-wrapper {
          .play-wrapper {
            .iconfont {
              font-size: 26px;
            }
          }
        }
      }
    }
  }
}

// 屏幕大于1250px的时候
@media screen and (min-width: 1250px) {
  .music-content {
    // 图片和歌词
    .content-bar {
      padding: 0 px2rem(180);
      .img-wrapper {
        img {
          width: px2rem(240);
          height: px2rem(240);
        }
      }
      .lyric-wrapper {
        height: px2rem(240);
      }
    }
  }
}
</style>