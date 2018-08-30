<template lang="pug">
  div.container
    div.order-basic-info
      div.order-time-no
        div
          p.key 下单时间：
          p.value {{order.create_time}}
        div
          p.key 订单编号：
          p.order-no-text.value {{order.order_no}}
      div.order-status
        p(:class="statusClass") {{statusText}}

    order-list

    div.order-accounts
      div.total-account 付款合计：￥{{order.total_price}}
      div.pay(v-if="order.status === orderEnum.UNPAID") 去付款
</template>

<script>
  import OrderList from '../../base/order-list/order-list'
  // import {OrderModel} from '../../model/OrderModel'

  export default {
    onLoad () {
      let orderID = this.$root.$mp.query.id
      console.log(orderID)
    },
    data () {
      return {
        order: {},
        orderEnum: this.$config.orderEnum
      }
    },
    computed: {
      statusText () {
        let orderStatus = this.$config.orderEnum
        if (this.order.status === orderStatus.UNPAID) {
          return '未付款'
        } else if (this.order.status === orderStatus.PAID) {
          return '待发货'
        } else if (this.order.status === orderStatus.DELIVERED) {
          return '已发货'
        } else if (this.order.status === orderStatus.COMPLETED) {
          return '已完成'
        } else if (this.order.status === orderStatus.PAID_BUT_NO_GOODS) {
          return '库存不足'
        } else {
          return '未知状态'
        }
      },
      statusClass () {
        let orderStatus = this.$config.orderEnum
        if (this.order.status === orderStatus.UNPAID || this.order.status === orderStatus.PAID_BUT_NO_GOODS) {
          return 'unpay'
        } else if (this.order.status === orderStatus.PAID || this.order.status === orderStatus.DELIVERED) {
          return 'payed'
        } else if (this.order.status === orderStatus.COMPLETED) {
          return 'done'
        } else {
          return 'unpay'
        }
      }
    },
    components: {
      OrderList
    }
  }
</script>

<style scoped lang="sass">
  @import "~css/base"

  .order-basic-info
    border-bottom: 1rpx solid $lighter-font-color
    display: flex
    padding: 20rpx 0
    width: 750rpx
    font-size: $small-font-size

  .order-time-no
    flex: 1
    margin-left: 30rpx
    div:first-child
      margin-bottom: 20rpx

  .key
    color: #999

  .val
    margin-left: 10rpx
    color: #333

  .order-no-txt
    letter-spacing: 2rpx
    color: #999

  .order-status
    display: flex
    flex-basis: 110rpx
    align-items: center
    justify-content: flex-end
    margin-right: 30rpx
    font-size: $smaller-font-size
    .unpay
      color: #b42f2d
    .payed
      color: #ab956d
    .done
      color: #57ab53

  .order-accounts
    background-color: #fff
    position: fixed
    bottom: 0
    height: 90rpx
    width: 100%
    display: flex
    border-top: 1rpx solid $lighter-font-color
    border-bottom: 1rpx solid $lighter-font-color
    > view
      display: flex
      align-items: center

  .total-account
    flex: 1
    color: #93312e
    padding-left: 25rpx
    font-size: $small-font-size

  .pay
    flex-basis: 240rpx
    background-color: #ab956d
    color: #fff
    justify-content: center
    font-size: $big-font-size
    .pay:active
      background: #84704d
</style>