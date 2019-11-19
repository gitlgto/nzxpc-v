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
        <el-table-column type="index"></el-table-column>
        <el-table-column label="编号" prop="id"></el-table-column>
        <el-table-column label="姓名" prop="username"></el-table-column>
        <el-table-column label="状态" prop="userStatus">
          <!--取到当前单元格 .row取到单元格对象对应数组对象-->
          <template slot-scope="scope">
            <!--方法不加括号默认打印的值就是所对应的默认值，加括号要传具体的值，不然是null-->
            <el-switch
              v-model="scope.row.userStatus" @change="changeUserStatus(scope.row)">
            </el-switch>

          </template>
        </el-table-column>
        <!-- width="" 以改变操作栏-->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
            <!-- enterable控制避免提示文字重叠-->
            <el-tooltip class="item" effect="dark" content="添加" placement="top-start" :enterable="false">
              <el-button type="warning" icon="el-icon-plus" size="mini"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页-->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pageNum"
        :page-sizes="[2, 5, 10, 20]"
        :page-size="queryInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
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
        // 当前每页显示多少条数据 是多少页面就会默认选中几条每页
        pageSize: 5,
        // 当前的页数
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
    },
    getUserTwoLists () {
      // 该数据用于测试返回的分页数据 第一页 两条每页
      const twoLists = utils.getUserTwoLists()
      this.userList = twoLists.data[0].users
      this.total = twoLists.data[0].total
    },
    getUserOneLists () {
      const twoLists = utils.getUserOneLists()
      this.userList = twoLists.data[0].users
      this.total = twoLists.data[0].total
    },
    change000Status (id, status) {
      return utils.changeStatus(id, status)
    },
    // 监听pagesize
    handleSizeChange (newSize) {
      if (newSize === 2) {
        this.queryInfo.pageSize = newSize
        this.getUserTwoLists()
      } else {
        // console.log(newSize)
        this.queryInfo.pageSize = newSize
        // console.log(newSize) 几条每页
        this.getUserList()
      }
    },
    handleCurrentChange (newPage) {
      if (newPage === 1 && this.queryInfo.pageSize === 2) {
        this.queryInfo.pageNum = newPage
        this.getUserTwoLists()
      } else if (newPage === 2 && this.queryInfo.pageSize === 5) {
        this.queryInfo.pageNum = newPage
        this.getUserOneLists()
      } else {
        // 监听页码值
        //   console.log(newPage)
        this.queryInfo.pageNum = newPage
        // console.log(newPage)
        // 这边是带着值pagesize和pagenum再次像后台发起请求所以返回数据可以分页
        this.getUserList()
      }
    },
    async changeUserStatus (userInfo) {
      // 用于测试修改000状态
      // const ret = await this.$http.put(`users/${userInfo.id}/changeStatus/${userInfo.userStatus}`)
      const ok = this.change000Status(userInfo.id, userInfo.status)
      if (ok) {
        // 回头整成工具类 另外还选中是因为又重新请求，但没改变
        this.$message.success('更新状态成功')
      } else {
        // 修改失败不改变状态
        userInfo.userStatus = !userInfo.userStatus
        // 放在ifelse中不用加return
        this.$message.error('失败')
      }
      // console.log(userInfo)
    }
  }

}
</script>
<style lang="less" scoped>

</style>
