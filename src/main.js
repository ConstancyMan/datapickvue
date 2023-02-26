import Vue from 'vue'
import App from './App.vue'
// 引入datepickvue：
// import datepickvue from 'datepickvue'
import datepickvue from '@/package/index'
// 导入datepickvue.css
// import 'datepickvue/datepickvue.css'
// 使用datepickvue
Vue.use(datepickvue)
Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
