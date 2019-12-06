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
