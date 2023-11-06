<template>
  <el-menu
    :default-active="activeIndex2"
    class="el-menu"
    mode="horizontal"
    @select="handleSelect"
    >
    <el-menu-item index="0" class="el-menu-item" id="el-menu-item-0" disabled>
      <img
        class="sun-image"
        style="width: 65px; height: 65px"
        fit= 'fill'
        :src="require('@/assets/childnav_images/sun.png')">
      <img
        class="sun-image"
        style="width: 100px"
        fit= 'fill'
        :src="require('@/assets/childnav_images/title.png')">
    </el-menu-item>
    <el-submenu index="1" id="el-menu-item-1" >
      <template slot="title">任务广场</template>
      <el-menu-item index="1" @click="taskSwitch">未完成任务</el-menu-item>
      <el-menu-item index="1" @click="taskSwitch">已完成任务</el-menu-item>
    </el-submenu>
    <el-menu-item index="2" class="el-menu-item" id="el-menu-item-2" @click="shopSwitch">积分商城</el-menu-item>
    <el-menu-item index="3" class="el-menu-item" id="el-menu-item-3" @click="chatSwitch">聊天互动</el-menu-item>

    <el-dropdown class="avatar-container" index="5" trigger="click">
      <div class="avatar-wrapper">
        <el-avatar :src="require('@/assets/childnav_images/child.png')" :size="41"></el-avatar>
        <div class="username-pic">小明同学</div>
      </div>
      <el-dropdown-menu slot="dropdown" class="user-dropdown">
        <router-link to="">
          <el-dropdown-item @click="personalCenter">个人中心</el-dropdown-item>
        </router-link>
        <router-link to="">
          <el-dropdown-item @click="historyScore">历史积分</el-dropdown-item>
        </router-link>
        <el-dropdown-item divided @click.native="logOut">
          <span style="display:block;">退出</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
<!--     <el-submenu index="4" class="el-menu-item" id="el-menu-item-4">-->
<!--        <el-avatar :src="require('@/assets/childnav_images/child.png')"></el-avatar>-->
<!--      <el-menu-item index="4-1">个人中心</el-menu-item>-->
<!--      <el-menu-item index="4-2">退出</el-menu-item>-->
<!--      <el-menu-item index="4-3">任务广场</el-menu-item>-->
<!--      <el-menu-item index="4-4">积分商城</el-menu-item>-->
<!--      <el-menu-item index="4-5">聊天互动</el-menu-item>-->
<!--    </el-submenu>-->
  </el-menu>
</template>

<script>
export default {
  name: 'ChildNavbar',
  data() {
    return {
      activeIndex: '1',
      activeIndex2: '1'
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    },
    taskSwitch() {
      this.$router.push({ path: '/task' })
    },
    shopSwitch() {
    },
    chatSwitch() {
    },
    personalCenter() {
      this.$router.push({ path: '/personal' })
    },
    historyScore() {
    },
    logOut() {
    }
  }
}
</script>

<style lang="scss" scoped>
#el-menu-item-0{
  opacity: 1;
  margin-right: 0px;
}
#el-menu-item-1,#el-menu-item-2,#el-menu-item-3{
  color: #c7621c;
}
#el-menu-item-1:hover,#el-menu-item-2:hover,#el-menu-item-3:hover{
  background-color: rgba(248, 176, 68, 0.1);
  color: #b2571b;
}
#el-menu-item-1.is-active,#el-menu-item-2.is-active,#el-menu-item-3.is-active{
  border-bottom: 2px solid #c7621c; /* 设置底边框样式 */
}
.avatar-container{
  float: right;
  height: 100%;
  margin: 8px 40px 8px 10px;
  display: flex;
}
.user-dropdown{
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  margin-top: 20px;
}
.username-pic{
  color: #575757;
  font-weight: bold;
  margin-left: 65px;
  margin-top: -30px;

}
</style>
