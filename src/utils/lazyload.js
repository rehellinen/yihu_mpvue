/**
 *  lazyload.js
 *  Create By rehellinen
 *  Create On 2018/8/13 20:01
 */
export class LazyLoad {
  /**
   * 构造函数
   */
  constructor (data, page) {
    this.page = page
    // 图片的NodesRef对象实例
    this.images = wx.createSelectorQuery().selectAll('.lazy')
    // 进行数据绑定的数据
    this.data = data
    // 获取可使用窗口高度
    this.windowHeight = wx.getSystemInfoSync().windowHeight
    // 是否加载完成
    this.isLoadedAll = false
    this._processData()
  }

  /**
   * 每次滚动都进行刷新
   */
  refresh () {
    if (this.isLoadedAll) {
      return
    }
    console.log('test')
    this.images.boundingClientRect(res => {
      res.forEach(item => {
        if (item.top <= (this.windowHeight + 20)) {
          let index = item.dataset.index
          if (index === this.data.length - 1) {
            this.isLoadedAll = true
          }
          let newData = this.data[index]
          newData.lazy_url = newData.image_id.image_url
          this.page.$set(this.data, index, newData)
        }
      })
    }).exec()
  }

  _processData () {
    this.data.forEach((item) => {
      item.lazy_url = '__IMAGE__/theme/loading.jpg'
    })
  }
}
