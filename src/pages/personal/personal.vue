<template lang="pug">
  div
    my-loading(:showLoading="showLoading")
    div.container.personal-container(v-if="!showLoading")
      // 个人信息栏
      top-image(type="user")
      div.icon-container(@click="toEdit")
        img(src="__IMAGE__/icon/edit.png")
      // 个人信息栏

      // 电费栏
      electricity
      // 电费栏

      // 我的订单
      div.order-container
        div.image-container(v-if="orders.length !== 0")
          img(src="__IMAGE__/theme/personal@order.png")
        order-list(:orders="orders")
        div(v-if="orders.length !==0", @click="toOrderMore")
          see-more
      // 我的订单
</template>

<script>
  import MyLoading from 'base/my-loading/my-loading'
  import TopImage from 'base/top-image/top-image'
  import Electricity from 'base/electricity/electricity'
  import SeeMore from 'base/see-more/see-more'
  import OrderList from 'base/order-list/order-list'
  import {orderEnum} from 'utils/config'
  import {Load} from 'utils/load'

  import {OrderModel} from 'model/OrderModel'
  let Order = new OrderModel()
  const REQUEST_NUMBER = 1
  const ORDER_PAGE = 1
  const ORDER_COUNT = 2

  export default {
    data () {
      return {
        showLoading: true,
        orders: []
      }
    },
    created () {
      this._getData()
      this.load = new Load(this, REQUEST_NUMBER)
    },
    methods: {
      toOrderMore () {
        wx.navigateTo({
          url: '../order/main'
        })
      },
      toEdit () {
        wx.navigateTo({
          url: '../edit-info/main'
        })
      },
      _getData () {
        // 获取订单
        Order.getOrder(orderEnum.ALL, ORDER_PAGE, ORDER_COUNT).then(res => {
          this._processOrder(res)
          this.load.isLoadedAll()
        })
      },
      _processOrder (order) {
        if (order.length >= 2) {
          this.orders.push(order[0])
          this.orders.push(order[1])
        } else {
          this.orders = order
        }
      }
    },
    components: {
      MyLoading,
      TopImage,
      Electricity,
      SeeMore,
      OrderList
    }
  }
</script>

<style scoped lang="sass" rel="stylesheet/sass">
  @import "~css/base"
  .icon-container
    position: absolute
    width: 80rpx
    height: 80rpx
    top: 30rpx
    right: 20rpx
    background-color: white
    border-radius: 50px
    opacity: 0.8
    display: flex
    justify-content: center
    align-items: center
    z-index: 100
    img
      width: 40rpx
      height: 40rpx
  .personal-container
    background-color: $background-color
    padding-bottom: $card-margin-top

  .order-container
    display: flex
    flex-direction: column
    background-color: white
    margin-top: 20rpx
    width: $card-width
    margin-left: $card-margin-left
    border-radius: $card-border-radius
    .image-container
      display: flex
      justify-content: center
      padding: 30rpx 0
      border-bottom: 1rpx solid $lighter-font-color
      width: 90%
      margin-left: 5%
      align-items: center
      img
        width: 170rpx
        height: 50rpx
</style>
