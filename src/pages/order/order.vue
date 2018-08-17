<template lang="pug">
  div.top-container
    switch-tab(:tabs="tabs", @switch="switchTabs")
    div.order-container(:style="switchStyle")
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
      hasMore: [true, true, true, true, true],
      currentIndex: 0,
      tabs: ['全部', '待付款', '待发货', '待收货', '已完成'],
      switchStyle: ''
    }
  },
  methods: {
    switchTabs (index) {
      this.currentIndex = index
      this.switchStyle = `transform:translate(-${index}00vw,0)`
      this._loadData()
    },
    _loadData () {
      let index = this.currentIndex
      if (this.hasMore[index]) {
        Order.getOrder(index, this.page[index]).then(res => {
          this.$set(this.orders, index, this.orders[index].concat(res))
        }).catch((ex) => {
          this.hasMore[index] = false
        })
        this.page[index]++
      }
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
  .top-container
    background-color: $background-color
    min-height: 100vh

  .order-container
    display: flex
    flex-wrap: nowrap
    width: 500vw
    transition: all 0.5s ease-in-out
  .single-type
    width: 100vw
</style>
