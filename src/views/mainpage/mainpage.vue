<template>
  <div class="content-container">
    <ChildNavbar v-model="navIndex"/>
    <div class="image-container">
<!--      <div class="image-front"></div>-->
      <img :src="require('@/assets/main_images/main1.jpg')" class="image-transition">
      <transition-group name="fade" tag="p" class="letter">
        <p v-for="(line, index) in textLines" :key="index" :class="{ 'last-line': index === 7 }">{{ line }}</p>
      </transition-group>
      <transition name="button-fade">
        <el-button v-if="showImage" class="button-transition" @click="taskSwitch">开 始 学 习</el-button>
      </transition>
    </div>
  </div>
</template>

<script>
import ChildNavbar from '@/layout/components/childNavbar.vue'
export default {
  name: 'Mainpage',
  components: {
    ChildNavbar
  },
  data() {
    return {
      navIndex: '1',
      showImage: false,
      textLines: []
    }
  },
  mounted() {
    const textContent = [
      '亲爱的孩子',
      '我们将陪伴你',
      '度过心灵的孤独时刻',
      '领略知识的美妙',
      '感受学习的快乐',
      '在交流中',
      '享受生活的阳光灿烂',
      '        ——明光筑梦守护者'
    ]
    // 逐行显示文本
    this.showTextLines(textContent)
    // 在页面加载后，延时一段时间后显示图片
    setTimeout(() => {
      this.showImage = true
    }, 6000) // 1000毫秒（1秒）延时
  },
  methods: {
    showTextLines(textContent) {
      let index = 0
      const interval = 1000 // 逐行显示的时间间隔（毫秒）

      const showNextLine = () => {
        if (index < textContent.length) {
          this.textLines.push(textContent[index])
          index++
          setTimeout(showNextLine, interval)
        }
      }
      showNextLine()
    },
    taskSwitch() {
      this.$router.push({ path: '/task' })
    }
  }
}
</script>

<style lang="scss">
.content-container{
  text-align: center;
}
//image
.image-transition {
  position: absolute; /* 设置绝对定位 */
  top:5%; /* 图片位于底部 */
  left: 0; /* 图片位于左侧，可以根据需要调整位置 */
  z-index: -1; /* 将图片的 z-index 设置为较小的值，确保它位于所有组件的最下方 */
  width: 100%; /* 图片最大宽度为100% */
  height: 110%;
}
//button
.button-transition {
  position: absolute;
  top: 88%;
  left: 30%;
  width: 260px; /* 初始宽度 */
  height: 58px; /* 初始高度 */
  filter: brightness(1); /* 初始亮度较低 */
  background-color: #9cd9cf;
  border: 3px solid #4ea3b0;
  color: #fff;
  font-weight: bold;
  font-size: large;
  box-shadow: 3px 3px 12px 2px rgba(138, 137, 137, 0.6);
}

.button-transition:hover{
  background-color: #fd9e51;
  border: 3px solid #D77048FF;
  color: #fff;
  font-weight: bold;
  font-size: large;
}
.button-fade-enter-active,.button-fade-leave-active {
  transition: width 1s, height 1s, filter 0.5s; /* 过渡效果持续时间 */
}

.button-fade-enter, .button-fade-leave-to {
  width: 0px; /* 最终宽度 */
  height: 0px; /* 最终高度 */
  filter: brightness(0.5); /* 最终亮度正常 */
}

//letter
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
.letter{
  position: absolute;
  top: 30%;
  left: 30%;
  width: 300px;
  text-align: left;
  font-family: fangsong;
  font-size: larger;
}
.last-line {
  margin-left: 80px; /* 调整最后一行文本的左边距 */
}
</style>
