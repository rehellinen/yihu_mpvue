import {BaseModel} from './BaseModel.js'
import {payEnum} from '../utils/config'

class OrderModel extends BaseModel {
  constructor () {
    super()
    this.key = 'newOrder'
  }

  /**
   * 下单（预订单）
   * @param goods
   * @returns Promise
   */
  placeOrder (goods) {
    let params = {
      url: 'order',
      type: 'POST',
      data: {
        goods: goods
      }
    }
    return this.request(params)
  }

  /**
   * 支付
   * @param orderIdentify
   * @returns Promise
   */
  execPay (orderIdentify) {
    let params = {
      url: 'preOrder',
      type: 'POST',
      data: {order_identify: orderIdentify}
    }
    return this.request(params).then((res) => {
      let timeStamp = res.timeStamp
      if (timeStamp) {
        wx.requestPayment({
          timeStamp: timeStamp.toString(),
          nonceStr: res.nonceStr,
          package: res.package,
          signType: res.signType,
          paySign: res.paySign,
          success () {
            return new Promise((resolve) => {
              resolve({status: payEnum.PAY_SUCCESS, res})
            })
          },
          fail () {
            return new Promise((resolve) => {
              resolve({status: payEnum.PAY_FAIL, res})
            })
          }
        })
      } else {
        return new Promise((resolve) => {
          resolve({status: payEnum.OUT_OF_STOCK, res})
        })
      }
    })
  }

  /**
   * 获取订单
   * @param status
   * @param page
   */
  getOrder (status, page = 1) {
    let params = {
      url: 'order/' + status,
      data: {
        page: page,
        size: 12
      }
    }
    return this.request(params)
  }

  /**
   * 根据订单ID获取详细信息
   * @param id
   * @param type
   * @returns {*}
   */
  getOrderByID (id, type) {
    let params = {
      url: 'order/' + id + '/' + type
    }
    return this.request(params)
  }

  // 判断是否有新订单
  isHasNewOrder () {
    return wx.getStorageSync(this.key)
  }

  // 设置newOrder的缓存
  setNewOrderStorage (value) {
    wx.setStorageSync(this.key, value)
  }

  // 收货
  comfirm (id) {
    let params = {
      url: 'order/confirm/' + id,
      type: 'POST'
    }
    return this.request(params)
  }

  // 删除订单
  delete (id) {
    let params = {
      url: 'order/' + id,
      type: 'DELETE'
    }
    return this.request(params)
  }
}

export {OrderModel}
