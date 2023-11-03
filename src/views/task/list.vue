<template>
  <div>
    <div class="header" />
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
    <div class="content" />
    <el-table :data="tableData" style="width: 100%" border :header-cell-style="headerCellStyle" :cell-style="cellStyle">
      <el-table-column
        type="selection"
        width="55"
        header-align="center">
      </el-table-column>
      <el-table-column
        prop="name"
        label="任务名称"
        width="180"
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
        header-align="center">
      </el-table-column>
      <el-table-column
        prop="award"
        label="奖励积分"
        width="180"
        header-align="center">
      </el-table-column>
      <el-table-column label="操作" header-align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" icon="el-icon-view"  @click="handleSee(scope.$index, scope.row)">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  // name: 'List';
  data() {
    return {
      formInline: {
        name: '',
        date: null
      },
      tableData: [{
        name: '默写《静夜思》',
        startTime: '2023-05-01',
        stopTime: '2023-06-20',
        type: '语文',
        award: '5'
      }, {
        name: '默写《静夜思》',
        startTime: '2023-05-02',
        stopTime: '2023-06-21',
        type: '语文',
        award: '5'
      }, {
        name: '默写《静夜思》',
        startTime: '2023-05-03',
        stopTime: '2023-06-22',
        type: '语文',
        award: '5'
      }, {
        name: '默写《静夜思》',
        startTime: '2023-05-04',
        stopTime: '2023-06-23',
        type: '语文',
        award: '5'
      }]
    }
  },
  methods: {
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
    }
  }
}
</script>

<style lang="scss">
/* eslint-disable-next-line */
.header{
  background:#ffffff;
  margin-bottom:20px;
  padding:10px;
  .group{
    border:1px solid #666666;
    padding:10px;
  }
}
.content{
  background:#ffffff;
}
</style>
