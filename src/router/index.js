import Vue from 'vue'
import Router from 'vue-router'

// 导入组件  将页面在这里导入，这样才能访问
import login from '@/components/login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: login
    }
  ]
})
