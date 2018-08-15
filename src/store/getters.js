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

  totalPrice (state) {
    return CartModel._calTotalCountAndPrice(state.cartData).totalPrice
  },

  selectedCount (state) {
    return CartModel._calTotalCountAndPrice(state.cartData).selectedCount
  },

  selectedType (state) {
    return CartModel._calTotalCountAndPrice(state.cartData).selectedType
  }
}

export {getters}
