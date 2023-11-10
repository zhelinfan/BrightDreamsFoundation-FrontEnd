<template>
  <div class="wrapper-container">
    <ChildNavbar />
    <div class="content-container">
      <img src="@/assets/chat_images/back.jpg" class="back">
      <div class="chat-box">
        <div class="chat-people">
          <img src="@/assets/market_images/images.png" class="vol-photo">
          <div class="volunteer">
            <span class="vol-name">潘geigei</span>
            <span class="vol-sch">东北大学 软件学院</span>
          </div>
        </div>
        <el-main class="chat-part">
        </el-main>
        <div class="control-part">
          <div class="normal">
            <el-input class="input-box" size="medium"></el-input>
            <el-button size="medium" type="primary" icon="el-icon-s-promotion" class="send-button"></el-button>
            <el-button size="medium" icon="el-icon-plus" circle class="more"></el-button>
            <!--            <img src="@/assets/chat_images/plane.png" class="plane">-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ChildNavbar from '@/layout/components/childNavbar.vue'
export default {
  name: 'TextChat',
  components: {
    ChildNavbar
  },
  data() {

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
  height: 70%;
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
  border: 1px solid #000;

}
</style>
