import { MessageBox } from 'mint-ui'
var util = {
  // 目前使用没问题
  messageBox: function (msg) {
    MessageBox.alert(msg)
  },
  msgs: function () {
    // 手机版和页面版的提示
    this.$alert('会话过期，请重新登录', '提示', {
      confirmButtonText: '确定',
      showClose: false,
      callback: action => {
        // this.$message({
        //   type: 'info',
        //   message: `action: ${ action }`
        // });
        this.$router.push('/home')
      }
    })
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
