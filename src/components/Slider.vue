<template>
  <!--<el-aside :width="isCollapse?'64px':'200px'">-->
  <!--<div class="toggle-button" @click="toggleBtn">|||</div>-->
  <el-menu
    :default-active="$route.path"
    class="slider"
    background-color="coral"
    text-color="#fff"
    active-text-color="#ffd04b"
    router
    unique-opened
  >
    <el-menu-item index="/main" >
      <i class="el-icon-menu"></i>
      <span slot="title">首页</span>
    </el-menu-item>

    <el-submenu v-for="(item,index) in menuList" :key="item.id" :index="item.id+''">
      <template slot="title">
        <i :class="item.icon"></i>
        <span>{{item.title}}</span>
      </template>
      <el-menu-item-group >
        <el-menu-item v-for="child in item.children" :key="child.id" :index="child.index">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>{{child.childtitle}}</span>
          </template>
          <!--{{child.childtitle}}-->
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
  <!--</el-aside>-->
</template>

<script>
export default {
  name: 'Slider',
  data () {
    return {
      // btn: '',
      // isCollapse: false,
      menuList: [
        {
          id: 1,
          title: '导航1',
          icon: 'el-icon-location',
          children: [
            {
              id: 1,
              index: '/page1',
              childtitle: '导航1page1'
            },
            {
              id: 2,
              index: '/page2',
              childtitle: '导航1page2'
            }
          ]
        },
        {
          id: 2,
          title: '导航2',
          icon: 'el-icon-location',
          children: [
            {
              id: 3,
              index: '/page3',
              childtitle: '导航2page3'
            },
            {
              id: 4,
              index: '/page4',
              childtitle: '导航2page4'
            }
          ]
        }
      ]
    }
  },
  created () {
    // this.getMenuList();
    // this.btn = window.sessionStorage.getItem('btn')
  },
  methods: {
    // async getMenuList () {
    // TODO 原因已查明，main.js中默认url不能设置。只能看下面这样写，另外如果post请求，需要带参数，没有就带{}
    // const http = this.$http.get('http://localhost:8095/fhB2bProductCate/list')
    // console.log(http)
    // 简化数据 加awit只能配合{data:ret} 不加返回pramise取不到值  不加{}只能.data 加上就相当于已经是data

    // 之所以请求失败返回null，是因为post请求没带参数，而get请求就可以了
    // const rets = await this.$http.get('http://localhost:6078/home/login')
    // console.log(rets)
    // 直接这样写可以访问到接口
    // const {data: ret} = await this.$http.get('http://localhost:6078/login')
    // if (ret.meta.status !== 200) return this.$message.error('')
    // console.log(ret) const{data: res, meta: ret}
    // 为了手动添加更多的数据，而不造成每个页面都写入大量数据，现在将数据写在一个js中，然后在main.js中进行引入，还要在要使用的页面的script中引入
    // ，而其实main.js中不需要引用，然后在其他页面中的script中直接
    // 调用改js对应方法即可，以达到每个页面都可以获取该数据进行暂时使用。暂不访问后台。如果还是想在页面写数据，只需将js中复制过来即可
    // this.$http.post('home/login', {}).then(res => {
    //   this.menulist = res.data
    // }) 封装方法，js,放在main.js中引用
    //     const ret = utils.getDatas()
    //     if (ret.meta.status !== 200) {
    //   return this.$message.error(ret.meta.msg)
    // } else if (ret.meta.status === 200) {
    //   this.$message.success(ret.meta.msg)
    //   // console.log(res.data)
    //   // console.log(ret)
    //   this.menulist = ret.data
    // }
    // }
    toggleBtn () {
      // this.isCollapse = !this.isCollapse
    },
    saveBtn (btn) {
      // console.log(1111558987)
      // 可使用cookie，token，state
      // if (localStorage.getItem('token')){
      //   const loading = this.$loading({
      //     lock: true,
      //     text: 'Loading',
      //     spinner: 'el-icon-loading',
      //     background: 'rgba(0, 0, 0, 0.7)'
      //   })
      //   setTimeout(() => {
      //     loading.close()
      //   }, 1000)
      // }
      // 使用全屏遮罩和再次访问接口方式达到点击按钮再次请求效果，为啥close不生效。另一种直接刷新整个页面 如果重新访问跳转下页面的话，周期函数也会重新执行

      // Indicator.open()
      // Indicator.open({
      //   text: '加载中...',
      //   spinnerType: 'fading-circle'
      // })
      // setTimeout(()=>{Indicator.close()},1000)
      // Indicator.close()
      // this.getMenuList() 加载完之后再请求一次
      // this.$router.go(0) 此方法重新刷新页面
      // TODO 修改完数据应该重新访问下接口获取新数据，再次点击按钮时也应该再次访问,现在是重新访问下页面
      // this.$router.push(btn)
      // console.log(btn) 这种方法重新访问下，周期函数也会重新执行，这样简单点
      window.sessionStorage.setItem('btn', btn)
      // 重新赋值切换链接保持高亮
      this.btn = btn
    }
  }

}
</script>
<style scoped lang="less">
  /*.slider{*/
  /*height: 100vh;*/
  /*}*/
  .el-aside{
    background-color: coral;
    .el-menu {
      //去除左侧菜单滚轮
      border-right: none;
    }
  }
  /*.el-main{*/
  /*background-color: cornflowerblue;*/
  /*}*/
  /*.el-footer{*/
  /*background-color: fuchsia;*/
  /*}*/
  /*.home_container{*/
  /*!*width: 100%;*!*/
  /*height: 100%;*/
  /*}*/
  .toggle-button{
    background-color: darkturquoise;
    font-size: 15px;
    line-height: 24px;
    color: #fff;
    text-align: center;
    //设置字段间距
    letter-spacing: 0.2em;
    cursor: pointer;
  }
  .el-submenu .el-menu-item{
    min-width: 100px;
  }
  .el-menu-item{
    padding-left: 18px!important;
  }
</style>
