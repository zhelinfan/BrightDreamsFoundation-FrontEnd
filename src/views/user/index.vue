<template>
  <div class="app-container">
    <!--查询表单-->
    <div class="search-div">
      <el-form label-width="70px" size="small">
        <el-row>
          <el-col :span="24">
            <el-form-item label="登录名">
              <el-input v-model="searchObj.username" style="width: 100%" placeholder="根据用户登录名搜索" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="display:flex">
          <el-button type="primary" icon="el-icon-search" size="mini" :loading="isLoading" @click="fetchData()">搜 索</el-button>
          <el-button icon="el-icon-refresh" size="mini" @click="resetData()">重 置</el-button>
          <el-button type="success" icon="el-icon-plus" size="mini" @click="add()">添 加</el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" @click="batchRemove()">批量删除</el-button>
        </el-row>
      </el-form>
    </div>
    <!-- 表格 -->
    <el-table
      v-loading="isLoading"
      :data="list"
      stripe
      border
      style="width: 100%;margin-top: 10px;"
      @selection-change="handleSelectionChange"
    >

      <el-table-column type="selection" />

      <el-table-column
        label="序号"
        width="70"
        align="center"
      >
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="username" label="用户登录名" />
      <el-table-column prop="realName" label="用户真实名" />
      <el-table-column prop="school" label="学校" />
      <el-table-column prop="clazz" label="班级" />
      <el-table-column prop="age" label="年龄" />
      <el-table-column prop="genderStr" label="性别" />
      <el-table-column prop="createDate" label="创建时间" width="160" sortable />
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <el-button type="warning" icon="el-icon-edit" size="mini" title="修改" @click="edit(scope.row.id)">修 改</el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" title="删除" @click="removeDataById(scope.row.id)">删 除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <el-pagination
      :current-page="page"
      :total="total"
      :page-size="limit"
      style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper"
      @current-change="fetchData"
    />
    <el-dialog title="添加/修改" :visible.sync="dialogVisible" width="40%">
      <el-form ref="dataForm" :model="user" label-width="150px" size="small" style="padding-right: 40px;">
        <el-form-item label="用户名称">
          <el-input v-model="user.username" />
        </el-form-item>
        <el-form-item label="用户初始密码">
          <el-input v-model="user.password" />
        </el-form-item>
        <el-form-item label="角色编码">
          <el-input v-model="user.role" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" icon="el-icon-refresh-right" @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" icon="el-icon-check" size="small" @click="saveOrUpdate()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import api from '@/api/admin/user'
export default {
  name: 'UserList',
  // 定义数据模型
  data() {
    return {
      isLoading: true,
      list: [], // 列表
      total: 0, // 总记录数
      page: 1, // 页码
      limit: 10, // 每页记录数
      searchObj: {}, // 查询条件
      multipleSelection: [], // 批量删除选中的记录列表
      dialogVisible: false,
      user: {},
      saveBtnDisabled: false
    }
  },
  // 页面渲染成功后获取数据
  created() {
    this.fetchData()
  },
  // 定义方法
  methods: {
    fetchData(current = 1) {
      this.page = current
      // 调用api
      api.getPageList(this.page, this.limit, this.searchObj).then(response => {
        this.list = response.data.records
        this.total = response.data.total
        this.isLoading = false
      })
    },
    // 重置表单
    resetData() {
      console.log('重置查询表单')
      this.searchObj = {}
      this.fetchData()
    },
    removeDataById(id) {
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => { // promise
        // 点击确定，远程调用ajax
        return api.removeById(id)
      }).then((response) => {
        this.fetchData(this.page)
        this.$message.success(response.message || '删除成功')
      })
    },
    add() {
      this.dialogVisible = true
    },
    saveOrUpdate() {
      this.saveBtnDisabled = true // 防止表单重复提交
      if (!this.user.id) {
        this.saveData()
      } else {
        this.updateData()
      }
    },
    // 新增
    saveData() {
      api.save(this.user).then(response => {
        this.$message.success(response.message || '操作成功')
        this.dialogVisible = false
        this.fetchData(this.page)
      })
    },
    // 修改
    updateData() {
      api.updateById(this.user).then(response => {
        this.$message.success(response.message || '操作成功')
        this.dialogVisible = false
        this.fetchData(this.page)
      })
    },
    edit(id) {
      this.dialogVisible = true
      this.fetchDataById(id)
    },
    fetchDataById(id) {
      api.getById(id).then(response => {
        this.user = response.data
      })
    },
    // 当多选选项发生变化的时候调用
    handleSelectionChange(selection) {
      this.multipleSelection = selection
    },
    // 批量删除
    batchRemove() {
      if (this.multipleSelection.length === 0) {
        this.$message.warning('请选择要删除的记录！')
        return
      }
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 点击确定，远程调用ajax
        // 遍历selection，将id取出放入id列表
        var idList = []
        this.multipleSelection.forEach(item => {
          idList.push(item.id)
        })
        // 调用api
        return api.batchRemove(idList)
      }).then((response) => {
        this.fetchData()
        this.$message.success(response.message)
      })
    }
  }
}
</script>
