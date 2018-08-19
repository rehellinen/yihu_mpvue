<template lang="pug">
  div.top-container
    switch-tab(:tabs="tabs", @switch="switchTabs")
    div.order-container(:style="switchStyle")
      div.single-type(v-for="(item, index) in orders" :key="index")
        order-list(:orders="item", card="true", @reload="reload")
</template>

<script>
import SwitchTab from 'base/switch-tab/switch-tab'
import OrderList from 'base/order-list/order-list'
import {OrderModel} from 'model/OrderModel'
import {mapGetters, mapMutations} from 'vuex'

let Order = new OrderModel()

export default {
  onShow () {
    if (this.ordersChange) {
      this.reload()
      this.SET_ORDERS_CHANGE(false)
    }
  },
  onHide () {
    this.SET_ORDERS_CHANGE(false)
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
  computed: {
    ...mapGetters([
      'ordersChange'
    ])
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
    },
    reload () {
      this.orders = [[], [], [], [], []]
      this.page = [1, 1, 1, 1, 1]
      this.hasMore = [true, true, true, true, true]
      this._loadData()
    },
    ...mapMutations([
      'SET_ORDERS_CHANGE'
    ])
  },
  onReachBottom () {
    this._loadData()
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
