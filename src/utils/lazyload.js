/**
 *  lazyload.js
 *  Create By rehellinen
 *  Create On 2018/8/13 20:01
 */
export class LazyLoad {
  /**
   * 构造函数
   */
  constructor (data) {
    // 图片的NodesRef对象实例
    this.images = wx.createSelectorQuery().selectAll('.lazy')
    // 进行数据绑定的数据
    this.data = data
    // 获取可使用窗口高度
    this.windowHeight = wx.getSystemInfoSync().windowHeight

    this._processData()
  }

  /**
   * 每次滚动都进行刷新
   */
  refresh () {
    this.images.boundingClientRect(res => {
      res.forEach(item => {
        if (item.top <= this.windowHeight) {
          let index = item.dataset.index
          this.data[index].lazy_url = this.data[index].image_id.image_url
          this.data[index].subtitle = ''
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
