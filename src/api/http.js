import axios from 'axios'
import qs from 'qs'
import { Indicator , Toast, MessageBox } from 'mint-ui'
import Router from '@/router/index'

// import Vue from 'vue'
// axios.defaults.headers.common['Authorization'] = "AUTH_TOKEN";
axios.defaults.timeout = 16000
axios.defaults.withCredentials = true
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

// post传参序列化
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  if (config.method === 'post') {
    if (config.data.constructor === FormData) {
      // axios.defaults.withCredentials=true;
    } else {
      config.data = qs.stringify(config.data)
    }
  }
  return config
}, function (error) {
  console.log(error)
  // Do something with request error
  return Promise.reject(error)
})

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // console.log("http >>> ",config);
  return config
}, function (error) {
  console.log(error)
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    if (!error.response) {
      console.log(error.response)
      // 访问不到接口会报这个 服务端断开连接.如果一访问某个页面，就发起请求后台，然后失败是不是就可以达到会话过期。另外第一次钩子失效（用会话过期处理）。
      // 但是如果一个退出另一个新打开的也会退出是怎样的?能不能清除对应数据，这样周期函数就没有数据了。  如果返回数据不为空就可以直接访问页面 如果数据不为空会不会显示
      MessageBox.alert('会话过期,请重新登录').then(action => {
        Router.push({path: '/login'})
      })
    }
    // return Promise.reject(error.response)
  }
)

export default axios
