import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
const app = new Vue(App)
app.$mount()

export default {
  config: {
    window: {
      'navigationBarTitleText': '校园易乎',
      'navigationBarTextStyle': '#FFFFFF',
      'navigationBarBackgroundColor': '#a9936e',
      'backgroundColor': '#f5f5f5',
      'backgroundTextStyle': 'dark',
      'enablePullDownRefresh': true
    },
    pages: [
      '^pages/index/main'
    ]
  }
}
