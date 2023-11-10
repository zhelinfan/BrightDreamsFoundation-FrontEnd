<template>
  <el-menu
    :default-active="activeIndex2"
    class="el-menu"
    mode="horizontal"
    active-text-color="#b2571b"
    text-color="#c7621c"
    @select="handleSelect"
  >
    <el-menu-item id="el-menu-item-0" index="0" class="el-menu-item" disabled>
      <img
        class="sun-image"
        style="width: 65px; height: 65px"
        fit="fill"
        :src="require('@/assets/childnav_images/sun.png')"
      >
      <img
        class="sun-image"
        style="width: 100px"
        fit="fill"
        :src="require('@/assets/childnav_images/title.png')"
      >
    </el-menu-item>
    <el-menu-item id="el-menu-item-1" index="1" class="el-menu-item" @click="mainSwitch">首页</el-menu-item>
    <el-submenu id="submenu" index="2">
      <template id="el-menu-item-2" slot="title">任务广场</template>
      <el-menu-item id="submenu-item-2-1" index="2-1" @click="unTaskSwitch">未完成任务</el-menu-item>
      <el-menu-item id="submenu-item-2-2" index="2-2" @click="alreadyTaskSwitch">已完成任务</el-menu-item>
    </el-submenu>
    <el-menu-item id="el-menu-item-3" index="3" class="el-menu-item" @click="shopSwitch">积分商城</el-menu-item>
    <el-menu-item id="el-menu-item-4" index="4" class="el-menu-item" @click="chatSwitch">聊天互动</el-menu-item>

    <el-dropdown class="avatar-container" index="5">
      <div class="avatar-wrapper">
        <el-avatar :src="require('@/assets/childnav_images/child.png')" :size="41" />
        <div class="username">{{ username }}</div>
      </div>
      <el-dropdown-menu slot="dropdown" class="user-dropdown">
        <router-link to="/personal">
          <el-dropdown-item>个人中心</el-dropdown-item>
        </router-link>
        <router-link to="/rewardHistory">
          <el-dropdown-item>历史积分</el-dropdown-item>
        </router-link>
        <el-dropdown-item divided @click.native="logOut">
          <span style="display:block;">退出</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-menu>
</template>

<script>
export default {
  name: 'ChildNavbar',
  data() {
    return {
      activeIndex: '1',
      activeIndex2: '1',
      username: '小明同学'
    }
  },
  created() {
    this.fetchUsername()
    // setInterval(() => {
    //   const cookieUsername = this.getCookie().username
    //   console.log(this.getCookie())
    //   this.username = cookieUsername
    // }, 5000)
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
    fetchUsername() {
      this.username = this.getCookie().username
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    },
    mainSwitch() {
      this.$router.push({ path: '/mainpage' })
    },
    unTaskSwitch() {
      this.$router.push({ path: '/task' })
    },
    // severalTaskSwitch() {
    //   this.$router.push({ path: '/several' })
    // },
    alreadyTaskSwitch() {
      this.$router.push({ path: '/already' })
    },
    shopSwitch() {
      this.$router.push({ path: '/market' })
    },
    chatSwitch() {
      this.$router.push({ path: '/chat' })
    },
    logOut() {
      this.$router.push({ path: '/login' })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-menu{
  //background-color: #f9ead8;
  background-color: #ffffff;
}
#el-menu-item-0{
  opacity: 1;
  margin-right: 0px;
}
#el-menu-item-1,#el-menu-item-3,#el-menu-item-4{
  color: #c7621c;
}
#el-menu-item-1:hover,#el-menu-item-3:hover,#el-menu-item-4:hover{
  background-color: rgba(248, 176, 68, 0.1);
  color: #b2571b;
}
#el-menu-item-1.is-active,#el-menu-item-3.is-active,#el-menu-item-4.is-active{
  border-bottom: 2px solid #c7621c; /* 设置底边框样式 */
}
.avatar-container{
  position: absolute;
  right: 3%;
  width: 9%;
  height: 90%;
  margin-top: 8px;
  margin-bottom: 8px;
  display: flex;
}
.user-dropdown{
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  margin-top: 10px;
}
.username{
  position: absolute;
  color: #575757;
  font-weight: bold;
  left: 50%;
  margin-top: -30px;
}
#submenu-item-2-1:hover,#submenu-item-2-2:hover,#submenu-item-2-3:hover{
  background-color: rgba(248, 176, 68, 0.1);
  color: #b2571b;
}
#submenu-item-2-1.is-active,#submenu-item-2-2.is-active,#submenu-item-2-3.is-active{
  color: #c7621c;
  background-color: rgba(248, 176, 68, 0.1);
}

</style>
