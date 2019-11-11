<template>
  <div class="login">
    <div class="login_box">
      <div class="avatar_bar">
        <img src="../assets/logo.png" alt="">
      </div>
      <!--ref="form" :model="form"  v-model="form.name"-->
      <el-form :model="loginForm" :rules="loginFormRules" class="login_form">
        <!--label="活动名称" label-width="80px"-->
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" placeholder="用户名" prefix-icon="el-icon-user-solid"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" placeholder="密码" prefix-icon="el-icon-s-goods" type="password"></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary">登录</el-button>
          <el-button type="info">重置</el-button>
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
      loginForm: {
        username: 'z',
        password: '123'
      },
      loginFormRules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }]
      }
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
