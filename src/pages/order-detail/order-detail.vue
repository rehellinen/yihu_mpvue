<template lang="pug">
  div.container
    div.order-basic-info
      div.order-time-no
        div
          p.key 下单时间：
          p.value {{order.create_time}}
        div
          p.key 订单编号：
          p.value {{order.order_no}}
      div.order-status
        p.order-status-txt(v-if="order.status", :class="statusClass") {{statusText}}
    order-list
</template>

<script>
  import OrderList from '../../base/order-list/order-list'

  export default {
    data () {
      return {
        order: {}
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

</style>
