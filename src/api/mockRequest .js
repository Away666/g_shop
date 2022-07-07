import axios from 'axios';
// 引入进度条
import nProgress from 'nprogress';
import "nprogress/nprogress.css"

const request = axios.create({
  baseURL: "/mock",
  timeout: 5000,
})

request.interceptors.request.use(config => {
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