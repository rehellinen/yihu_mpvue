/**
 *  actions.js
 *  Create By rehellinen
 *  Create On 2018/8/15 15:43
 */
import {types} from './mutation-types'
import {copyObjArr} from 'utils/utils'
import {CartModel} from '../model/CartModel'

let Cart = new CartModel()

const actions = {
  // 添加商品至购物车
  addGoods ({commit, state}, {goods, count}) {
    // 处理商品的数据结构
    let cartData = {}
    let keys = ['id', 'name', 'image_id', 'price', 'type', 'quantity']
    for (let key in goods) {
      if (keys.indexOf(key) >= 0) {
        cartData[key] = goods[key]
      }
    }
    // 更改缓存以及store中的数据
    let data = copyObjArr(state.cartData)
    data = CartModel.add(cartData, count, data)
    Cart.setCartStorage(data)
    commit(types.SAVE_CART_DATA, data)
  },
  // 全选
  selectAll ({commit, state}, flag) {
    let data = copyObjArr(state.cartData)
    for (let i = 0; i < data.length; i++) {
      data[i].selected = flag
    }
    commit(types.SAVE_CART_DATA, data)
  },
  // 储存至缓存
  saveToStorage ({commit}, data) {
    Cart.setCartStorage(data)
    commit(types.SAVE_CART_DATA, data)
  },
  // 单选
  selectOne ({commit, state}, {index, selected}) {
    let data = copyObjArr(state.cartData)
    data[index].selected = selected
    commit(types.SAVE_CART_DATA, data)
  },
  // 更改购物车数量
  changeCount ({commit, state}, {index, count}) {
    let data = copyObjArr(state.cartData)
    data[index].count += count
    commit(types.SAVE_CART_DATA, data)
  },
  /**
   * 删除商品
   * @param commit
   * @param state
   * @param ids ids可以为单个数字，也可以为一个数组
   */
  deleteGoods ({commit, state}, ids) {
    let data = copyObjArr(state.cartData)
    if (Array.isArray(ids)) {
      data = data.filter((item) => {
        return ids.indexOf(item.id) === -1
      })
    } else {
      let index = CartModel.getIndexByID(ids, state.cartData)
      data.splice(index, 1)
    }
    commit(types.SAVE_CART_DATA, data)
  },
  setOrderChange ({commit}, flag) {
    commit(types.SET_ORDERS_CHANGE, flag)
  },
  setLoadingState ({commit}, {type, flag, total, loaded}) {
    commit(types.SET_LOADING_STATE, {type, flag, total, loaded})
  },
  resetLoadingState ({commit}, type) {
    commit(types.SET_LOADING_STATE, {type, flag: true, loaded: 0})
  },
  addLoadedPhoto ({commit, state}, type) {
    let loaded = state.loadState[type].loaded
    loaded++
    commit(types.SET_LOADING_STATE, {type, loaded})
  }
}

export {actions}
