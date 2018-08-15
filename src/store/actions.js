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
  addCartGoods () {
    // let selected = event.currentTarget.dataset.selected
    // let data = this.data.cartData
    // for (let i = 0; i < data.length; i++) {
    //   data[i].selected = !selected
    // }
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
  }
}

export {actions}
