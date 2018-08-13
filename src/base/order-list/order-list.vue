<template lang="pug">
div.order-list-contailer
  p.no-order-text(v-if="orders.length === 0") 没 有 相 关 订 单
  div.detail-container(v-for="item in orders" :key="item.id")
    img.detail-image(:src="item.snap_img", mode='aspectFill')
    div.two-text
      p.name-text {{item.snap_name}}
      p.status-text {{orderStatus(item.status)}}
    div.price-container
      p.price ￥{{item.total_price}}
      div.delete(v-if="item.status === 1") x
</template>

<script>
  // import {orderEnum} from 'utils/config'

  export default {
    props: {
      orders: {
        type: Array,
        default: []
      }
    },
    methods: {
      orderStatus (status) {
        return '123111111'
      }
    }
  }
</script>

<style scoped lang="sass" rel="stylesheet/sass">
  @import "~css/base"

  .order-list-contailer
    display: flex
    flex-direction: column
    background-color: white

  .detail-container
    display: flex
    flex-direction: row
    justify-content: space-between
    padding: 30rpx 0
    border-bottom: 1rpx solid $light-font-color
    width: 90%
    margin: 0 5%

  .detail-image
    width: 200rpx
    height: 150rpx

  .two-text
    display: flex
    flex-direction: column
    width: 40%

  .name-text
    font-size: $normal-font-size

  .status-text
    font-size: $small-font-size
    color: #ef7c00
    margin-top: 30rpx

  .price-container
    display: flex
    flex-direction: column
    align-items: flex-end
    justify-content: space-between

  .price
    font-size: $small-font-size

  .delete
    font-size: $bigger-font-size
    margin-top: 20rpx
    margin-right: 5rpx

  .no-order-text
    display: flex
    height: 80rpx
    font-size: 30rpx
    color: $light-font-color
    align-items: center
    justify-content: center
</style>
