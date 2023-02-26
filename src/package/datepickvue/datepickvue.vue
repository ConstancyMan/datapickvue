<template>
  <div class="date-box" v-show="isShow">
    <div class="show-date">
      <span>{{selectDate}}</span>
      <!-- <span>{{`${year}-${minute | repairZero}-${day}`}}</span> -->
      <span>{{selectTime}}</span>
    </div>
    <div class="month-year">
      <div class="select-year-month">
        <span @click="decYearHandle">«</span>
        <span @click="decMinuteHandle">‹</span>
        <span class="small">{{year}}年{{month | repairZero}}月</span>
        <span @click="addMinuteHandle">›</span>
        <span @click="addYearHandle">»</span>
      </div>
      <div class="select-day">
        <span v-for="item in weekArray" :key="item">{{item}}</span>
      </div>
    </div>
    <div class="days">
      <span :class="(item == day) && ((index < order) && (index > (mondIndex - 1))) ? 'pick' : ''" v-for="(item, index) in dayList" :key="index" @click="dateTickerHandle(item, index)">{{item}}</span>
    </div>
    <div class="time-config">
      <div class="times">
        <div class="hour" @wheel.prevent="changeHourHandle($event, 'hour')">
          <span v-for="(h, i) in hourList" :key="h" :class="i === 1 ? 'big' : ''">{{h}}</span>
        </div>
        <div class="title">时</div>
        <div class="minute"  @wheel.prevent="changeHourHandle($event, 'minute')">
          <span v-for="(m, i) in minuteList" :key="m" :class="i === 1 ? 'big' : ''">{{m}}</span>
        </div>
        <div class="title">分</div>
        <div class="second"  @wheel.prevent="changeHourHandle($event, 'second')">
          <span v-for="(s, i) in secondList" :key="s" :class="i === 1 ? 'big' : ''">{{s}}</span>
        </div>
        <div class="title">秒</div>
      </div>
      <div class="config">
        <span @click="cancleHandle">取消</span>
        <span @click="configHandle">确认</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'date-pick-vue',
  props: {
    def: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      // 控制是否显示
      isShow: false,
      // 选中日期：
      selectDate: '2022-12-23',
      // 选中时间：
      selectTime: '12:22:36',
      // 年份：
      year: 2034,
      // 月份
      month: 8,
      // 天
      day: 1,
      // 条件：
      order: 1,
      // 当月天数：
      currentMonthDays: 29,
      // 周一索引：
      mondIndex: 6,
      // 星期数：
      weekArray: ['日', '一', '二', '三', '四', '五', '六'],
      // 可选的日期数组：
      dayList: [],
      // 小时可选数组：
      hourSource: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
      // 展示的小时：
      hourList: ['00', '01', '02'],
      // 分钟可选数组：
      minuteSource: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59'],
      // 展示的分钟：
      minuteList: ['23', '24', '25'],
      // 秒可选数组：
      secondSource: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59'],
      // 展示的秒：
      secondList: ['58', '59', '00'],
      // Promise回调函数容器：
      promiseResult: null
    }
  },
  created () {
    // 获取当前日期初始化
    this.initDate()
  },
  filters: {
    repairZero (e) {
      return e < 10 ? '0' + e : e
    }
  },
  watch: {
    // 监听到日期def变化时初始化日期：
    def: {
      handler: function () {
        this.initDate(this.def)
      }
    },
    // 监听年份和月份变化时，从新计算可选日：
    month: {
      handler: function () {
        this.getMonthDay()
      }
    },
    year: {
      handler: function () {
        this.getMonthDay()
      }
    }
  },
  methods: {
    // 初始化参数：
    initDate (defaultdate) {
      let date
      if (defaultdate) {
        date = new Date(defaultdate)
      } else {
        date = new Date()
      }
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const dates = date.getDate()
      // 获取时：
      let hour = date.getHours()
      hour = hour < 10 ? '0' + hour : hour
      // 获取分:
      let minutes = date.getMinutes()
      minutes = minutes < 10 ? '0' + minutes : minutes
      // 获取秒：
      let seconds = date.getSeconds()
      seconds = seconds < 10 ? '0' + seconds : seconds
      // 初始化状态中数据：
      this.year = year
      this.month = month
      this.day = dates
      const m = month < 10 ? '0' + month : month
      const s = dates < 10 ? '0' + dates : dates
      this.selectDate = year + '-' + m + '-' + s
      this.selectTime = hour + ':' + minutes + ':' + seconds
      for (let i = 0; i < 24; i++) {
        if (this.hourSource[1] !== hour.toString()) {
          this.hourSource.push(this.hourSource.shift())
        } else {
          this.hourList = this.hourSource.slice(0, 3)
          break
        }
      }
      for (let i = 0; i < 60; i++) {
        if (this.minuteSource[1] !== minutes.toString()) {
          this.minuteSource.push(this.minuteSource.shift())
        } else {
          this.minuteList = this.minuteSource.slice(0, 3)
          break
        }
      }
      for (let i = 0; i < 60; i++) {
        if (this.secondSource[1] !== seconds.toString()) {
          this.secondSource.push(this.secondSource.shift())
        } else {
          this.secondList = this.secondSource.slice(0, 3)
          break
        }
      }
      // 计算可选日：
      this.getMonthDay()
      // 自动点击当前日期：
      // this.dateTickerHandle(this.day, (this.day + this.mondIndex))
    },
    // 年份增加：
    addYearHandle () {
      if (this.year < 2050) {
        this.year++
      } else {
        this.year = 2050
      }
      this.getMonthTotalDays(this.year, this.month)
    },
    // 年份减少：
    decYearHandle () {
      if (this.year > 1998) {
        this.year--
      } else {
        this.year = 1998
      }
      this.getMonthTotalDays(this.year, this.month)
    },
    // 月份增加：
    addMinuteHandle () {
      if (this.month < 12) {
        this.month++
      } else {
        this.addYearHandle()
        this.month = 1
      }
      this.getMonthTotalDays(this.year, this.month)
    },
    // 月份减少：
    decMinuteHandle () {
      if (this.month > 1) {
        this.month--
      } else {
        this.decYearHandle()
        this.month = 12
      }
      this.getMonthTotalDays(this.year, this.month)
    },
    // 计算月份所拥有的天数.并将值赋值给：
    getMonthDay () {
      // 计算当前月份所拥有的天数
      const dayCount = this.getMonthTotalDays(this.year, this.month)
      // 保留当月数供计算高亮区间：
      this.currentMonthDays = dayCount
      // 计算上月份所拥有的天数：
      let lastMonthDayCount
      if (this.month > 1) {
        lastMonthDayCount = this.getMonthTotalDays(this.year, (this.month - 1))
      } else {
        lastMonthDayCount = this.getMonthTotalDays((this.year - 1), 12)
      }
      // // 计算下月份所拥有的天数：
      // let nextMonthDayCount
      // if (this.month < 12) {
      //   nextMonthDayCount = this.getMonthTotalDays(this.year, (this.month + 1))
      // } else {
      //   nextMonthDayCount = this.getMonthTotalDays((this.year + 1), 1)
      // }
      // 计算当前月份1号是周几：
      const date = this.year + '-' + this.month + '-01'
      const dayIndex = new Date(date).getDay()
      // 保留周一索引：
      this.mondIndex = dayIndex
      // 当月可选日数据：
      const currentMonthArray = []
      for (let i = 1; i <= dayCount; i++) {
        currentMonthArray.push(i)
      }
      // 计算需要拼接的上月可选日：
      const lastDayArray = []
      for (let i = lastMonthDayCount; i > lastMonthDayCount - dayIndex; i--) {
        lastDayArray.unshift(i)
      }
      // 拼接了上月的可选日：
      const tempDayArray = [...lastDayArray, ...currentMonthArray]
      // 计算需要拼接的下月可选日：
      const nextDayArray = []
      for (let i = 1; i < (43 - tempDayArray.length); i++) {
        nextDayArray.push(i)
      }
      // 处理后的可选日数据：
      this.dayList = [...tempDayArray, ...nextDayArray]
      // console.log(this.dayList)
      // console.log('上月天数：' + lastMonthDayCount)
      // console.log('当月月天数：' + dayCount)
      // console.log('下月天数：' + nextMonthDayCount)
      // console.log('当月周一索引：' + dayIndex)
      // console.log('当前月可选日：' + currentMonthArray)
      // console.log('上月日期：' + lastDayArray)
      // console.log('下月日期：' + nextDayArray)
    },
    // 获取月份所拥有的天数：
    getMonthTotalDays (year, month) {
      const date = new Date(year, month, 0)
      const num = date.getDate()
      return num
    },
    // 选中日期：
    dateTickerHandle (e, i) {
      // 计算高亮区间：
      this.day = e
      this.order = this.mondIndex + this.currentMonthDays
      // 跳到上个月份：
      if (i < 7 && e > 7) {
        this.decMinuteHandle()
        this.$nextTick(() => {
          this.order = this.mondIndex + this.currentMonthDays
        })
      }
      // 跳到下月份：
      if (i > 27 && e < 15) {
        this.addMinuteHandle()
        // 当跳到下月时从新计算order
        this.$nextTick(() => {
          this.order = this.mondIndex + this.currentMonthDays
        })
      }
      // 赋值给selectDate：
      this.selectDate = this.year + '-' + (this.month < 10 ? '0' + this.month : this.month) + '-' + (e < 10 ? '0' + e : e)
    },
    // 监听滚动事件：
    changeHourHandle (e, type) {
      e = e || window.event
      // 判断上下方向
      const isup = e.wheelDelta > 0
      if (type === 'hour') {
        if (isup) {
          // 截取的第一个值追加到末尾：
          this.hourSource.push(this.hourSource.shift())
        } else {
          this.hourSource.unshift(this.hourSource.pop())
        }
        this.hourList = this.hourSource.slice(0, 3)
      }
      if (type === 'minute') {
        if (isup) {
          // 截取的第一个值追加到末尾：
          this.minuteSource.push(this.minuteSource.shift())
        } else {
          this.minuteSource.unshift(this.minuteSource.pop())
        }
        this.minuteList = this.minuteSource.slice(0, 3)
      }
      if (type === 'second') {
        if (isup) {
          // 截取的第一个值追加到末尾：
          this.secondSource.push(this.secondSource.shift())
        } else {
          this.secondSource.unshift(this.secondSource.pop())
        }
        this.secondList = this.secondSource.slice(0, 3)
      }
      this.selectTime = this.hourList.slice(1, 2) + ':' + this.minuteList.slice(1, 2) + ':' + this.secondList.slice(1, 2)
    },
    // 初始化一个Promise
    initPromise () {
      this.isShow = true
      return new Promise((resolve, reject) => {
        this.promiseResult = { resolve, reject }
      })
    },
    // 取消：
    cancleHandle () {
      // this.isShow = false
      this.promiseResult.reject('cancle')
      this.destruction()
    },
    // 确认：
    configHandle () {
      // this.isShow = false
      const dateTime = this.selectDate + ' ' + this.selectTime
      this.promiseResult.resolve(dateTime)
      this.destruction()
    },
    // 销毁函数
    destruction () {
      this.isShow = false
      // 销毁实例
      this.$destroy(true)
      // 将组件从body中移除
      this.$el.parentNode.removeChild(this.$el)
    }
  }
}
</script>
<style lang="less" scoped>
.date-box {
  position: fixed;
  left: 50%;
  top: 20%;
  width: 300px;
  height: 430px;
  border-radius: 5px;
  border: 1px solid darkgray;
  color: gray;
  z-index: 999999;
  background: #fafafa;
  user-select: none;
  // 展示日期：
  .show-date {
    display: flex;
    justify-content: space-around;
    margin: 10px auto;
    padding-bottom: 5px;
    width: 90%;
    height: 30px;
    border-bottom: 1px solid darkgray;
    // background: pink;
    span {
      padding: 0 10px;
      height: 30px;
      line-height: 30px;
      box-sizing: border-box;
      border-radius: 5px;
      color: gray;
      border: 1px solid darkgray;
      cursor: pointer;
    }
  }
  // 年份和月份 选择
  .month-year {
    display: flex;
    flex-direction: column;
    margin: 10px auto;
    width: 90%;
    height: 60px;
    padding-bottom: 5px;
    // background: blue;
    border-bottom: 1px dotted darkgray;
    .select-year-month {
      display: flex;
      justify-content: space-around;
      align-items: center;
      flex: 2;
      width: 100%;
      // background: yellow;
      span {
        display: inline-block;
        font-size: 25px;
        height: 30px;
        line-height: 30px;
        cursor: pointer;
      }
      span:nth-child(odd) {
        // background: red;
      }
      span.small {
        font-size: 16px;
        // vertical-align: middle;
      }
    }
    .select-day {
      display: flex;
      justify-content: space-around;
      flex: 1;
      width: 100%;
      // background: rgb(78, 197, 137);
      span {
        width: 35px;
        text-align: center;
      }
    }
    .select-day span:nth-child(odd) {
      // background: pink;
    }
  }
  // 选择日期：
  .days {
    margin: 0 auto;
    width: 90%;
    height: 215px;
    border-bottom: 1px dotted darkgray;
    // background: skyblue;
    span {
      display: inline-block;
      margin-left: 3px;
      width: 35px;
      height: 35px;
      line-height: 35px;
      text-align: center;
      border-radius: 50%;
      cursor: pointer;
    }
    span:nth-child(odd) {
      // background: rgba(223, 222, 222, 0.5) 50% 50%;
    }
    .pick {
      background: #7dbbfb;
      color: white;
    }
  }
  // 选择时间和确认：
  .time-config {
    display: flex;
    margin: 0 auto;
    height: 80px;
    width: 90%;
    // background: red;
    .times {
      flex: 3;
      display: flex;
      justify-content: space-between;
      margin: 0 auto;
      height: 80px;
      // background: rgb(212, 46, 204);
      div {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        height: 100%;
        span {
          height: 20px;
          display: flex;
          flex-direction: column;
          font-size: 16px;
          text-align: center;
          color: rgba(1,2,2,.2);
        }
        span:nth-child(odd) {
          // background: green;
        }
        .big {
          font-size: 18px;
          color: gray;
        }
      }
      div:nth-child(odd) {
        width: 35px;
        // background: darkcyan;
        cursor: pointer;
      }
    }
    .config {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      flex: 2;
      // background: yellow;
      span {
        margin-top: 50px;
        padding: 0 6px;
        border: 1px solid darkgrey;
        border-radius: 5px;
        background: white;
        cursor: pointer;
        &:hover {
          color: white;
          background: darkgrey;
        }
      }
      span:first-child {
        margin-right: 5px;
      }
      span:last-child{
        background: #409EFF;
        color: white;
        &:hover {
          background: white;
          color:#409EFF;
        }
      }
    }
  }
}
</style>
