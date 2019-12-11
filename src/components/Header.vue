<template>
  <el-header>
    <div>
      <img src="../assets/bltnmf.png" alt="" width="50" height="50">
      <span>后台管理系统vue版</span>
    </div>
    <el-button type="info" @click="loginOut">退出</el-button>
  </el-header>
</template>

<script>
export default {
  name: 'navTop',
  methods: {
    loginOut () {
      this.$store.commit('changeToken',false)
      console.log(this.$store.state.token)
      // this.$router.push('/login')
      var that = this
      this.$store.state.openTab = []
      this.$store.state.activeIndex = '/main'
      // // that.socket(true)
      setTimeout(function () {
        that.setCookie('uName', '', -1)
        that.setCookie('pwd', '', -1)
        // that.$store.commit('changeToken', false)
        // window.sessionStorage.clear()
        window.localStorage.clear()
        window.sessionStorage.clear()
        that.$router.push('/login')
      }, 500)
    }
  }
}
</script>

<style scoped lang="less">
  /*.header{*/
  /*background-color: rgb(85, 201, 236);*/
  /*height: 40px;*/
  /*}*/
  /*h1{*/
  /*margin: 0;*/
  /*}*/

  .el-header{
    background-color: burlywood;
    // 贴边显示
    display: flex;
    justify-content: space-between;
    // 清空左侧空白
    padding-left: 0;
    // 按钮不贴边
    align-items: center;
    color: #fff;
    >div{
      display: flex;
      align-items: flex-end;
      span{margin-left: 5px}
    }
  }
</style>
