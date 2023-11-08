<template>
  <div>
    <el-container>
      <ChildNavbar />
      <el-header style="height: 0px;" />
      <el-main>
        <div class="header">
          <!-- 这里是查询和查看任务详情按钮 -->
          <div class="white-box">
            <div class="center-content"> <!-- 添加一个包装层 -->
              <!-- 这里是查询和查看任务详情按钮 -->
              <div class="form">
                <el-form :inline="true" :model="formInline" class="demo-form-inline">
                  <el-form-item label="">
                    <el-input v-model="keywords" size="small" placeholder="" class="custom-input-style" />
                  </el-form-item>
                  <el-form-item>
                    <el-button class="custom-button-color" type="warning" icon="el-icon-search" size="small" @click="onSubmit">查询</el-button>
                  </el-form-item>
                  <el-form-item>
                    <el-button class="custom-button-color" type="warning" icon="el-icon-search" size="small" @click="taskDetail">查看任务详情</el-button>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </div>
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <!-- ... 其他表单元素 ... -->
          </el-form>
        </div>
        <div class="content">
          <el-table :data="tableData" style="width: 100%; max-width: 1200px;" border :header-cell-style="headerCellStyle" :cell-style="cellStyle" max-height="250">
            <el-table-column
              prop="name"
              label="任务名称"
              width="200"
              header-align="center"
              :cell-style="nameCellStyle"
            />
            <el-table-column
              prop="startTime"
              label="发布时间"
              sortable
              width="200"
              header-align="center"
            />
            <el-table-column
              prop="stopTime"
              label="截止时间"
              sortable
              width="200"
              header-align="center"
            />
            <el-table-column
              prop="type"
              label="任务类型"
              width="180"
              header-align="center"
              column-key="type"
              :filters="[{text: '学习', value: '学习'}, {text: '互动', value: '互动'}]"
              :filter-method="filterHandler"
            />
            <el-table-column
              prop="award"
              label="奖励积分"
              width="180"
              header-align="center"
            />
            <el-table-column label="操作" width="200" header-align="center" @click="taskDetail">
              <template slot-scope="scope">
                <el-button size="mini" class="custom-button-color" type="warning" icon="el-icon-view" @click="handleSee(scope.$index, scope.row)">查看详情</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-main>
    </el-container>
    <img :src="require('@/assets/mission_images/1.png')" class="image-transition">
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
      /* formInline: {
        name: '',
        date: null
      },*/
      userId: {},
      tableData: [{
        id: '',
        name: '',
        startTime: '',
        stopTime: '',
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
    this.fetchData() // 获取数据
  },
  methods: {
    typeJudge(number) {
      if (number === 0) {
        return '上传文件任务'
      } else if (number === 1) {
        return '上传视频任务'
      } else if (number === 2) {
        return '聊天任务'
      } else if (number === 3) {
        return '视频通话任务'
      }
    },
    fetchData() {
      api.getUncompleteTask(18).then(response => {
        const code = response.code
        const array = response.data
        if (code === 200) {
          this.tableData[0].id = array[0].id
          this.tableData[0].name = array[0].missionName
          this.tableData[0].startTime = array[0].releaseDate
          this.tableData[0].stopTime = array[0].deadline
          this.tableData[0].type = this.typeJudge(array[0].kind)
          this.tableData[0].typeNum = array[0].kind
          this.tableData[0].award = array[0].reward
          for (let i = 1; i < array.length; i++) {
            const temp = {
              id: '',
              name: '',
              startTime: '',
              stopTime: '',
              type: '',
              award: ''
            }
            temp.id = array[i].id
            temp.name = array[i].missionName
            temp.startTime = array[i].releaseDate
            temp.stopTime = array[i].deadline
            temp.type = this.typeJudge(array[i].kind)
            temp.typeNum = array[i].kind
            temp.award = array[i].reward
            this.tableData.push(temp)
          }
        } else {
          console.error('Error: ' + '加载失败')
        }
      })
        .catch(error => {
          console.error('Error fetching missions:', error)
          // this.isLoading = false
        })
    },
    getCookie() {
      const arr = document.cookie.split(';')
      for (let i = 0; i < arr.length; i++) {
        const arr2 = arr[i].split('=')
        if (arr2[0] === ' userInfo') {
          const userinfo = JSON.parse(arr[i])
          return userinfo
        }
      }
      return ''
    },
    onSubmit() {

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
    },
    taskDetail() {
      this.$router.push({ path: '/detail' })
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
  display: inline-block; /* 让内部的长方形框与内容排列在同一行 */
  width: 80%;
  height: 140px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15); /* 设置默认的阴影效果 */
  transition: box-shadow 0.3s; /* 添加过渡效果让阴影变化更平滑 */
}

.white-box:hover {
  box-shadow: 0px 12px 24px rgba(0, 0, 0, 0.3); /* 当鼠标悬浮时，增加阴影的偏移、模糊度和颜色的透明度 */
}
.center-content {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  height: 100%; /* 设置高度为100%以充满 .white-box 的高度 */
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
  width: 100%; /* 图片最大宽度为100% */
  height: 100%;
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

</style>
