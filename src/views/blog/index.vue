<template>
  <div class="index-wrapper">
    <top-bar></top-bar>
    <blog-list></blog-list>
    <menu-bar-small></menu-bar-small>
    <menu-bar-big></menu-bar-big>
    <right-aside class="right-aside"></right-aside>
  </div>
</template>

<script>
import TopBar from "@/components/Blog/topBar.vue";
import BlogList from "@/components/Blog/blogList.vue";
import MenuBarSmall from "@/components/Blog/menuBar.vue";
import MenuBarBig from "@/components/Blog/menuBar1.vue";
import RightAside from "@/components/Blog/aside.vue";
export default {
  components: {
    TopBar,
    BlogList,
    MenuBarBig,
    MenuBarSmall,
    RightAside
  }
};
</script>


<style lang="scss">
@import "@/assets/styles/global.scss";
@media screen and (min-width: 100px) {
  .index-wrapper {
    width: 100%;
    background-color: #f0f3f4;
    height: 100%;
    .blog-wrapper {
      .blog {
        height: 100%;
        background-image: url("./../../assets/6.jpg");
        background-size: cover;
        background-repeat: no-repeat;
        min-width: 260px;
        border-radius: 10px 10px 0 0 !important;
        .content-img {
          border-radius: 10px 10px 0 0 !important;
          display: block;
          width: 100%;
          height: 100%;
        }
        .content-wrapper {
          .content {
            .article {
              line-height: 1em;
              @include ellipsis2(2);
            }
          }
        }
      }
    }
    .topbar-wrapper {
      height: px2rem(50);
    }
    .menu-bar-big {
      display: none;
      .menu {
        width: 100%;
        flex: 0 0 100%;
      }
    }
    .right-aside {
      display: none;
    }
  }
}
// 大于500小于765:
// 隐藏左右两侧栏目,头部导航栏宽度为200,隐藏搜索栏
@media screen and (min-width: 501px) {
  .index-wrapper {
    .blog-wrapper {
      .blog {
        background-image: url("./../../assets/6.jpg");
        background-size: cover;
        background-repeat: no-repeat;
        min-width: 260px;
        .content-wrapper {
          .content {
            .article {
              @include ellipsis2(3);
            }
          }
        }
      }
    }
    .topbar-wrapper {
      height: 50px;
      width: 100%;
      display: block;
      .left {
        @include center;
        line-height: 50px;
      }
      .content {
        @include center;
      }
    }
  }
  .menu-bar-samll{
    top: 50px;
  }
}
// 大于765小于996px:
// 显示左侧作者信息,右侧文章目录隐藏
@media screen and (min-width: 765px) {
  .index-wrapper {
    .blog-wrapper {
      padding-left: 200px;
      box-sizing: border-box;
    }
    .menu-bar-big {
      width: 200px;
      display: block;
    }
    .right-aside {
      display: none;
    }
  }
}
// 左右两侧目录都显示
@media screen and (min-width: 996px) {
  .index-wrapper {
    .blog-wrapper {
      padding-right: 200px;
    }
    .right-aside {
      display: block;
      height: 100%;
    }
  }
}

@media screen and (min-width: 1170px) {
  .index-wrapper {
    .blog-wrapper {
      .blog-content {
        .blog-list {
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
          .blog {
            border-radius: 10px;
            height: 300px;
            overflow: hidden;
            position: relative;
            left: 0;
            top: 0;
            box-shadow: 1px 1px 3px 1px rgba(0, 0, 0, 0.2);
            background-color: rgba(255, 255, 255, 0.9);
            transition: all 0.2s linear;
            .content-img {
              display: none;
            }
            &:hover {
              box-shadow: 1px 1px 5px 5px rgba(0, 0, 0, 0.3);
              background-color: #edf1f2;
              transform: scale(1.05);
            }
            // 内容
            .content-wrapper {
              background-color: rgba(0, 0, 0, 0.3);
              border-radius: 10px;
              position: absolute;
              left: 0;
              top: 0;
              box-sizing: border-box;
              transition: all 0.2s linear;

              &:hover {
                .content .title {
                  top: -80px;
                }
                .content .article {
                  padding: px2rem(10) px2rem(30);
                  box-sizing: border-box;
                  color: #fff;
                  font-size: 20px;
                  @include ellipsis2(3);
                  height: 100%;
                  visibility: visible;
                }
                .author-info {
                  visibility: visible;
                }
              }
              // 文章内容
              .content {
                width: 100%;
                height: 100%;
                position: absolute;
                left: 0;
                top: 0;
                border-bottom: none;
                // 一开始标题的位置是居中铺满
                .title {
                  position: absolute;
                  left: 0;
                  top: 0;
                  bottom: 0;
                  right: 0;
                  margin: auto;
                  text-align: center;
                  color: #fff;
                  text-shadow: 0 0 3px #fff;
                  font-size: 24px;
                  transition: all 0.2s linear;
                }
                .article {
                  position: absolute;
                  left: 0;
                  top: 45%;
                  visibility: hidden;
                }
              }
              // 作者信息
              .author-info {
                margin-top: 0;
                position: relative;
                left: 0;
                bottom: 0;
                color: #fff;
                visibility: hidden;
                .author {
                  position: absolute;
                  left: 20px;
                  bottom: 10px;
                }
                .createtime {
                  position: absolute;
                  left: 80px;
                  bottom: 10px;
                }
                // visibility: hidden;
              }
            }
          }
        }
      }
    }
  }
  .right-aside {
    display: block;
  }
}
</style>


