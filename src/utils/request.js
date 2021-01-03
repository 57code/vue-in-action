import axios from "axios";
import { Message, useMsgbox } from "element3";
import store from "/@/store";

// 创建axios实例
const service = axios.create({
  // 在请求地址前面加上baseURL
  baseURL: import.meta.env.VITE_BASE_API,
  // 当发送跨域请求时携带cookie
  // withCredentials: true,
  timeout: 5000,
});

// 请求拦截
service.interceptors.request.use(
  config => {
    // 请求发送之前可以做预处理
    // if (store.getters.token) {
    // // 自定义令牌的字段名为X-Token，根据咱们后台再做修改
    // config.headers["X-Token"] = store.getters.token;
    // }
    config.headers["X-Token"] = import.meta.env.VITE_TOKEN;
    return config;
  },
  error => {
    // 请求错误的统一处理
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data;

    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 20000) {
      Message.error({
        message: res.message || "Error",
        duration: 5 * 1000,
      });

      // 50008: 非法令牌; 50012: 其他客户端已登入; 50014: 令牌过期;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // 重新登录
        useMsgbox()
          .confirm("您已登出, 请重新登录", "确认", {
            confirmButtonText: "重新登录",
            cancelButtonText: "取消",
            type: "warning",
          })
          .then(() => {
            store.dispatch("user/resetToken").then(() => {
              location.reload();
            });
          });
      }
      return Promise.reject(new Error(res.message || "Error"));
    } else {
      return res;
    }
  },
  error => {
    console.log("err" + error); // for debug
    Message({
      message: error.message,
      type: "error",
      duration: 5 * 1000,
    });
    return Promise.reject(error);
  }
);

export default service;
