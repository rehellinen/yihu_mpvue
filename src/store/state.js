/**
 *  state.js
 *  Create By rehellinen
 *  Create On 2018/8/15 15:44
 */
import {CartModel} from 'model/CartModel'

let Cart = new CartModel()

const state = {
  cartData: Cart.getCartStorage()
}

export {state}
