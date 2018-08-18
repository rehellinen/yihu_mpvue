import Vue from 'vue'
import App from './App'
import store from './store/index'
import {load} from './utils/load'

Vue.config.productionTip = false
Vue.prototype.$store = store
Vue.prototype.imageLoaded = load

const app = new Vue(App)
app.$mount()

export default {
  config: {
    window: {
      'navigationBarTitleText': '校园易乎',
      'navigationBarTextStyle': '#FFFFFF',
      'navigationBarBackgroundColor': '#a9936e',
      'backgroundColor': '#f9f9f9',
      'backgroundTextStyle': 'dark',
      'enablePullDownRefresh': false
    },
    pages: [
      '^pages/index/main',
      'pages/personal/main',
      'pages/cart/main',
      'pages/shop/main',
      'pages/goods-detail/main',
      'pages/goods-more/main',
      'pages/order/main',
      'pages/order-confirm/main',
      'pages/pay-result/main',
      'pages/shop-detail/main',
      'pages/edit-info/main'
    ],
    tabBar: {
      list: [
        {
          'pagePath': 'pages/index/main',
          'iconPath': '__IMAGE__/toolbar/home.png',
          'selectedIconPath': '__IMAGE__/toolbar/home@selected.png',
          'text': '主页'
        },
        {
          'pagePath': 'pages/shop/main',
          'iconPath': '__IMAGE__/toolbar/shop.png',
          'selectedIconPath': '__IMAGE__/toolbar/shop@selected.png',
          'text': '自营'
        },
        {
          'pagePath': 'pages/cart/main',
          'iconPath': '__IMAGE__/toolbar/cart.png',
          'selectedIconPath': '__IMAGE__/toolbar/cart@selected.png',
          'text': '购物车'
        },
        {
          'pagePath': 'pages/personal/main',
          'iconPath': '__IMAGE__/toolbar/personal.png',
          'selectedIconPath': '__IMAGE__/toolbar/personal@selected.png',
          'text': '我的'
        }
      ],
      'backgroundColor': '#F5F5F5',
      'selectedColor': '#AB956D',
      'color': '#989898',
      'borderStyle': 'white',
      'position': 'bottom'
    }
  }
}
