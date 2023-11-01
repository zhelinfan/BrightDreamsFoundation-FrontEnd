<template>
  <div class="app-container">
    <!--查询表单-->
    <div class="search-div">
      <el-form label-width="70px" size="small">
        <el-row>
          <el-col :span="24">
            <el-form-item label="儿童名">
              <el-input v-model="searchObj.realName" style="width: 100%" placeholder="根据儿童名搜索" />
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

      <el-table-column prop="realName" label="儿童名" />
      <el-table-column prop="createDate" label="创建时间" sortable />
      <el-table-column label="操作" width="500" align="center">
        <template slot-scope="scope">
          <el-button icon="el-icon-connection" size="mini" title="查看绑定关系" @click="showBind(scope.row.id)">查看绑定关系</el-button>
          <el-button type="success" icon="el-icon-link" size="mini" title="绑定" plain @click="showUnbind(scope.row.id)">绑 定</el-button>
          <el-button type="warning" icon="el-icon-edit" size="mini" title="修改" plain @click="edit(scope.row.id)">修 改</el-button>
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
        <el-form-item label="儿童真实名">
          <el-input v-model="user.realName" />
        </el-form-item>
        <el-form-item label="儿童登录名">
          <el-input v-model="user.username" />
        </el-form-item>
        <el-form-item label="儿童初始密码">
          <el-input v-model="user.password" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" icon="el-icon-refresh-right" @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" icon="el-icon-check" size="small" @click="saveOrUpdate()">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog :title="'儿童 ' + user.realName + ' ' + titleType" :visible.sync="bindVisible" width="40%">
      <el-table :data="bindList" :empty-text="emptyText" @selection-change="handleSelectionChange">
        <el-table-column type="selection" />
        <el-table-column property="realName" label="志愿者姓名" />
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" icon="el-icon-refresh-right" @click="bindVisible = false; multipleSelection = []">取 消</el-button>
        <el-button v-show="isEditBind" type="primary" icon="el-icon-check" size="small" @click="bind()">确 定</el-button>
        <el-button v-show="!isEditBind" type="danger" icon="el-icon-delete" size="small" @click="unbind()">解 绑</el-button>
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
      searchObj: {
        role: 1
      }, // 查询条件
      multipleSelection: [], // 批量删除选中的记录列表
      dialogVisible: false,
      bindVisible: false,
      isEditBind: false,
      user: {},
      saveBtnDisabled: false,
      bindList: [], // 绑定列表
      titleType: '', // 动态标题
      emptyText: '' // 动态表格内容
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
      this.searchObj = {
        role: 1
      }
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
      this.user.role = 1
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
    },
    // 查看绑定关系
    showBind(id) {
      this.bindVisible = true
      this.isEditBind = false
      this.titleType = '已绑定志愿者列表'
      this.emptyText = '该儿童当前未绑定志愿者！'
      this.fetchDataById(id)
      api.getBind(id, true, true).then(response => {
        this.bindList = response.data
      })
    },
    showUnbind(id) {
      this.bindVisible = true
      this.isEditBind = true
      this.titleType = '未绑定志愿者列表'
      this.emptyText = '该儿童当前已绑定所有志愿者！'
      this.fetchDataById(id)
      api.getBind(id, false, true).then(response => {
        this.bindList = response.data
      })
    },
    bind() {
      if (this.multipleSelection.length === 0) {
        this.$message.warning('请选择要绑定的志愿者！')
        return
      }
      this.$confirm('此操作将绑定关系, 是否继续?', '提示', {
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
        return api.bind(this.user.id, idList, true)
      }).then((response) => {
        this.fetchData()
        this.$message.success(response.message)
        this.bindVisible = false
      })
    },
    unbind() {
      if (this.multipleSelection.length === 0) {
        this.$message.warning('请选择要解绑的志愿者！')
        return
      }
      this.$confirm('此操作将解绑关系, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'danger'
      }).then(() => {
        // 点击确定，远程调用ajax
        // 遍历selection，将id取出放入id列表
        var idList = []
        this.multipleSelection.forEach(item => {
          idList.push(item.id)
        })
        // 调用api
        return api.unbind(this.user.id, idList, true)
      }).then((response) => {
        this.fetchData()
        this.$message.success(response.message)
        this.bindVisible = false
      })
    }
  }
}
</script>
