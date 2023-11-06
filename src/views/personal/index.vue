<template>
  <div class="wrapper-container">
    <ChildNavbar />
    <div class="content-container">
      <div class="top">
        <img :src="require('@/assets/personal_images/top_picture.png')" class="top-picture">
        <div class="avatar-container">
          <el-avatar  :src="require('@/assets/childnav_images/child.png')" class="avatar" :size="56"/>
          <div class="username-pic">{{ person.username }}</div>
          <div class="flower-container">
            <img :src="require('@/assets/personal_images/flower.png')" class="flower">
            <span class="flower-number">{{ flowerNumber }}</span>
          </div>
        </div>
        <div class="account-security">
          <span class="title1">账号安全</span>
          <div class="as-content">
            <div class="container">
              <div class="title">用户名</div>
              <div v-if="!isEditingUsername" class="valuePart">{{ person.username }}</div>
              <div v-else class="valuePart">
                <input type="text" v-model="person.username" @keyup.enter="this.isEditingUsername = false"/>
              </div>
              <div class="edit-button" @click="isEditingUsername = !isEditingUsername">{{ isEditingUsername ? '确认修改' : '修改' }}</div>
            </div>
            <div class="container">
              <div class="title">用户名</div>
              <div v-if="!isEditingPassword" class="valuePart">{{ person.password }}</div>
              <div v-else class="valuePart">
                <input type="text" v-model="person.password" @keyup.enter="this.isEditingPassword = false"/>
              </div>
              <div class="edit-button" @click="isEditingPassword = !isEditingPassword">{{ isEditingPassword ? '确认修改' : '修改' }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="bottom">
        <div class="personal-info">
          <span class="title2">个人信息</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ChildNavbar from '@/layout/components/childNavbar.vue'
export default {
  name: 'Personal',
  components: { ChildNavbar },
  data() {
    return {
      flowerNumber: '100',
      isEditingUsername: false,
      isEditingPassword: false,
      editedValueUsername: '',
      person: {
        username: '小明同学',
        password: '123'
      }
    }
  },
  methods: {

  }
}
</script>

<style scoped>
.content-container{
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 90%;
  background-color: #efefef;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.top{
  position: absolute;
  width: 68%;
  height: 48%;
  flex: 1;
  margin-top: 30px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.bottom{
  background-color: #fff;
  position: absolute;
  bottom: 0;
  width: 68%;
  height: 40%;
  border: 1px solid #BBBBBB;
}
/*top*/
.top-picture{
  position: absolute;
  width: 100%;
  height: 47%;
  z-index: 0;
}
.avatar-container {
  position: absolute;
  /*border: 2px solid #000;*/
  display: flex;
  flex-direction: row;
  left: 5%;
  top: 23%;
  width: 30%;
}
.username-pic{
  position: absolute;
  top: 20%;
  left: 18%;
  margin-left: 20px;
  color: #f3f3f3;
}
.flower-container{
  /*border: 2px solid #000;*/
  position: absolute;
  left: 25%;
  top: 66%;
  width: 40%;
  height: 47%;
}
.flower{
  max-width: 17%;
  height: auto;
}
.flower-number{
  position: absolute;
  top: 10%;
  color: #f3f3f3;
  font-size: smaller;
  margin-left: 5px;
}
.account-security{
  border: 1px solid #BBBBBB;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 53%;
  background-color: #fff;
}
.title1{
  color: chocolate;
  font-weight: bold;
  /*font-size: small;*/
  position: absolute;
  margin-top: 20px;
  left: 4%;
  padding: 0 10px;
  display: block;
  border-radius: 4px;
  border-left:4px solid #d36e25;
}
.title2{
  color: chocolate;
  font-weight: bold;
  /*font-size: small;*/
  position: absolute;
  margin-top: 25px;
  left: 4%;
  padding: 0 10px;
  display: block;
  border-radius: 4px;
  border-left:4px solid #d36e25;
}
.container{
  display: flex;
  flex-direction: row;
}

.valuePart{
  margin-left: 5px;
}
.edit-button{
  margin-left: 20px;
  color: #1482f0;
}
.as-content{
  position: absolute;
  top: 27%;
  left: 7%;
}
.container{
  margin-bottom: 10px;
}
.title{
  font-weight: bold;
  color: #2d2d2d;
}
</style>
