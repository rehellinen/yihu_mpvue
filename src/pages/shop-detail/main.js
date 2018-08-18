import Vue from 'vue'
import App from './shop-detail'

const app = new Vue(App)
app.$mount()

export default {
  config: {
    'enablePullDownRefresh': false
  }
}
