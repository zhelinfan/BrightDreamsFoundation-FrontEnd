<template>
  <div class="wrapper-container">
    <ChildNavbar />
    <div class="content-container">
      <div class="top">
        <img :src="require('@/assets/personal_images/top_picture.png')" class="top-picture">
        <div class="avatar-container">
          <el-avatar :src="require('@/assets/childnav_images/child.png')" class="avatar" :size="56" />
          <div class="username">{{ person.username }}</div>
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
                <input v-model="person.username" type="text" class="input-box" @keyup.enter="this.isEditingUsername = false">
              </div>
              <div class="edit-button" @click="saveEditUsername">{{ isEditingUsername ? '确认修改' : '修改' }}</div>
            </div>
            <div class="container">
              <div class="title">密码</div>
              <div v-if="!isEditingPassword" class="valuePart">{{ person.password }}</div>
              <div v-else class="valuePart">
                <input v-model="person.password" type="text" class="input-box" @keyup.enter="this.isEditingPassword = false">
              </div>
              <div class="edit-button" @click="saveEditPassword">{{ isEditingPassword ? '确认修改' : '修改' }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="bottom">
        <div class="personal-info">
          <span class="title2">个人信息</span>
          <div class="pi-content">
            <div class="container">
              <div class="title">学校</div>
              <div v-if="!isEditingSchool" class="valuePart">{{ person.school }}</div>
              <div v-else class="valuePart">
                <input v-model="person.school" type="text" class="input-box" @keyup.enter="this.isEditingSchool = false"/>
              </div>
              <div class="edit-button" @click="saveEditSchool">{{ isEditingSchool ? '确认修改' : '修改' }}</div>
            </div>
            <div class="container">
              <div class="title">班级</div>
              <div v-if="!isEditingClass" class="valuePart">{{ person.class }}</div>
              <div v-else class="valuePart">
                <input v-model="person.class" type="text" class="input-box" @keyup.enter="this.isEditingClass = false">
              </div>
              <div class="edit-button" @click="saveEditClass">{{ isEditingClass ? '确认修改' : '修改' }}</div>
            </div>
            <div class="container">
              <div class="title">真实姓名</div>
              <div v-if="!isEditingTrueName" class="valuePart">{{ person.trueName }}</div>
              <div v-else class="valuePart">
                <input v-model="person.trueName" type="text" class="input-box" @keyup.enter="this.isEditingTrueName = false">
              </div>
              <div class="edit-button" @click="saveEditTrueName">{{ isEditingTrueName ? '确认修改' : '修改' }}</div>
            </div>
            <div class="container">
              <div class="title">年龄</div>
              <div v-if="!isEditingAge" class="valuePart">{{ person.age }}</div>
              <div v-else class="valuePart">
                <input v-model="person.age" type="text" class="input-box" @keyup.enter="this.isEditingAge = false">
              </div>
              <div class="edit-button" @click="saveEditAge">{{ isEditingAge ? '确认修改' : '修改' }}</div>
            </div>
            <div class="container">
              <div class="title">性别</div>
              <div v-if="!isEditingGender" class="valuePart">{{ person.gender }}</div>
              <div v-else class="valuePart">
                <input v-model="person.gender" type="text" class="input-box" @keyup.enter="this.isEditingGender = false">
              </div>
              <div class="edit-button" @click="saveEditGender">{{ isEditingGender ? '确认修改' : '修改' }}</div>
            </div>
          </div>
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
      isEditingSchool: false,
      isEditingClass: false,
      isEditingTrueName: false,
      isEditingAge: false,
      isEditingGender: false,
      person: {
        username: '小明同学',
        password: '******',
        school: '大河完小',
        class: '一年一班',
        trueName: 'pmh',
        age: '6',
        gender: '男'
      }
    }
  },
  methods: {
    saveEditUsername() {
      this.isEditingUsername = !this.isEditingUsername
    },
    saveEditPassword() {
      this.isEditingPassword = !this.isEditingPassword
    },
    saveEditSchool() {
      this.isEditingSchool = !this.isEditingSchool
    },
    saveEditClass() {
      this.isEditingClass = !this.isEditingClass
    },
    saveEditTrueName() {
      this.isEditingTrueName = !this.isEditingTrueName
    },
    saveEditAge() {
      this.isEditingAge = !this.isEditingAge
    },
    saveEditGender() {
      this.isEditingPassword = !this.isEditingPassword
    }
  }
}
</script>

<style scoped>
.wrapper-container{
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #efefef;
  display: flex;
  flex-direction: column;
}
.content-container{
  position: absolute;
  top: 10%;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: #efefef;
}
.top{
  position: absolute;
  width: 68%;
  height: 48%;
  flex: 1;
  margin-top: 30px;
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
  margin-top: 30px;
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
.username{
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
  width: 70%;
  padding-top: 5px;
}

.valuePart{
  margin-left: 5px;
}
.edit-button{
  color: #1482f0;
  font-size: small;
  margin-left: 20px;
}
.as-content{
  position: absolute;
  top: 38%;
  left: 7%;
  width: 50%;
  display: table-column;
}
.pi-content{
  position: absolute;
  top: 25%;
  left: 7%;
  width: 50%;
  display: table-column;
}
.container{
  margin-bottom: 10px;
  height: 26px;
  display: flex;
  align-items: center;
}
.title{
  font-weight: bold;
  font-size: small;
  color: rgba(98, 98, 98);
}
.valuePart{
  font-size: small;
  margin-left: 15px;
}
.input-box{
  /*position: absolute;*/
  /*left: 20%;*/
  /*top: 10%;*/
  font-size: small;
  border: 1px solid rgba(138, 137, 137, 0.6);
  width: 120px;
  height: 20px;
  border-radius: 3px;
}
</style>
