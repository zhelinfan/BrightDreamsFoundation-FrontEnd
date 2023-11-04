<template>
  <el-container>
    <el-header>任务：静夜思</el-header>
    <el-main style="text-align: center;">
      <el-upload
        class="upload-demo"
        style="padding-bottom: 20px;"
        drag
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :file-list="fileList"
        list-type="picture">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且单个文件不超过500kb</div>
      </el-upload>
      <el-input
        type="textarea"
        :rows="6"
        placeholder="描述"
        v-model="textarea">
      </el-input>
      <el-button round style="float: right;">提交</el-button>
    </el-main>

  </el-container>
</template>

<script>

export default {
  name: "SubmitHomework",
  data() {
    return {
      fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
      textarea: ''
    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    }
  }
}

</script>

<style scoped>
.el-header, .el-footer {
  background-color: #ffffff;
  color: #333;
  text-align: center;
  line-height: 60px;
  font-size: 24px; /* 设置字号为24px */
  font-weight: bold; /* 加粗字体 */
}
.el-main {
  width: 800px; /* 设置容器的固定宽度 */
  margin: 0 auto; /* 居中显示 */
}

.el-input {
  padding-top: 20px;
  padding-bottom: 20px;
}

.el-button{
  background-color: #faac09;
  color: #f5f6fb;
  margin-top: 20px; /* 增加上方外边距 */
}
</style>
