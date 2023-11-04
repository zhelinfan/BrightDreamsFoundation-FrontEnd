<template>
  <div class="register-container">
    <el-form ref="registerForm" :model="registerForm" :rules="registerRules" class="register-form" auto-complete="on" label-position="left">
      <div class="image-container">
        <img
          fit="fill"
          :src="require('@/assets/register_images/children1.png')"
          style="width: 300px; height: 170px"/>
      </div>
      <div class="title-container">
        <h3 class="title">小同学，欢迎注册！!</h3>
      </div>
      <el-form-item ref="username" prop="username">
        <span class="svg-container">
          <i class="el-icon-user" />
        </span>
        <el-input
          :key="classType"
          ref="password"
          v-model="registerForm.username"
          :type="classType"
          placeholder="用户名"
          name="username"
          tabindex="1"
        />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <i class="el-icon-key" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="registerForm.password"
          :type="passwordType"
          placeholder="密码"
          name="password"
          tabindex="2"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>
      <el-form-item prop="password_confirm">
        <span class="svg-container">
          <i class="el-icon-key" />
        </span>
        <el-input
          :key="passwordType"
          ref="password_confirm"
          v-model="password_confirm"
          :type="passwordType"
          placeholder="确认密码"
          name="password_confirm"
          tabindex="3"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon v-bind:icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>
      <el-form-item prop="realName">
        <span class="svg-container">
          <i class="el-icon-edit"/>
        </span>
        <el-input
          :key="classType"
          ref="name"
          v-model="registerForm.realName"
          :type="classType"
          placeholder="真实姓名"
          name="realNamename"
          tabindex="4"
        />
      </el-form-item>
      <el-form-item prop="school">
        <span class="svg-container">
          <i class="el-icon-school"/>
        </span>
        <el-select v-model="registerForm.school" placeholder="请选择你的学校哦">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item prop="class">
        <span class="svg-container">
          <i class="el-icon-table-lamp"/>
        </span>
        <el-input
          :key="classType"
          ref="class"
          v-model="registerForm.class"
          :type="classType"
          placeholder="班级"
          name="class"
          tabindex="5"
        />
      </el-form-item>
      <el-form-item id="gender-item">
        <el-radio v-model="registerForm.gender" label="0">男</el-radio>
        <el-radio v-model="registerForm.gender" label="1">女</el-radio>
      </el-form-item>
      <el-form-item prop="age">
        <span class="svg-container">
          <i class="el-icon-date"/>
        </span>
        <el-select v-model="registerForm.age" placeholder="请选择你的年龄哦">
          <el-option
            v-for="item in age_options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleRegister">注册你的新账户啦！</el-button>

    </el-form>
  </div>
</template>

<script>
import api from '@/api/register'
export default {
  name: 'Register',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value.length < 1) {
        callback(new Error('请重新输入你的用户名哦'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 1) {
        callback(new Error('密码太短，再改改吧！'))
      } else {
        callback()
      }
    }
    const validatePassConfirm = (rule, value, callback) => {
      if (this.password_confirm !== this.registerForm.password) {
        console.log(this.registerForm.password)
        console.log(this.password_confirm)
        callback(new Error('两次输入的密码不一样哦！'))
      } else {
        callback()
      }
    }
    const validate = (rule, value, callback) => {
      if (value.length < 1) {
        callback(new Error('还有未输入的信息哦'))
      } else {
        callback()
      }
    }
    return {
      options: [{
        value: '1',
        label: '大河完小'
      }, {
        value: '2',
        label: '阳光小学'
      }, {
        value: '3',
        label: '明光小学'
      }
      ],
      age_options: [{
        value: '1',
        label: '6'
      }, {
        value: '2',
        label: '7'
      }, {
        value: '3',
        label: '8'
      }, {
        value: '4',
        label: '9'
      }, {
        value: '5',
        label: '10'
      }, {
        value: '6',
        label: '11'
      }, {
        value: '7',
        label: '12'
      }
      ],
      registerForm: {
        school: '',
        class: '',
        realName: '',
        gender: '',
        age: '',
        username: '',
        password: ''
      },
      registerRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
        password_confirm: [{ required: true, trigger: 'blur', validator: validatePassConfirm }],
        realName: [{ required: true, trigger: 'blur', validator: validate }],
        school: [{ required: true, trigger: 'blur', validator: validate }],
        class: [{ required: true, trigger: 'blur', validator: validate }],
        gender: [{ required: true, trigger: 'blur', validator: validate }],
        age: [{ required: true, trigger: 'blur', validator: validate }]
      },
      password_confirm: '',
      passwordType: 'password',
      suggestionList: [],
      loading: false,
      classType: 'class',
      redirect: undefined,
      url: ''
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    trimRealName() {
      this.registerForm.school = this.registerForm.school.trim()
      this.registerForm.class = this.registerForm.class.trim()
      this.registerForm.realName = this.registerForm.realName.trim()
      this.registerForm.gender = this.registerForm.gender.trim()
      this.registerForm.age = this.registerForm.age.trim()
      this.registerForm.username = this.registerForm.username.trim()
      this.registerForm.password = this.registerForm.password.trim()
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
    handleRegister() {
      this.$refs.registerForm.validate(valid => {
        if (valid) {
          this.trimRealName()
          this.loading = true
          api.register(this.registerForm).then(response => {
            this.loading = false
            const code = response.code
            if (code === '404') {
              this.loading = false
              // this.suggestionList = [{ value: '用户名重复啦，再改改吧' }]
              alert('用户名重复啦，再改改吧！')
            }
            if (code === 200) {
              this.$router.push('/login')
            }
          })
        } else {
          this.loading = false
          alert('提交错误')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #efaa43;
$light_gray: chocolate;
$cursor: #484848;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .register-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.register-container {
  //margin-top: 50px;
  .image-container{
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
  }
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    ::placeholder {
      color: rgb(93, 93, 93);
    }
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $light_gray;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    //border: 2px solid rgba(170, 170, 170, 0.6);
    //background: rgb(255, 255, 255,0.4);
    //border-radius: 5px;
    //color: #2d2d2d;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
  #gender-item{
    background: transparent;
    border: 0px;
  }
  .el-radio{
    text-color: chocolate;
    fill: chocolate;
    color: chocolate;
  }
}
</style>

<style lang="scss" scoped>
$bg: #ffd8b0;
$dark_gray: #484848;
$light_gray: #ffb859;

.register-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .register-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }
  .el-select{
    width: 93%;
  }
  .el-button{
    border: #3f3f40;
    background: chocolate;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: #484848;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .icon{
    color: chocolate;
  }
}
</style>
