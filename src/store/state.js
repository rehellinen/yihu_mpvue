/**
 *  state.js
 *  Create By rehellinen
 *  Create On 2018/8/15 15:44
 */
import {CartModel} from 'model/CartModel'
import {images} from '../utils/load'

let Cart = new CartModel()

const state = {
  cartData: Cart.getCartStorage(),
  ordersChange: false,
  loadState: images
}

export {state}
