/**
 *  mutations.js
 *  Create By rehellinen
 *  Create On 2018/8/15 15:44
 */
import {types} from './mutation-types'

export const mutations = {
  // 保存至 store 中的购物车数据
  [types.SAVE_CART_DATA] (state, data) {
    state.cartData = data
  },
  // 订单改变的标志位
  [types.SET_ORDERS_CHANGE] (state, flag) {
    state.ordersChange = flag
  },
  // 设置有关加载中动画的数据
  [types.SET_LOADING_STATE] (state, {flag, type, total, loaded}) {
    if (flag !== undefined) {
      state.loadState[type].showLoading = flag
    }
    if (total !== undefined) {
      state.loadState[type].total = total
    }
    if (loaded !== undefined) {
      state.loadState[type].loaded = loaded
    }
  },
  [types.ADD_LOADED_PHOTO] (state, {type, loaded}) {
    state.loadState[type].loaded = loaded
  },
  [types.RESET_LOADING_STATE] (state, type) {
    state.loadState[type].loaded = 0
    state.loadState[type].showLoading = true
  }
}
