import axios from 'axios';
// 引入进度条
import nProgress from 'nprogress';
import "nprogress/nprogress.css"

import store from '@/store'

const request = axios.create({
  baseURL: "/api",
  timeout: 5000,
  // 跨域请求是否提供凭据信息(cookie、HTTP认证及客户端SSL证明等)
  withCredentials: true
})

request.interceptors.request.use(config => {
  if (store.state.uuid_token) {
    config.headers.userTempId = store.state.uuid_token;
  }
  if (store.state.token) {
    config.headers.token = store.state.token;
  }
  nProgress.start();
  return config
}, err => {
  console.log(err);
})


request.interceptors.response.use(config => {
  nProgress.done()
  return config
}, err => {
  console.log(err);
})


export default request