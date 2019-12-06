import { MessageBox } from 'mint-ui'
import Router from '@/router/index'
var util = {
  // 目前使用没问题
  Msg: function (msg) {
    MessageBox.alert(msg)
  },
  Redirect: function () {
    // 手机版和页面版的提示
    this.$alert('会话过期，请重新登录', '提示', {
      confirmButtonText: '确定',
      showClose: false,
      callback: action => {
        // this.$message({
        //   type: 'info',
        //   message: `action: ${ action }`
        // }); 两者区别
        Router.push({path: '/home'})
        // this.$router.push('/home')
      }
    })
  },
  Err: function (msg) {
    // this.$messagebox.alert('aaaaa')
    // this.$msgbox('1',1000)
    this.$message.error(msg)
  },
  Success: function (msg) {
    this.$message.success(msg)
  },
  SessionStorageClear: function () {
    // sessionStorage.clear()
    window.sessionStorage.clear()
    // this.sessionStorage.clear()
  },
  LocalStorageClear: function () {
    window.localStorage.clear()
  },
  Clear: function () {
    window.localStorage.clear()
    window.sessionStorage.clear()
  },
  Push: function (url) {
    this.$router.push(url)
  },
  /**
   * @return {boolean}
   */
  isPathSame: function (path) {
    return this.$route.path === path
  },
  Post: function (map) {
    // TODO 实现思路会存在多个字段数据，是用map映射，还是用一个字符串切割1.整个字符串加数据2.采用map传值，先试用map 有两种遍历方法
    // map.forEach(function (value,index) {
    //   console.log(index+value)
    // })
    // this.$http.post('',{
    // })
    var m = {}
    console.log(map.entries())
    for (let [index, val] of map.entries()) {
      m[index] = val
      console.log(index + val)
    }
    // TODO 暂时先封装一半请求，剩下看能否再优化下，还包括get请求post无参请求
    console.log(m)
    let post = this.$http.post('http://localhost:6078/fhHome/login', m)
    return post
    // post.then(res => {
    //   console.log(res)
    //   console.log(11111)
    // })
  },
  getMap: function () {
    return new Map()
  },
  Validate: function () {

  }
}

const WebUtil = {
  install: function (Vue, options) {
    for (var key in util) {
      Vue.prototype[key] = util[key]
    }
  }
}
export default WebUtil
