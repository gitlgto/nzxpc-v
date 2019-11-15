// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// 东西的使用都需要在这边导入，包括样式
// 注：element （表单组件）的导入和视频不一样，而需要导入依赖，然后在这边引入element-ui和index.css。这样才会显示样式
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/css/global.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import axios from 'axios'

// 不生效
// axios.defaults.baseURI = 'http://localhost:6078/'
// 请求拦截器预处理 保证拥有获取数据的权限 除了登录后续的每次请求都会带过去token
axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('token')
  console.log(config)
  return config
})

Vue.prototype.$http = axios

Vue.use(ElementUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
