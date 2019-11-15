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
      <el-aside width="200px">
        <el-menu
          background-color="coral"
          text-color="#fff"
          active-text-color="#ffd04b">
          <!--一级菜单-->
          <el-submenu index="1">
            <!--一级菜单的模版区域-->
            <template slot="title">
              <!--图标-->
              <i class="el-icon-location"></i>
              <!--文本-->
              <span>导航一</span>
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
            <el-menu-item index="1-4-1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>导航一</span>
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

        <el-main>Main
        </el-main>

        <el-footer>Footer
        </el-footer>

      </el-container>
    </el-container>
  </el-container>
</template>
<script>
export default {
  data () {
    return {
      menulist: []
    }
  },
  // 生命周期函数
  created () {
    this.getMenuList()
  },
  methods: {
    loginOut () {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    // 获取所有菜单
    async getMenuList () {
      // 直接这样写可以访问到接口
      // const {data: ret} = await this.$http.get('http://localhost:6078/login')
      // if (ret.meta.status !== 200) return this.$message.error('')
      // console.log(ret)
      const {data: res, meta: ret} = {
        'meta': {'msg': '成功', 'status': 200},
        'data': [
          {
            'id': 101,
            'authName': '商品管理',
            'path': null,
            'children': [
              {
                'id': 103,
                'authName': '商品列表',
                'path': null,
                'children': []
              }
            ]
          },
          {
            'id': 102,
            'authName': '资产管理',
            'path': null,
            'children': [
              {
                'id': 104,
                'authName': '资产列表',
                'path': null,
                'children': []
              }
            ]
          },
          {
            'msg': '获取菜单成功',
            'status': 200
          }
        ]
      }
      if (ret.status === 200) return this.$message.success(ret.msg)
      console.log(res)
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
</style>
