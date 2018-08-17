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

let pageMixin = {
  data () {
    return {
      page: 1,
      hasMore: true
    }
  },
  onReachBottom () {
    this.page++
    if (this.hasMore) {
      this._loadData()
    }
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
      console.log('loaded')
      this.loadedPhotoCount++
      if (this.loadedPhotoCount > this.photoCount) {
        this.showLoading = false
      }
    }
  }
}

export {searchMixin, pageMixin, loadMixin}
