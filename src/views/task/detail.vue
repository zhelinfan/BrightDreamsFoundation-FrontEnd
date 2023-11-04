<template>
  <el-container>
    <el-header style="height: 100px;"></el-header>
    <el-container>
      <el-aside width="900px">
        <el-container>
          <el-header class="custom-header" style="height: 60px; font-size: 30px;" >  <strong style="color: darkorange;">任务-默写《静夜思》</strong></el-header>
          <el-container>
            <el-aside width="100px">
            </el-aside>
            <el-main>
              <div class="pic-404">
                <img class="pic-404__parent" src="@/assets/task/libai.jpg" alt="404">
              </div>
            </el-main>
          </el-container>
        </el-container>
      </el-aside>
      <el-main>
        <el-container>
          <el-header style="height: 25px;"></el-header>
          <el-container>
            <el-aside width="0px">Aside</el-aside>
            <el-main>
              <div>
                <el-descriptions title="任务详情" column="2" class="force-wrap">
                  <!-- 描述项 -->
                  <el-descriptions-item label="任务名称" style="height: 50px; font-size: 20px;">
                    <br/><i class="el-icon-star-on"></i>
                    <strong>任务名称：</strong>默写《静夜思》<br/>
                  </el-descriptions-item>
                  <el-descriptions-item label="奖励积分" style="height: 50px; font-size: 20px;">
                    <br/><i class="el-icon-star-on"></i>
                    <strong>奖励积分：</strong>5<br/>
                  </el-descriptions-item>
                  <el-descriptions-item label="任务类型" style="height: 50px; font-size: 20px;">
                    <br/><i class="el-icon-star-on"></i>
                    <strong>任务类型：</strong>互动<br/>
                  </el-descriptions-item>
                  <el-descriptions-item label="截止时间" style="height: 50px; font-size: 20px;">
                    <br/><i class="el-icon-star-on"></i>
                    <strong>截止时间：</strong>YYYY/MM/DD xx:xx<br/>
                  </el-descriptions-item>
                  <el-descriptions-item label="任务描述" style="height: 50px; font-size: 20px;">
                    <br/><i class="el-icon-star-on"></i>
                    <strong>任务描述：</strong>弘叶题石szd 南北szd<br/>
                  </el-descriptions-item>
                </el-descriptions>

                <!-- 空间占位符，用于创建额外的空间 -->
                <div class="space-placeholder"></div>

                <!-- 按钮居中 -->
                <div class="button-container" >
                  <el-button type="warning" size="big">操作</el-button>
                </div>
              </div>
            </el-main>
          </el-container>
        </el-container>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  // name: "task_detail"
  data() {
    return {
      fits: [''],
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
    }
  }
}
</script>

<style scoped>
.pic-404__parent {
  width: 100%; /* 放大到150%的原始大小 */
  height: auto; /* 保持宽高比 */
}
/* 添加到你的 <style> 标签中或者在你的CSS文件中 */
.custom-header {
  padding-left: 120px; /* 这将向元素的左侧添加20像素的内边距 */
}
/* CSS 文件或 <style> 标签中 */
.force-wrap .el-descriptions-item label {
  white-space: pre-wrap; /* 这会保留空白符并允许换行 */
}

.force-wrap .el-descriptions-item .el-descriptions-item__label {
  flex-basis: 100%; /* 设置标签宽度为100%，确保内容换行 */
}
.space-placeholder {
  margin-top: 12em;}

.button-container {
  display: flex;
  justify-content: center;
  padding: 1em 0;
}
</style>
