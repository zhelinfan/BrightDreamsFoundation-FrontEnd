<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
      <div class="image-container">
        <img
          fit="fill"
          :src="require('@/assets/register_images/children1.png')"
          style="width: 250px; height: 140px"
        >
      </div>
      <div class="title-container">
        <h3 class="title">明光筑梦，伴你成长</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <i class="el-icon-user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="Username"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <i class="el-icon-key" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="Password"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:20px;" @click="handleLogin">登录</el-button>
      <el-button id="register" :loading="loading1" type="primary" style="width:100%;margin-bottom:20px;" @click="registerSwitch">注册</el-button>
    </el-form>
  </div>
</template>

<script>
// import { validUsername } from '@/utils/validate'
import api from '@/api/user'
export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: 'asdfzl',
        password: '222222'
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      loading1: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    // $route: {
    //   // handler: function(route) {
    //   //   this.redirect = route.query && route.query.redirect
    //   // },
    //   immediate: true
    // }
  },
  methods: {
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
    registerSwitch() {
      // this.loading1 = true
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading1 = true
          this.$store.dispatch('user/login', this.loginForm).then(() => {
            this.$router.push({ path: '/register' })
            this.loading1 = false
          }).catch(() => {
            this.loading1 = false
          })
        }
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          api.login(this.loginForm).then(response => {
            const code = response.code
            console.log(response.data)
            if (code === 200) {
              // 把用户存到cookie里
              const userInfoJSON = JSON.stringify(response.data)
              const cookieString = `userInfo=${userInfoJSON}; path=/`
              console.log(document.cookie)
              document.cookie = cookieString
              if ('token' in response.data) {
                this.$store.dispatch('user/login', this.loginForm).then(() => {
                  this.$router.push({ path: '/' })
                })
              } else {
                this.$store.dispatch('user/login', this.loginForm).then(() => {
                  this.$router.push({ path: '/mainpage' })
                })
              }
            } else {
              alert(response.message)
            }
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
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

$bg:#283443;
$light_gray:chocolate;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .image-container{
    display: flex;
    justify-content: center;
    margin-left: 15px;
    margin-bottom: 10px;
    margin-top: -110px;
  }
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

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
  .el-button{
    border: #3f3f40;
    background: chocolate;
  }
  .el-form-item {
    border: 2px solid rgba(170, 170, 170, 0.6);
    background: rgb(255, 255, 255,0.4);
    border-radius: 5px;
    color: #2d2d2d;
  }
}
</style>

<style lang="scss" scoped>
$bg: #ffd8b0;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {

  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    //border: 2px solid #000;
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
    align-items: center;
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
  #register{
    margin-top: 5px;
    margin-left: -0.4px;
  }
}
</style>
