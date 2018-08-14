<template lang="pug">
div.order-list-contailer
  p.no-order-text(v-if="orders.length === 0") 没 有 相 关 订 单
  div.detail-container(v-for="item in orders" :key="item.id")
    img.detail-image(:src="item.snap_img", mode='aspectFill')
    div.two-text
      p.name-text {{item.snap_name}}
      p.status-text(v-if="item.status === orderEnum.UNPAID") 待付款
      p.status-text(v-if="item.status === orderEnum.PAID") 待发货
      p.status-text(v-if="item.status === orderEnum.DELIVERED") 已发货
      p.status-text(v-if="item.status === orderEnum.COMPLETED") 已完成
      p.status-text(v-if="item.status === orderEnum.PAID_BUT_NO_GOODS") 付款成功但库存量不足
    div.price-container
      p.price ￥{{item.total_price}}
      img.delete(src="__IMAGE__/icon/delete.png")
</template>

<script>
  import {orderEnum} from 'utils/config'

  export default {
    data () {
      return {
        orderEnum
      }
    },
    props: {
      orders: {
        type: Array,
        default: []
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
    padding: 20rpx 0
    border-bottom: 1rpx solid $light-font-color
    width: 92%
    margin: 0 4%

  .detail-image
    width: 200rpx
    height: 150rpx
    border-radius: 10rpx

  .two-text
    display: flex
    flex-direction: column
    width: 40%

  .name-text
    font-size: $small-font-size

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
    margin-top: 2px

  .delete
    width: 30rpx
    height: 30rpx

  .no-order-text
    display: flex
    height: 80rpx
    font-size: 30rpx
    color: $light-font-color
    align-items: center
    justify-content: center
</style>
