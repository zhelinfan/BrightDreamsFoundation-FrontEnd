<template>
  <div class="wrapper-container">
    <ChildNavbar />
    <div class="content-container">
      <img src="@/assets/chat_images/back.jpg" class="back">
      <div class="chat-box">
        <div class="chat-people">
          <img src="@/assets/market_images/images.png" class="vol-photo">
          <div class="volunteer">
            <span class="vol-name">潘giegie</span>
            <span class="vol-sch">东北大学 软件学院</span>
          </div>
        </div>
        <el-main class="chat-part">
          <div v-for="(item, index) in msgList" :key="index">
            <div v-if="msgList[index].senderId === userId" class="per-message-right">
              <img src="@/assets/childnav_images/child.png" class="child-av">
              <div class="wrapper-mt-right">
                <BubbleRight v-model="msgList[index].content" class="message-box-right" />
                <span class="interact-time">{{ new Date(msgList[index].interactTime) }}</span>
              </div>
            </div>
            <div  v-else class="per-message-left">
              <img src="@/assets/market_images/images.png" class="vol-av">
              <div class="wrapper-mt-left">
                <BubbleLeft v-model="msgList[index].content" class="message-box-left" />
                <span class="interact-time">{{ new Date(msgList[index].interactTime) }}</span>
              </div>
            </div>
          </div>
        </el-main>
        <div class="control-part">
          <div class="normal">
            <el-input v-model="msg" class="input-box" size="medium" />
            <el-button size="medium" type="primary" icon="el-icon-s-promotion" class="send-button" @click="handleSendMsg" />
            <el-button size="medium" icon="el-icon-plus" circle class="more" />
            <!--            <img src="@/assets/chat_images/plane.png" class="plane">-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from 'axios'
import ChildNavbar from '@/layout/components/childNavbar.vue'
import BubbleLeft from '@/layout/components/BubbleLeft.vue'
import BubbleRight from '@/layout/components/BubbleRight.vue'
const socket = new WebSocket('ws://localhost:8080/chat/18')

export default {
  name: 'TextChat',
  components: {
    ChildNavbar,
    BubbleLeft,
    BubbleRight
    // NormalMessage: NormalMessage/
  },
  data() {
    return {
      i: 0,
      userId: '',
      inputValue: '',
      msg: '',
      msgList: [
        {
          // childrenId: '',
          // volunteerId: '',
          // content: '',
          // interactionTime: ''
        }
      ],
      userName: ''
    }
  },
  mounted() {
    this.bindEvent()
    this.userName = 'asdfzl'
  },
  created() {
    this.getCookie()
  },
  methods: {
    handleSendMsg() {
      if (!this.msg.trim().length) {
        return alert('不能发送空消息')
      }
      socket.send(JSON.stringify({
        user: this.userName,
        msg: this.msg,
        dateTime: new Date()
      }))
    },
    getCookie() {
      const arr = document.cookie.split(';')
      for (let i = 0; i < arr.length; i++) {
        const arr2 = arr[i].split('=')
        if (arr2[0] === 'userInfo' || arr2[0] === ' userInfo') {
          const userinfo = JSON.parse(arr2[1])
          this.userId = userinfo.id
          // return userinfo
        }
      }
      return ''
    },
    bindEvent() {
      console.log('绑定事件')
      // socket.addEventListener('close', this.handleClose.bind(this), false)
      // ws.addEventListener('open', this.handleOpen.bind(this), false)
      // socket.addEventListener('error', this.handleError.bind(this), false)
      socket.addEventListener('message', this.handleMessage.bind(this), false)
    },
    handleMessage({ data }) {
      console.log('message', data)
      if (this.i === 0) {
        this.msgList = JSON.parse(data)
        this.i++
      } else {
        this.msgList.push(JSON.parse(data))
      }
      // this.msgList[0].content = 'pmh是大猪逼'
      console.log(this.msgList)
    }
    // OnOpen() {
    //   socket.onopen = function(event) {
    //   }
    // },
    // OnMessage() {
    //   socket.onmessage = function(event) {
    //     console.log(event.data)
    //     this.msgList.push(event.data)
    //     console.log(this.msgList)
    //   }
    // },
    // OnClick() {
    //   const interaction = {}
    //   interaction.volunteerId = 18
    //   interaction.childrenId = 1
    //   interaction.type = 2
    //   interaction.content = this.msg
    //   socket.send(JSON.stringify(interaction))
    // },
    // OnClose() {
    //   socket.onclose = function(e) {
    //     console.log('websocket 断开: ' + e.code + ' ' + e.reason + ' ' + e.wasClean)
    //     console.log(e)
    //   }
    // },
    // OnError() {
    //   socket.onerror = function(e) {
    //     console.log(e)
    //   }
    // }
  }
}
</script>

<style scoped>
.content-container{
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-content: center;
  justify-content: center;
  /*border: 1px solid #000;*/
  background-color: transparent;
}
.back{
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: -1;
}
.chat-box{
  position: absolute;
  top: 8%;
  /*top: 5%;*/
  width: 80%;
  height: 80%;
  border-radius: 20px;
  background-color: rgba(156, 218, 208, 0.18);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
}
.chat-people{
  position: absolute;
  top: 5%;
  left: 2%;
  width: 190px;
  height: 55px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  /*border-bottom: 1px #c0c0a6 solid;*/
}
.vol-photo{
  width: 50px;
  height: 50px;
  border-radius: 20%;
}
.volunteer{
  display: flex;
  flex-direction: column;
  margin-left: 10px;
}
.vol-sch{
  font-size: small;
}
.chat-part{
  position: absolute;
  top: 16%;
  left:8%;
  width: 85%;
  height: 72%;
  /*border: 1px solid #000;*/
}
.normal{
  position: absolute;
  top: 86%;
  left: 8%;
  width: 85%;
  height: 10%;
  display: flex;
  flex-direction: row;
  /*border: 1px solid #000;*/
}
.input-box{
  position: absolute;
  top: 5%;
  left: 3%;
  width: 80%;

}
.send-button{
  position: absolute;
  top: 5%;
  right: 7%;
  /*margin-left: 10px;*/
  width: 60px;
  height: 36px;
  background-color: #15d2e1;
  border-color: #15d2e1;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
}
.send-button:hover{
  background-color: #12b5c1;
  border-color: #12b5c1;
}
.more{
  position: absolute;
  top: 2%;
  right: 1%;
  background-color: #fde07f;
  border: 2px solid #fccc5f;
}
.more:hover{
  background-color: #ffd046;
  border: 2px solid #ffbd26;
  color: #c7621c;
}
.plane{
  position: absolute;
  top: 5%;
  right: 8%;
  width: 40px;
  height: 40px;
  /*border: 1px solid #000;*/

}
.interact-time{
  font-size: 10px;
  color: #3f3f40;
  margin-top: 3px;
  /*border: 1px solid #000;*/
}
.vol-av{
  /*border: 1px solid #000;*/
  width: 40px;
  height: 40px;
  border-radius: 20%;
  margin-right: 15px;
}
.child-av{
  width: 50px;
  height: 50px;
  border-radius: 20%;
  margin-left: 15px;
}
.per-message-left{
  /*border: 1px solid #000;*/
  display: flex;
  flex-direction: row;
  height: auto;
  margin-bottom: 5px;
}
.per-message-right{
  display: flex;
  flex-direction: row-reverse;
  height: auto;
  margin-bottom: 5px;
}
.wrapper-mt-left{
  /*border: 1px solid #000;*/
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: auto;
  height: auto;
}
.wrapper-mt-right{
  /*border: 1px solid #000;*/
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: auto;
  height: auto;
}
</style>
