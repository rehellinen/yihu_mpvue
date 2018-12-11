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
      pageSize: 10,
      hasMore: true,
      pageArray: []
    }
  },
  onReachBottom () {
    this.page++
    if (this.hasMore) {
      this._loadData()
    }
  },
  methods: {
    init () {
      this.page = 1
      this.pageSize = 10
      this.hasMore = true
      this.dataArray = []
    },
    setMoreData (data) {
      if (data.length === 0) this.hasMore = false
      this.pageArray = this.pageArray.concat(data)
    },
    setPageSize (pageSize) {
      this.pageSize = pageSize
    },
    setNoMore () {
      this.hasMore = false
    },
    isEnd () {
      return !this.hasMore
    },
    getCurrentStart () {
      return (this.page - 1) * this.pageSize
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
      this.loadedPhotoCount++
      if (this.loadedPhotoCount > this.photoCount) {
        this.showLoading = false
      }
    }
  }
}

export {searchMixin, pageMixin, loadMixin}
