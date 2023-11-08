<template>
  <div class="container" >
    <ChildNavbar />
    <div class="main">
      <div style="height: 100%;">
        <div class="work-main">
          <div class="m-left">
            <div class="work-warp">
              <div class="wk-cover">
                <div class="wk-head">
                  <span>任务名称:{{ taskName }}</span>
                </div><!--wk-head-->
                <div class="wk-body">
                  <div class="desc-item">
                    <div class="desc-title">任务描述</div>
                    <div class="desc-content">
                      <div class="content">{{ taskDesc }}</div>
                      <div class="figure" ><img :src="require('@/assets/task/libai.jpg')" alt="静夜思" id="taskImage"></div>
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
                <div class="wk-head"><span>任务提交</span></div>
                <div class="wk-body">
                  <div class="desc-item">
                    <el-upload
                      class="upload-demo"
                      id="upload"
                      style="padding-bottom: 20px;"
                      drag
                      action="http://localhost:9528/mission/upload"
                      :on-preview="handlePreview"
                      :on-remove="handleRemove"
                      :file-list="fileList"
                      :http-request="empty"
                      :before-upload="beforeUpload"
                      :limit="1"
                      :accept="accFileType">
                      <i class="el-icon-upload"></i>
                      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                      <div class="el-upload__tip" slot="tip">只能上传一个zip文件，文件大小不得超过1000KB</div>
                    </el-upload>
                  </div>
                  <div class="desc-item">
                      <el-input
                        type="textarea"
                        id="description"
                        :rows="6"
                        placeholder="描述"
                        v-model="textarea"
                        class="el-input">
                      </el-input>
                  </div>
                  <div class="desc-item">
                    <div class="btn-container">
                      <el-button round class="el-button" id="submit" @click="getUrl">提交</el-button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div><!--right-->
        </div><!--work-main-->
      </div>
    </div><!--main-->
  </div>
</template>

<script>
import api from '@/api/task'
import { zip } from 'mockjs/src/mock/random/address'

export default {
  name: 'SubmitHomework',
  data() {
    return {
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
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      api.loadSingleMission(1).then(response => {
        console.log(response.data)
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
    }
  }
}

</script>

<style scoped>

.header {
  /*border: 2px solid #000000;*/
  background-color: #ffffff;
  color: #333;
  text-align: center;
  line-height: 40px;
  width: 600px;
  margin-left: 650px;
}
.sub-header{
  border: 2px dashed #c2ebfd;
  border-radius: 30px;
  padding: 10px;
  background-color: #e1f3fc;
}
.sub-header p {
  margin: 1px 0; /* 调整上下边距为 5px，左右边距保持默认值 */
}

.main{
  /*border: 2px solid #000000;*/
  margin-top: 20px;
  justify-content: center;
  align-items: center;
  width: 900px;
  position: relative;
  margin-left: 500px;
}

.el-input{
  border: 2px solid #000000;
  width: 60%;
  margin-top: 20px;
}
.describe{
  font-size: 16px;
}
.el-button{
  background-color: #7dd8ff;
  color: #f5f6fb;
  margin-top: 20px; /* 增加上方外边距 */
}
</style>
