// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// 东西的使用都需要在这边导入，包括样式
// 注：element （表单组件）的导入和视频不一样，而需要导入依赖，然后在这边引入element-ui和index.css。这样才会显示样式
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
import './assets/css/global.css'
import ElementUI from 'element-ui'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import 'element-ui/lib/theme-chalk/index.css'
// import './assets/js/data.js'
import MyPlugin from './api/MyPlugin.js'
import WebUtil from './api/WebUtil.js'
// import axios from 'axios'
import axios from './api/http.js'
// import socket from './api/socket.js'
import { Indicator , Toast, MessageBox } from 'mint-ui'
import Router from '@/router/index'
// 不生效
// axios.defaults.baseURI = 'http://localhost:6078/'
// 请求拦截器预处理 保证拥有获取数据的权限 除了登录后续的每次请求都会带过去token
// axios.interceptors.request.use(config => {
//   // config.headers.Authorization = window.sessionStorage.getItem('token')
//   console.log(config)
//   return config
// })
// 只能实现在发送请求时失败时提示会话过期。如何解决一个页面退出后，新页面打开时提示会话过期还有新页面直接访问会成功
// 全局组件
Vue.prototype.$http = axios
Vue.use(MyPlugin)
Vue.use(ElementUI)
Vue.use(MintUI)
Vue.use(WebUtil)
// Vue.use(socket)

// var url = window.location.href;
// var httpUrl;
// if ((/^https/).test(url)) {
//   httpUrl = 'https://' + window.domain
// } else {
//   httpUrl = 'http://' + window.domain
// }
// console.log(window.domain)
// store.state.httpUrl = httpUrl
// axios.defaults.baseURL = httpUrl

// axios.defaults.baseURL = 'http://localhost:6078/'
Vue.config.productionTip = false

/* eslint-disable no-new */

// 放在之后能解决首次拦截问题，但刷新有问题  结合token解决刷新和初次访问页面，但还要看看刷新问题
console.log(router)
// 每个路由访问前的操作
router.beforeEach((to, from, next) => {
  console.log(1111111111111111)
  // 暂定这样处理，如果session中还有user则关闭页面时，下次登录直接进入到主页，
  if (localStorage.getItem('token') && to.path === '/login') {
    return next('/home')
  }

  // console.log(to.meta.requireAuth)
  if (to.meta.requireAuth) {
    var user = Vue.prototype['getCookie']('uName')
    var paw = Vue.prototype['getCookie']('pwd')
    // console.log(from.path)// 从哪个路由离开
    // console.log(to.path)// 进入到哪个路由去
    // 第一次token为false ，是怎么解决  另外如果cookie存在用户信息，直接跳转   用sessionstorge新打开新页面存储数据为空，也就不能实现如果已经登录然后直接访问主页面不能跳转，还是使用cookie控制
    // 第一种情况只要有一个页面退出，另一个新打开页面会话过期。第二种情况第一个页面退出，新打开访问其他页面也会提示会话过期
    // 解决办法，如果单纯的直接访问某个页面时，利用created周期函数访问服务器，此时是访问不了的。所以会会话过期。另外还是得弄清钩子函数第一次不生效原因
    // console.log(store.state.token) 把token换成user。如果已登录则存储user，退出清除user，如果不退出直接关闭窗口，如果user还在则下次直接进到主页，另外加页面不操作刷新失效
    // 要不就优化成只用cookie数据，不用state.token
    if ((user && paw && store.state.token) || localStorage.getItem('token')) {
      console.log(user)
      console.log(paw)
      // console.log(store.state.token)
      console.log(22222222)
      next()
    } else {
      // TODO 有个问题需要处理，直接进入main，会话过期，再进去就会多个main，报错
      next()
      // TODO 处理方式，初始化一次，后期再优化
      store.state.openTab = []
      store.state.activeIndex = '/main'

      MessageBox.alert('会话过期,请重新登录').then(action => {
        Router.push({path: '/login'})
      })
      console.log(33333)
      // router.push('/login');
      // TODO 是不是先进到这个页面再回到登录,在会话过期之前加上next()
      // next('/login')
    }
  } else {
    console.log(444444)
    next()
  }
})
window.vv = new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})
