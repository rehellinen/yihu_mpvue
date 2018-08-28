/**
 *  lazyload.js
 *  Create By rehellinen
 *  Create On 2018/8/13 20:01
 *  介绍：
 *  该类为小程序图片懒加载的实现
 *  一个进行数据绑定的数据需要对应一个LazyLoad实例
 */
export class LazyLoad {
  /**
   * 构造函数
   * @param data 需要监听的数据
   * @param page 页面对象
   * @param imagesStart 图片第几个开始
   * @param dataStart 数据第几个开始
   * @param dataLength 需要监听的数据的长度
   * @param per 数据数组每一个项包含的图片数量
   */
  constructor ({data, page, imagesStart, dataStart, dataLength, per}) {
    this.data = data
    this.page = page
    this.ImagesStart = imagesStart || 0
    this.dataStart = dataStart || 0
    this.length = dataLength || data.length
    // 保存真实图片链接
    this.images = []
    this.per = per || 1
    // 获取可使用窗口高度
    this.windowHeight = wx.getSystemInfoSync().windowHeight
    // 是否加载完成
    this.isLoadedAll = false
    // 遍历的序号
    this.index = 0
    // 用于防止页面刷新过多次数
    this.stop = false
    // 加载中图片路径
    this.lazyImage = '__IMAGE__/icon/no-goods.png'
    // 处理数据
    this._processData()
    // 每100ms刷新一次页面
    this.interval = setInterval(() => {
      this.refresh()
    }, 100)
  }

  /**
   * 数据变化后进行重置
   */
  reset ({data, dataLength}) {
    this.data = data
    this.length = dataLength || data.length
    this.isLoadedAll = false
    this.stop = false
    this._processData()
    this.interval = setInterval(() => {
      this.refresh()
    }, 100)
  }

  /**
   * 每次滚动都进行刷新
   */
  refresh () {
    // 判断是否加载完成
    if (this.isLoadedAll || this.stop) {
      return
    }
    this.stop = true
    wx.createSelectorQuery().selectAll('.lazy').boundingClientRect(res => {
      // 索引相关
      for (let i = this.index + this.ImagesStart; i < this.ImagesStart + this.length * this.per; i++) {
        let imageIndex = this.index + this.ImagesStart
        let dataIndex = Math.floor(this.index / this.per) + this.dataStart
        let lazyIndex = imageIndex % this.per
        let newData = this.data[dataIndex]
        if (!newData || !res[imageIndex]) {
          setTimeout(() => {
            this.stop = false
          }, 100)
          return
        }
        if (res[imageIndex].top < (this.windowHeight + 40)) {
          newData.transition = 'afterShow'
          newData.lazy_url[lazyIndex] = this.images[this.index]
          this.page.$set(this.data, dataIndex, newData)
          if (this.index >= (this.length * this.per - 1)) {
            clearInterval(this.interval)
            this.isLoadedAll = true
            return
          }
          this.index++
        }
      }
    }).exec()
    setTimeout(() => {
      this.stop = false
    }, 100)
  }

  _processData () {
    for (let i = this.dataStart; i < (this.dataStart + this.length); i++) {
      let newData = this.data[i]
      if (!newData.lazy_url) {
        newData.lazy_url = []
        for (let i = 0; i < this.per; i++) {
          newData.lazy_url[i] = this.lazyImage
        }
        this.page.$set(this.data, i, newData)
      }
    }
    this._getAllImagesUrl()
  }

  _getAllImagesUrl () {
    let pattern = new RegExp(/image_url":"[^"]+/, 'g')
    let data = JSON.stringify(this.data.slice(this.dataStart, this.dataStart + this.length))
    let res = data.match(pattern)
    for (let i = 0; i < res.length; i++) {
      res[i] = res[i].split(':"')[1]
    }

    this.images = res
  }
}
