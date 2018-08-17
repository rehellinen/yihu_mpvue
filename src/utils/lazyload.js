/**
 *  lazyload.js
 *  Create By rehellinen
 *  Create On 2018/8/13 20:01
 */
export class LazyLoad {
  /**
   * 构造函数
   */
  constructor (data, page, start = 0, length) {
    this.page = page
    // 图片的NodesRef对象实例
    this.images = wx.createSelectorQuery().selectAll('.lazy')
    // 进行数据绑定的数据
    this.data = data
    // 数据绑定的数据的长度
    this.length = length || data.length
    // 获取可使用窗口高度
    this.windowHeight = wx.getSystemInfoSync().windowHeight
    // 是否加载完成
    this.isLoadedAll = false
    // 遍历的序号
    this.index = 0
    // 从第几个开始
    this.start = start
    // 懒加载的默认图片
    this.lazyImage = '__IMAGE__/theme/loading.jpg'
    this._processData()
  }

  /**
   * 每次滚动都进行刷新
   */
  refresh () {
    // 判断是否加载完成
    if (this.isLoadedAll) {
      return
    }

    this.images.boundingClientRect(res => {
      let i = this.index + this.start
      console.log(this.isLoadedAll)
      if (res[i].top < (this.windowHeight + 40)) {
        // 更改图片URL
        let newData = this.data[this.index]
        newData.lazy_url = newData.image_id.image_url
        newData.transition = 'afterShow'
        this.page.$set(this.data, this.index, newData)

        this.index++
        if (this.index >= this.length - 1) {
          this.isLoadedAll = true
        }
      }
    }).exec()
  }

  _processData () {
    this.data.forEach((item) => {
      item.lazy_url = this.lazyImage
    })
  }
}
