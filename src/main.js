import Vue from 'vue'
import App from './App'
import store from './store/index'
import {load} from './utils/load'
import conf from './utils/config'

Vue.config.productionTip = false
Vue.prototype.$store = store
Vue.prototype.$config = conf
Vue.prototype.imageLoaded = load

const app = new Vue({
  render: h => h(App)
})
app.$mount()
