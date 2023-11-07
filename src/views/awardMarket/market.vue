<template>
  <el-container class="container-bg">
    <ChildNavbar />
    <el-header>
      Header
    </el-header>
    <el-main class="main1">
      <div class="image-container">
      <img :src="require('@/assets/market_images/charity.jpg')" class="image-transition">
    </div></el-main>
    <el-main class="main2">
      <el-row>
        <el-col :span="4" v-for="(o, index) in 5" :key="index" :offset="index > 0 ? 1 : 0">
          <el-card :body-style="{ padding: '0px' }" class="card-hover">
            <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
            <div style="padding: 14px;">
              <span>好吃的汉堡</span>
              <div class="bottom clearfix">
                <time class="time">{{ currentDate }}</time>
                <el-button type="text" class="button">操作按钮</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-row style="margin-top: 5%;">
        <el-col :span="4" v-for="(o, index) in 5" :key="index" :offset="index > 0 ? 1 : 0">
          <el-card :body-style="{ padding: '0px' }" class="card-hover">
            <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
            <div style="padding: 14px;">
              <span>好吃的汉堡</span>
              <div class="bottom clearfix">
                <time class="time">{{ currentDate }}</time>
                <el-button type="text" class="button">操作按钮</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-main>
  </el-container>

</template>

<script>
import ChildNavbar from '@/layout/components/childNavbar.vue'

export default {
  components: {
    ChildNavbar
  }
}
</script>

<style scoped>
.container-bg {
  height: 150vh;
  background-color: #efefef; /* 设置背景颜色为灰色，你可以根据需要更改颜色值 */
}
.el-container {
  height: 150vh; /* 设置父容器高度为视窗高度的100% */
}

.el-header {
  height: 10%; /* 设置头部高度为50像素，根据实际需求调整 */
}
.image-container {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  width: 100%; /* 让容器宽度占满整个头部 */
  height: 100%; /* 让容器高度占满整个头部 */
  overflow: hidden; /* 隐藏溢出的内容 */
}

.image-transition {
  width: 70%; /* 图片宽度占满容器 */
  height: auto; /* 高度自适应以保持纵横比 */
  border-radius: 10px; /* 设置四个角的圆角半径 */
  transition: transform 0.5s, box-shadow 0.5s; /* 添加过渡效果（可选） */
}

.image-transition:hover {
  transform: scale(1.05); /* 鼠标悬浮时放大图片（可选） */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5); /* 鼠标悬浮时添加阴影效果 */
}

.main1 {
  width: 100%; /* 设置宽度为页面宽度的50% */
  height: 100%; /* 设置高度为页面高度的50% */
}

.main2 {
  width: 100%; /* 设置宽度为页面宽度的30% */
  height: 100%; /* 设置高度为页面高度的70% */
}
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}
.card-hover:hover {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  transform: scale(1.05);
  transition: box-shadow 0.3s, transform 0.3s;
}
</style>
