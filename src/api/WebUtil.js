import {MessageBox} from 'mint-ui'
var util = {
  // 目前使用没问题
  messageBox: function (msg) {
    MessageBox.alert(msg)
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
