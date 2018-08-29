/**
 *  mutations.js
 *  Create By rehellinen
 *  Create On 2018/8/15 15:44
 */
import {types} from './mutation-types'

export const mutations = {
  [types.SAVE_CART_DATA] (state, data) {
    state.cartData = data
  },
  [types.SET_ORDERS_CHANGE] (state, flag) {
    state.ordersChange = flag
  },
  [types.SET_LOADING_STATE] (state, {flag, type}) {
    state.loadState[type].showLoading = flag
  },
  [types.ADD_LOADED_PHOTOS] (state, type) {
    state.loadState[type].loaded++
  },
  [types.RESET_LOADING_STATE] (state, type) {
    state.loadState[type].loaded = 0
    state.loadState[type].showLoading = true
  }
}
