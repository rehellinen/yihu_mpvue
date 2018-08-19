import {BaseModel} from './BaseModel'

export class CartModel extends BaseModel {
  constructor () {
    super()
    this._storageKeyName = 'cart'
  }
  /**
   * 获取购物车商品
   * @return {*}
   */
  getCartStorage (flag = false) {
    let res = wx.getStorageSync(this._storageKeyName)
    if (!res) {
      return []
    }
    if (flag) {
      let newRes = []
      for (let item of res) {
        if (item.selected) {
          newRes.push(item)
        }
      }
      return newRes
    }
    return res
  }

  /**
   * 更新缓存数据
   * @param data
   */
  setCartStorage (data) {
    wx.setStorageSync(this._storageKeyName, data)
  }

  // 删除购物车中的商品
  // 1. ids [id的数组]
  delete (ids) {
    if (!(ids instanceof Array)) {
      ids = [ids]
    }
    let cartData = this.getCartDataFromLocal()
    for (let item of ids) {
      let isExisted = this._isExistedThatOne(item, cartData)
      if (isExisted.index !== -1) {
        cartData.splice(isExisted.index, 1)
      }
    }
    this.setCartStorage(cartData)
  }

  // 获取购物车所有商品数量
  // 1. flag [true，考虑商品的选中状态]
  getCartTotalCount (flag = false) {
    let cartData = this.getCartDataFromLocal()
    let count = 0

    for (let item of cartData) {
      if (flag) {
        if (item.selected === true) {
          count += item.count
        }
      } else {
        count += item.count
      }
    }
    return count
  }

  /**
   * 更新缓存中商品信息
   * @param res 服务器获取的商品信息
   * @param goods 缓存中的商品信息
   */
  updateStorageGoods (res, goods) {
    let data = []
    for (let item of res) {
      let id = item.id
      let goodsIndexObj = CartModel._isExistedThatOne(id, goods)
      let index = goodsIndexObj.index
      let storageGoods = goodsIndexObj.data

      data[index] = item
      data[index].count = storageGoods.count
      data[index].selected = storageGoods.selected
    }
    this.setCartStorage(data)
  }

  /**
   * 获取购物车页面所需的详细信息
   * @param cartData 购物车商品
   * @returns {{selectedCount: number, selectedType: number, totalPrice: number}}
   */
  static calTotalCountAndPrice (cartData) {
    let totalPrice = 0
    let selectedCount = 0
    let selectedType = 0
    let multiple = 100
    if (cartData.length !== 0) {
      for (let i = 0; i < cartData.length; i++) {
        if (cartData[i].selected) {
          totalPrice += (cartData[i].count) * (cartData[i].price * multiple)
          selectedCount += cartData[i].count
          selectedType++
        }
      }
    }
    return {
      selectedCount,
      selectedType,
      totalPrice: totalPrice / multiple
    }
  }

  /**
   * 添加商品到购物车
   * @param goods 商品信息
   * @param count 商品数量
   * @param cartData 缓存中的商品数量
   * @return Array
   */
  static add (goods, count, cartData) {
    let isExisted = CartModel._isExistedThatOne(goods.id, cartData)
    if (isExisted.index === -1) {
      // index为-1代表商品不存在购物车中
      goods.count = count
      goods.selected = true
      cartData.push(goods)
    } else {
      let selectedData = cartData[isExisted.index]
      if ((selectedData.count + count) <= selectedData.quantity) {
        selectedData.count += count
      } else {
        selectedData.count = selectedData.quantity
      }
    }
    return cartData
  }

  /**
   * 根据商品id判断此商品是否存在于购物车
   * @param id 商品id
   * @param cartData 购物车商品
   * @return {{index: number}}
   * @private
   */
  static _isExistedThatOne (id, cartData) {
    let result = {index: -1}
    cartData.forEach((item, index) => {
      if (item.id === id) {
        result = {
          data: item,
          index: index
        }
      }
    })
    return result
  }
}
