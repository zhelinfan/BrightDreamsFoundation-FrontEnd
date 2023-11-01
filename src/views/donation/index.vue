<template>
    <div class="app-container">
      <!--查询表单-->
        <div class="search-div">
            <el-form label-width="70px" size="small">
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="流水号">
                            <el-input style="width: 100%" v-model="searchObj.donationId" placeholder="根据捐赠流水号搜索"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row style="display:flex">
                    <el-button type="primary" icon="el-icon-search" size="mini" :loading="isLoading" @click="fetchData()">搜 索</el-button>
                    <el-button icon="el-icon-refresh" size="mini" @click="resetData()">重 置</el-button>
                </el-row>
            </el-form>
        </div>
        <el-table
        v-loading="isLoading"
        :data="tableData"
        stripe
        style="width: 100%;margin-top: 10px;">
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
        :current-page="page"
        :total="total"
        :page-size="limit"
        style="padding: 30px 0; text-align: center;"
        layout="total, prev, pager, next, jumper"
        @current-change="fetchData"/>
    </div>
</template>

<script>
  import api from '@/api/donation/donation'
  export default {
    name: 'DonationList',
    // 定义数据模型
    data() {
        return {
            isLoading: true,
            total: 0, // 总记录数
            page: 1, // 页码
            limit: 10, // 每页记录数
            searchObj: {}, // 查询条件
            tableData: []
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
                this.tableData = response.data.records
                this.total = response.data.total
                this.isLoading = false
            })
        },
        // 重置表单
        resetData() {
            this.searchObj = {}
            this.fetchData()
        },
    }
  }
</script>
  
<style>
.demo-table-expand {
    font-size: 0;
}
.demo-table-expand label {
    width: 200px;
    color: #99a9bf;
}
.demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
}
</style>