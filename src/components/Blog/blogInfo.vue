<template>
  <div class="info">
    <div class="userinfo">用户信息</div>
    <div id="user" style="width: 200px;height:200px;"></div>
    <div class="bloginfo">博客信息</div>
    <div id="blog" style="width: 200px;height:200px;"></div>
  </div>
</template>


<script>
import echarts from "echarts";
export default {
  name: "BlogInfo",
  props: {
    userInfo: {
      type: Object,
      default: () => {}
    },
    blogInfo: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    init() {
      var userInfo = echarts.init(document.getElementById("user"));
      userInfo.setOption({
        series: [
          {
            type: "pie",
            radius: "25%",
            data: [
              { value: this.userInfo.count, name: `总用户(${this.userInfo.count})` },
              { value: this.userInfo.superAdmin, name: `管理员(${this.userInfo.superAdmin})` },
              { value: this.userInfo.ordinary, name: `用户(${this.userInfo.ordinary})` }
            ],
            label: {
              normal: {
                textStyle: {
                  fontSize: "8px"
                }
              }
            }
          }
        ]
      });
      var blogInfo = echarts.init(document.getElementById("blog"));
      var option = {
        legend: {
          data: ["数量"]
        },
        xAxis: {
          data: ["文章数", "正文", "草稿"]
        },
        yAxis: {},
        series: [
          {
            name: "数量",
            type: "bar",
            data: [this.blogInfo.count, this.blogInfo.main, this.blogInfo.draft],
            color: ['#dd6b66','#759aa0','#e69d87'],
          }
        ]
      };
      blogInfo.setOption(option);
    }
  },
  mounted() {
    this.init();
  }
};
</script>


<style lang="scss">
@import "@/assets/styles/home.scss";
.info {
  @include center;
  flex-direction: column;
  #user {
    @include center;
  }
  .bloginfo {
    width: 200px;
    height: 50px;
    text-align: center;
    line-height: 50px;
    padding-bottom: 10px;
  }
  #blog {
    @include center;
  }
}
</style>