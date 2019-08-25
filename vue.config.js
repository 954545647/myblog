module.exports = {
  // publicPath: '/',
  publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
  // 取消 sourceMap
  productionSourceMap: process.env.NODE_ENV === "production" ? false : true,
  chainWebpack: config => {
    // 移除 prefetch 插件
    config.plugins.delete("prefetch");
    // 移除 preload 插件
    config.plugins.delete("preload");
    // 压缩代码
    config.optimization.minimize(true);
    // 分割代码，可以并行下载，不过也需要权衡数目
    config.optimization.splitChunks({
      chunks: "all"
    });
    // 配置分析插件
    if (process.env.NODE_ENV === "production") {
      if (process.env.npm_config_report) {
        config
          .plugin("webpack-bundle-analyzer")
          .use(require("webpack-bundle-analyzer").BundleAnalyzerPlugin)
          .end();
        config.plugins.delete("prefetch");
      }
    }
    config.externals({
      vue: "Vue",
      vuex: "Vuex",
      "vue-router": "VueRouter",
      "element-ui": "ELEMENT",
      "echarts": "echarts" ,
      "axios":'axios'
    });
  },
  // // CSS 配置
  css: {
    // 是否动态的将CSS代码生成style标签插入到js文件中
    extract: false // 是
  }
};
