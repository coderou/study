import axios from "axios";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
// 错误信息对象
const errorMessages = {
  401: "未授权",
  403: "进制访问",
  404: "资源找不到,请检查地址",
  500: "服务器错误",
};
// 1.创建axios请求实例
const request = axios.create({
  baseURL: "/api",
  timeout: 100000,
});
// 2.使用axios请求拦截器
request.interceptors.request.use((config) => {
  NProgress.start(); // 进度条开始
  return config;
});
// 3.使用axios响应拦截器
request.interceptors.response.use(
  // 响应成功
  (response) => {
    NProgress.done(); // 进度条结束

    if (response.data.code === 200) {
      return response.data.data;
    }
    return Promise.reject(response.data.message || "未知错误");
  },
  // 响应失败
  (error) => {
    NProgress.done(); // 进度条结束

    if (error.response) {
      return Promise.reject(errorMessages[error.response.status]);
    }
    if (error.message.indexOf("Network Error") !== -1) {
      return Promise.reject(new Error("网络连接失败.请链接网络或打开wifi重试"));
    }
    if (error.message.indexOf("timeout") !== -1) {
      return Promise.reject(new Error("网速太慢了,请链接wifi重试"));
    }
    return Promise.reject(new Error("未知错误,请联系管理员解决"));
  },
);

export default request;
