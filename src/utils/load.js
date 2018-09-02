/**
 * 工具函数：控制“加载中”页面的显示与否
 */
import store from '../store/index'
import {pageEnum} from './config'

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
    showLoading: true
  },
  [pageEnum.GOODS_DETAIL]: {
    total: 1,
    loaded: 0,
    showLoading: true
  },
  [pageEnum.ORDER_CONFIRM]: {
    total: 1,
    loaded: 0,
    showLoading: true
  },
  [pageEnum.CART]: {
    total: 0,
    loaded: 0,
    showLoading: false
  },
  [pageEnum.ORDER_DETAIL]: {
    total: 0,
    loaded: 0,
    showLoading: true
  },
  [pageEnum.PERSONAL]: {
    total: 0,
    loaded: 0,
    showLoading: true
  },
  [pageEnum.SHOP_DETAIL]: {
    total: 0,
    loaded: 0,
    showLoading: true
  }
}

function load (event) {
  let type = event.currentTarget.dataset.type
  if (!type) {
    return
  }

  let loadState = store.state.loadState
  if (loadState[type].total < loadState[type].loaded) {
    return
  }
  store.dispatch('addLoadedPhoto', type)
  if (loadState[type].total === loadState[type].loaded) {
    store.dispatch('setLoadingState', {flag: false, type})
  }
}

export {load, images}
