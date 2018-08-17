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
    let data = copyObjArr(state.cartData)
    data = CartModel.add(goods, count, data)
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
  // 删除
  deleteOne ({commit, state}, index) {
    console.log(index)
    let data = copyObjArr(state.cartData)
    data.splice(index, 1)
    commit(types.SAVE_CART_DATA, data)
  }
}

export {actions}
