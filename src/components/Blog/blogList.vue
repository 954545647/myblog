<template>
  <div class="blog-wrapper">
    <div class="blog-content">
      <div class="word">好好学习 天天向上</div>
      <div class="blog-list">
        <div
          class="blog"
          v-for="(item,index) in blogData"
          :key="index"
          @click="goTodetail(index,item['_id'])"
        >
          <img src="./../../assets/6.jpg" alt class="content-img">
          <div class="content-wrapper">
            <!-- 文章内容 -->
            <div class="content">
              <h2 class="title">{{item.title}}</h2>
              <p class="article">
                {{item.desc}}
              </p>
            </div>
            <!-- 作者时间信息 -->
            <div class="author-info">
              <div class="author">
                <i class="iconfont icon-zuozhe"></i>
                <span>{{item.author}}</span>
              </div>
              <div class="createtime">
                <i class="iconfont icon-shijian"></i>
                <span>{{item.data}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      width: 0,
      blogData: []
    };
  },
  methods: {
    onScroll(val) {},
    // 跳去文章详情页
    goTodetail(index, id) {
      this.$router.push({
        name: "detail",
        params: {
          id
        }
      });
    }
  },
  mounted() {
    this.$axios
      .get(`${process.env.VUE_APP_BASE_URL}/blog/getAllBlog`)
      .then(res => {
        this.blogData = res.data.blog;
      });
  }
};
</script>


<style lang="scss">
@import "@/assets/styles/home.scss";
.blog-wrapper {
  width: 100%;
  height: 100%;
  padding-top: 50px;
  box-sizing: border-box;
  .blog-content {
    background-color: #f0f3f4;
    padding: px2rem(0) px2rem(35) px2rem(30) px2rem(35);
    box-sizing: border-box;
    .word {
      height: px2rem(30);
      width: 100%;
      font-size: px2rem(18);
      line-height: px2rem(30);
      padding: px2rem(20) 0;
    }
    .blog-list {
      width: 100%;
      height: 100%;
      .blog {
        width: 100%;
        display: flex;
        flex-direction: column;
        margin-bottom: px2rem(30);
        &:last-child {
          margin-bottom: px2rem(0);
        }
        .content-img {
          flex: 0 0 px2rem(100);
          border-radius: 10px 10px 0 0;
          width: 100%;
          height: 100%;
        }
        .content-wrapper {
          width: 100%;
          height: 100%;
          background-color: #fff;
          padding: px2rem(15);
          box-sizing: border-box;
          .content {
            width: 100%;
            border-bottom: 1px solid #ccc;
            padding: 0 0 px2rem(10) 0;
            .title {
              font-size: px2rem(18);
              color: rgb(88, 102, 110);
              height: px2rem(25);
              line-height: px2rem(25);
              text-align: left;
              margin-bottom: px2rem(10);
            }
            .article {
              font-size: px2rem(16);
              color: rgb(152, 166, 173);
              word-break: break-all;
              text-align: left;
            }
          }
          .author-info {
            margin-top: px2rem(10);
            width: 100%;
            font-size: px2rem(14);
            height: 100%;
            color: #98a6ad;
            .author {
              float: left;
              margin-right: px2rem(10);
              span {
                margin-left: px2rem(5);
                vertical-align: 1px;
              }
            }
            .createtime {
              float: left;
              span {
                margin-left: px2rem(5);
              }
            }
          }
        }
      }
    }
  }
}
</style>