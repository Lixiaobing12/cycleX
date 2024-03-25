import axios from "axios";

export const request = axios.create();

request.interceptors.request.use(
  (config) => {
    const accessToken = window.localStorage.getItem("token");
    const token = JSON.parse(accessToken!);
    const { method, params } = config;
    let access_token = typeof token === "object" && token !== null ? token.token : token;

    if (access_token) {
      config.headers["Authorization"] = "Bearer " + access_token;
    }
    // 不缓存get请求
    if (method === "get") {
      config.headers["Cache-Control"] = "no-cache";
    }
    console.log(method);
    // delete请求参数放入body中
    if (method === "delete") {
      config.headers["Content-type"] = "application/json;";
      Object.assign(config, {
        data: params,
        params: {},
      });
    }
    return config;
  },
  (error) => {
    console.error(error);
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);
