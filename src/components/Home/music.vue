<template>
  <div class="music-wrapper">
    <div class="music-content">
      <!-- 图片 -->
      <div class="img-wrapper">
        <img :src="imgUrlList[0]" alt>
        <div class="icon-wrapper" @click="playMucic">
          <i class="iconfont icon-normal" v-if="playStatus===0 || playStatus===2"></i>
          <i class="iconfont icon-zantingtingzhi" v-if="playStatus==1"></i>
        </div>
      </div>
      <!-- 歌词 -->
      <ul class="lyric-wrapper">
        <li v-for="(item,index) in lyricList[0]" :key="index" class="lyric-item">{{item}}</li>
      </ul>
      <!-- 自己的控制条 -->
      <div class="control-wrapper">
        <input type="range">
        <audio :src="musicUrlList[1]" controls="controls" ref="audio" class="audio"></audio>
      </div>
    </div>
    <!-- 音乐图片背景 -->
    <div class="music-background" :style="{background: `url(${imgUrlList[0]}) no-repeat 0 0`}"></div>
    <!-- 音乐蒙版 -->
    <div class="music-mask"></div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      musicList: [], //音乐数据
      musicUrlList: [], //音乐mp3
      imgUrlList: [], //音乐封面
      lyricList: [], //音乐
      playStatus: 0 //播放状态 0:未播放 1:正在播放 2:暂停中
    };
  },
  methods: {
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
    let data = this.$axios
      .get(`${process.env.VUE_APP_MUSIC_URL}/home/music`)
      .then(res => {
        // this.lyric = res.data.result.split("\n");
        this.musicList = res.data.result.musicList;
        // 音乐连接
        this.musicList.map((item, index) => {
          return this.musicUrlList.push(item.url);
        });
        // 音乐歌词
        this.musicList.map((item, index) => {
          // 歌词需要单独处理

          return this.lyricList.push(item.lyric.split("\n"));
        });
        console.log(this.lyricList,'5555');
        this.$axios.get(`${process.env.VUE_APP_MUSIC_URL}/home/getLyric`, {
          params: {
            lyric: this.lyricList
          }
        });
        // 音乐封面
        this.musicList.map((item, index) => {
          return this.imgUrlList.push(item.cover);
        });
      });
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
  .music-content {
    @include center;
    flex-direction: column;
    .img-wrapper {
      flex: 0 0 px2rem(300);
      width: px2rem(300);
      height: px2rem(300);
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
          font-size: px2rem(22);
        }
      }
    }
    .lyric-wrapper {
      flex: 0 0 px2rem(100);
      width: 100%;
      height: px2rem(100);
      overflow: hidden;
      margin: 0 0 px2rem(15) 0;
      .lyric-item {
        flex: 0 0 px2rem(20);
        width: 100%;
        height: px2rem(20);
        font-size: px2rem(14);
        color: #fff;
      }
    }
    .control-wrapper {
      position: relative;
      flex: 0 0 px2rem(60);
      width: 100%;
      height: px2rem(60);
      .audio {
        position: absolute;
        left: 0;
        bottom: -100%;
      }
    }
  }
  .music-background {
    width: 100%;
    height: 100%;
    z-index: -2;
    background-size: cover;
    position: absolute;
    left: 0;
    top: 0;
    filter: blur(20px);
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