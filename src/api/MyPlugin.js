import { Toast } from 'mint-ui'
import { Indicator } from 'mint-ui'
var mts = {
  // 去除字符串和数字首尾的空格
  hfWhite: function (str) {
    if (typeof (str) === 'string' || typeof (str) === 'number') {
      return str.toString().replace(/(^\s*)|(\s*$)/g, '')
    } else {
      return str
    }
  },
  setCookie: function(c_name, value, expiredays) {
    var exdate = new Date();
    exdate.setMinutes(exdate.getMinutes() + expiredays)
    // console.log(exdate.setMinutes(exdate.getMinutes()+expiredays));
    // console.log(exdate);
    // console.log(exdate.toGMTString());
    document.cookie=c_name + '=' + escape(value) + ((expiredays == null) ? '' : ';expires=' + exdate.toUTCString())
  },
  getCookie: function (c_name) {
    if (document.cookie.length > 0) {
      var c_start=document.cookie.indexOf(c_name + '=')
      if (c_start !== -1){
        c_start=c_start + c_name.length + 1
        var c_end=document.cookie.indexOf(';', c_start)
        if (c_end==-1) c_end=document.cookie.length
        return unescape(document.cookie.substring(c_start,c_end))
      }
    }
    return ""
  },
  goLogins: function (m) {
    var that = this;
    // Indicator.open();
    // var enU=that.base64.encode(u)
    // var enP=that.base64.encode(p);
    that.setCookie('uName', '000', 480);//存用户名，和密码，保存1个小时
    that.setCookie('pwd', 'aaaaaa', 480);
    localStorage.setItem('user', '000')
    that.$store.commit('changeToken', true);
    console.log(this.$store.state.token)
    // that.socket();
    // that.$router.push('/home')
    // 用于自动登录
    if (m) {
      if (that.$route.path === '/login'){
        that.$router.push('/home');
      }
    } else {
      that.$router.push('/home');
    }
  },
  // 登录
  Glogin: function (u, p, m) {
    var that = this;
    console.log("这是登录");
    u = that.hfWhite(u);
    p = that.hfWhite(p);
    Indicator.open();
    console.log(u, p);
    that.$http.post('/fhApHome/login', {
      userName: u,
      password: p
    }).then(res => {
      console.log('登录接口');
      console.log(m)
      Indicator.close();
      console.log(res);
      if (res.data.ok) {
        var enU=that.base64.encode(u)
        var enP=that.base64.encode(p);
        that.setCookie("uName",enU,480);//存用户名，和密码，保存1个小时
        that.setCookie("pwd",enP,480);
        localStorage.setItem('user', u)
        if (res.data.code == '0') {
          console.log("code=0,登录成功")
          that.$store.commit("changeToken", true);
          console.log(res.data.registerId)
          that.$store.commit("changerefId", res.data.registerId);
          that.$store.commit('changeUsdtAddr', res.data.usdtAddr)
          console.log("查看token的状态");
          console.log(this.$store.state.token)
          that.socket();
          if(m){
            if(that.$route.path=='/login'){
              that.$router.push('/index');
            }
          }else{
            that.$router.push('/index');
          }
        }
        if (res.data.code == '1') {
          console.log("code=1,需要手机号验证");
          that.$router.push('/firstLogin');
        }
        if (res.data.code == '2') {
          console.log("code=2")
          console.log("code=1,首次登录需要改密码");
          that.$router.push('/firstPwd');
        }
      } else {
        console.log(res.data.msg);
        if(m){

        }else{
          that.$store.commit("changeLoginErrorFlag", true);
          that.$store.commit("changeLoginError", res.data.msg);
        }
      }
    })
  }
}
const MyPlugin = {
  install: function (Vue, options) {
    for (var key in mts) {
      Vue.prototype[key] = mts[key]
    }
  }
};
export default MyPlugin
