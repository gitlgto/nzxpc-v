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
        <el-col :span="10">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getUserList">
          <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
        </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible=true">添加用户</el-button>
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
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="editUser(scope.row.id)"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteUser(scope.row.id)"></el-button>
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
    <!--添加用户的对话框-->
    <el-dialog
      title="提示"
      :visible.sync="addDialogVisible"
      width="50%" @close="addDialogClosed">
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="金额" prop="money">
          <el-input v-model="addForm.money"></el-input>
        </el-form-item>
        </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="addDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addUser">确 定</el-button>
  </span>
    </el-dialog>
    <el-dialog
      title="编辑用户"
      :visible.sync="eidtDialogVisible"
      width="50%" @close="editDialogClosed">
      <el-form ref="editFormRef" :model="editForm" :rules="editFormRules" label-width="80px">
        <el-form-item label="编号">
          <el-input v-model="editForm.id" disabled></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="editForm.username"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="eidtDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="editUserInfo">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>
<script>

import utils from '../../assets/js/data'

export default {
  data () {
    var checkUserName = (rule, value, cb) => {
      // 手机号的正则用于测试 自定义验证规则
      var reg = /^1[3456789]\d{9}$/
      if (reg.test(value)) {
        return cb()
      }
      cb(new Error('请输入正确数据'))
    }
    // var checkPassWord=(rule, value, cb) => {}

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
      total: 0,
      // 控制添加对话框的显示与隐藏
      addDialogVisible: false,
      // 添加用户表单数据
      addForm: {username: '', money: ''},
      // 添加表单的验证规则
      addFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 1, max: 11, message: '长度在 1到 11个字符', trigger: 'blur' },
          {validator: checkUserName, trigger: 'blur'}
        ],
        money: [
          { required: true, message: '请输入金额', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      eidtDialogVisible: false,
      // 查询到的用户信息
      editForm: {},
      editFormRules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 1, max: 11, message: '长度在 1到 11 个字符', trigger: 'blur' },
          {validator: checkUserName, trigger: 'blur'}]
      }
    }
  },
  created () {
    this.getUserList()
  },
  methods: {
    async getUserList () {
      const res = utils.getUserLists()
      const ret = utils.getUserOneLists()
      // console.log(res)
      // const {data: ret} = await this.$http.get('/userList',{params: this.queryInfo})
      // console.log(ret)
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      } else if (res.meta.status === 200) {
        // 得用下标取
        this.$message.success(res.meta.msg)
        // 只能采用这种方式实现搜索,只搜索一条数据作为演示
        if ('000'.indexOf(this.queryInfo.query) !== -1 && this.queryInfo.query !== '') {
          this.userList = ret.data[0].users
        } else {
          // res.data[0].users.push({'id': 506, 'username': 'lhh', 'userStatus': true})
          this.userList = res.data[0].users
        }
        this.total = res.data[0].total
        // console.log(res.data[0].users)
      }
    },
    getUserTwoLists () {
      // 该数据用于测试返回的分页数据 第一页 两条每页
      const twoLists = utils.getUserTwoLists()
      // 再获取时在添加一次已达到添加后数据实时显示效果，只用测试可以删掉
      twoLists.data[0].users.push({'id': 506, 'username': 'lhh', 'userStatus': true})
      // console.log(twoLists)
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
      const ok = this.change000Status(userInfo.id, userInfo.userStatus)
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
    },
    addDialogClosed () {
      this.$refs.addFormRef.resetFields()
    },
    // 点击按钮添加新用户
    addUser () {
      this.$refs.addFormRef.validate(async val => {
        // true false
        if (!val) {
          return this.$message.error('数据输入错误')
        } else {
          // console.log(this.addForm.username)
          // const ret = await this.$http.post('addUser', this.addForm) 发送请求
          // 添加成功隐藏对话框
          const twoLists = utils.getUserLists()
          // 实现添加查询删除可以定义数组来实现具体待试验，这是添加，删除是prop 但是有一个问题不能实时获取改变后的数据，因为再次请求还是获取的初始化数据
          // 但可以在获取数据时再添加一次 不加[]加过之后相当于users下标中又多了一个下标
          twoLists.data[0].users.push({'id': this.addForm.id, 'username': this.addForm.username, 'userStatus': true})
          // console.log(twoLists)
          this.addDialogVisible = false
          // 重新获取用户列表
          this.getUserList()
          return this.$message.success('添加成功')
        }
      })
    },
    async editUser (id) {
      // const item = await this.$http.get('getUser/' + id)
      // if (item.meta.status !== 200) {
      //   return this.$message.error('查询失败')
      // }
      // 定义editform 并将获得的值赋到editform 绑定到表单model上
      // this.editForm=item.data
      const ret = utils.getUserLists()
      ret.data[0].users.forEach(item => {
        // console.log(it) 可采用遍历来操作值的添加删除以免写死
        if (item.id === id) {
          this.editForm = {'id': item.id, 'username': item.username}
        }
      })
      this.eidtDialogVisible = true
    },
    editDialogClosed () {
      this.$refs.editFormRef.resetFields()
    },
    editUserInfo () {
      this.$refs.editFormRef.validate(async val => {
        if (!val) {
          return this.$message.error('数据输入错误')
        } else {
          // const ret = await this.$http.put('editUser/' + this.editForm.id, {username: this.editForm.username})
          // this.eidtDialogVisible = false
          // this.getUserList()
          // const ret = utils.getUserLists()
          // console.log(it) 可采用遍历来操作值的添加删除以免写死
          // 修改操作
          this.eidtDialogVisible = false
          return this.$message.success('修改成功')
        }
      })
    },
    async deleteUser (id) {
      const ret = await this.$confirm('确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (ret !== 'confirm') {
        return this.$message.info('取消删除')
      }
      // 删除操作
      // const res= await this.$http.delete('deleteUser/' + id)
      // this.getUserList()
      const userLists = utils.getUserLists()
      userLists.data[0].users.pop()
      this.getUserList()
      this.$message.success('删除成功')
    }
  }

}
</script>
<style lang="less" scoped>

</style>
