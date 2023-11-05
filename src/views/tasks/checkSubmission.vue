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
                  <span>任务名称：默写《静夜思》</span>
                </div><!--wk-head-->
                <div class="wk-body">
                  <div class="desc-item">
                    <div class="desc-title">任务描述</div>
                    <div class="desc-content">
                      <div class="content">限时2分钟默写诗歌，上传默写照片</div>
                      <div class="figure"><img src="https://img1.baidu.com/it/u=4191626225,4294896077&fm=253&fmt=auto&app=138&f=JPEG?w=667&h=500" alt="静夜思"></div>
                    </div>
                  </div><!--desc-item-->
                  <div class="desc-item">
                    <div class="desc-title">任务类型</div>
                    <div class="desc-content">
                      <div class="content">必做任务</div>
                    </div>
                  </div><!--desc-item-->
                  <div class="desc-item">
                    <div class="desc-title">奖励积分</div>
                    <div class="desc-content">
                      <div class="content">5</div>
                    </div>
                  </div><!--desc-item-->
                  <div class="desc-item">
                    <div class="desc-title">截止时间</div>
                    <div class="desc-content">
                      <div class="content">2023年11月4日23:59</div>
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
                  <span>任务提交详情</span>
                </div>
                <div class="wk-body">
                  <div class="desc-item">
                    <div class="content">
                      <div class="dc-info">
                        <span class="dc-label">任务状态:</span>
                        <div id="taskState"><el-tag>审核中</el-tag></div>
                      </div>
                    </div>
                  </div>
                  <div class="desc-item">
                    <div class="desc-title">任务提交时间</div>
                    <div class="desc-content">2023年11月3日12:56</div>
                  </div>
                  <div class="desc-item">
                    <div class="desc-title">提交文件</div>
                    <div class="desc-content">
                      <el-tooltip class="item" effect="dark" content="Right Center 提示文字" placement="right">
                        <el-button id="download" size="mini" round>下载</el-button>
                      </el-tooltip>
                    </div>
                  </div>
                  <div class="desc-item">
                    <div class="desc-title">作业描述</div>
                    <div class="desc-content">description提交人对作业的描述</div>
                  </div>
                  <div class="desc-item">
                    <div class="desc-title">志愿者评语</div>
                    <div class="desc-content">comment志愿者评语</div>
                  </div>
                  <div class="desc-item">
                    <div class="desc-title">志愿者评分</div>
                    <div class="desc-content">4</div>
                  </div>
                </div>
              </div>
            </div>
          </div><!--right-->
        </div><!--work-main-->
      </div>
    </div><!--main-->
    <img :src="require('@/assets/mission_images/1.png')" class="image-transition">
  </div><!--container-->
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
.main{
  width: 100%;
  height: calc(100% - 50px);
  padding: 12px;
}
.work-main{
  position: absolute;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  height: 90%;
  width: 95%;
  overflow: hidden;
}
.m-left {
  position: absolute;
  left: 7%;
  height: 100%;
  width: 45%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  border: 1px solid #ffffff; /* 添加边框样式，可根据需要调整边框的颜色和宽度 */
  border-radius: 15px; /* 添加圆角以使框看起来更圆滑 */
}
.m-left:hover {
  box-shadow: 0px 12px 24px rgba(0, 0, 0, 0.3); /* 当鼠标悬浮时，增加阴影的偏移、模糊度和颜色的透明度 */
}
.m-right {
  position: absolute;
  right: 4%;
  height: 100%;
  width: 40%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  border: 1px solid #ffffff; /* 添加边框样式，可根据需要调整边框的颜色和宽度 */
  border-radius: 15px; /* 添加圆角以使框看起来更圆滑 */
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
  border: 1px solid #ffffff; /* 添加边框样式，可根据需要调整边框的颜色和宽度 */
  border-radius: 15px; /* 添加圆角以使框看起来更圆滑 */
}
.wk-cover{
  /*border: 2px solid #000;*/
  position: absolute;
  width: 100%;
  height: 100%;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  border: 1px solid #ffffff; /* 添加边框样式，可根据需要调整边框的颜色和宽度 */
  border-radius: 15px; /* 添加圆角以使框看起来更圆滑 */
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
  height: calc(100% - 60px);
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
  border-left:4px solid #d36e25;
  font-size:20px;
  font-weight:550;
}
.desc-content{
  margin-top: 10px;
  padding: 0 14px;
  line-height: 22px;
  color: #605e5c;
  font-size: 18px;
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
  font-size: 18px;
  font-weight: 500;
}

.img-container img {
  width: 100%; /* 设置图片宽度为容器宽度的百分比 */
  height: auto; /* 让高度自适应，保持图片比例 */
}

#taskState {
  padding-left: 10px;
}
.image-transition {
  position: absolute; /* 设置绝对定位 */
  bottom: 0; /* 图片位于底部 */
  left: 0; /* 图片位于左侧，可以根据需要调整位置 */
  z-index: -1; /* 将图片的 z-index 设置为较小的值，确保它位于所有组件的最下方 */
  max-width: 100%; /* 图片最大宽度为100% */
  /*height: 100%;*/
  object-fit: contain;
}
</style>
