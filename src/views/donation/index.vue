<template>
    <div class="app-container">
        <el-table
        :data="tableData"
        stripe
        style="width: 100%;margin-top: 10px;">
        <el-table-column type="expand">
        <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="捐赠物品">
                <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="捐赠物品接受者 / 单位">
                <span>{{ props.row.shop }}</span>
            </el-form-item>
            <el-form-item label="捐赠物始发位置">
                <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="捐赠物当前位置">
                <span>{{ props.row.shopId }}</span>
            </el-form-item>
            <el-form-item label="捐赠物终到位置">
                <span>{{ props.row.category }}</span>
            </el-form-item>
            <el-form-item label="预计到达日期">
                <span>{{ props.row.address }}</span>
            </el-form-item>
            <el-form-item label="捐赠物描述">
                <span>{{ props.row.desc }}</span>
            </el-form-item>
            </el-form>
        </template>
        </el-table-column>
        <el-table-column
        label="流水号"
        prop="id">
        </el-table-column>
        <el-table-column
        label="捐赠人"
        prop="name">
        </el-table-column>
        <el-table-column
        label="描述"
        prop="desc">
        </el-table-column>
      </el-table>
    </div>
</template>

<script>
  import api from '@/api/admin/user'
  export default {
    name: 'DonationList',
    // 定义数据模型
    data() {
        return {
            isLoading: true,
            list: [], // 列表
            total: 0, // 总记录数
            page: 1, // 页码
            limit: 10, // 每页记录数
            searchObj: {}, // 查询条件
            tableData: [{
            id: '12987122',
            name: '好滋好味鸡蛋仔',
            category: '江浙小吃、小吃零食',
            desc: '荷兰优质淡奶，奶香浓而不腻',
            address: '上海市普陀区真北路',
            shop: '王小虎夫妻店',
            shopId: '10333'
            }, {
            id: '12987123',
            name: '好滋好味鸡蛋仔',
            category: '江浙小吃、小吃零食',
            desc: '荷兰优质淡奶，奶香浓而不腻',
            address: '上海市普陀区真北路',
            shop: '王小虎夫妻店',
            shopId: '10333'
            }, {
            id: '12987125',
            name: '好滋好味鸡蛋仔',
            category: '江浙小吃、小吃零食',
            desc: '荷兰优质淡奶，奶香浓而不腻',
            address: '上海市普陀区真北路',
            shop: '王小虎夫妻店',
            shopId: '10333'
            }, {
            id: '12987126',
            name: '好滋好味鸡蛋仔',
            category: '江浙小吃、小吃零食',
            desc: '荷兰优质淡奶，奶香浓而不腻',
            address: '上海市普陀区真北路',
            shop: '王小虎夫妻店',
            shopId: '10333'
            }]
        }
    },
    // 页面渲染成功后获取数据
    created() {
        // this.fetchData()
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