import Vue from 'vue'
import App from './App'
import store from './store/index'
import conf from './utils/config'

Vue.config.productionTip = false
Vue.prototype.$store = store
Vue.prototype.$config = conf

const app = new Vue(App)
app.$mount()
