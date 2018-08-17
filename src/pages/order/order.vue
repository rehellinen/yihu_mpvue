<template lang="pug">
  div
    switch-tab(:tabs="tabs", @switch="switchTabs")
    div.order-container
      div.single-type(v-for="(item, index) in orders" :key="index")
        order-list(:orders="item", card="true")
</template>

<script>
import SwitchTab from 'base/switch-tab/switch-tab'
import OrderList from 'base/order-list/order-list'
// import {orderEnum} from 'utils/config'
import {OrderModel} from 'model/OrderModel'

let Order = new OrderModel()

export default {
  mounted () {
    this._loadData()
  },
  data () {
    return {
      orders: [[], [], [], [], []],
      page: [1, 1, 1, 1, 1],
      currentIndex: 0,
      tabs: ['全部', '待付款', '待发货', '待收货', '已完成']
    }
  },
  methods: {
    switchTabs (index) {
      this.currentIndex = index
    },
    _loadData () {
      let type = this.currentIndex
      Order.getOrder(type).then(res => {
        this.$set(this.orders, type, this.orders[type].concat(res))
      })
    }
  },
  onReachBottom () {
    this.page++
    if (this.hasMore) {
      this._loadData()
    }
  },
  components: {
    SwitchTab,
    OrderList
  }
}
</script>

<style scoped lang="sass" rel="stylesheet/sass">
  @import "~css/base"
  .order-container
    display: flex
    flex-wrap: nowrap
    min-height: 100vh
    background-color: $background-color
    width: 500vw
    //align-items: flex-start
  .single-type
    width: 100vw
    //margin-left: $card-margin-left
    //margin-top: $card-margin-top
    //margin-bottom: $card-margin-top
    //border-radius: $card-border-radius
    //overflow: hidden
</style>
