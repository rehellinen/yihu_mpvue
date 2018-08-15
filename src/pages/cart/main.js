import Vue from 'vue'
import App from './cart'

const app = new Vue(App)
app.$mount()

export default {
  config: {
    'enablePullDownRefresh': false,
    'navigationBarTitleText': '购物车'
  }
}
