<template>
  <div class="container-bg" >
    <ChildNavbar />
    <div class="main0">
      <div class="search-container" style="display: flex;">
        <div class="image-icon">
          <img src="https://bruce-pan-bucket.oss-cn-beijing.aliyuncs.com/img/gift.png" class="image-transition1">
        </div>
        <div class="write">"在心中种花，人生才不会荒芜。"</div>
      </div>
    </div>
    <div class="white-line">
      <el-dropdown class="el-dropdown" @command="handleCommand">
        <el-button class="orangebutton">
          排序<i class="el-icon-arrow-down el-icon--right" />
        </el-button>
        <el-dropdown-menu>
          <el-dropdown-item command="popularity">按热度</el-dropdown-item>
          <el-dropdown-item command="0">按兑换积分升序</el-dropdown-item>
          <el-dropdown-item command="1">按兑换积分降序</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <div class="white-border" />
    </div>
    <div class="select">
      <!--          <el-form :inline="true">-->
      <!--            <el-form-item>-->
      <el-input v-model="searchInput" class="search-input" placeholder="请输入物品名称进行查询" />
      <!--            </el-form-item>-->
      <!--            <el-form-item>-->
      <el-button class="button-color" @click="searchGood">查询</el-button>
      <!--            </el-form-item>-->
    </div>
    <div class="main2">
      <div class="centered-container2"> <!-- 移除点号前缀 -->
        <el-main class="white-box">
          <div class="box">
            <el-row v-for="(o, indexRow) in rowNum" :key="indexRow" :span="4" :offset="indexRow > 0 ? 1 : 0" style="margin-top: 20px">
              <el-col v-for="(o, indexCol) in columnNum" :key="indexCol" :span="4" :offset="indexCol > 0 ? 1 : 0">
                <el-card :body-style="{ padding: '0px' }" class="card-hover">
                  <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
                  <div style="padding: 14px;">
                    <span>{{ goodList[indexCol+indexRow*5].goodName }}</span>
                    <div class="cost-container">
                      <img src="@/assets/personal_images/flower.png" class="flower">
                      <span class="cost">{{ goodList[indexCol+indexRow*5].cost }}</span>
                    </div>
                    <div class="bottom clearfix">
                      <time class="time">{{ currentDate }}</time>
                      <el-button type="text" class="button" @click="open(goodList[indexCol+indexRow*5])">查看</el-button>
                    </div>
                  </div>
                </el-card>
              </el-col>
            </el-row>
            <el-row v-for="(o, indexRow) in rowNumSingle" :key="indexRow" :span="4" :offset="indexRow > 0 ? 1 : 0" style="margin-top: 20px">
              <el-col v-for="(o, indexCol) in columnNumSingle" :key="indexCol" :span="4" :offset="indexCol > 0 ? 1 : 0">
                <el-card :body-style="{ padding: '0px' }" class="card-hover">
                  <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
                  <div style="padding: 14px;">
                    <span>{{ goodList[indexCol+rowNum*columnNum].goodName }}</span>
                    <div class="cost-container">
                      <img src="@/assets/personal_images/flower.png" class="flower">
                      <span class="cost">{{ goodList[indexCol+rowNum*columnNum].cost }}</span>
                    </div>
                    <div class="bottom clearfix">
                      <time class="time">{{ currentDate }}</time>
                      <el-button type="text" class="button" @click="open(goodList[indexCol+rowNum*columnNum])">查看</el-button>
                    </div>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </div>
        </el-main>
      </div> <!-- 移除不需要的斜杠 -->
    </div><img :src="require('@/assets/market_images/background.jpg')" class="image-transition">
    <!--    <el-input-number v-model="num" :step="1"></el-input-number>-->
    <!--    <el-dialog-->
    <!--      title="提示"-->
    <!--      :visible.sync="dialogVisible"-->
    <!--      width="30%"-->
    <!--      :before-close="handleClose">-->
    <!--      <span>这是一段信息</span>-->
    <!--      <span slot="footer" class="dialog-footer">-->
    <!--    <el-select placeholder="请选择活动区域">-->
    <!--      <el-option label="区域一" value="shanghai"></el-option>-->
    <!--      <el-option label="区域二" value="beijing"></el-option>-->
    <!--    </el-select>-->
    <!--    <el-input-number :visible.sync="dialogVisible" value="1" :min="1" :max="10" :step="1"></el-input-number>-->
    <!--    <el-button @click="dialogVisible = false">取 消</el-button>-->
    <!--    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>-->
    <!--  </span>-->
    <!--    </el-dialog>-->
  </div>
</template>

<script>
import ChildNavbar from '@/layout/components/childNavbar.vue'
import api from '@/api/awardMarket'
export default {
  components: {
    ChildNavbar
  },
  data() {
    return {
      searchInput: '',
      amount: 1,
      rowNum: 4,
      columnNum: 5,
      rowNumSingle: 0,
      columnNumSingle: 0,
      currentDate: '',
      dialogVisible: false,
      goodList: [{
        id: '',
        goodName: '',
        description: '',
        cost: '',
        stock: ''
      }],
      order: [{
        userId: '',
        goodId: '',
        amount: '',
        total: '',
        createDate: ''
      }]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      api.getGoodList().then(response => {
        console.log('enter')
        this.setData(response)
      })
    },
    setData(response) {
      const goodNum = response.data.length
      this.rowNum = Math.floor(goodNum / 5)
      this.rowNumSingle = Math.ceil(goodNum / 5) - Math.floor(goodNum / 5)
      this.columnNumSingle = goodNum - this.rowNum * this.columnNum
      // this.goodList = []
      this.goodList = response.data
    },
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
    buyGood(goodItem) {
      this.order[0].userId = this.getCookie().id
      this.order[0].goodId = goodItem.id
      this.order[0].amount = this.amount
      this.order[0].total = this.amount * goodItem.cost

      const { DateTime } = require('luxon')
      const currentDateTime = DateTime.now().setZone('Asia/Shanghai')
      const formattedDateTime = currentDateTime.toFormat('yyyy-MM-dd HH:mm:ss')
      this.order[0].createDate = formattedDateTime
      console.log(this.order[0])
      api.buyGood(this.order[0]).then(response => {
        console.log(response)
      })
    },
    open(goodItem) {
      const h = this.$createElement
      const imgSrc = 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png'// 替换成你的图片地址
      const messageContent = [
        h('div', { style: 'text-align: center;' }, [
          h('img', {
            style: 'max-width: 100%;',
            attrs: { src: imgSrc }
          })
        ]),
        h('p', null, '商品名称：' + goodItem.goodName),
        h('p', null, '商品描述：' + goodItem.description),
        h('p', null, '商品兑换积分：' + goodItem.cost),
        // h('img', {
        //   attrs: { class: 'flower', src: '@/assets/personal_images/flower.png' }
        // }),
        h('el-input-number', {
          props: {
            value: this.amount,
            min: 1,
            max: 10,
            step: 1
            // label: '描述文字'
          },
          on: {
            // change: this.handleChange
          }
        }, null)
      ]
      // this.$alert('<el-input-number :min="1" :max="10"></el-input-number>')
      this.$msgbox({
        title: '商品详情',
        message: h('div', null, messageContent),
        showCancelButton: true,
        confirmButtonText: '兑换',
        cancelButtonText: '取消',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true
            instance.confirmButtonText = '兑换中...'
            this.buyGood(goodItem)
            setTimeout(() => {
              done()
              setTimeout(() => {
                instance.confirmButtonLoading = false
              }, 300)
            }, 3000)
          } else {
            done()
          }
        }
      }).then(action => {
        this.$message({
          type: 'info',
          message: 'action: ' + action
        })
      })
    },
    handleCommand(command) {
      if (command === 'popularity') {
        api.sortByPopularity().then(response => {
          this.setData(response)
        })
      } else {
        let type = 1
        if (command === '0') {
          type = 0
        }
        api.sortByCost(type).then(response => {
          this.setData(response)
          console.log(response)
        })
      }
    },
    searchGood() {
      const formData = new FormData()
      formData.append('keywords', this.searchInput)
      api.search(formData).then(response => {
        this.setData(response)
        console.log(response)
      })
    }
  }
}
</script>

<style scoped>
.search-container{
  position: absolute;
  width: 100%;
  height: 90%;
}

.container-bg {
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: transparent; /* 设置背景颜色为灰色，你可以根据需要更改颜色值 */
  display: flex;
  flex-direction: column;

}
.image-icon{
  display:flex;
  width: 35%; /* 让容器宽度占满整个头部 */
  height: 100%; /* 让容器高度占满整个头部 */
}
.image-container {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  width: 100%; /* 让容器宽度占满整个头部 */
  height: 100%; /* 让容器高度占满整个头部 */
  overflow: hidden; /* 隐藏溢出的内容 */
}
.image-transition {
  position: absolute; /* 设置绝对定位 */
  top:5%;
  bottom: 0; /* 图片位于底部 */
  left: 0; /* 图片位于左侧，可以根据需要调整位置 */
  z-index: -1; /* 将图片的 z-index 设置为较小的值，确保它位于所有组件的最下方 */
  width: 100%; /* 图片最大宽度为100% */
  height: 100%;
}
.image-transition1 {
  width: 85%; /* 图片宽度占满容器 */
  height: auto; /* 高度自适应以保持纵横比 */
  border-radius: 10px; /* 设置四个角的圆角半径 */
  transition: transform 0.5s, box-shadow 0.5s; /* 添加过渡效果（可选） */
}
.main0 {
  position: absolute;
  top: 5%;
  left: 4%;
  width: 95%; /* 设置宽度为页面宽度的50% */
  height: 16%; /* 设置高度为页面高度的50% */

}
.main2 {
  position: absolute;
  top: 28%;
  width: 100%; /* 设置宽度为页面宽度的30% */
  height: 60%; /* 设置高度为页面高度的70% */
}
.white-line{
  position: absolute;
  background-color: #ffffff; /* 设置背景颜色为白色 */
  padding: 30px; /* 添加内边距以增加长方形框的大小 */
  border-radius: 15px; /* 添加圆角以使框看起来更圆滑 */
  display: inline-block; /* 让内部的长方形框与内容排列在同一行 */
  top: 22%;
  left: 4%;
  width: 14%;
  height: 9%;
  /*transform: translateX(-654.5px) translateY(20px); !* 向左移动20像素，向下移动20像素 *!*/
  transition: box-shadow 0.3s; /* 添加过渡效果让阴影变化更平滑 */
}
.select{
  position: absolute;
  top: 20%;
  left: 32%;
  height: 9%;
  width: 38%;
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
}
.write{
  position: absolute;
  top: 70%;
  left: 20%;
  height: 9%;
  width: 38%;
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  font-family: "FangSong", "STFangsong", "华文仿宋", serif;
}
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}
.card-hover:hover {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  transform: scale(1.05);
  transition: box-shadow 0.3s, transform 0.3s;
}
.centered-container {
  position: absolute;
  top: 8%;
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  flex-direction: column;
  z-index:1;
  height: 80%;
}

.centered-container2 {
  position: absolute;
  top: 0%;
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  flex-direction: column;
  z-index:1;
  height: 100%;
  width: 100%;
}
/*.box{*/
/*  position: absolute;*/
/*  top: 0;*/
/*  width: 100%;*/
/*  height: 40%;*/
/*}*/
.white-box {
  position: absolute;
  background-color: #ffffff; /* 设置背景颜色为白色 */
  padding: 30px; /* 添加内边距以增加长方形框的大小 */
  border-radius: 15px; /* 添加圆角以使框看起来更圆滑 */
  display: inline-block; /* 让内部的长方形框与内容排列在同一行 */
  top: 0;
  width: 92%;
  height: 110%;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15); /* 设置默认的阴影效果 */
  transition: box-shadow 0.3s; /* 添加过渡效果让阴影变化更平滑 */

}
.white-boxs{
  background-color: #ffffff; /* 设置背景颜色为白色 */
  padding: 30px; /* 添加内边距以增加长方形框的大小 */
  border: 1px solid #ccc; /* 添加边框样式，可根据需要调整边框的颜色和宽度 */
  border-radius: 15px; /* 添加圆角以使框看起来更圆滑 */
  display: inline-block; /* 让内部的长方形框与内容排列在同一行 */
  width: 89%;
  height: 100%;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15); /* 设置默认的阴影效果 */
  transition: box-shadow 0.3s; /* 添加过渡效果让阴影变化更平滑 */
}
.custom-header {
  height: 100%; /* 设置头部高度为视窗高度的10% */
}
.search-input{
  position: absolute;
  top: 30%;
  left: 0;
  width: 80%;
}
.button-color {
  position: absolute;
  top: 29%;
  right: 0;
  width: 16%;
  height: 43%;
  background-color: #FDAD7A !important;
  /*border-color: #FDAD7A !important;*/
  color: white; /* 设置文字颜色为白色，您可以根据需要选择不同的颜色 */
}
.orangebutton{
  position: absolute;
  width: 100%;
  background-color: #FDAD7A !important;
  border-color: #FDAD7A !important;
  color: white;
}
/* 可以选择添加悬停状态的样式改变 */
.button-color:hover {
  background-color: chocolate  !important; /* 更深的巧克力色为悬停状态 */
  border-color: chocolate   !important;
}
.white{
  position: absolute;
  justify-content: center;
  background-color: #ffffff; /* 设置背景颜色为白色 */
  padding: 30px; /* 添加内边距以增加长方形框的大小 */
  border: 1px solid #ccc; /* 添加边框样式，可根据需要调整边框的颜色和宽度 */
  border-radius: 15px; /* 添加圆角以使框看起来更圆滑 */
  display: inline-flex; /* 让内部的长方形框与内容排列在同一行 */
  top: 8%;
  width: 18%;
  height: 80%;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15); /* 设置默认的阴影效果 */
  transition: box-shadow 0.3s; /* 添加过渡效果让阴影变化更平滑 */
}
.aside-style{
  margin-top: 1.2%;
  margin-left: 4%;
  width:50%;
  height:85%;
}
.avatar {
  width: 50px; /* 调整头像的尺寸 */
  height: 50px;
  border-radius: 50%; /* 使头像呈圆形 */
}
.text-center {
  /*position: absolute;*/
  /*top:15%;*/
  /*margin-top: 10px;*/
  text-align: center;
  font-weight: bold;
  font-size: 16px;
  color: #FDAD7A;
}
.el-dropdown{
  position: absolute;
  top: 20%;
  width: 65%;
  height: 36%;
}
.text{
  position: absolute;
  top: 70%;
  display: inline-block;
}
.cost-container{
  display: flex;
  flex-direction: row;
}
.flower{
  width: 20px;
  height: 20px;
  margin-top: 5px;
}
.cost{
  margin-top: 5px;
  margin-left: 5px;
  color: chocolate;
}
</style>
