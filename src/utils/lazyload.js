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
    // 懒加载的默认图片
    this.lazyImage = '__IMAGE__/theme/loading.jpg'
    // 用于防止页面刷新过多次数
    this.stop = false
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

    this.images.boundingClientRect(res => {
      let i = this.index + this.ImagesStart
      let newData = this.data[this.dataStart + this.index]
      if (!newData || !res[i]) {
        setTimeout(() => {
          this.stop = false
        }, 100)
        return
      }
      if (res[i].top < (this.windowHeight + 40)) {
        // 更改图片URL
        newData.lazy_url = newData.image_id.image_url
        newData.transition = 'afterShow'
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
      this.page.$set(this.data, i, newData)
    }
    console.log(this.data)
    this._getAllImagesUrl()
    this.page.$store.commit('SET_IMAGE_URL', {
      data: images,
      type: pageEnum.SHOP
    })
  }

  _getAllImagesUrl () {
    let pattern = new RegExp(/https:\/\/20298479.rehellinen.cn[^"]+/, 'g')
    let data = JSON.stringify(this.data)

    return data.match(pattern)
  }
}
