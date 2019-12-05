import { Toast, Indicator } from 'mint-ui'

var mts = {
  // 去除字符串和数字首尾的空格
  hfWhite: function (str) {
    if (typeof (str) === 'string' || typeof (str) === 'number') {
      return str.toString().replace(/(^\s*)|(\s*$)/g, '')
    } else {
      return str
    }
  },
  setCookie: function (name, value, expiredays) {
    var exdate = new Date()
    exdate.setMinutes(exdate.getMinutes() + expiredays)
    // console.log(exdate.setMinutes(exdate.getMinutes()+expiredays));
    // console.log(exdate);
    // console.log(exdate.toGMTString());
    document.cookie = name + '=' + escape(value) + ((expiredays == null) ? '' : ';expires=' + exdate.toUTCString())
  },
  getCookie: function (name) {
    if (document.cookie.length > 0) {
      var start = document.cookie.indexOf(name + '=')
      if (start !== -1) {
        start = start + name.length + 1
        var end = document.cookie.indexOf(';', start)
        if (end === -1) end = document.cookie.length
        return unescape(document.cookie.substring(start, end))
      }
    }
    return ''
  },
  goLogins: function (m) {
    var that = this
    // Indicator.open();
    // var enU=that.base64.encode(u)
    // var enP=that.base64.encode(p);
    that.setCookie('uName', '000', 480)// 存用户名，和密码，保存1个小时
    that.setCookie('pwd', 'aaaaaa', 480)
    localStorage.setItem('user', '000')
    that.$store.commit('changeToken', true)
    console.log(this.$store.state.token)
    // that.socket();
    // that.$router.push('/home')
    // 用于自动登录
    if (m) {
      if (that.$route.path === '/login') {
        that.$router.push('/home')
      }
    } else {
      that.$router.push('/home')
    }
  },
  // 登录
  Glogin: function (u, p, m) {
    var that = this
    console.log('这是登录')
    u = that.hfWhite(u)
    p = that.hfWhite(p)
    Indicator.open()
    console.log(u, p)
    that.$http.post('/fhApHome/login', {
      userName: u,
      password: p
    }).then(res => {
      console.log('登录接口')
      console.log(m)
      Indicator.close()
      console.log(res)
      if (res.data.ok) {
        var enU = that.base64.encode(u)
        var enP = that.base64.encode(p)
        that.setCookie('uName', enU, 480)// 存用户名，和密码，保存1个小时
        that.setCookie('pwd', enP, 480)
        localStorage.setItem('user', u)
        if (res.data.code === '0') {
          console.log('code=0,登录成功')
          that.$store.commit('changeToken', true)
          console.log(res.data.registerId)
          that.$store.commit('changerefId', res.data.registerId)
          that.$store.commit('changeUsdtAddr', res.data.usdtAddr)
          console.log('查看token的状态');
          console.log(this.$store.state.token)
          that.socket()
          if (m) {
            if (that.$route.path === '/login') {
              that.$router.push('/index')
            }
          } else {
            that.$router.push('/index')
          }
        }
        if (res.data.code === '1') {
          console.log('code=1,需要手机号验证')
          that.$router.push('/firstLogin')
        }
        if (res.data.code === '2') {
          console.log('code=2')
          console.log('code=1,首次登录需要改密码')
          that.$router.push('/firstPwd')
        }
      } else {
        console.log(res.data.msg)
        if (m) {

        } else {
          that.$store.commit('changeLoginErrorFlag', true)
          that.$store.commit('changeLoginError', res.data.msg)
        }
      }
    })
  }
}
// 目的将方法挂载到全局变量中，以便于在别的页面中使用，就不会出现找不到的情况，这样一来可以写出工具类，引用一次框架
const MyPlugin = {
  install: function (Vue, options) {
    for (var key in mts) {
      Vue.prototype[key] = mts[key]
    }
  }
}
export default MyPlugin
