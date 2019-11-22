import {Toast, Indicator, MessageBox} from 'mint-ui'
// import Vue from 'vue'
var mts = {
  socket: function (dis) {
    var _this = this
    console.log(this)
    var lockReconnect = false// 避免重复连接
    var ws
    // var tt
    // var url = _this.$store.state.httpUrl;
    var socketUrl = 'wss://' + 'localhost:6078' + '/ws'
    // if((/^https/).test(url)){
    //   socketUrl='wss://'+window.domains+'/ws';
    // }else{
    //   socketUrl='ws://'+window.domains+'/ws';
    // }
    function createWebSocket (dis) {
      if (dis) {
        console.log(_this.$store.state.ws)
        var disWs = _this.$store.state.ws
        disWs.close()
      } else {
        try {
          ws = new WebSocket(socketUrl)
          console.log('wsssssssss')
          _this.$store.commit('changeWs', ws)
          init()
        } catch (e) {
          console.log('catch')
          reconnect(socketUrl)
        }
      }
    }
    function init () {
      ws.onclose = function (err) {
        console.log('链接关闭')
        reconnect(socketUrl)
      }
      ws.onerror = function(err) {
        console.log('发生异常了')
        reconnect(socketUrl)
      }
      ws.onopen = function () {
        // 心跳检测重置
        console.log('建立链接')
        heartCheck.start()
      }
      ws.onmessage = function (msg) {
        // 拿到任何消息都说明当前连接是正常的
        console.log(msg)
        if (msg) {
          // switch (JSON.parse(msg.data).type) {
          //   case '': {
          //     window.vv.$store.commit('changeToken', true)
          //   } break
          // }
        }
      }
    }
    function reconnect (url) {
      console.log(lockReconnect)
      if (lockReconnect) {
        return
      };
      lockReconnect = true
      createWebSocket()
    }
    // 心跳检测
    var heartCheck = {
      timeout: 1000 * 60 * 5,
      timeoutObj: null,
      serverTimeoutObj: null,
      start: function () {
        console.log('start')
        // var self = this
        this.timeoutObj && clearTimeout(this.timeoutObj)
        this.timeoutObj = setTimeout(function () {
          // 这里发送一个心跳，后端收到后，返回一个心跳消息，
          console.log('Heartbeat')
          console.log(lockReconnect)
          lockReconnect = false
          ws.send('Heartbeat')
        }, this.timeout)
      }
    }
    createWebSocket(dis)
  }
}
const socket = {
  install: function (Vue, options) {
    Vue.prototype.socket = mts.socket
  }
}

export default socket
