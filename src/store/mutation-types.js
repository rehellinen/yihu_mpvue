/**
 *  mutation-types.js
 *  Create By rehellinen
 *  Create On 2018/8/15 15:44
 */
export const types = {
  // 添加商品到购物车
  ADD_CART_GOODS: 'ADD_CART_GOODS',
  // 购物车选择全部
  SELECT_ALL: 'SELECT_ALL',
  // 保存数据到vuex
  SAVE_CART_DATA: 'SAVE_CART_DATA',
  // 保存数据到缓存
  SAVE_CART_STORAGE: 'SAVE_CART_STORAGE',
  // 订单发生改变标志位
  SET_ORDERS_CHANGE: 'SET_ORDERS_CHANGE',
  // 设置加载中状态
  SET_LOADING_STATE: 'SET_LOADING_STATE',
  // 增加已加载的图片
  ADD_LOADED_PHOTOS: 'ADD_LOADED_PHOTOS',
  // 重置加载状态
  RESET_LOADING_STATE: 'RESET_LOADING_STATE'
}
