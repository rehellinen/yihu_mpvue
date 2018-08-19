/**
 * 工具函数：控制“加载中”页面的显示与否
 */
import store from '../store/index'
import {types} from '../store/mutation-types'
import {pageEnum} from 'utils/config'

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
