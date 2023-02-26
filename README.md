# datepickvue

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).



使用步骤：

1.下载datepickvue   如果npm下载报错，请使用: yarn add datepickvue 下载！

```
npm install datepickvue 
```

2.在mian.js文件中引：

// 引入datepickvue.js：

```js
import datepickvue from 'datepickvue'
```

// 引入datepickvue.css

```js
import 'datepickvue/datepickvue.css'
```

3.挂载到vue实例：

```js
Vue.use(datepickvue)
```

4.组件内使用（调用时可以传入日期格式字符串，则会以传入字符串日期为基准开始选中，否则以当前点开时间为基础做选择）：

```js
// 使用datepickvue:
this.$datepick().then(res => {
	// 点击日期拾取器中确认按钮后拿到选中的日期：
	this.date = res
}).catch(msg => {
	// 点击日期拾取器中取消按钮后返回的消息
	console.log(msg)
})

// 传入日期字符串：
this.$datepick('2023-02-26 19:12:25').then(res => {
	// 点击日期拾取器中确认按钮后拿到选中的日期：
	this.date = res
}).catch(msg => {
	// 点击日期拾取器中取消按钮后返回的消息
	console.log(msg)
})
```

vue组件中demo:

```vue
<template>
  <div class="hello">
    <h1>{{ date }}</h1>
    <button @click="datePickHandle">选择日期</button>
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

```

单击日期可筛选日期，点击左右箭头可对月份和年份做筛选，鼠标滚轮或触摸可控制时间选择。