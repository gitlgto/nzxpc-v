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
const login = resolve => require(['../views/Login.vue'], resolve)
const home = resolve => require(['../views/Home.vue'], resolve)
const main = resolve => require(['../views/main.vue'], resolve)
// const userList = resolve => require(['../components/user/userList.vue'], resolve)
const page1 = resolve => require(['../views/page1.vue'], resolve)
const page2 = resolve => require(['../views/page2.vue'], resolve)
const page3 = resolve => require(['../views/page3.vue'], resolve)
const page4 = resolve => require(['../views/page4.vue'], resolve)

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
      // meta: {
      //   requireAuth: true 给main加上就可以了，因为这边是重定向到main
      // },
      component: home,
      redirect: '/main',
      children: [
        {
          name: 'main',
          path: '/main',
          meta: {
            // 这个地方加上之后，会做会话过期验证，而做会话过期验证会出现多个main的问题，需要处理。
            requireAuth: true
          },
          component: main
        },
        {
          name: 'page1',
          path: '/page1',
          component: page1
        },
        {
          name: 'page2',
          path: '/page2',
          component: page2
        },
        {
          name: 'page3',
          path: '/page3',
          component: page3
        },
        {
          name: 'page4',
          path: '/page4',
          component: page4
        }
      // {path: '/userList',
      //   meta: {
      //     requireAuth: true
      //   },
      //   component: userList}

      ]

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
