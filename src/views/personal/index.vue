<template>
  <div class="wrapper-container">
    <img src="@/assets/personal_images/back.jpg" class="back">
    <ChildNavbar />
    <div class="content-container">
      <div class="top">
<!--        <img :src="require('@/assets/personal_images/top_picture1.jpg')" class="top-picture">-->
        <div class="top-picture"></div>
        <div class="avatar-container">
          <el-avatar :src="require('@/assets/childnav_images/child.png')" class="avatar" :size="56" />
          <div class="username">{{ person.username }}</div>
          <div class="flower-container">
            <img :src="require('@/assets/personal_images/flower.png')" class="flower">
            <span class="flower-number">{{ flowerNumber }}</span>

          </div> <div class="write">"且将新火试新茶，诗酒趁年华。"</div>
        </div>
        <div class="account-security">
          <span class="title1">账号安全</span>
          <div class="as-content">
            <div class="container">
              <div class="title">用户名</div>
              <div v-if="!isEditingUsername" class="valuePart">{{ person.username }}</div>
              <div v-else class="valuePart">
                <el-input v-model="person.username" size="mini" class="el-input" type="text" @keyup.enter="this.isEditingUsername = false" />
              </div>
              <div class="edit-button" @click="saveEditUsername">{{ isEditingUsername ? '确认修改' : '修改' }}</div>
            </div>
            <div class="container">
              <div class="title">密码</div>
              <div v-if="!isEditingPassword" class="valuePart" :type="passwordType">******</div>
              <div v-else class="valuePart">
                <el-input
                  ref="password"
                  v-model="person.password"
                  size="mini"
                  class="el-input"
                  :type="passwordType"
                  show-password
                  @keyup.enter="this.isEditingPassword = false"
                />
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
                <el-select v-model="person.school" size="mini" type="text" class="el-input" @keyup.enter="this.isEditingSchool = false" >
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </div>
              <div class="edit-button" @click="saveEditSchool">{{ isEditingSchool ? '确认修改' : '修改' }}</div>
            </div>
            <div class="container">
              <div class="title">班级</div>
              <div v-if="!isEditingClass" class="valuePart">{{ person.class }}</div>
              <div v-else class="valuePart">
                <el-input v-model="person.class" size="mini" type="text" class="input-box" @keyup.enter="this.isEditingClass = false" />
              </div>
              <div class="edit-button" @click="saveEditClass">{{ isEditingClass ? '确认修改' : '修改' }}</div>
            </div>
            <div class="container">
              <div class="title">真实姓名</div>
              <div v-if="!isEditingTrueName" class="valuePart">{{ person.realName }}</div>
              <div v-else class="valuePart">
                <el-input v-model="person.realName" size="mini" type="text" class="input-box" @keyup.enter="this.isEditingTrueName = false" />
              </div>
              <div class="edit-button" @click="saveEditTrueName">{{ isEditingTrueName ? '确认修改' : '修改' }}</div>
            </div>
            <div class="container">
              <div class="title">年龄</div>
              <div v-if="!isEditingAge" class="valuePart">{{ person.age }}</div>
              <div v-else class="valuePart">
                <el-select v-model="person.age" size="mini" type="text" class="el-input" @keyup.enter="this.isEditingAge = false" >
                  <el-option
                    v-for="item in age_options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </div>
              <div class="edit-button" @click="saveEditAge">{{ isEditingAge ? '确认修改' : '修改' }}</div>
            </div>
            <div class="container">
              <div class="title">性别</div>
              <div v-if="!isEditingGender" class="valuePart">{{ person.gender }}</div>
              <div v-else class="valuePart">
                <el-select v-model="person.gender" size="mini" type="text" class="el-input" @keyup.enter="this.isEditingGender = false" >
                  <el-option
                    v-for="item in gender_options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
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
import api from '@/api/personal'
export default {
  name: 'Personal',
  components: { ChildNavbar },
  data() {
    return {
      options: [{
        value: '大河完小',
        label: '大河完小'
      }, {
        value: '阳光小学',
        label: '阳光小学'
      }, {
        value: '明光小学',
        label: '明光小学'
      }
      ],
      age_options: [{
        value: '6',
        label: '6'
      }, {
        value: '7',
        label: '7'
      }, {
        value: '8',
        label: '8'
      }, {
        value: '9',
        label: '9'
      }, {
        value: '10',
        label: '10'
      }, {
        value: '11',
        label: '11'
      }, {
        value: '12',
        label: '12'
      }
      ],
      gender_options: [{
        value: '0',
        label: '男'
      }, {
        value: '1',
        label: '女'
      }
      ],
      flowerNumber: '',
      passwordType: 'password',
      isEditingUsername: false,
      isEditingPassword: false,
      isEditingSchool: false,
      isEditingClass: false,
      isEditingTrueName: false,
      isEditingAge: false,
      isEditingGender: false,
      person: {
        id: '',
        username: '小明同学',
        password: '111111s',
        school: '大河完小',
        class: '一年一班',
        realName: 'pmh',
        age: '6',
        gender: '男'
      },
      user: ''
    }
  },
  created() {
    this.fetchPersonalInfo()
  },
  methods: {
    getCookie() {
      const arr = document.cookie.split(';')
      for (let i = 0; i < arr.length; i++) {
        const arr2 = arr[i].split('=')
        if (arr2[0] === 'userInfo' || arr2[0] === ' userInfo') {
          const userinfo = JSON.parse(arr2[1])
          return userinfo
        }
      }
      return ''
    },
    fetchPersonalInfo() {
      const userId = this.getCookie().id
      api.getUserInfo(userId).then(response => {
        this.user = response.data
        this.person.id = this.user.id
        this.person.username = this.user.username
        this.person.password = this.user.password
        this.person.school = this.user.school
        this.person.class = this.user.clazz
        this.person.realName = this.user.realName
        this.person.age = this.user.age
        this.flowerNumber = this.user.points
        if (this.getCookie().gender === 0) {
          this.person.gender = '男'
        } else {
          this.person.gender = '女'
        }
      })
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    saveEditUsername() {
      this.isEditingUsername = !this.isEditingUsername
      this.user.username = this.person.username
      const updatedUserInfoJSON = JSON.stringify(this.user)
      document.cookie = `userInfo=${updatedUserInfoJSON}; path=/`
      api.updateUserInfo(this.user)
    },
    saveEditPassword() {
      this.isEditingPassword = !this.isEditingPassword
      this.user.password = this.person.password
      const updatedUserInfoJSON = JSON.stringify(this.user)
      document.cookie = `userInfo=${updatedUserInfoJSON}; path=/`
      api.updateUserInfo(this.user)
    },
    saveEditSchool() {
      this.isEditingSchool = !this.isEditingSchool
      this.user.school = this.person.school
      const updatedUserInfoJSON = JSON.stringify(this.user)
      document.cookie = `userInfo=${updatedUserInfoJSON}; path=/`
      api.updateUserInfo(this.user)
    },
    saveEditClass() {
      this.isEditingClass = !this.isEditingClass
      this.user.clazz = this.person.class
      api.updateUserInfo(this.user)
    },
    saveEditTrueName() {
      this.isEditingTrueName = !this.isEditingTrueName
      this.user.realName = this.person.realName
      api.updateUserInfo(this.user)
    },
    saveEditAge() {
      this.isEditingAge = !this.isEditingAge
      this.user.age = this.person.age
      api.updateUserInfo(this.user)
    },
    saveEditGender() {
      this.isEditingGender = !this.isEditingGender
      this.user.gender = this.person.gender
      api.updateUserInfo(this.user)
    }
  }
}
</script>

<style lang="scss" scoped>
.back{
  position: absolute;
  width: 100%;
  height: 80%;
}
.wrapper-container{
  position: absolute;
  width: 100%;
  height: 137%;
  //background-color: #fdf4e6;
  background-color: #f9ead8;
  display: flex;
  flex-direction: column;
}
.content-container{
  position: absolute;
  top: 10%;
  left: 0;
  width: 100%;
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  //background-color: #fdf4e6;
  //background-color: transparent;
}
.top{
  position: absolute;
  width: 68%;
  height: 46%;
  flex: 1;
  top: 6%;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}
.bottom{
  background-color: #fff;
  position: absolute;
  top: 54%;
  width: 68%;
  height: 39%;
  border: 1px solid #BBBBBB;
  margin-top: 30px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}
/*top*/
.top-picture{
  position: absolute;
  width: 100%;
  height: 49%;
  z-index: 0;
  border: 2px solid #ead0c2;
  background-color: transparent;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
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
  color: #000000;
}
.flower-container{
  /*border: 2px solid #000;*/
  position: absolute;
  left: 9%;
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
  color: #d2611d;
  font-size: smaller;
  font-weight: bold;
  margin-left: 5px;
}
.account-security{
  border: 1px solid #BBBBBB;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 53%;
  background-color: #ffffff;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
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
  width: 90%;
  padding-top: 4px;
  margin-bottom: 8px;
  height: 31px;
  align-items: center;
  border-bottom: 1px solid #d9d9d9;
  /*border: 1px solid #000;*/
}

.valuePart{
  margin-left: 5px;
  color: rgba(84, 84, 84);
}
.edit-button{
  color: #1482f0;
  font-size: small;
  margin-left: 20px;
}
.as-content{
  position: absolute;
  top: 36%;
  left: 7%;
  width: 50%;
}
.pi-content{
  position: absolute;
  top: 21%;
  left: 7%;
  width: 50%;
}
.title{
  font-weight: bold;
  font-size: small;
  color: rgba(98, 98, 98);
}
.valuePart{
  font-size: small;
  margin-left: 13px;
}
/*.input-box{*/
/*  font-size: small;*/
/*  border: 1px solid rgba(138, 137, 137, 0.6);*/
/*  width: 120px;*/
/*  height: 25px;*/
/*  padding-left: 8px;*/
/*  border-radius: 3px;*/
/*  align-content: center;*/
/*}*/
.show-pwd {
  font-size: 16px;
  color: #484848;
  cursor: pointer;
  user-select: none;
  margin-left: 3px;
}
.el-input{
  margin-bottom: 3px;
}
.write{
  position: absolute;
  top: 34%;
  left: 45%;
  height: 9%;
  width: 100%;
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  font-family: "FangSong", "STFangsong", "华文仿宋", serif;
}
</style>
