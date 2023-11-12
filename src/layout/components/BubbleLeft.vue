<template>
  <div class="message-box">{{value}}</div>
</template>

<script>
export default {
  name: 'BubbleLeft',
  props: ['value'],
  computed: {
    model: {
      get() {
        return this.value
      },
      set(newValue) {
        console.log(this.newValue)
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
  border: 1px solid #00b2b2;
  border-radius: 5px;
  background: #00b2b2;
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
  left: -8px;
  border-top: 8px solid transparent;
  border-bottom: 8px solid transparent;
  border-right: 8px solid #00b2b2;
}
</style>
