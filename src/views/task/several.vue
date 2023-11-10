<template>
  <div>
    <el-container>
      <ChildNavbar />
      <el-header style="height: 0px;" />
      <el-main>
        <div class="content">
          <div style="margin-bottom: 20px; width: 50%; border-radius: 60px;">
            <el-input placeholder="请输入内容" v-model="input3" class="input-with-select ">
              <span class="blue-bold">提交记录</span>
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </div>
          <el-table :data="tableData" style="width: 100%; max-width: 1200px;" border :header-cell-style="headerCellStyle" :cell-style="cellStyle">
            <el-table-column
              prop="name"
              label="任务名称"
              width="280"
              header-align="center"
            />
            <el-table-column
              prop="finishTime"
              label="提交时间"
              sortable
              width="300"
              header-align="center"
            />
            <el-table-column
              prop="status"
              label="状态"
              width="293"
              header-align="center"
            />
            <el-table-column label="操作" width="300" header-align="center" @click="taskDetail">
              <template slot-scope="scope">
                <el-button size="mini" class="custom-button-color" type="warning" icon="el-icon-view" @click="handleSee(scope.$index, scope.row)">查看详情</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-main>
    </el-container>
    <img :src="require('@/assets/task/animal.jpg')" class="image-transition">
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
        status: ''
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
    setData(array) {
      this.tableData[0].id = array[0].id
      this.tableData[0].name = array[0].mission.missionName
      this.tableData[0].finishTime = array[0].finishDate
      this.tableData[0].status = array[0].status
      for (let i = 1; i < array.length; i++) {
        const temp = {
          id: '',
          name: '',
          finishTime: '',
          status: ''
        }
        temp.id = array[i].id
        temp.name = array[i].mission.missionName
        temp.finishTime = array[i].finishDate
        temp.status = array[i].status
        this.tableData.push(temp)
      }
    },
    fetchData() {
      api.getSubmitTask(this.userId).then(response => {
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
            status: ''
          }]
          this.setData(response.data)
        })
      }
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
  background:transparent;
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
  border-radius: 5px; /* 添加圆角以使框看起来更圆滑 */
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
  position: fixed; /* 设置为固定定位，相对于视口 */
  top: 0; /* 图片位于顶部 */
  left: 0; /* 图片位于左侧 */
  width: 100%; /* 图片宽度为100%，覆盖整个视口宽度 */
  height: 100%; /* 图片高度为100%，覆盖整个视口高度 */
  z-index: -1; /* 将图片放在其他内容之下 */
  object-fit: cover; /* 确保图片覆盖整个容器且不失真 */
  opacity:0.8;
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
  background-color: black !important; /* 重要性提升，确保覆盖默认样式 */
  border-color: black !important;
}

/* 可以选择添加悬停状态的样式改变 */
.custom-button-color:hover {
  background-color: gray  !important; /* 更深的巧克力色为悬停状态 */
  border-color: gray   !important;
}
.label-blue-bold {
  color: blue;
  font-weight: bold;
}

.input-with-button .el-input-group__append {
  background-color: #fff;
}

</style>
