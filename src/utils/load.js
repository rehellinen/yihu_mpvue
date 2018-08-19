/**
 * 工具函数：控制“加载中”页面的显示与否
 */
import store from '../store/index'
import {types} from '../store/mutation-types'

let pageEnum = {
  INDEX: 'index'
}

let images = {
  [pageEnum.INDEX]: {
    total: 9,
    loaded: 0,
    showLoading: true
  }
}

function load (event) {
  let type = event.currentTarget.dataset.type
  store.commit(types.ADD_LOADED_PHOTOS, type)
  if (images[type].total === images[type].loaded) {
    store.commit(types.SET_LOADING_STATE, {flag: false, type})
  }
}

export {pageEnum, load, images}
