<template lang="pug">
  div.container.cart-container
    cart-list

    div.footer-account-box
      div.all-select(@click="selectAllTap")
        img(src="__IMAGE__/icon/all@selected.png", v-if="cartDetail.selectedCount === cartData.length")
        img(src="__IMAGE__/icon/all.png" v-else)
        p 全选({{cartDetail.selectedCount}})
      div.all-price-submit
        div.accounts-btn
        div.price-text ￥{{cartDetail.totalPrice}}
        div.arrow-icon
          img(src="__IMAGE__/icon/arrow@rightGrey.png" v-if="1")
          img(src="__IMAGE__/icon/arrow@rightWhite.png" v-else)
</template>

<script>
import {GoodsModel} from 'model/GoodsModel'
import CartList from 'components/cart-list/cart-list'
import {mapGetters, mapActions} from 'vuex'

let Goods = new GoodsModel()

export default {
  computed: {
    ...mapGetters([
      'cartData',
      'cartDetail'
    ])
  },
  onShow () {
    // 更新购物车数据
    Goods.updateGoods()
  },
  onHide () {
    // 保存缓存
    this.saveToStorage(this.cartData)
  },
  methods: {
    // 全选按钮
    selectAllTap (event) {
      let flag = true
      if (this.cartData.length === this.cartDetail.selectedType) {
        flag = false
      }
      this.selectAll(flag)
    },

    // 改变商品数量
    changeCount (event) {
      let id = event.currentTarget.dataset.id
      let type = event.currentTarget.dataset.type
      let index = this._getIndexByID(id)
      let count = 1

      if (type === 'minus') {
        count = -1
      }

      this.data.cartData[index].count += count
      this._updateCartData()
    },

    // 删除商品
    delete (event) {
      let id = event.currentTarget.dataset.id
      let index = this._getIndexByID(id)
      this.data.cartData.splice(index, 1)
      this._updateCartData()
    },

    // 根据商品id获取商品下标
    _getIndexByID (id) {
      for (let i = 0; i < this.data.cartData.length; i++) {
        if (this.data.cartData[i].id === id) {
          return i
        }
      }
      return -1
    },

    toDetail (event) {
      let id = event.currentTarget.dataset.id
      let type = event.currentTarget.dataset.type
      wx.navigateTo({
        url: '/pages/detail/detail?id=' + id + '&type=' + type
      })
    },

    // 跳转确认订单的页面
    submitOrder (event) {
      wx.navigateTo({
        url: '../order/order?totalPrice=' + this.data.totalPrice
      })
    },
    ...mapActions([
      'add',
      'selectAll',
      'saveToStorage'
    ])
  },
  components: {
    CartList
  }
}
</script>

<style scoped lang="sass" rel="stylesheet/sass">
  @import "~css/base"
  .cart-container
    background-color: $background-color
    min-height: 100vh

  .no-data
    display: flex
    height: 140rpx
    font-size: 26rpx
    color: $light-font-color
    align-items: center
    justify-content: center

  .footer-account-box
    position: fixed
    bottom: 0
    height: 90rpx
    width: 100%
    display: flex
    border-top: 1rpx solid $light-font-color
    border-bottom: 1rpx solid $light-font-color
    background-color: $nav-color
    color: #fff
    div
      display: flex
      align-items: center

  .all-select
    font-size: $small-font-size
    width: 40%
    img
      height: 48rpx
      width: 48rpx
      margin: 0 20rpx

  .all-price-submit
    width: 60%
    .disabled
      color: $light-font-color

  .accounts-btn, .price-text, .arrow-icon
    display: flex
    align-items: center
    justify-content: center
    height: 32rpx

  .accounts-btn
    width: 50%
    font-size: 28rpx
    border-right: 3rpx dotted #fff

  .price-text
    width: 30%
    font-size: $small-font-size
    margin-left: 10rpx

  .arrow-icon
    width: 20%
    image
      height: 32rpx
      width: 32rpx
</style>
