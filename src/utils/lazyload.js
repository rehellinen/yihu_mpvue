/**
 *  lazyload.js
 *  Create By rehellinen
 *  Create On 2018/8/13 20:01
 */
export class LazyLoad {
  /**
   * 构造函数
   */
  constructor ({data, page, imagesStart = 0, dataStart = 0, dataLength}) {
    this.page = page
    // 图片的NodesRef对象实例
    this.images = wx.createSelectorQuery().selectAll('.lazy')
    // 进行数据绑定的数据
    this.data = data
    // 数据绑定的数据的长度
    this.length = dataLength || data.length
    // 获取可使用窗口高度
    this.windowHeight = wx.getSystemInfoSync().windowHeight
    // 是否加载完成
    this.isLoadedAll = false
    // 遍历的序号
    this.index = 0
    // 图片从第几个开始
    this.ImagesStart = imagesStart
    // 传入的数据从第几个开始
    this.dataStart = dataStart
    // 用于防止页面刷新过多次数
    this.stop = false
    // 加载中图片路径
    this.lazyImage = '__IMAGE__/theme/loading.jpg'
    // 处理数据
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
    let pageEnum = this.page.$config.pageEnum
    let images = this.page.$store.state.loadState[pageEnum.SHOP].images

    this.images.boundingClientRect(res => {
      let imageIndex = this.index + this.ImagesStart
      let dataIndex = this.index + this.dataStart
      let newData = this.data[dataIndex]
      if (!newData || !res[imageIndex]) {
        setTimeout(() => {
          this.stop = false
        }, 100)
        return
      }
      if (res[imageIndex].top < (this.windowHeight + 40)) {
        // 更改图片URL
        newData.transition = 'afterShow'
        newData.lazy_url = images[imageIndex]
        this.page.$set(this.data, this.index, newData)

        if (this.index >= this.length - 1) {
          clearInterval(this.interval)
          this.isLoadedAll = true
          return
        }
        this.index++
      }
    }).exec()
    setTimeout(() => {
      this.stop = false
    }, 100)
  }

  _processData () {
    let pageEnum = this.page.$config.pageEnum
    let images = this.page.$store.state.loadState[pageEnum.SHOP].images

    for (let i = this.dataStart; i < (this.dataStart + this.length); i++) {
      let newData = this.data[i]
      newData.main_image_id = newData.main_image_id.slice(0, 3)
      newData.lazy_url = this.lazyImage
      this.page.$set(this.data, i, newData)
    }

    this.page.$store.commit('SET_IMAGE_URL', {
      data: images.concat(this._getAllImagesUrl()),
      type: pageEnum.SHOP
    })
  }

  _getAllImagesUrl () {
    let pattern = new RegExp(/https:\/\/20298479.rehellinen.cn[^"]+/, 'g')
    let data = JSON.stringify(this.data)

    return data.match(pattern)
  }
}
