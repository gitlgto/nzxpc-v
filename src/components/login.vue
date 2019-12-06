<template>
  <div class="login">
    <div class="login_box">
      <div class="avatar_bar">
        <img src="../assets/logo.png" alt="">
      </div>
      <!--ref="form" :model="form"  v-model="form.name"-->
      <el-form ref="loginRef" :model="loginForm" :rules="loginFormRules" class="login_form">
        <!--label="活动名称" label-width="80px"-->
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" placeholder="用户名" prefix-icon="el-icon-user-solid"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" placeholder="密码" prefix-icon="el-icon-s-goods" type="password"></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="loginR">登录</el-button>
          <el-button type="info" @click="rest">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      // 登录表单数据绑定对象
      // TODO 验证也应该简化工具类 是直接判断还是优化验证?
      loginForm: {
        username: '000',
        password: 'aaaaaa'
      },
      loginFormRules: {
        username: [{ required: false, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }]
      }
    }
  },
  methods: {
    rest () {
      // console.log(this)
      this.$refs.loginRef.resetFields()
    },
    loginR () {
      this.$refs.loginRef.validate(async val => {
        // console.log(this.name) 返回验证结果val
        if (!val) {

          // TODO 用于测试
          var zy=[{ required: true, message: '请输入密码', trigger: 'blur' },
            { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }]

          var yz = []
          yz.push({
            aa: '111',
            bb: '222'
          }, {cc: '333'})
          this.Post(this.getMap().set('aa', 1).set('bb', 2)).then(item => {
            console.log(item)
            console.log(11221212121)
          })
          console.log(yz)
          console.log(zy)
          // TODO 用于测试，将写到util后删掉

          // 目前已经引入element，对应方法不需要另引用，只需直接使用加$
          this.$message.error('登陆失败')
        } else {
          // TODO this.$router.push('/home')对于login要不要先进主页再会话过期，但是请求两两次
          // 只有发送才有预处理 返回config 预处理主要存储第一次返回给前端的token，这样在接下来的每次请求中都会带着这个token，
          // 赋值给author属性上，服务端取到这个值在进行觉得是否处理
          // const result = await this.$http.post('home/login', {})
          // console.log(result)
          this.$http.post('http://localhost:6078/fhHome/login', {
            userName: this.loginForm.username,
            passWord: this.loginForm.password
          }).then(res => {
            // 1.后端要配置全局异常参数处理 2.做了修改网站图标的处理
            console.log(res.data)
            if (res.data.ok) {
              // this.menulist = res.data
              localStorage.setItem('token', this.loginForm.username)
              if (this.$route.path === '/login'){
                this.$router.push('/home');
              }
              this.$message.success('登陆成功')
            }
          })

          // 再次点击重新访问
          // localStorage.setItem('token', 1111)
          // var that = this
          // that.goLogins(false)
          // console.log(that.loginForm.username)
          this.$message.success('登陆成功')
          // window.sessionStorage.setItem('token', 98177010213298356078)
        }
      })
    }

  }
}
</script>
<!--scoped 应用单个 而非全局 less该节点支持less语法,报错-->
<style lang="less" scoped>
  .login {
    background-color: aqua;
    height: 100%;
  }

  .login_box {
    width: 450px;
    height: 300px;
    background-color: mediumspringgreen;
    border-radius: 3px;
    /*当使用：top: 50%;left: 50%;， 是以左上角为原点，故不处于中心位置*/
    /*translate(-50%,-50%) 作用是，往上（x轴）,左（y轴）移动自身长宽的 50%，以使其居于中心位置 实现块元素百分比居中position和transform*/
    position: absolute;
    /*top: 35%;*/
    /*left: 38%;*/
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    .avatar_bar {
      /*border: 1px solid rebeccapurple;*/
      width: 130px;
      height: 130px;
      border-radius: 50%;
      padding: 10px;
      /*box-shadow: 0 0 10px #ddd;*/
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);

      img {
        width: 100%;
        height: 100%;
        /*background-color: #eee;*/
      }
    }
  }

  .btns {
    display: flex;
    justify-content: flex-end
  }

  .login_form {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box
  }
</style>
