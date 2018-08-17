/**
 *  mixin.js
 *  Create By rehellinen
 *  Create On 2018/8/14 13:12
 */
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

export {searchMixin, pageMixin}
