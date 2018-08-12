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
      '^pages/index/main',
      'pages/personal/main'
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
