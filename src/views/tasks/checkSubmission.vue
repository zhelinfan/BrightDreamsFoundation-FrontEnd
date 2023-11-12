<template>
  <div class="container">
    <ChildNavbar />
    <div class="main">
      <div style="height: 100%;">
        <div class="work-main">
          <div class="m-left">
            <div class="work-warp">
              <div class="wk-cover">
                <div class="wk-head">
                  <span style="color: #b44d2c">任务名称：{{ taskName }}</span>
                </div><!--wk-head-->
                <div class="wk-body">
                  <div class="desc-item">
                    <div class="desc-title">任务描述</div>
                    <div class="desc-content">
                      <div class="content">{{ taskDesc }}</div>
                      <div class="figure"><img id="taskImage" :src="pictureURL"></div>
                    </div>
                  </div><!--desc-item-->
                  <div class="desc-item">
                    <div class="desc-title">任务类型</div>
                    <div class="desc-content">
                      <div class="content">{{ taskType }}</div>
                    </div>
                  </div><!--desc-item-->
                  <div class="desc-item">
                    <div class="desc-title">奖励积分</div>
                    <div class="desc-content">
                      <div class="content">{{ rewardScore }}</div>
                    </div>
                  </div><!--desc-item-->
                  <div class="desc-item">
                    <div class="desc-title">截止时间</div>
                    <div class="desc-content">
                      <div class="content">{{ deadline }}</div>
                    </div>
                  </div><!--desc-item-->
                </div><!--wk-body-->
              </div><!--wk-cover-->
            </div><!--work-wrap-->
          </div><!--left-->
          <div class="m-right">
            <div class="work-warp">
              <div class="wk-cover">
                <div class="wk-head">
                  <span style="color: #b44d2c">任务提交详情</span>
                </div>
                <div class="wk-body">
                  <div class="desc-item">
                    <div class="content">
                      <div class="dc-info">
                        <span class="dc-label">任务状态:</span>
                        <div id="taskState"><el-tag :type="taskStateType" id="tag">{{ taskState }}</el-tag></div>
                      </div>
                    </div>
                  </div>
                  <div class="desc-item">
                    <div class="desc-title">任务提交时间</div>
                    <div class="desc-content">{{ submitTime }}</div>
                  </div>
                  <div class="desc-item">
                    <div class="desc-title">提交文件</div>
                    <div class="desc-content">
                      <el-popconfirm :title="notation" @onConfirm="download">
                        <el-button slot="reference" id="download" size="mini" round>下载</el-button>-->
                      </el-popconfirm>
                    </div>
                  </div>
                  <div class="desc-item">
                    <div class="desc-title">作业描述</div>
                    <div class="desc-content">{{ hkDescription }}</div>
                  </div>
                  <div class="desc-item">
                    <div class="desc-title">志愿者评语</div>
                    <div class="desc-content">{{ comment }}</div>
                  </div>
                  <div class="desc-item">
                    <div class="desc-title">志愿者评分</div>
                    <div class="desc-content">{{ finalScore }}</div>
                  </div>
                  <div class="desc-item">
                    <div class="desc-title">历史提交情况</div>
                    <div class="desc-content">
                      <button @click="goTo" id="goToNext">
                        <span style="text-decoration: underline; color: #589cf5;">点击查看历史记录</span>
                      </button>
<!--                      <router-link to="/several">点击查看历史记录</router-link>-->
<!--                      <el-link href="https://element.eleme.io" target="_blank">点击查看历史记录</el-link>-->
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div><!--right-->
        </div><!--work-main-->
      </div>
    </div><!--main-->
    <img :src="require('@/assets/mission_images/csbk.jpg')" class="image-transition">
    <div class="write">"行远自迩，笃行不怠。"</div>
  </div><!--container-->
</template>

<script>
import api from '@/api/task'
import ChildNavbar from '@/layout/components/childNavbar.vue'
export default {
  name: 'CheckSubmission',
  components: {
    ChildNavbar
  },
  data() {
    return {
      taskName: '',
      taskDesc: '',
      taskType: '',
      rewardScore: '',
      deadline: '',
      taskState: '',
      taskStateType: '',
      submitTime: '',
      // 用url存储提交的文件
      fileName: '',
      notation: '',
      hkDescription: '',
      comment: '',
      finalScore: '',
      userId: '',
      missionId: '',
      pictureURL: ''
    }
  },
  mounted() {
    this.missionId = this.$route.query.missionId
    console.log(this.missionId)
  },
  created() {
    this.getCookie()
  },
  methods: {
    goTo() {
      this.$router.push({
        query: { missionId: this.missionId },
        path: '/several'
      })
    },
    getCookie() {
      const arr = document.cookie.split(';')
      for (let i = 0; i < arr.length; i++) {
        const arr2 = arr[i].split('=')
        if (arr2[0] === 'userInfo' || arr2[0] === ' userInfo') {
          const userinfo = JSON.parse(arr2[1])
          // return userinfo
          this.userId = userinfo.id
          console.log(this.userId)
          this.missionId = this.$route.query.missionId
          console.log(this.missionId)
          this.fetchData()
        }
      }
      return ''
    },
    fetchData() {
      // this.page = current
      console.log('enterFetchData')
      api.checkSubmission(this.userId, this.missionId).then(response => {
        console.log(response.data)
        this.submitTime = response.data.finishDate
        this.fileName = response.data.submissionURL
        if (this.fileName === null) {
          this.notation = '未提交任何文件'
        } else {
          this.notation = '是否下载' + this.fileName + '?'
        }
        this.finalScore = response.data.rate
        this.comment = response.data.comment
        this.hkDescription = response.data.description
        switch (response.data.status) {
          case 0:this.taskState = '审核中'; break
          case 1:this.taskState = '通过'; this.taskStateType = 'success'; break
          case 2:this.taskState = '不通过'; this.taskStateType = 'danger'; break
        }
      })
      api.loadSingleMission(this.missionId).then(response => {
        this.pictureURL = response.data.pictureURL
        this.taskName = response.data.missionName
        this.deadline = response.data.deadline
        this.taskDesc = response.data.description
        this.rewardScore = response.data.reward
        switch (response.data.kind) {
          case 0:
            this.taskType = '上传文件任务'
            break
          case 1:
            this.taskType = '上传视频任务'
            break
          case 2:
            this.taskType = '聊天任务'
            break
          case 3:
            this.taskType = '视频通话任务'
            break
        }
      })
    },
    download() {
      if (this.fileName === null) {
        this.$message.error(`无文件可下载！`)
        return
      }
      const name = this.fileName.slice(this.fileName.lastIndexOf('/') + 1)
      fetch(this.fileName).then(res => res.blob()).then(blob => {
        const link = document.createElement('a')
        link.href = URL.createObjectURL(blob)
        link.download = name
        document.body.appendChild(link)
        link.click()
        window.URL.revokeObjectURL(link.href)
        document.body.removeChild(link)
      })
    }
  }
}
</script>

<style scoped>
.container{
  position: absolute;
  width: 100%;
  height: 100%;
}
.main{
  position: absolute;
  width: 100%;
  height: 100%;
  /*background-color: #efefef;*/
  display: flex;
}
.work-main{
  position: absolute;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  height: 100%;
  width: 95%;
  overflow: hidden;
}
.m-left {
  position: absolute;
  top: 5%;
  left: 12%;
  height: 90%;
  width: 40%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  border: 1px solid #f8ebd8; /* 添加边框样式，可根据需要调整边框的颜色和宽度 */
  border-radius: 15px; /* 添加圆角以使框看起来更圆滑 */
  background-color: transparent;
}
.m-left:hover {
  box-shadow: 0px 12px 24px rgba(0, 0, 0, 0.3); /* 当鼠标悬浮时，增加阴影的偏移、模糊度和颜色的透明度 */
}
.m-right {
  position: absolute;
  top: 5%;
  right: 6%;
  height: 90%;
  width: 40%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  border: 1px solid #f8ebd8; /* 添加边框样式，可根据需要调整边框的颜色和宽度 */
  border-radius: 15px; /* 添加圆角以使框看起来更圆滑 */
  background-color: transparent;
}
.m-right:hover {
  box-shadow: 0px 12px 24px rgba(0, 0, 0, 0.3); /* 当鼠标悬浮时，增加阴影的偏移、模糊度和颜色的透明度 */
}
.dc-info{
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-bottom: 10px;
}
.work-warp{
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-direction: column;
  background-color: #ffffff;
  /*background-color: transparent;*/
  border: 1px solid #f8ebd8; /* 添加边框样式，可根据需要调整边框的颜色和宽度 */
  border-radius: 15px; /* 添加圆角以使框看起来更圆滑 */
  background-color: transparent;
}
.wk-cover{
  /*border: 2px solid #000;*/
  position: absolute;
  width: 100%;
  height: 100%;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  border: 1px solid #f8ebd8; /* 添加边框样式，可根据需要调整边框的颜色和宽度 */
  border-radius: 15px; /* 添加圆角以使框看起来更圆滑 */
  background-color: transparent;
}

.wk-head{
  height: 45px;
  padding: 40px 20px 30px 20px;
  display: flex;
  align-items: center;
}
.wk-head span{
  color: #000000;
  font-weight: 550;
  font-size: 22px;
}
.wk-body{
  padding: 0 20px;
  height: calc(100% - 40px);
  overflow-y: auto;
}
/* 设置滚动条样式 */
.wk-body::-webkit-scrollbar {
  width: 6px; /* 设置滚动条宽度 */
}

.wk-body::-webkit-scrollbar-track {
  background-color: #f5f5f5; /* 设置滚动条轨道背景色 */
}

.wk-body::-webkit-scrollbar-thumb {
  background-color: #b7b7b7; /* 设置滚动条滑块颜色 */
  border-radius: 3px; /* 设置滚动条滑块的圆角 */
}

.wk-body::-webkit-scrollbar-thumb:hover {
  background-color: #706f6f; /* 设置滚动条滑块悬停时的颜色 */
}
.desc-title {
  padding: 0 10px;
  display: block;
  border-radius: 4px;
  border-left:4px solid #b34d2c;
  font-size:15px;
  font-weight:550;
  color: #b34d2c;
}
.desc-content{
  margin-top: 10px;
  padding: 0 14px;
  line-height: 22px;
  color: #605e5c;
  font-size: 13px;
  font-weight: 500;
  white-space: pre-wrap;
  word-wrap: break-word;
  margin-bottom: 10px;
}

.content{
  word-break: break-all;
  white-space: pre-wrap;
  line-height: 22px;
  color: #2c2a2a;
  font-size: 13px;
  font-weight: 500;
}
#taskState {
  padding-left: 10px;
  width: 14%;
}
#tag {
  width: 100%;
  text-align: center;
  /*line-height: normal; !* 根据你的需求调整这个值 *!*/
  font-size: 13px;
}
.wk-body .desc-content .figure {
  display: flex;
  align-items: flex-start;
}
#taskImage {
  transform: scale(0.5);
  position: relative;
  margin-left: -6%;
  margin-top: -24%;
  margin-bottom: -20%;
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
#download {
  background-color: #fccd5f;
  border: 2px solid #c1643c;
  color: #c1643c;
}

#goToNext {
  border: transparent;
  background-color: transparent;
  color: #589cf5;
}
#goToNext span {
  text-decoration: underline;
  color: #589cf5;
  transition: text-shadow 0.3s;
  cursor: pointer;
}

#goToNext span:hover {
  text-shadow: 0 6px 6px rgba(101, 99, 99, 0.3);
}
.write{
  position: absolute;
  top: 90%;
  left: 45%;
  height: 9%;
  width: 38%;
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  font-family: "FangSong", "STFangsong", "华文仿宋", serif;
}
</style>
