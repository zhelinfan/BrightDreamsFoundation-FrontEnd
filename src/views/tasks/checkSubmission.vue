<template>
  <div class="container">
    <ChildNavbar />
    <div class="main">
      <img src="https://img1.baidu.com/it/u=4191626225,4294896077&fm=253&fmt=auto&app=138&f=JPEG?w=667&h=500" alt="静夜思">
      <h2> 任务：默写《静夜思》<br></h2>
      <div class="sub-header">
        <p> <b>任务类型:</b>必做</p>
        <p> <b>奖励积分：</b>5</p>
        <p> <b>任务基本描述：</b>默写《静夜思》整首，上传默写照片，限时2分钟</p>
        <p> <b>截止时间：</b>2023年11月4日23:59</p>
        <p> <b>提交时间：</b>2023年11月4日23:59</p>
      </div>
    </div>
    </div>
</template>

<script>
import ChildNavbar from '@/layout/components/childNavbar.vue'
export default {
  name: 'CheckSubmission',
  components: {
    ChildNavbar
  }
}
</script>

<style scoped>
.img-container {
  width: 100px; /* 设置容器宽度 */
  height: auto; /* 让高度自适应，保持图片比例 */
}

.img-container img {
  width: 100%; /* 设置图片宽度为容器宽度的百分比 */
  height: auto; /* 让高度自适应，保持图片比例 */
}
</style>
