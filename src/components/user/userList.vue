<template>
  <div>
    <!--面包屑导航区域-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>成员管理</el-breadcrumb-item>
      <el-breadcrumb-item>成员列表</el-breadcrumb-item>
      <!--<el-breadcrumb-item>活动详情</el-breadcrumb-item>-->
    </el-breadcrumb>
    <!--卡片试图区域-->
    <el-card>
      <!--<div v-for="o in 4" :key="o" class="text item">-->
        <!--{{'列表内容 ' + o }}-->
      <!--</div>   class="box-card"  gutter实现每一栏的间隔-->
      <el-row :gutter="10">
        <el-col :span="10"><el-input placeholder="请输入内容">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input></el-col>
        <el-col :span="4">
          <el-button type="primary">添加用户</el-button>
        </el-col>
      </el-row>
      <!-- 竖直方向的边框 斑马纹-->
      <el-table :data="userList" border stripe>
        <el-table-column label="编号" prop="id"></el-table-column>
        <el-table-column label="姓名" prop="username"></el-table-column>
        <el-table-column label="状态" prop="mg_state"></el-table-column>
        <el-table-column label="操作"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>

import utils from '../../assets/js/data'

export default {
  data () {
    return {
      // 获取用户列表的参数对象
      queryInfo: {
        query: '',
        pageSize: 2,
        pageNum: 1
      },
      userList: [],
      total: 0
    }
  },
  created () {
    this.getUserList()
  },
  methods: {
    async getUserList () {
      const res = utils.getUserLists()
      // console.log(res)
      // const {data: ret} = await this.$http.get('/userList',{params: this.queryInfo})
      // console.log(ret)
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      } else if (res.meta.status === 200) {
        // 得用下标取
        this.$message.success(res.meta.msg)
        this.userList = res.data[0].users
        this.total = res.data[0].total
        console.log(res.data[0].users)
      }
    }
  }

}
</script>
<style lang="less" scoped>

</style>
