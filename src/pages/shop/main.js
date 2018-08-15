import Vue from 'vue'
import App from './shop'

const app = new Vue(App)
app.$mount()

export default {
  config: {
    'enablePullDownRefresh': false,
    'navigationBarTitleText': '自营商店'
  }
}