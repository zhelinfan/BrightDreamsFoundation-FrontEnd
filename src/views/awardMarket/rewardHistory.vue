<template>
 <div class="container">
   <div class="main">
     <div class="work-main">
       <div class="left">
         <div class="item">
           <div class="header">
             <span>123</span>
           </div>
           <div class="body">
             <el-table
               :data="tableData"
               style="width: 50%"
               :row-class-name="tableRowClassName">
               <el-table-column
                 prop="desc"
                 label="描述"
                 width="250">
               </el-table-column>
               <el-table-column
                 prop="time"
                 label="收支时间"
                 width="260">
               </el-table-column>
               <el-table-column
                 prop="reward"
                 label="积分"
                 width="250">
               </el-table-column>
             </el-table>
           </div>
         </div>
       </div>
     </div>
   </div>
 </div>
</template>

<script>
export default {
  name: 'RewardHistory',
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return 'warning-row'
      } else if (rowIndex === 3) {
        return 'success-row'
      }
      return ''
    }
  },
  data() {
    return {
      tableData: [{
        desc: '默写静夜思',
        time: '2023-11-7',
        reward: '+3'
      }, {
        desc: '视频聊天',
        time: '2023-11-7',
        reward: '+5'
      }, {
        desc: '八法五步练习',
        time: '2023-11-7',
        reward: '+5'
      }, {
        desc: '自动铅笔',
        time: '2023-11-7',
        reward: '-10'
      }]
    }
  }
}
</script>

<style scoped>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>
