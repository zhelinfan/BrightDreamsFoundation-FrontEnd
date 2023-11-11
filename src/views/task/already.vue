<template>
  <div>
    <el-container>
      <ChildNavbar />
      <el-header style="height: 0px;" />
      <el-main>
        <div class="header">
          <!-- 这里是查询和查看任务详情按钮 -->
          <div class="white-box">
<!-- 添加一个包装层 -->
              <div class="center-content"> <!-- 添加一个包装层 -->
                <!-- 这里是查询和查看任务详情按钮 -->
                <el-input v-model="keywords" size="small" placeholder="" class="custom-input-style" />
                <el-button class="custom-button-color" type="warning" icon="el-icon-search" size="small" @click="onSubmit">查询</el-button>
              </div>
          </div>
          <el-form :inline="true" class="demo-form-inline">
            <!-- ... 其他表单元素 ... -->
          </el-form>
        </div>
        <div class="content">
          <el-table :data="tableData" style="width: 90%;" border :header-cell-style="headerCellStyle" :cell-style="cellStyle">
            <el-table-column
              prop="name"
              label="任务名称"
              class="column-name"
              header-align="center"
            />
            <el-table-column
              prop="type"
              label="任务类型"
              class="column-type"
              header-align="center"
              column-key="type"
              :filters="[{text: '学习任务', value: '学习任务'}, {text: '互动任务', value: '互动任务'}]"
              :filter-method="filterHandler"
            />
            <el-table-column
              prop="finishTime"
              label="完成时间"
              class="column-finishTime"
              header-align="center"
              column-key="type"
            />
            <el-table-column
              prop="award"
              label="奖励积分"
              class="column-award"
              header-align="center"
            />
            <el-table-column
              label="操作"
              class="column-action"
              header-align="center"
              @click="taskDetail">
              <template slot-scope="scope">
                <el-button size="mini" class="custom-button-color" type="warning" icon="el-icon-view" @click="handleSee(scope.$index, scope.row)">查看详情</el-button>
              </template>
            </el-table-column>
          </el-table>

        </div>
      </el-main>
    </el-container>
    <img :src="require('@/assets/mission_images/background.jpg')" class="image-transition">
  </div>
</template>

<script>
import api from '@/api/task'
import ChildNavbar from '@/layout/components/childNavbar.vue'
export default {
  // name: "List",
  components: {
    ChildNavbar
  },
  data: function() {
    return {
      userId: {},
      tableData: [{
        id: '',
        name: '',
        finishTime: '',
        typeNum: '',
        type: '',
        award: ''
      }
      ],
      listForm: {},
      formInline: '',
      keywords: ''
    }
  },
  created() {
    this.getCookie()
  },
  methods: {
    typeJudge(number) {
      if (number === 0) {
        return '学习任务'
      } else if (number === 1) {
        return '学习任务'
      } else if (number === 2) {
        return '互动任务'
      } else if (number === 3) {
        return '互动任务'
      }
    },
    setData(array) {
      this.tableData[0].id = array[0].id
      this.tableData[0].name = array[0].mission.missionName
      this.tableData[0].finishTime = array[0].finishDate
      this.tableData[0].type = this.typeJudge(array[0].mission.kind)
      this.tableData[0].typeNum = array[0].kind
      this.tableData[0].award = array[0].mission.reward
      for (let i = 1; i < array.length; i++) {
        const temp = {
          id: '',
          name: '',
          type: '',
          finishTime: '',
          award: ''
        }
        temp.id = array[i].id
        temp.name = array[i].mission.missionName
        temp.finishTime = array[i].finishDate
        temp.type = this.typeJudge(array[i].mission.kind)
        temp.typeNum = array[i].kind
        temp.award = array[i].mission.reward
        this.tableData.push(temp)
      }
    },
    fetchData() {
      api.getCompleteTask(this.userId).then(response => {
        console.log(response.data)
        const code = response.code
        const array = response.data
        if (code === 200) {
          this.setData(array)
        } else {
          console.error('Error: ' + '加载失败')
        }
      })
      // .catch(error => {
      //   console.error('Error fetching missions:', error)
      //   // this.isLoading = false
      // })
    },
    getCookie() {
      const arr = document.cookie.split(';')
      for (let i = 0; i < arr.length; i++) {
        const arr2 = arr[i].split('=')
        if (arr2[0] === 'userInfo' || arr2[0] === ' userInfo') {
          const userinfo = JSON.parse(arr2[1])
          this.userId = userinfo.id
          // return userinfo
          console.log(this.userId)
          this.fetchData()
        }
      }
      return ''
    },
    onSubmit() {
      console.log(this.keywords)
      console.log(this.userId)
      const formData = new FormData()
      formData.append('keywords', this.keywords)
      if (this.keywords === '') {
        this.fetchData()
      } else {
        api.search(formData, this.userId).then(response => {
          // console.log(response.data)
          this.tableData = [{
            id: '',
            name: '',
            finishTime: '',
            typeNum: '',
            type: '',
            award: ''
          }]
          this.setData(response.data)
        })
      }
    },
    handleSee(index, row) {
      console.log(index, row)
      this.$router.push({ path: '/checkSubmission' })
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

<style lang="scss" >
/* eslint-disable-next-line */
.header{
  display: grid;
  place-items: center;
  height: 100%; /* or any desired height */
  background: transparent;
  margin-bottom:0px;
  padding:50px;
  .group{
    border:1px solid #eeeeee;
    padding:10px;
    background: antiquewhite;
  }
}
.content{
  display: grid;
  place-items: center;
  height: 90%; /* or any desired height */
  padding: 20px;
  background: transparent;
  width: 75%; /* 设置宽度为页面宽度的60% */
  margin: 0 auto; /* 添加自动边距以在页面中居中 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* 设置默认的阴影效果 */
  transition: box-shadow 0.3s; /* 添加过渡效果让阴影变化更平滑 */
  border-radius: 15px; /* 四个角变成圆润的 */
}

.content:hover {
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3); /* 当鼠标悬浮时，增加阴影的偏移、模糊度和颜色的透明度 */
}

.white-box {
  background-color: transparent; /* 设置背景颜色为白色 */
  padding: 10px; /* 添加内边距以增加长方形框的大小 */
  border: 1px solid #ccc; /* 添加边框样式，可根据需要调整边框的颜色和宽度 */
  border-radius: 15px; /* 添加圆角以使框看起来更圆滑 */
  display: flex; /* 改为使用flex布局 */
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  width: 80%;
  height: 140px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15); /* 设置默认的阴影效果 */
  transition: box-shadow 0.3s; /* 添加过渡效果让阴影变化更平滑 */
}

.white-box:hover {
  box-shadow: 0px 12px 24px rgba(0, 0, 0, 0.3); /* 当鼠标悬浮时，增加阴影的偏移、模糊度和颜色的透明度 */
}
.center-content {
  position: absolute;
  top: 17%;
  left: 33%;
  height: 9%;
  width: 32%;
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
}
.center-button{
  background-color: transparent;
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  height: 100%; /* 设置高度为100%以充满 .white-box 的高度 */
}
.image-transition {
  position: absolute; /* 设置绝对定位 */
  top:6%;
  bottom: 0; /* 图片位于底部 */
  left: 0; /* 图片位于左侧，可以根据需要调整位置 */
  z-index: -1; /* 将图片的 z-index 设置为较小的值，确保它位于所有组件的最下方 */
  max-width: 100%; /* 图片最大宽度为100% */
  height: auto;
}
.custom-input-style .el-input__inner {
  border: 1px solid #dcdfe6; /* 细边框，淡灰色 */
  border-radius: 4px; /* 轻微的圆角 */
  padding: 10px 15px; /* 舒适的内边距 */
  background-color: #fff; /* 纯白背景 */
  box-shadow: inset 0 1px 1px rgba(0,0,0,0.075); /* 细微的内部阴影，增加深度感 */
  transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out; /* 平滑过渡效果 */
  font-size: 14px; /* 适中的字体大小 */
}

.custom-input-style .el-input__inner:focus {
  border-color: #409eff; /* 聚焦时的边框颜色变为 Element UI 主色调 */
  box-shadow: 0 0 8px rgba(64, 158, 255, 0.3); /* 聚焦时的外阴影，增加高光效果 */
}

.custom-input-style .el-input__inner:hover {
  border-color: #c0c4cc; /* 鼠标悬停时的边框颜色 */
}

/* 如果需要错误状态样式，可以添加 */
.custom-input-style .el-input.is-error .el-input__inner {
  border-color: #f56c6c; /* 错误状态的边框颜色 */
  box-shadow: 0 0 8px rgba(245, 108, 108, 0.3); /* 错误状态的外阴影 */
}
.custom-button-color {
  background-color: chocolate !important; /* 重要性提升，确保覆盖默认样式 */
  border-color: chocolate !important;
}

/* 可以选择添加悬停状态的样式改变 */
.custom-button-color:hover {
  background-color: darkorange  !important; /* 更深的巧克力色为悬停状态 */
  border-color: darkorange   !important;
}
.column-name {
  width: 20%; /* 举例：任务名称占20%宽度 */
}

.column-type {
  width: 18%; /* 任务类型占18%宽度 */
}

.column-finishTime {
  width: 22%; /* 完成时间占22%宽度 */
}

.column-award {
  width: 18%; /* 奖励积分占18%宽度 */
}

.column-action {
  width: 22%; /* 操作占22%宽度 */
}

</style>
