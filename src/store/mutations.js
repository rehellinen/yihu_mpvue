/**
 *  mutations.js
 *  Create By rehellinen
 *  Create On 2018/8/15 15:44
 */
import {types} from './mutation-types'

export const mutations = {
  // 传入商品的id
  [types.ADD_CART_GOODS] (state, id) {
    console.log(1)
  },
  [types.SAVE_CART_DATA] (state, data) {
    state.cartData = data
  },
  [types.SET_ORDERS_CHANGE] (state, flag) {
    state.ordersChange = flag
  }
}
