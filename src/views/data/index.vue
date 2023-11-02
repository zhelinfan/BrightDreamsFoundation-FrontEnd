<template>
  <div class="app-container">
    <el-row>
      <p style="font-weight: bold; font-size: 30px;">系统使用情况</p>
    </el-row>
    <el-row type="flex" justify="space-between" class="row-bg">
      <el-col :span="5">
        <div class="grid-content bg-purple-dark small-card" style="height: 200px; color: #409EFF;">
          <div>
            当前在线儿童数
          </div>
          <div class="small-card-num">
            {{ animatedChildrenNum }}
          </div>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="grid-content bg-purple-dark small-card" style="height: 200px; color: #67C23A;">
          <div>
            当前在线志愿者数
          </div>
          <div class="small-card-num">
            {{ animatedVolunteerNum }}
          </div>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="grid-content bg-purple-dark small-card" style="height: 200px; color: #E6A23C;">
          <div>
            当前在线捐赠者数
          </div>
          <div class="small-card-num">
            {{ animatedDonatorNum }}
          </div>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="grid-content bg-purple-dark small-card" style="height: 200px; color: #F56C6C;">
          <div>
            当前总使用人次
          </div>
          <div class="small-card-num">
            {{ animatedTotalNumber }}
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <p style="font-weight: bold; font-size: 30px;">系统注册人数统计</p>
    </el-row>
    <el-row type="flex" class="row-bg">
      <el-col :span="24">
        <div id="lineChart" class="grid-content bg-purple-dark" style="height: 400px;" />
      </el-col>
    </el-row>
    <el-row>
      <p style="font-weight: bold; font-size: 30px;">捐赠数据统计</p>
    </el-row>
    <el-row type="flex" justify="space-between">
      <el-col :span="11">
        <div id="radarChart" class="grid-content" style="height: 300px;" />
      </el-col>
      <el-col :span="11">
        <div id="barChart" class="grid-content" style="height: 300px;" />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div id="mapChart" class="grid-content" style="height: 500px;" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import gsap from 'gsap'
import china from '@/utils/china'

export default {
  name: 'Data',
  // 定义数据模型
  data() {
    return {
      totalNum: 1425,
      tweenedTNumber: 1425,
      childrenNum: 20,
      tweenedCNumber: 20,
      volunteerNum: 40,
      tweenedVNumber: 40,
      donatorNum: 30,
      tweenedDNumber: 30,
      interval: {},
      lineOption: {
        color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        legend: {
          data: ['总用户数', '总儿童数', '总志愿者数', '总捐赠者数']
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            name: '日期',
            boundaryGap: false,
            data: ['11/01', '11/02', '11/03', '11/04', '11/05', '11/05', '11/06', '11/07', '11/08', '11/09', '11/10', '11/11', '11/12', '11/13']
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '人数'
          }
        ],
        series: [
          {
            name: '总用户数',
            type: 'line',
            stack: 'Total',
            smooth: true,
            lineStyle: {
              width: 0
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgb(128, 255, 165)'
                },
                {
                  offset: 1,
                  color: 'rgb(1, 191, 236)'
                }
              ])
            },
            emphasis: {
              focus: 'series'
            },
            data: [3, 24, 36, 57, 68, 87, 100, 222, 334, 345, 400, 523, 647, 1082]
          },
          {
            name: '总儿童数',
            type: 'line',
            stack: 'Total',
            smooth: true,
            lineStyle: {
              width: 0
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgb(0, 221, 255)'
                },
                {
                  offset: 1,
                  color: 'rgb(77, 119, 255)'
                }
              ])
            },
            emphasis: {
              focus: 'series'
            },
            data: [2, 14, 26, 27, 35, 67, 65, 109, 140, 147, 189, 218, 250, 260]
          },
          {
            name: '总志愿者数',
            type: 'line',
            stack: 'Total',
            smooth: true,
            lineStyle: {
              width: 0
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgb(55, 162, 255)'
                },
                {
                  offset: 1,
                  color: 'rgb(116, 21, 219)'
                }
              ])
            },
            emphasis: {
              focus: 'series'
            },
            data: [1, 10, 14, 25, 43, 42, 78, 40, 100, 130, 148, 168, 235, 270]
          },
          {
            name: '总捐赠者数',
            type: 'line',
            stack: 'Total',
            smooth: true,
            lineStyle: {
              width: 0
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgb(255, 0, 135)'
                },
                {
                  offset: 1,
                  color: 'rgb(135, 0, 157)'
                }
              ])
            },
            emphasis: {
              focus: 'series'
            },
            data: [0, 5, 23, 45, 23, 34, 65, 34, 45, 57, 68, 160, 235, 382]
          }
        ]
      },
      radarOption: {
        title: {
          text: '年龄段分布'
        },
        legend: {
          left: 'right',
          orient: 'vertical'
        },
        color: ['#409EFF', '#67C23A', '#E6A23C', '#F56C6C', '#006e00'],
        tooltip: {
          trigger: 'item'
        },
        series: [
          {
            name: '捐赠年龄段',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 40,
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 1048, name: '0-20岁' },
              { value: 2735, name: '20-30岁' },
              { value: 3030, name: '30-40岁' },
              { value: 580, name: '40-60岁' },
              { value: 484, name: '60-80岁' }
            ]
          }
        ]
      },
      mapOption: {
        title: {
          text: '捐赠地域分布'
        },
        toolbox: {
          feature: {
            saveAsImage: {
              pixelRatio: 2
            }
          }
        },
        tooltip: {
          formatter: function(params, ticket, callback) {
            return params.seriesName + '<br />' + params.name + ':' + params.value
          }// 数据格式化
        },
        visualMap: {
          min: 0,
          max: 1500,
          left: 'left',
          top: 'bottom',
          text: ['高', '低'], // 取值范围的文字
          inRange: {
            color: ['#e0ff00', '#006e00']// 取值范围的颜色
          },
          show: true// 图注
        },
        geo: {
          map: 'china',
          roam: false, // 不开启缩放和平移
          zoom: 1.23, // 视角缩放比例
          label: {
            normal: {
              show: true,
              fontSize: '10',
              color: 'rgba(0,0,0,0.7)'
            }
          },
          itemStyle: {
            normal: {
              borderColor: 'rgba(0, 0, 0, 0.2)'
            },
            emphasis: {
              areaColor: '#F3B329', // 鼠标选择区域颜色
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              shadowBlur: 20,
              borderWidth: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        },
        series: [
          {
            name: '捐赠者数',
            type: 'map',
            geoIndex: 0,
            data: [
              { name: '南海诸岛', value: 0 },
              { name: '北京', value: Math.round(Math.random() * 1000) },
              { name: '天津', value: Math.round(Math.random() * 1000) },
              { name: '上海', value: Math.round(Math.random() * 1000) },
              { name: '重庆', value: Math.round(Math.random() * 1000) },
              { name: '河北', value: Math.round(Math.random() * 1000) },
              { name: '河南', value: Math.round(Math.random() * 1000) },
              { name: '云南', value: Math.round(Math.random() * 1000) },
              { name: '辽宁', value: Math.round(Math.random() * 1000) },
              { name: '黑龙江', value: Math.round(Math.random() * 1000) },
              { name: '湖南', value: Math.round(Math.random() * 1000) },
              { name: '安徽', value: Math.round(Math.random() * 1000) },
              { name: '山东', value: Math.round(Math.random() * 1000) },
              { name: '新疆', value: Math.round(Math.random() * 1000) },
              { name: '江苏', value: Math.round(Math.random() * 1000) },
              { name: '浙江', value: Math.round(Math.random() * 1000) },
              { name: '江西', value: Math.round(Math.random() * 1000) },
              { name: '湖北', value: Math.round(Math.random() * 1000) },
              { name: '广西', value: Math.round(Math.random() * 1000) },
              { name: '甘肃', value: Math.round(Math.random() * 1000) },
              { name: '山西', value: Math.round(Math.random() * 1000) },
              { name: '内蒙古', value: Math.round(Math.random() * 1000) },
              { name: '陕西', value: Math.round(Math.random() * 1000) },
              { name: '吉林', value: Math.round(Math.random() * 1000) },
              { name: '福建', value: Math.round(Math.random() * 1000) },
              { name: '贵州', value: Math.round(Math.random() * 1000) },
              { name: '广东', value: Math.round(Math.random() * 1000) },
              { name: '青海', value: Math.round(Math.random() * 1000) },
              { name: '西藏', value: Math.round(Math.random() * 1000) },
              { name: '四川', value: Math.round(Math.random() * 1000) },
              { name: '宁夏', value: Math.round(Math.random() * 1000) },
              { name: '海南', value: Math.round(Math.random() * 1000) },
              { name: '台湾', value: Math.round(Math.random() * 1000) },
              { name: '香港', value: Math.round(Math.random() * 1000) },
              { name: '澳门', value: Math.round(Math.random() * 1000) }
            ]
          }
        ]
      },
      barOption: {
        title: {
          text: '每日捐赠额'
        },
        legend: {
          data: ['bar']
        },
        toolbox: {
          feature: {
            saveAsImage: {
              pixelRatio: 2
            }
          }
        },
        color: ['#409EFF'],
        tooltip: {},
        xAxis: {
          name: '日期',
          data: ['11/01', '11/02', '11/03', '11/04', '11/05', '11/05', '11/06', '11/07', '11/08', '11/09', '11/10', '11/11', '11/12', '11/13'],
          splitLine: {
            show: false
          }
        },
        yAxis: {},
        series: [
          {
            name: '捐赠额',
            type: 'bar',
            data: [3540, 2423, 3631, 5735, 6857, 8738, 3402, 2229, 3340, 3455, 4002, 5233, 6474, 1082],
            emphasis: {
              focus: 'series'
            },
            animationDelay: function(idx) {
              return idx * 100
            }
          }
        ],
        animationEasing: 'elasticOut',
        animationDelayUpdate: function(idx) {
          return idx * 5
        }
      }
    }
  },
  computed: {
    animatedTotalNumber: function() {
      return this.tweenedTNumber.toFixed(0)
    },
    animatedChildrenNum: function() {
      return this.tweenedCNumber.toFixed(0)
    },
    animatedVolunteerNum: function() {
      return this.tweenedVNumber.toFixed(0)
    },
    animatedDonatorNum: function() {
      return this.tweenedDNumber.toFixed(0)
    }
  },
  watch: {
    totalNum: function(newValue) {
      gsap.to(this.$data, { duration: 1, tweenedTNumber: newValue })
    },
    childrenNum: function(newValue) {
      gsap.to(this.$data, { duration: 1, tweenedCNumber: newValue })
    },
    volunteerNum: function(newValue) {
      gsap.to(this.$data, { duration: 1, tweenedVNumber: newValue })
    },
    donatorNum: function(newValue) {
      gsap.to(this.$data, { duration: 1, tweenedDNumber: newValue })
    }
  },
  mounted() {
    this.rawLine()
    this.randomNumGen()
  },
  destroyed() {
    clearInterval(this.interval)
  },
  // 定义方法
  methods: {
    rawLine() {
      const lineChart = echarts.init(document.getElementById('lineChart'))
      const radarChart = echarts.init(document.getElementById('radarChart'))
      const barChart = echarts.init(document.getElementById('barChart'))
      const mapChart = echarts.init(document.getElementById('mapChart'))
      lineChart.setOption(this.lineOption)
      radarChart.setOption(this.radarOption)
      barChart.setOption(this.barOption)
      mapChart.setOption(this.mapOption)
      mapChart.on('click', function(params) {
        alert(params.name + ':' + params.seriesName + ':' + params.value)
      })
    },
    randomNumGen() {
      this.interval = setInterval(() => {
        this.totalNum += Math.floor(Math.random() * (120 - 100 + 1)) + 0
        this.childrenNum = Math.floor(Math.random() * (250 - 100 + 1)) + 50
        this.volunteerNum = Math.floor(Math.random() * (250 - 100 + 1)) + 50
        this.donatorNum = Math.floor(Math.random() * (250 - 100 + 1)) + 50
      }, 5000)
    }
  }
}
</script>

<style>
.bg-purple {
    background: #d3dce6;
}
.bg-purple-light {
    background: #7f838c;
}
.grid-content {
    border-radius: 4px;
    min-height: 36px;
}
.row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
}
.bg-purple-dark {
    background: #ffffff;
}
.small-card {
    display: flex;
    font-size: x-large;
    font-weight: bold;
    text-align: center;
    flex-direction: column;
    justify-content: space-evenly;
}
.small-card-num {
    font-size: 80px;
}
</style>
