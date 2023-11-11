<template>
  <div class="container">
    <ChildNavbar />
    <div class="main">
      <img :src="require('@/assets/mission_images/sbk.jpg')" class="image-transition">
      <div style="height: 100%;">
        <div class="work-main">
          <div class="m-left">
            <!--            <div class="work-warp">-->
            <!--              <div class="wk-cover">-->
            <div class="wk-head"><span>任务名称:{{ taskName }}</span></div><!--wk-head-->
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
              <!--                </div>&lt;!&ndash;wk-body&ndash;&gt;-->
              <!--              </div>&lt;!&ndash;wk-cover&ndash;&gt;-->
            </div><!--work-wrap-->
          </div><!--left-->
          <div class="m-right">
            <!--            <div class="work-warp">-->
            <!--              <div class="wk-cover">-->
            <div class="wk-head"><span>任务提交</span></div>
            <div class="wk-body">
              <div class="desc-item">
                <el-upload
                  id="upload"
                  class="upload-demo"
                  style="padding-bottom: 20px; background-color: transparent;"
                  drag
                  action="http://localhost:9528/mission/upload"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :file-list="fileList"
                  :http-request="empty"
                  :before-upload="beforeUpload"
                  :limit="1"
                  :accept="accFileType"
                >
                  <i class="el-icon-upload" />
                  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                  <div slot="tip" class="el-upload__tip" style="padding-left: 80px">只能上传一个文件大小不得超过1000KB</div>
                </el-upload>
              </div>
              <div class="desc-item">
                <el-input
                  id="description"
                  v-model="textarea"
                  type="textarea"
                  :rows="6"
                  placeholder="描述"
                  class="el-input">
                </el-input>
              </div>
              <div class="desc-item">
                <div class="btn-container">
                  <el-button id="submit" slot="reference" size="mini" round @click="submit">提交</el-button>
                </div>
              </div>
            </div>
            <!--              </div>-->
            <!--            </div>-->
          </div><!--right-->
        </div><!--work-main-->
      </div>
    </div><!--main-->
  </div>
</template>

<script>
import api from '@/api/task'
import { zip } from 'mockjs/src/mock/random/address'
import ChildNavbar from '@/layout/components/childNavbar.vue'
export default {
  name: 'SubmitHomework',
  components: {
    ChildNavbar
  },
  data() {
    return {
      userId: '',
      missionId: '',
      pictureURL: '',
      file: null,
      fileURL: '#',
      fileList: [],
      uploadFileSizeLimit: 1000, // 文件大小限制为1000KB
      textarea: '',
      taskName: '',
      taskDesc: '',
      taskType: '',
      rewardScore: '',
      deadline: '',
      accFileType: ''
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
      // this.missionId
      api.loadSingleMission(this.missionId).then(response => {
        console.log(response.data)
        this.pictureURL = response.data.pictureURL
        this.taskName = response.data.missionName
        this.deadline = response.data.deadline
        this.taskDesc = response.data.description
        this.rewardScore = response.data.reward
        switch (response.data.kind) {
          case 0:this.taskType = '上传文件任务'; this.accFileType = '.jpg,.png,.zip,.word'; break
          case 1:this.taskType = '上传视频任务'; this.accFileType = '.mp4'; break
          case 2:this.taskType = '聊天任务'; break
          case 3:this.taskType = '视频通话任务'; break
        }
      })
    },
    zip,
    beforeUpload(file) {
      const isLtSize = file.size / 1024 <= this.uploadFileSizeLimit
      if (!isLtSize) {
        this.$message.error(`文件大小超过限制 (${this.uploadFileSizeLimit}KB)`)
      } else {
        this.file = file
      }
      return isLtSize
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    empty() {
    },
    getUrl() {
      console.log(this.file)
      const formData = new FormData()
      formData.append('file', this.file)
      api.getUrl(formData).then(response => {
        console.log(response.data)
        this.fileURL = response.data.pictureURL
      })
    },
    submit() {
      const history = [{
        id: '',
        userId: '',
        missionId: '',
        finishDate: '',
        submissionURL: '',
        status: '',
        comment: '',
        description: '',
        rate: '',
        mission: ''
      }]
      // 首先获取图片URL
      this.getUrl().then(() => {
        // 确保图片URL已经获取到后，再提交任务
        history.submissionURL = this.fileURL
        history.userId = this.userId
        history.missionId = this.missionId
        history.description = this.taskDesc
        history.mission = this.taskName
        api.submit(history).then(response => {
          if (response.data.status === 200) {
            this.$message.success('成功提交!')
          } else if (response.data.status === 404) {
            this.$message.error('提交失败,你已经提交过这个任务了!')
          }
        })
          .catch(error => {
            console.error(error)
            this.$message.error('提交失败!')
          })
      })
    }
  }
}

</script>

<style scoped>
.container{
  /*border: 1px solid #faac09;*/
  position: absolute;
  width: 100%;
  height: 92%;
}
.main{
  /*border: 1px solid #f56c6c;*/
  position: absolute;
  top: 8.6%;
  width: 100%;
  height: 100%;
  background-color: #f8ebd8;
  display: flex;
}
.work-main{
  /*border: 1px solid #6c93f5;*/
  position: absolute;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  overflow: hidden;
  background-color: transparent;
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
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  border: 1px solid #f8ebd8; /* 添加边框样式，可根据需要调整边框的颜色和宽度 */
  border-radius: 15px; /* 添加圆角以使框看起来更圆滑 */
  background-color: transparent;
}
/*.m-left:hover {*/
/*  box-shadow: 0px 12px 24px rgba(0, 0, 0, 0.3); !* 当鼠标悬浮时，增加阴影的偏移、模糊度和颜色的透明度 *!*/
/*}*/
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
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  border: 1px solid #f8ebd8; /* 添加边框样式，可根据需要调整边框的颜色和宽度 */
  border-radius: 15px; /* 添加圆角以使框看起来更圆滑 */
}
/*.m-right:hover {*/
/*  box-shadow: 0px 12px 24px rgba(0, 0, 0, 0.3); !* 当鼠标悬浮时，增加阴影的偏移、模糊度和颜色的透明度 *!*/
/*}*/
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
  color: #c1643c;
  font-weight: 550;
  font-size: 22px;
}
.wk-body{
  padding: 0 20px;
  height: 88%;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}

.desc-title {
  padding: 0 10px;
  display: block;
  border-radius: 4px;
  border-left:4px solid #c1643c;
  color: #c1643c;
  font-size:15px;
  font-weight:550;
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
.el-input{
  border: 1px solid #eeeeee;
  border-radius: 5px;
  width: 85%;
  margin-left: 7%;
  margin-top: 20px;
}

.el-button{
  background-color: #d1f3ff;
  color: #2c2a2a;
  border: 1px solid #85cff8;
  position: relative;
  margin-left: 77%;
  margin-top: 3%;
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
#upload {
  position: relative;
  margin-left: 15%;
  margin-top: 5%;
}

.image-transition {
  position: absolute; /* 设置绝对定位 */
  /*top: 0.5%; !* 图片位于底部 *!*/
  left: 0; /* 图片位于左侧，可以根据需要调整位置 */
  /*z-index: -1; !* 将图片的 z-index 设置为较小的值，确保它位于所有组件的最下方 *!*/
  width: 100%; /* 图片最大宽度为100% */
  /*object-fit: contain;*/
  height: 95%;
}
.btn-container {
  position: absolute;
  padding-top: 3px;
  left: 70%;
  width: 10%;

}
#submit {
  background-color: #fccd5f;
  border: 2px solid #c1643c;
  color: #c1643c;
}
</style>
