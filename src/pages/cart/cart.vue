<template lang="pug">
  div
    my-loading(:showLoading="showLoading")
    div.no-data(v-if="cartData.length === 0")
      p 购物车中没有商品

    div.container.cart-container(:style="offsetStyle" v-else)
      cart-list(:goods="cartData", showOperation="true")

      div.footer-account-box(v-if="!showLoading")
        div.all-select(@click="selectAllTap")
          img(src="/static/images/icon/all@selected.png", v-if="isSelectAll")
          img(src="/static/images/icon/all.png" v-else)
          p 全选({{cartDetail.selectedCount}})

        div.all-price-submit(@click="submitOrder", :class="{disabled}")
          p.price-text(:class="{disabled}") ￥{{cartDetail.totalPrice}}
          p.submit-text 下单
          div.arrow-icon
            img(src="/static/images/icon/arrow@rightWhite.png" v-if="!disabled")
            img(src="/static/images/icon/arrow@rightGrey.png" v-else)
</template>

<script>
import {GoodsModel} from '../../model/GoodsModel'
import CartList from '../../components/cart-list/cart-list'
import MyLoading from '../../components/my-loading/my-loading'
import {loading} from '../../mixins/loading'
import {mapGetters, mapActions} from 'vuex'

let goods = new GoodsModel()

export default {
  data () {
  },
  onShow () {
    // 更新购物车数据
    this._getData()
  },
  computed: {
    isSelectAll () {
      return this.cartDetail.selectedType === this.cartData.length
    },
    disabled () {
      return this.cartDetail.totalPrice === 0
    },
    ...mapGetters([
      'cartData',
      'cartDetail'
    ])
  },
  onHide () {
    this.saveToStorage(this.cartData)
  },
  onUnload () {
    this.saveToStorage(this.cartData)
  },
  methods: {
    _getData () {
      if (this.cartData.length > 0) {
        goods.updateGoods(this.cartData).then(res => {
          this.saveToStorage(res)
          this.hideLoading()
        }).catch(() => {
          this.hideLoading()
        })
      } else {
        this.hideLoading()
      }
    },
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
    CartList,
    MyLoading
  },
  mixins: [loading]
}
</script>

<style scoped lang="sass" rel="stylesheet/sass">
  @import "~css/base"
  .no-data
    display: flex
    align-items: center
    justify-content: center
    box-sizing: border-box
    height: 99vh
    p
      font-size: $small-font-size
      color: $light-font-color
      letter-spacing: 2px

  .cart-container
    background-color: $background-color
    box-sizing: border-box
    min-height: 99vh

  .footer-account-box
    z-index: 100
    position: fixed
    bottom: 0
    height: 90rpx
    width: 100%
    display: flex
    justify-content: space-between
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
      width: 60%
      font-size: $small-font-size
      z-index: 300
      .price-text
        padding-right: 40rpx
        margin-right: 40rpx
        border-right: 1px dotted white
      .price-text.disabled
        border-right: 1px dotted $lighter-font-color
      .disabled
        color: $lighter-font-color
      img
        height: 28rpx
        width: 28rpx
        margin: 0 20rpx
</style>
