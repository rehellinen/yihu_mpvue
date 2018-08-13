/**
 * 工具函数：控制“加载中”页面的显示与否
 */

import {loadingHiddenTime} from './config'

export class Load {
  constructor (that, requestNumber) {
    // 设置加载图标的隐藏时间
    this.loadingHiddenTime = loadingHiddenTime
    // 页面中图片的数量
    this.requestCount = requestNumber
    // 已经加载出的图片数量
    this.loadedRequest = 0
    // 保存页面的环境
    this.pageObj = that
    // 设置定时
    this.setLoadingHidden()
  }

  // 判断请求是否完成
  isLoadedAll () {
    this.loadedRequest++
    if (this.loadedRequest === this.requestCount) {
      this.pageObj.showLoading = false
    }
  }

  // 加载图标的隐藏
  setLoadingHidden () {
    setTimeout(() => {
      this.pageObj.showLoading = false
    }, this.loadingHiddenTime)
  }
}
