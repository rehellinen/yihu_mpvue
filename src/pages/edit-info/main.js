import Vue from 'vue'
import App from './edit-info'

const app = new Vue(App)
app.$mount()

export default {
  config: {
    'navigationBarTitleText': '修改信息'
  }
}
