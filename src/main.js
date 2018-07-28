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
    tabBar: {
      'list': [
        {
          'pagePath': 'pages/index/main',
          'iconPath': '__STATIC__/images/toolbar/home.png',
          'selectedIconPath': '__STATIC__/images/toolbar/home@selected.png',
          'text': '主页'
        },
        {
          'pagePath': 'pages/logs/main',
          'iconPath': '__STATIC__/images/toolbar/shop.png',
          'selectedIconPath': '__STATIC__/images/toolbar/shop@selected.png',
          'text': '自营'
        }
        // {
        //   'pagePath': 'pages/cart/cart',
        //   'iconPath': '__STATIC__/images/toolbar/cart.png',
        //   'selectedIconPath': '__STATIC__/images/toolbar/cart@selected.png',
        //   'text': '购物车'
        // },
        // {
        //   'pagePath': 'pages/personal/personal',
        //   'iconPath': '__STATIC__/images/toolbar/personal.png',
        //   'selectedIconPath': '__STATIC__/images/toolbar/personal@selected.png',
        //   'text': '我的'
        // }
      ],
      'backgroundColor': '#F5F5F5',
      'selectedColor': '#AB956D',
      'color': '#989898',
      'borderStyle': 'white',
      'position': 'bottom'
    },
    pages: [
      'pages/index/main',
      'pages/logs/main'
    ]
  }
}
