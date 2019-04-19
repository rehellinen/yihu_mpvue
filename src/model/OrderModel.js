import {BaseModel} from './BaseModel.js'
import config from '../utils/config'

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
    return new Promise((resolve, reject) => {
      let params = {
        url: 'preOrder',
        type: 'POST',
        data: {order_identify: orderIdentify}
      }
      this.request(params).then((res) => {
        let timeStamp = res.timeStamp
        if (timeStamp) {
          wx.requestPayment({
            timeStamp: timeStamp.toString(),
            nonceStr: res.nonceStr,
            package: res.package,
            signType: res.signType,
            paySign: res.paySign,
            success () {
              resolve({
                status: config.PAY.PAY_SUCCESS,
                res
              })
            },
            fail () {
              resolve({
                status: config.PAY.PAY_FAIL,
                res
              })
            }
          })
        } else {
          resolve({
            status: config.PAY.OUT_OF_STOCK,
            res
          })
        }
      })
    })
  }

  /**
   * 获取订单
   * @param status
   * @param page
   * @param size
   */
  getOrder (status, page = 1, size = 12) {
    let params = {
      url: 'order/' + status,
      data: {
        page: page,
        size
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
      url: `order/${id}/${type}`
    }
    return this.request(params)
  }

  // 判断是否有新订单
  isHasNewOrder () {
    return wx.getStorageSync(this.key)
  }

  // 设置newOrder的缓存
  setNewOrder (value) {
    wx.setStorageSync(this.key, value)
  }

  // 收货
  confirm (id) {
    let params = {
      url: 'order/confirm/' + id,
      type: 'POST'
    }
    return this.request(params)
  }

  /**
   * 删除订单
   * @param id
   * @return {*}
   */
  delete (id) {
    let params = {
      url: 'order/' + id,
      type: 'DELETE'
    }
    return this.request(params)
  }

  /**
   * 下单失败后需要执行的方法
   * @param data
   */
  orderFail (data) {
    let nameArr = []
    let name = ''
    let str = ''
    let goods = data.goodsStatusArray

    for (let i = 0; i < goods.length; i++) {
      if (!goods[i].haveStock) {
        name = goods[i].name
        if (name.length > 15) {
          name = name.substr(0, 12) + '...'
        }
        nameArr.push(name)
        if (nameArr.length > 2) {
          break
        }
      }
    }
    str += nameArr.join('、')
    if (nameArr.length > 2) {
      str += '等'
    }
    str += '缺货'

    wx.showModal({
      title: '下单失败',
      content: str,
      showCancel: false,
      confirmColor: '#a9936e'
    })
  }
}

export {OrderModel}
