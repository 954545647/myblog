<template>
  <!-- 上传图片更改头像 -->
  <!-- H5的方法: 使用 FileReader对象 -->
  <!-- <input type="file" name="myImg" ref="myImg" @change="change"> -->
  <!-- <img src ref="imgCover"> -->
  <div class="header-img-wrapper">
    <el-upload
      class="avatar-uploader"
      action="https://jsonplaceholder.typicode.com/posts/"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i class="iconfont icon-yonghu"></i>
    </el-upload>
    <div class="user-info">
      <span class="username">{{username}}</span>
      <span class="desc">好好学习天天向上</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageUrl: ""
    };
  },
  props:{
    username:{
      type:String,
      default:''
    }
  },
  methods: {
    handleAvatarSuccess() {},
    beforeAvatarUpload() {},
    // 针对H5的方法的:
    // input框发生改变
    change() {
      // 新建一个 FileReader对象
      let file = new FileReader();
      // 获取input框上传的图片资源
      // readAsDataURL需要一个Blob对象,图片或其他可以嵌入到文档的类型
      file.readAsDataURL(this.$refs.myImg.files[0]);
      // 这个方法没有返回值,提供了几个事件处理监听函数
      file.addEventListener("load", () => {
        // FileReader.result:
        // 文件的内容。该属性仅在读取操作完成后才有效，数据的格式取决于使用哪个方法来启动读取操作。
        this.$refs.imgCover.src = file.result;
      });
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/styles/home.scss";
.header-img-wrapper {
  width: 20%;
  height: 30%;
  flex: 0 0 30%;
  background: linear-gradient(to right, #0c60f1, #108ff7, #17c6ff);
  display: flex;
  max-height: 180px;
  .avatar-uploader {
    // flex-grow: 默认为0 是指有剩余空间不放大
    // flex-shrink: 默认为1,会缩小,设置为0 则空间不足不缩小
    // flex-basic: 分配多余空间之前,项目占据主轴空间大小,默认值为auto,项目本身的大小
    // flex: 默认 0 1 auto
    // flex: none (0 0 auto) / auto (1 1 auto)
    // flex: 0 0 33%; // 不放大,不缩小,占据主轴30%;
    @include center;
    padding: 0 10px;
    box-sizing: border-box;
    width: 30%;
    .el-upload {
      @include center;
      border-radius: 50%;
      background-color: #fff;
      // flex: 1,1,0
      // flex-basic: 0 表示根据内容撑开宽度,如果width设置为0,则完全不线束
      // flex-basic: auto 设置了width则根据width,没有的话就根据内容
      flex: 1 1 0%;
      height: 50%;
      .icon-yonghu {
        font-size: 20px;
      }
    }
  }
  .user-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 0 20px;
    box-sizing: border-box;
    span {
      color: white;
      margin-bottom: 10px;
    }
    .desc {
      font-size: 14px;
    }
  }
}
</style>