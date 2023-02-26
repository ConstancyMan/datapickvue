import Vue from 'vue'
import datepickvue from './datepickvue/datepickvue.vue'
const DateComponent = Vue.extend(datepickvue)
let flag = false
const datepick = (date) => {
  if (!flag) {
    flag = true
    const vm = new DateComponent().$mount()
    Object.assign(vm, {
      def: date || null
    })
    document.body.appendChild(vm.$el)
    return new Promise((resolve, reject) => {
      vm.initPromise().then(res => {
        resolve(res)
      }).catch(res => {
        reject(res)
      }).finally(() => {
        flag = false
      })
    })
  } else {
    // 解决点击多次因flag = true不能返回Promise抛出异常
    return new Promise((resolve) => {
      if (!flag) {
        resolve()
      }
    })
  }
}
export default {
  install: (Vue) => {
    Vue.prototype.$datepick = datepick
  }
}
