/**
 *  mixin.js
 *  Create By rehellinen
 *  Create On 2018/8/14 13:12
 */
let searchMixin = {
  mounted () {
    this.selector = wx.createSelectorQuery().select('.header-image')
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

export {searchMixin}
