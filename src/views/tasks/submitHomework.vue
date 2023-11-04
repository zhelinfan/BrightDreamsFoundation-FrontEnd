<template>
  <div class="container">
    <ChildNavbar />
    <div class="header">
        <h2> 任务：默写《静夜思》<br></h2>
      <div class="sub-header">
        <p> <b>任务基本描述：</b>默写《静夜思》整首，上传默写照片，限时2分钟</p>
        <p> <b>奖励积分：</b>5</p>
        <p> <b>截止时间：</b>2023年11月4日</p>
      </div>
    </div>

    <div class="main" style="text-align: center;">
      <el-upload
        class="upload-demo"
        style="padding-bottom: 20px;"
        drag
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :file-list="fileList"
        :before-upload="beforeUpload"
        limit="1"
        accept=".zip">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传一个zip文件，文件大小不得超过1000KB</div>
      </el-upload>
      <el-input
        type="textarea"
        :rows="6"
        placeholder="描述"
        v-model="textarea">
      </el-input>
      <el-button round style="float: right;">提交</el-button>
    </div>

  </div>
</template>

<script>

import { zip } from 'mockjs/src/mock/random/address'
import ChildNavbar from '@/layout/components/childNavbar.vue'
export default {
  name: 'SubmitHomework',
  components: {
    ChildNavbar
  },
  data() {
    return {
      fileList: [],
      uploadFileSizeLimit: 1000, // 文件大小限制为1000KB
      textarea: ''
    }
  },
  methods: {
    zip,
    beforeUpload(file) {
      const isLtSize = file.size / 1024 <= this.uploadFileSizeLimit
      if (!isLtSize) {
        this.$message.error(`文件大小超过限制 (${this.uploadFileSizeLimit}KB)`)
      }
      return isLtSize
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
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
