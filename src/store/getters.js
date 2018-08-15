/**
 *  getters.js
 *  Create By rehellinen
 *  Create On 2018/8/15 15:43
 */
import {CartModel} from 'model/CartModel'

const getters = {
  cartData (state) {
    return state.cartData
  },

  // 购物车详细的数据
  cartDetail (state) {
    return CartModel.calTotalCountAndPrice(state.cartData)
  }
}

export {getters}
