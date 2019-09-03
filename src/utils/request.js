import axios from "axios";

// 导入 vuex
import store from "../store";

/****** 创建axios实例 ******/
const service = axios.create({
  baseURL: process.env.BASE_URL, // api的base_url
  timeout: 10000, // 请求超时时间
  withCredentials: true // 允许携带 cookie
});

// 设置默认时间

// 请求拦截器
let loadingInstance;
service.interceptors.request.use(
  config => {
    // 请求前操作
    loadingInstance =  Loading.service({
      text: "数据加载中..."
    });
    return config;
  },
  error => {
    // 请求错误的操作
    loadingInstance = Loading.service({
      text: "发生请求错误..."
    });
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  response => {
    console.log(response);
    // if (response.status === 200) {
    //   loadingInstance.close();
    //   return Promise.resolve(response);
    // } else {
    //   loadingInstance.close();
    //   return Promise.reject(response);
    // }
  },
  error => {
    // 根据响应的状态码进行拦截
    // if (error.response.status) {
    //   switch (error.response.status) {
    //     // 404请求不存在
    //     case 404:
    //       // Toast({
    //       //   message: "网络请求不存在",
    //       //   duration: 1500,
    //       //   forbidClick: true
    //       // });
    //       router.push("/login");
    //       break;
    //     // 其他错误，直接抛出错误提示
    //     default:
    //     // Toast({
    //     //   message: error.response.data.message,
    //     //   duration: 1500,
    //     // });
    //   }
    //   return Promise.reject(error.response);
    // }
  }
);

export default service;
