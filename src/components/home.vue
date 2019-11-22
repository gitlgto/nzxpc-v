<template>
  <el-container class="home_container">
    <el-header>
      <div>
        <img src="../assets/bltnmf.png" alt="" width="50" height="50">
        <span>后台管理系统vue版</span>
      </div>
      <el-button type="info" @click="loginOut">退出</el-button>
    </el-header>

    <el-container>
      <!--只有加冒号 引用的才能生效-->
      <el-aside :width="isCollapse?'64px':'200px'">
        <div class="toggle-button" @click="toggleBtn">|||</div>
        <el-menu
          background-color="coral"
          text-color="#fff"
          active-text-color="#ffd04b" unique-opened :collapse="isCollapse" :collapse-transition="false" :router="true" :default-active="btn">
          <!--一级菜单 是否只打开一个子菜单 是否关闭侧边菜单 是否关闭折叠动画 启动以index为链接地址的导航跳转-->
          <el-submenu :index="item.id+''" v-for="item in menulist" :key="item.id">
            <!--一级菜单的模版区域-->
            <template slot="title">
              <!--图标-->
              <i :class="iconsObj[item.id]"></i>
              <!--文本-->
              <span>{{item.authName}}</span>
            </template>
            <!--<el-menu-item-group>-->
              <!--<template slot="title">分组一</template>-->
              <!--<el-menu-item index="1-1">选项1</el-menu-item>-->
              <!--<el-menu-item index="1-2">选项2</el-menu-item>-->
            <!--</el-menu-item-group>-->
            <!--<el-menu-item-group title="分组2">-->
              <!--<el-menu-item index="1-3">选项3</el-menu-item>-->
            <!--</el-menu-item-group>-->
            <!--<el-submenu index="1-4">-->
              <!--<template slot="title">选项4</template>-->
              <!--<el-menu-item index="1-4-1">选项1</el-menu-item>-->
            <!--</el-submenu>-->

            <!--二级菜单-->
            <el-menu-item :index="'/'+subItem.path" v-for="subItem in item.children" :key="subItem.id" @click="saveBtn('/'+subItem.path)">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{subItem.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <!--<el-menu-item index="2">-->
            <!--<i class="el-icon-menu"></i>-->
            <!--<span slot="title">导航二</span>-->
          <!--</el-menu-item>-->
          <!--<el-menu-item index="3" disabled>-->
            <!--<i class="el-icon-document"></i>-->
            <!--<span slot="title">导航三</span>-->
          <!--</el-menu-item>-->
          <!--<el-menu-item index="4">-->
            <!--<i class="el-icon-setting"></i>-->
            <!--<span slot="title">导航四</span>-->
          <!--</el-menu-item>-->
        </el-menu>
      </el-aside>
      <el-container>
        <!--将页面定位到这个区域 路由占位符-->
        <el-main><router-view></router-view>
        </el-main>

        <el-footer>Footer
        </el-footer>

      </el-container>
    </el-container>
  </el-container>
</template>
<script>
import utils from '../assets/js/data'

export default {
  data () {
    return {
      menulist: [],
      iconsObj: {
        '101': 'el-icon-shopping-cart-full',
        '102': 'el-icon-coin',
        '105': 'el-icon-s-custom',
        '99': 'el-icon-lock'
      },
      isCollapse: false,
      btn: ''
    }
  },
  // 生命周期函数
  created () {
    this.getMenuList()
    this.btn = window.sessionStorage.getItem('btn')
  },
  methods: {
    loginOut () {
      var that = this
      // that.socket(true)
      setTimeout(function () {
        that.setCookie('uName', '', -1)
        that.setCookie('pwd', '', -1)
        that.$store.commit('changeToken', false)
        // window.sessionStorage.clear()
        window.localStorage.clear()
        that.$router.push('/login')
      }, 500)
    },
    // 获取所有菜单
    async getMenuList () {
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
      const ret = utils.getDatas()
      if (ret.meta.status !== 200) {
        return this.$message.error(ret.meta.msg)
      } else if (ret.meta.status === 200) {
        this.$message.success(ret.meta.msg)
        // console.log(res.data)
        // console.log(ret)
        this.menulist = ret.data
      }
    },
    toggleBtn () {
      this.isCollapse = !this.isCollapse
    },
    // 保存链接的激活状态
    saveBtn (btn) {
      window.sessionStorage.setItem('btn', btn)
      // 重新赋值切换链接保持高亮
      this.btn = btn
    }
  }
}
</script>
<style lang="less" scoped>
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
  .el-aside{
    background-color: coral;
    .el-menu {
      //去除左侧菜单滚轮
      border-right: none;
    }
  }
  .el-main{
    background-color: cornflowerblue;
  }
  .el-footer{
    background-color: fuchsia;
  }
  .home_container{
    /*width: 100%;*/
    height: 100%;
  }
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
</style>
