import Vue from 'vue'
import Router from 'vue-router'

// 导入组件  将页面在这里导入，这样才能访问 不引入页面只填访问路径 只有空白页
// import login from '@/components/login'
// import home from '@/components/home'
// import main from '@/components/main'
// import userList from '@/components/user/userList'

// 已解决element-ui 连续点击一个url而报错的问题
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
const login = resolve => require(['../components/login.vue'], resolve);
const home = resolve => require(['../components/home.vue'], resolve);
const main = resolve => require(['../components/main.vue'], resolve);
const userList = resolve => require(['../components/user/userList.vue'], resolve);

Vue.use(Router)
const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login',
      component: login
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/home',
      name: 'home',
      meta: {
        requireAuth: true
      },
      component: home,
      // redirect: '/main',
      children: [{path: '/main',
        meta: {
          requireAuth: true
        },
        component: main}, {path: '/userList',
        meta: {
          requireAuth: true
        },
        component: userList}]

    }
  ]
})
// 挂载路由导航守卫
// to将要访问的路径 from从哪个路径跳转而来 next函数表示放行next() next('/login') 还可以加过期时间
// rout.beforeEach((to, from, next) => {
//   if (to.path === '/login') return next()
//   // 获取token 失效 则重定向到登录页 页面过期
//   const token = window.sessionStorage.getItem('token')
//   if (!token) return next('/login')
//   next()
// })
export default router
