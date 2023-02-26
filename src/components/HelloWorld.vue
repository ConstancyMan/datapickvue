<template>
  <div class="hello">
    <h1>{{ date }}</h1>
    <button @click="datePickHandle">选择日期:无参数，默认选中当前日期</button>
    <button @click="datePickDefaultHandle">选择日期: 并传入参数：'2023-02-26 09:25:28'</button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      date: '2022-12-12 15:56:23'
    }
  },
  methods: {
    datePickHandle () {
      // 使用datepickvue:
      this.$datepick().then(res => {
        // 点击日期拾取器中确认按钮后拿到选中的日期：
        this.date = res
      }).catch(msg => {
        // 点击日期拾取器中取消按钮后返回的消息
        console.log(msg)
      })
    },
    datePickDefaultHandle () {
      // 使用datepickvue:
      this.$datepick('2023-02-26 09:25:28').then(res => {
        // 点击日期拾取器中确认按钮后拿到选中的日期：
        this.date = res
      }).catch(msg => {
        // 点击日期拾取器中取消按钮后返回的消息
        console.log(msg)
      })
    }
  }
}
</script>
<style scoped lang="less">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
