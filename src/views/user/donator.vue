<template>
    <div class="app-container">
    <!--查询表单-->
    <div class="search-div">
      <el-form label-width="70px" size="small">
        <el-row>
          <el-col :span="24">
            <el-form-item label="捐赠者名">
              <el-input style="width: 100%" v-model="searchObj.username" placeholder="根据捐赠者姓名搜索"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="display:flex">
          <el-button type="primary" icon="el-icon-search" size="mini" :loading="isLoading" @click="fetchData()">搜 索</el-button>
          <el-button icon="el-icon-refresh" size="mini" @click="resetData()">重 置</el-button>
          <el-button type="success" icon="el-icon-plus" size="mini" @click="add()">添 加</el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" @click="batchRemove()" >批量删除</el-button>
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
      @selection-change="handleSelectionChange">

      <el-table-column type="selection"/>

      <el-table-column
        label="序号"
        width="70"
        align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="realName" label="捐赠者名" />
      <el-table-column prop="createDate" label="创建时间" sortable/>
      <el-table-column label="操作" width="400" align="center">
        <template slot-scope="scope">
          <el-button icon="el-icon-edit" size="mini" @click="showDonation(scope.row.id)" title="查看捐赠流水" plain>查看捐赠流水</el-button>
          <el-button type="warning" icon="el-icon-edit" size="mini" @click="edit(scope.row.id)" title="修改" plain>修 改</el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeDataById(scope.row.id)" title="删除">删 除</el-button>
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
        @current-change="fetchData"/>
    <el-dialog title="添加/修改" :visible.sync="dialogVisible" width="40%" >
      <el-form ref="dataForm" :model="user" label-width="150px" size="small" style="padding-right: 40px;">
        <el-form-item label="捐赠者登录名">
          <el-input v-model="user.username"/>
        </el-form-item>
        <el-form-item label="捐赠者初始密码">
          <el-input v-model="user.password"/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small" icon="el-icon-refresh-right">取 消</el-button>
        <el-button type="primary" icon="el-icon-check" @click="saveOrUpdate()" size="small">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="捐赠流水" :visible.sync="donationVisible" width="80%" >
      <el-table
        v-loading="isLoading"
        :data="donationList"
        stripe
        style="width: 100%;">
        <el-table-column type="expand">
        <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="捐赠物品">
                <span>{{ props.row.donationItem }}</span>
            </el-form-item>
            <el-form-item label="捐赠物品接受者 / 单位">
                <span>{{ props.row.donateAccept }}</span>
            </el-form-item>
            <el-form-item label="捐赠物始发位置">
                <span>{{ props.row.sendLocation }}</span>
            </el-form-item>
            <el-form-item label="捐赠物当前位置">
                <span>{{ props.row.currentLocation }}</span>
            </el-form-item>
            <el-form-item label="捐赠物终到位置">
                <span>{{ props.row.acceptLocation }}</span>
            </el-form-item>
            <el-form-item label="预计到达日期">
                <span>{{ props.row.estArriveTime }}</span>
            </el-form-item>
            <el-form-item label="捐赠详细描述">
                <span>{{ props.row.donateDescription }}</span>
            </el-form-item>
            </el-form>
        </template>
        </el-table-column>
        <el-table-column
        label="流水号"
        prop="donationId">
        </el-table-column>
        <el-table-column
        label="捐赠人"
        prop="donator">
        </el-table-column>
        <el-table-column
        label="简短描述">
          <template slot-scope="scope">{{scope.row.donateDescription.substring(0,7).concat('...')}}</template>
        </el-table-column>
        </el-table>
        <el-pagination
        :current-page="donationPage"
        :total="donationTotal"
        :page-size="donationLimit"
        style="padding: 30px 0; text-align: center;"
        layout="total, prev, pager, next, jumper"
        @current-change="showDonationPage"/>
    </el-dialog>
  </div>
  </template>

  <script>
  import api from '@/api/admin/user'
  import donationApi from '@/api/donation/donation'
  export default {
    // 定义数据模型
    data() {
        return {
            isLoading: true,
            list: [], // 列表
            total: 0, // 总记录数
            page: 1, // 页码
            limit: 10, // 每页记录数
            searchObj: {
              role: 3
            }, // 查询条件
            multipleSelection: [], // 批量删除选中的记录列表
            dialogVisible: false,
            user: {},
            saveBtnDisabled: false,
            donationVisible: false,
            donationList: [],
            donationTotal: 0,
            donationPage: 1,
            donationLimit: 5,
            donationSearchObj: {},
            userId: 0
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
              role: 3
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
        add(){
            this.dialogVisible = true
        },
        saveOrUpdate() {
            this.saveBtnDisabled = true // 防止表单重复提交
            if (!this.user.id) {
                this.saveData()
            } else {
                this.updateData()
            }
            this.user = {}
        },
        // 新增
        saveData() {
          this.user.role = 3
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
        showDonation(id) {
          this.donationVisible = true
          this.userId = id
          this.showDonationPage()
        },
        showDonationPage(current = 1) {
          this.donationPage = current
          this.donationSearchObj.donatorId = this.userId
          donationApi.getPageList(this.donationPage, this.donationLimit, this.donationSearchObj).then(response => {
            this.donationList = response.data.records
            this.donationTotal = response.data.total
            this.isLoading = false
          })
        }
    }
  }
  </script>

<style>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 160px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>