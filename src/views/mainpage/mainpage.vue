<template>
  <div class="content-container">
    <ChildNavbar />
    <div class="image-container">
<!--      <div class="image-front"></div>-->
      <img :src="require('@/assets/main_images/main2.png')" class="image-transition" fit="cover">
      <transition-group name="fade" tag="p" class="letter">
        <p v-for="(line, index) in textLines" :key="index" :class="{ 'last-line': index === 5 }">{{ line }}</p>
      </transition-group>
      <transition name="button-fade">
        <el-button v-if="showImage" class="button-transition">开 始 学 习</el-button>
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
      showImage: false,
      textLines: []
    }
  },
  mounted() {
    const textContent = [
      '亲爱的孩子：',
      '我们将陪伴你',
      '度过心灵的孤独时刻',
      '领略知识的美妙',
      '感受学习的快乐！',
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
  bottom: 0; /* 图片位于底部 */
  left: 0; /* 图片位于左侧，可以根据需要调整位置 */
  z-index: -1; /* 将图片的 z-index 设置为较小的值，确保它位于所有组件的最下方 */
  max-width: 100%; /* 图片最大宽度为100% */
  //max-height: 100%;
  height: auto;
  //max-height: 100%;
  //width: 1280px;
}
//button
.button-transition {
  position: absolute;
  left: 42%;
  top:67%;
  width: 260px; /* 初始宽度 */
  height: 60px; /* 初始高度 */
  margin-top: 70px;
  filter: brightness(1); /* 初始亮度较低 */
  background-color: #69daef;
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
  left: 10%;
  top: 10%;
  width: 300px;
  margin-top: 120px;
  margin-left: 250px;
  text-align: left;
  font-family: fangsong;
}
.last-line {
  margin-left: 100px; /* 调整最后一行文本的左边距 */
}
</style>
