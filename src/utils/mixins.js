/**
 *  mixin.js
 *  Create By rehellinen
 *  Create On 2018/8/14 13:12
 */
import {loadingHiddenTime} from './config'

let searchMixin = {
  mounted () {
    this.selector = wx.createSelectorQuery().select('.header')
  },
  data () {
    return {
      pullDown: false
    }
  },
  onPageScroll (opt) {
    this.selector.boundingClientRect(res => {
      // 关于搜索框样式
      this.pullDown = res.top
    }).exec()
  }
}

let loadMixin = {
  data () {
    return {
      showLoading: true,
      loadedPhotoCount: 0
    }
  },
  mounted () {
    setTimeout(() => {
      this.showLoading = false
    }, loadingHiddenTime)
  },
  methods: {
    loaded () {
      this.loadedPhotoCount++
      if (this.loadedPhotoCount > this.photoCount) {
        this.showLoading = false
      }
    }
  }
}

export {searchMixin, loadMixin}
