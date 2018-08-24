/**
 * 工具函数：控制“加载中”页面的显示与否
 */
import store from '../store/index'
import {types} from '../store/mutation-types'
import {pageEnum} from './config'
import {CartModel} from '../model/CartModel'

let Cart = new CartModel()

/**
 * total -> 该页面一开始需要展示的图片
 * loaded -> 以及加载出的图片
 * showLoading -> 是否展示加载中的图标
 * images -> 存放图片懒加载的实际URL
 */
let images = {
  [pageEnum.INDEX]: {
    total: 9,
    loaded: 0,
    showLoading: true
  },
  [pageEnum.GOODS_MORE]: {
    total: 6,
    loaded: 0,
    showLoading: true
  },
  [pageEnum.SHOP]: {
    total: 5,
    loaded: 0,
    showLoading: true,
    images: []
  },
  [pageEnum.GOODS_DETAIL]: {
    total: 1,
    loaded: 0,
    showLoading: true
  },
  [pageEnum.CART]: {
    total: Cart.getCartStorage().length,
    loaded: 0,
    showLoading: true
  },
  [pageEnum.ORDER_CONFIRM]: {
    total: 1,
    loaded: 0,
    showLoading: true
  },
  [pageEnum.PERSONAL]: {
    total: 1,
    loaded: 0,
    showLoading: true
  }
}

function load (event) {
  let type = event.currentTarget.dataset.type
  let loadState = store.state.loadState
  store.commit(types.ADD_LOADED_PHOTOS, type)
  if (loadState[type].total === loadState[type].loaded) {
    store.commit(types.SET_LOADING_STATE, {flag: false, type})
  }
}

export {load, images}
