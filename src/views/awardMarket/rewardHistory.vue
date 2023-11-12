<template>
  <div class="container">
    <ChildNavbar />
    <div class="main">
      <div class="work-main">
        <div class="item-title">
          <span style="font-weight: bold; font-size: 24px;" class="font-color">积分历史收支记录</span>
        </div>
        <div class="left">
          <div class="item">
            <div class="header">
              <el-dropdown :hide-on-click="false" @command="handleCommand">
                <span class="el-dropdown-link" style="font-size: 15px">
                  时间范围<i class="el-icon-arrow-down el-icon--right" />
                </span>
                <!--               <el-dropdown-menu slot="dropdown" class="el-dropdown-menu">-->
                <el-dropdown-menu slot="dropdown" class="el-dropdown-menu">
                  <el-dropdown-item command="total" :disabled="isOptionDisabled('total')">全部记录</el-dropdown-item>
                  <el-dropdown-item v-for="(item, index) in duration" :key="index" :command="item" :disabled="isOptionDisabled(index)">{{ item }}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <span style="color:  #c1643c">总支出
                <img :src="require('@/assets/personal_images/flower.png')" class="flower">
                {{ total_outcome }}</span>
              <span style="color:  #c1643c; margin-left: -1px">总收入
                <img :src="require('@/assets/personal_images/flower.png')" class="flower">
                {{ total_income }}</span>
            </div>
            <div class="body">
              <el-table
                id="custom-table"
                :data="tableData"
                style="width: 100%"
                :row-style="rowStyle"
                :cell-style="cellStyle"
                :header-cell-style="tableHeaderStyle"
              >
                <el-table-column
                  prop="desc"
                  label="描述"
                  width="242"
                />
                <el-table-column
                  prop="time"
                  label="收支时间"
                  width="242"
                />
                <el-table-column
                  prop="reward"
                  label="积分"
                  width="242"
                />
              </el-table>
            </div>
          </div>
        </div>
        <div class="right">
          <div id="pieChart" class="echart" :style="myChartStyle" />
          <!--          <div ref="pieChart" class="content-inner chart-style" />-->
        </div>
      </div>
    </div>
    <img :src="require('@/assets/market_images/rhbk.jpg')" class="image-transition">
  </div>
</template>

<script>
import ChildNavbar from '@/layout/components/childNavbar.vue'
import api from '@/api/rewardHistory'
import * as echarts from 'echarts'
export default {
  name: 'RewardHistory',
  components: {
    ChildNavbar
  },
  data() {
    return {
      userId: '',
      total_income: '',
      total_outcome: '',
      duration: [],
      disabledOptions: [],
      selectedOption: '',
      tableData: [{
        desc: '',
        time: '',
        reward: '',
        type: ''
      }],
      completeTableData: [{
        desc: '',
        time: '',
        reward: '',
        type: ''
      }],
      completeArray: [],
      pieChart: {},
      pieData: [],
      pieName: [],
      myChartStyle: { width: '102%', height: '95%' }
    }
  },
  mounted() {
    this.userId = this.$route.query.missionId
  },
  created() {
    this.fetchData()
  },
  methods: {
    resetData(array, command) {
      this.disabledOptions = [command]
      if (command === 'total') {
        this.tableData = this.completeTableData
        this.compute(this.tableData)
        this.createCharts()
      } else {
        this.tableData = this.completeTableData.filter(item => item.time.substring(0, 7) === command)
        this.compute(this.tableData)
        this.createCharts()
      }
    },
    compute(table) {
      this.total_outcome = 0
      this.total_income = 0
      let change = 0
      let c = 0
      table.forEach(item => {
        if (item.type === 3) {
          c = Math.abs(Number(item.reward))
          this.total_outcome = Number(this.total_outcome) + Number(c)
        } else {
          // change = item.reward.substring(1)
          change = item.reward
          this.total_income = Number(this.total_income) + Number(change)
        }
      })
    },
    setData(array) {
      this.tableData.pop()
      const monthsSet = new Set()
      let c = 0
      for (let i = 0; i < array.length; i++) {
        const temp = {
          desc: '',
          time: '',
          reward: '',
          type: ''
        }
        temp.desc = array[i].description
        temp.time = array[i].changeDate
        temp.reward = array[i].change
        temp.type = array[i].type
        if (temp.type === 3) {
          // temp.reward = '-' + temp.reward
          c = Math.abs(Number(array[i].change))
          this.total_outcome = Number(this.total_outcome) + Number(c)
        } else {
          // temp.reward = '+' + temp.reward
          this.total_income = Number(this.total_income) + Number(array[i].change)
        }
        const month = array[i].changeDate.substring(0, 7)
        monthsSet.add(month)
        this.tableData.push(temp)
      }
      this.duration = monthsSet
      const returnData = this.tableData
      this.createCharts()
      return returnData
    },
    fetchData(current = 1) {
      this.page = current
      api.getAllHistory(17).then(response => {
        this.completeArray = response.data
        if (response.code === 200) {
          this.completeTableData = this.setData(this.completeArray)
        } else {
          console.error('Error: ' + '加载失败')
        }
      })
    },
    isOptionDisabled(index) {
      return this.disabledOptions.includes(index)
    },
    handleCommand(command) {
      this.resetData(this.tableData, command)
    },
    createCharts() {
      const options = {
        legend: {
          data: ['总收入', '总支出'],
          right: '12%',
          top: '20%',
          orient: 'vertical'
        },
        title: {
          text: '收入支出占比',
          top: '8%',
          left: 'center',
          textStyle: {
            color: '#c0643c' // 设置标题的颜色为红色
          }
        },
        series: [
          {
            type: 'pie',
            label: {
              show: true,
              formatter: function(params) {
                const maxLength = 10 // Set the maximum length for the label
                const label = params.name.length > maxLength ? params.name.substring(0, maxLength) + '...' : params.name
                return label + ' : ' + params.value + ' (' + params.percent + '%)'
              }
            },
            radius: ['45%', '60%'], // 圆环内半径40%，外半径70%
            data: [
              { value: parseInt(this.total_income),
                name: '总收入',
                itemStyle: {
                  color: '#9cdcd0' // 设置总收入的颜色为绿色
                }},
              { value: parseInt(this.total_outcome),
                name: '总支出',
                itemStyle: {
                  color: '#fdc5ba' // 设置总支出的颜色为红色
                }}
            ]
          }
        ]
      }
      this.pieChart = echarts.init(document.getElementById('pieChart'))
      this.pieChart.setOption(options)
      window.addEventListener('resize', () => {
        this.pieChart.resize()
      })
    },
    tableHeaderStyle(column) {
      const headItem = {
        'background-color': '#f8ebd8',
        'color': '#c0643c',
        'border-radius': '16px 0px 0px 16px',
        'border': '1px solid #f8ebd8!important',
        'border-right': 'none',
        'text-align': 'center'
      }
      const midItem = {
        'background-color': '#f8ebd8',
        'color': '#c0643c',
        'border': 'border: 1px solid #f8ebd8!important',
        'border-right': 'none',
        'border-left': 'none',
        'text-align': 'center'
      }
      const endItem = {
        'background-color': '#f8ebd8',
        'color': '#c0643c',
        'border-radius': '0px 16px 16px 0px',
        'border': '1px solid #f8ebd8!important',
        'border-left': 'none',
        'text-align': 'center'
      }
      if (column.columnIndex === 0) {
        return headItem
      } else if (column.columnIndex === 2) {
        return endItem
      } else {
        return midItem
      }
    },
    rowStyle({ row }) {
      const styleRes = {
        'border-radius': '16px',
        'border': '4px solid #FFFFFF!important'
      }
      if (row) {
        styleRes.height = '60px'
        if (row.type === 1) {
          styleRes.background = '#fde0da'
        } else if (row.type === 2) {
          styleRes.background = '#cfeee8'
        } else if (row.type === 3) {
          styleRes.background = '#ffe9c8'
        }
        return styleRes
      }
    },
    cellStyle(column) {
      if (column.columnIndex === 0) {
        return 'color: #0A1832; border-radius: 16px 0px 0px 16px; border: 2px solid #f8ebd8!important; border-right:none; text-align:center'
      } else if (column.columnIndex === 2) {
        return 'color: #0A1832; border-radius: 0px 16px 16px 0px; border: 2px solid #f8ebd8!important; border-left:none; text-align:center'
      } else {
        return 'color: #0A1832; border: 2px solid #f8ebd8!important; border-left:none; border-right:none; text-align:center'
      }
    }
  }
}
</script>

<style scoped>
.flower{
  max-width: 8%;
  height: auto;
}
.image-transition {
  position: absolute; /* 设置绝对定位 */
  top:6%;
  bottom: 0; /* 图片位于底部 */
  left: 0; /* 图片位于左侧，可以根据需要调整位置 */
  z-index: -1; /* 将图片的 z-index 设置为较小的值，确保它位于所有组件的最下方 */
  width: 100%; /* 图片最大宽度为100% */
  height: 110%;
}
.main {
  position: absolute;
  width: 100%;
  height: 100%;
}
.work-main {
  position: absolute;
  display: flex;
  top: 5%;
  left: 3%;
  width: 95%;
  height: 85%;
}
.left {
  /*border: 1px solid #67C23A;*/
  height: 100%;
  width: 55%;
  left: 0%;
  border: 1px solid #f8ebd8;
  border-radius: 15px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
  background-color: transparent;
}
.right {
  position: absolute;
  /*border: 1px solid #f56c6c;*/
  height: 90%;
  width: 48%;
  right: 0%;
  top: 10%;
}
.el-dropdown-link {
  /*border: 1px solid #000000;*/
  cursor: pointer;
  color:  #c1643c;
  margin-right: 170px;
  margin-left: 60px;
}
.el-dropdown-menu {
  margin-right: 80px;
  /*placement:'bottom';*/
}
.el-icon-arrow-down {
  font-size: 12px;
  text-align: right
}
.item{
  position: absolute;
  /*border: 3px solid #f56c6c;*/
  top: 15%;
  left: 1.5%;
}

.item-title {
  position: absolute;
  top: 5%;
  left: 20%;
}
.header {
  background-color: rgb(252, 205, 95, 0.5);
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  /*border: 1px solid #000000;*/
  border-radius: 8px;
  margin-bottom: 10px;
  top: 17%;
  height: 45px;
}
.body {
  /*border: 1px solid #000000;*/
}
.content {
}
.el-table {
  /*border: 1px solid #00fd31;*/
  border-radius: 15px;
  max-height: 400px;
  overflow: auto;
  background-color: transparent;
}
.el-table::-webkit-scrollbar {
  width: 10px; /* 设置滚动条宽度 */
}

.el-table::-webkit-scrollbar-track {
  border-radius: 10px; /* 设置滚动条轨道的圆角 */
  background: #f1f1f1; /* 设置滚动条轨道的背景色 */
}

.el-table::-webkit-scrollbar-thumb {
  border-radius: 10px; /* 设置滚动条的圆角 */
  background: #a9a9a9; /* 设置滚动条的颜色 */
}
.disabled {
  pointer-events: none;
  color: #999;
}
.font-color{
  color: #c1643c;
}
</style>
