<template>
  <div>
    <el-container>
      <el-header style="height: 0px;"></el-header>
      <el-container>
        <el-aside width="100px"></el-aside>
        <el-container>
          <el-main>
            <div class="header">
              <div class="form">
                <el-form :inline="true" :model="formInline" class="demo-form-inline">
                  <el-form-item label=" ">
                    <el-input v-model="formInline.name" size="small" placeholder="任务名称"></el-input>
                  </el-form-item>
                  <el-form-item label="截止日期">
                    <el-date-picker v-model="formInline.date" size="small" type="date" placeholder="选择日期">
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" icon="el-icon-search" @click="onSubmit" size="small">查询</el-button>
                  </el-form-item>
                </el-form>
              </div>
            </div>
            <div class="content">
              <el-table :data="tableData" style="width: 100%; max-width: 1200px;" border :header-cell-style="headerCellStyle" :cell-style="cellStyle">
                <el-table-column
                  type="selection"
                  width="55"
                  header-align="center">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="任务名称"
                  width="200"
                  header-align="center"
                >
                </el-table-column>
                <el-table-column
                  prop="startTime"
                  label="发布时间"
                  sortable
                  width="200"
                  header-align="center"
                >
                </el-table-column>
                <el-table-column
                  prop="stopTime"
                  label="截止时间"
                  sortable
                  width="200"
                  header-align="center"
                >
                </el-table-column>
                <el-table-column
                  prop="type"
                  label="任务类型"
                  width="180"
                  header-align="center"
                  column-key="type"
                  :filters="[{text: '学习', value: '学习'}, {text: '互动', value: '互动'}]"
                  :filter-method="filterHandler"
                >
                </el-table-column>
                <el-table-column
                  prop="award"
                  label="奖励积分"
                  width="180"
                  header-align="center">
                </el-table-column>
                <el-table-column label="操作" width="200" header-align="center">
                  <template slot-scope="scope">
                    <el-button size="mini" type="primary" icon="el-icon-view"  @click="handleSee(scope.$index, scope.row)">查看详情</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-main>
          <el-aside width="30px"> <!-- Right aside -->
            <!-- Right sidebar content goes here -->
          </el-aside>
        </el-container><el-footer></el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { fetchMissions } from '@/api/task'
export default {
  // name: 'List';
  data() {
    return {
      formInline: {
        name: '',
        date: null
      },
      isLoading: true,
      total: 0, // 总记录数
      page: 1, // 页码
      limit: 10, // 每页记录数
      searchObj: {}, // 查询条件
      tableData: [],
      multipleSelection: [],
      mission: {},
      dialogVisible: false
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.isLoading = true;
      // 调用API获取任务数据
      fetchMissions(this.page, this.limit, this.searchObj)
        .then(response => {
          this.tableData = response.data; // 假设返回的直接就是任务列表
          this.isLoading = false;
        })
        .catch(error => {
          console.error('Error fetching missions:', error);
          this.isLoading = false;
        });
    },
    onSubmit() {
      console.log('submit!', this.formInline)
    },
    handleSee(index, row) {
      console.log(index, row)
    },
    headerCellStyle() {
      return {
        color: '#000000' // 设置颜色为黑色
      }
    },
    cellStyle() {
      return {
        textAlign: 'center' // 设置单元格文本居中对齐
      }
    },
    formatter(row, column) {
      return row.address
    },
    filterTag(value, row) {
      return row.tag === value
    },
    filterHandler(value, row, column) {
      const property = column['property']
      return row[property] === value
    }
  }
}
</script>

<style lang="scss">
/* eslint-disable-next-line */
.header{
  background:#ffffff;
  margin-bottom:20px;
  padding:50px;
  .group{
    border:1px solid #666666;
    padding:10px;
  }
}
.content{
  padding:50px;
  background:#ffffff;
}
</style>
