<template>
  <img class="message-box" :src="value"/>
</template>

<script>
export default {
  name: 'BubbleLeftImg',
  props: ['value'],
  computed: {
    model: {
      get() {
        return this.value
      },
      set(newValue) {
        this.$emit('input', newValue) // 通过 $emit 发送 input 事件通知父组件更新 value
      }
    }
  }
}
</script>

<style scoped>
.message-box{
  position: relative;
  display: inline-block;
  max-width: 200px;
  min-width: 50px;
  min-height: 40px;
  height: auto;
  width: auto;
  color: #000000;
  /*text-align: center;*/
  border: 1px solid #ffffff;
  border-radius: 5px;
  background: #ffffff;
  font-size: small;
  word-wrap: break-word;
  padding: 7px 13px;
  line-height: 1.7;
}
.message-box::after{
  content: '';
  position: absolute;
  width: 0;
  height: 0;
  top: 10px;
  right: -8px;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-left: 10px solid #ffffff;
}
</style>
