<template lang="pug">
  div
    div.no-data(v-if="cartData.length === 0")
      p 购 物 车 中 没 有 商 品
    div.container.cart-container(v-else)
      cart-list(:goods="cartData")
      div.footer-account-box
        div.all-select(@click="selectAllTap")
          img(src="__IMAGE__/icon/all@selected.png", v-if="cartDetail.selectedType === cartData.length")
          img(src="__IMAGE__/icon/all.png" v-else)
          p 全选({{cartDetail.selectedCount}})
        div.all-price-submit(@click="submitOrder()", :class="{disabled : cartDetail.totalPrice === 0}")
          p.submit-text 下 单
          div.price-text(:class="{disabled : cartDetail.totalPrice === 0}") ￥{{cartDetail.totalPrice}}
          div.arrow-icon
            img(src="__IMAGE__/icon/arrow@rightWhite.png" v-if="cartDetail.totalPrice !== 0")
            img.disabled(src="__IMAGE__/icon/arrow@rightGrey.png" v-else)
</template>

<script>
import {GoodsModel} from 'model/GoodsModel'
import CartList from 'components/cart-list/cart-list'
import {mapGetters, mapActions} from 'vuex'

let Goods = new GoodsModel()

export default {
  data () {
    return {
      pageEnum: this.$config.pageEnum
    }
  },
  computed: {
    showLoading () {
      return this.loadState[this.$config.pageEnum.CART]
    },
    ...mapGetters([
      'cartData',
      'cartDetail',
      'loadState'
    ])
  },
  onShow () {
    // 更新购物车数据
    Goods.updateGoods()
  },
  onHide () {
    this.saveToStorage(this.cartData)
  },
  destroyed () {
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
    // 跳转确认订单的页面
    submitOrder () {
      wx.navigateTo({
        url: '../order-confirm/main'
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
    font-size: $small-font-size
    color: $light-font-color
    align-items: center
    justify-content: center

  .footer-account-box
    position: fixed
    bottom: 0
    height: 90rpx
    width: 100%
    display: flex
    justify-content: space-between
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
    display: flex
    justify-content: flex-end
    width: 43%
    .price-text.disabled
      color: $light-font-color
      border-left: 3rpx dotted $light-font-color
    .submit-text
      font-size: $small-font-size
      margin-right: 40rpx
    .submit-text.disabled
      color: $lighter-font-color
  .price-text, .arrow-icon
    display: flex
    align-items: center
    justify-content: center
    height: 32rpx

  .price-text
    width: 35%
    font-size: $small-font-size
    padding-left: 15rpx
    border-left: 3rpx dotted #fff

  .arrow-icon
    width: 50rpx
    margin-right: 10rpx
    image
      height: 32rpx
      width: 32rpx
</style>
