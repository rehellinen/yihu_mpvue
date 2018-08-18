import Vue from 'vue'
import App from './pay-result'

const app = new Vue(App)
app.$mount()

export default {
  config: {
    'navigationBarTitleText': '支付结果'
  }
}
