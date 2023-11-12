<template>
  <div class="wrapper-container">
    <ChildNavbar v-model="navIndex"/>
    <div class="content-container">
      <img src="@/assets/chat_images/back.jpg" class="back" alt="">
      <div class="chat-box">
        <div class="chat-people">
          <img src="@/assets/market_images/images.png" class="vol-photo" alt="">
          <div class="volunteer">
            <span class="vol-name">潘giegie</span>
            <span class="vol-sch">东北大学 软件学院</span>
          </div>
        </div>
        <!--        <canvas id="myCanvas"></canvas>-->
        <el-main id="chatPart" ref="chatPart" class="chat-part">
          <div v-for="(item, index) in msgList" :key="index">
            <div v-if="msgList[index].senderId === userId" class="per-message-right">
              <img src="@/assets/childnav_images/child.png" class="child-av">
              <div class="wrapper-mt-right">
                <BubbleRight
                  v-if="msgList[index].pictureURL === undefined || msgList[index].pictureURL === ''"
                  v-model="msgList[index].content"
                  class="message-box-right"
                />
                <BubbleRightImg v-else v-model="msgList[index].pictureURL" class="message-box-right" />
                <span class="interact-time">{{ msgList[index].interactTime }}</span>
              </div>
            </div>
            <div v-else class="per-message-left">
              <img src="@/assets/market_images/images.png" class="vol-av">
              <div class="wrapper-mt-left">
                <BubbleLeft v-if="msgList[index].pictureURL === undefined" v-model="msgList[index].content" class="message-box-left" />
                <BubbleLeftImg v-else v-model="msgList[index].pictureURL" class="message-box-left" />
                <span class="interact-time">{{ msgList[index].interactTime }}</span>
              </div>
            </div>
          </div>
        </el-main>
        <div class="control-part">
          <div class="normal">
            <el-input v-model="msg" class="input-box" size="medium" placeholder="输入你想和哥哥/姐姐说的话哦！" @keyup.enter.native="handleEnter" />
            <el-button
              id="sendButton"
              size="medium"
              type="primary"
              icon="el-icon-s-promotion"
              class="send-button"
              @click="handleSendMsg"
            />
            <el-popover
              v-model="popVisible"
              placement="top"
              trigger="hover"
            >
              <div class="pop">
                <el-upload
                  id="upload"
                  :file-list="image"
                  :limit="1"
                  accept=".jpg,.png"
                  action="http://localhost:9528/mission/upload"
                  :before-upload="handleSendImg"
                  :on-error="emptyFileList"
                  class="upload-demo"
                >
                  <i class="el-icon-picture" />
                </el-upload>
                <el-button type="primary" class="upload-demo" size="mini" icon="el-icon-camera-solid"></el-button>
              </div>
              <el-button slot="reference" size="medium" icon="el-icon-plus" circle class="more" />
            </el-popover>
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
import BubbleRightImg from '@/layout/components/BubbleRightImg.vue'
import BubbleLeftImg from '@/layout/components/BubbleLeftImg.vue'
import api from '@/api/task'
let userId = ''
const arr = document.cookie.split(';')
for (let i = 0; i < arr.length; i++) {
  const arr2 = arr[i].split('=')
  if (arr2[0] === 'userInfo' || arr2[0] === ' userInfo') {
    const userinfo = JSON.parse(arr2[1])
    userId = userinfo.id
    // return userinfo
  }
}
const socket = new WebSocket('ws://localhost:8080/chat/' + userId)
console.log(socket)
export default {
  name: 'TextChat',
  components: {
    BubbleLeftImg,
    BubbleRightImg,
    ChildNavbar,
    BubbleLeft,
    BubbleRight
    // NormalMessage: NormalMessage/
  },
  data() {
    return {
      i: 0,
      navIndex: '4',
      userId: userId,
      receiverId: '',
      inputValue: '',
      msg: '',
      image: [{ name: '', url: '' }],
      popVisible: false,
      msgList: [
        {
          // childrenId: '',
          // volunteerId: '',
          // content: '',
          // interactionTime: ''
        }
      ],
      userName: '',
      uploadFileSizeLimit: 1000
    }
  },
  mounted() {
    // this.bindEvent()
    setTimeout(() => {
      this.scrollToButtom()
    }, 100)
  },
  created() {
    this.bindEvent()
    this.image = []
    // this.getCookie()
  },
  methods: {
    handleSendMsg() {
      if (!this.msg.trim().length) {
        return alert('不能发送空消息')
      }
      const messageSend = {
        senderId: this.userId,
        receiverId: this.receiverId,
        interactTime: this.getCurrentTime(),
        content: this.msg,
        amount: 1
      }
      socket.send(JSON.stringify(messageSend))
      this.msgList.push(messageSend)
      this.msg = ''
      this.scrollToButtom()
    },
    handleSendImg(file) {
      console.log('img enter')
      const formData = new FormData()
      formData.append('file', file)
      api.getUrl(formData).then(response => {
        console.log(response.data)
        if (response.code === 200) {
          const messageSend = {
            senderId: this.userId,
            receiverId: this.receiverId,
            interactTime: this.getCurrentTime(),
            amount: 1,
            pictureURL: response.data
          }
          socket.send(JSON.stringify(messageSend))
          this.msgList.push(messageSend)
          this.scrollToButtom()
          this.image = []
        }
      })
    },
    getCurrentTime() {
      const { DateTime } = require('luxon')
      const currentDateTime = DateTime.now().setZone('Asia/Shanghai')
      const formattedDateTime = currentDateTime.toFormat('yyyy-MM-dd HH:mm:ss')
      return formattedDateTime
    },
    scrollToButtom() {
      this.$nextTick(() => {
        const elMain = document.getElementById('chatPart')
        elMain.scrollTop = elMain.scrollHeight
      })
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
      // socket.addEventListener('close', this.handleClose.bind(this), false)
      socket.addEventListener('open', this.handleOpen.bind(this), false)
      // socket.addEventListener('error', this.handleError.bind(this), false)
      socket.addEventListener('message', this.handleMessage.bind(this), false)
    },
    emptyFileList() {
      this.image = []
    },
    handleOpen() {
      // this.$forceUpdate()
    },
    handleMessage({ data }) {
      console.log('message', data)
      if (this.i === 0) {
        this.msgList = JSON.parse(data)
        this.receiverId = this.msgList[0].receiverId
        this.i++
      } else {
        this.msgList.push(JSON.parse(data))
      }
      // this.msgList[0].content = 'pmh是大猪逼'
      this.scrollToButtom()
    },
    handleEnter() {
      console.log('enter')
      this.handleSendMsg()
      // document.getElementById('sendButton').click()
    }
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
  top: 7%;
  /*top: 5%;*/
  width: 80%;
  height: 85%;
  border-radius: 20px;
  /*background-color: rgba(156, 218, 208, 0.2);*/
  background-color: rgba(133, 207, 248, 0.4);
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
  left: 8%;
  width: 83%;
  height: 72%;
  border-top: 1px solid #ccc;
}
.normal{
  position: absolute;
  top: 90%;
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
.upload-demo{
  border-radius: 40%;
  border: 2px solid #f1c179;
  background-color: #ffe28e;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
  margin-right: 10px;
  box-shadow: 0 2px 12px 0 rgba(203, 203, 203, 0.1)
}
.upload-demo:hover{
  border: 2px solid #fcc06d;
  background-color: #ffd66f;
}
.el-icon-picture-outline:hover{
  background-color: #ffd66f;

}
.el-icon-picture-outline{
  background-color: #ffe28e;

}
.pop{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
</style>
