<template>
  <div id="app" @mousemove="moveEvent" @click="moveEvent">
    <!--路由占位符  其它页面的内容都会在这里显示（login）-->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',

  data () {
    return {
      timmer: null

    }
  },

  methods: {
    moveEvent () {
      const path = ['/login']
      if (!path.includes(this.$route.path)) { // 如果不是登录页面的话页面停止进行30分钟后清空session  30分钟后不操作调往login
        clearTimeout(this.timmer)
        this.init()
      }
    },

    init () {
      this.timmer = setTimeout(() => {
        // 清除session
        localStorage.removeItem('token')
        localStorage.clear()
        // 清除缓存
        // this.$cache.reset()
        // 跳往登录页面
        this.$router.push({
          path: '/login'

        })
      }, 30 * 60 * 1000)// 设置半小时清空session进入屏保
    }
  }
}
</script>

<style>
</style>
